import { SPACore } from "./spa_core.js";
import {BuildCog} from "../lib/webcogs/buildcog.js"
const fs = nw.require("fs");
const unzipper = nw.require("unzipper");
//import fs from "fs";

//import OpenAI from "../node_modules/openai"

/* @cogs_system_prompt
 * You are writing methods for a Javascript class that runs in the browser. Always use indents of 4 spaces, and indent every line with at least 4 spaces.
 */
/** AppCore is the SPACore subclass used for this application. It contains extra methods specific to this app. 
 */
class AppCore extends SPACore {
	basedir = null;
	workspacedir = null;
	globals;
	levels;
	sprites;
	sounds;
	tilemapping;
	promptbuildfiles = {}
	mapModules = {}
	entityModules = {}
	particleModules = {}
	openai_client = null;
	/** @private 
	 * @returns {object} a decoded JSON string, or {} when not found
	*/
	async loadJSON(url,defaultval) {
		url = this.basedir + url;
		try {
			console.log(`Loading json from ${url}...`)
			const response = await fetch(url+"?t="+Date.now());
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.log(`Failed to load JSON:${error}, assuming empty object`);
			return defaultval
		}
	}
	/** @private */
	async loadAsDataURL(path) {
		const response = await fetch(path);

		if (!response.ok) {
			throw new Error(`Failed to load file: ${response.status} ${response.statusText}`);
		}

		const blob = await response.blob();

		return await new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => resolve(reader.result);
			reader.onerror = () => reject(reader.error);

			reader.readAsDataURL(blob);
		});
	}
	/** @private */
	savePngDataUrl(dataUrl, outputPath) {
		console.log(dataUrl)
		const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
		const buffer = Buffer.from(base64Data, "base64");
		fs.writeFileSync(outputPath, buffer);
	}
	/** @private */
	async loadTextFile(url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.text();
	}
	/** @private */
	saveTextFile(url, text) {
		fs.writeFileSync(url, text, "utf8");
	}
	/** @private
	 * @cogs_func saveJSON
	 * Write a javascript method saveJSON(path,object) that takes a javascript object and saves it as JSON to the given file path. If the file already exists, rename the old file, adding the extension '.bak'. If the .bak file already exists, delete that first. Assume a node.js environment where the fs module is already imported as 'fs'. Use synchronous file operations.
	 */
	//@cogs_build 0.6.0 openai-gpt-5.4 2026-05-14T09:32:16.558Z
    saveJSON(path, object) {
        if (fs.existsSync(path)) {
            const backupPath = path + '.bak';
            if (fs.existsSync(backupPath)) {
                fs.unlinkSync(backupPath);
            }
            fs.renameSync(path, backupPath);
        }
        fs.writeFileSync(path, JSON.stringify(object,null,4));
        return {
            success: true,
            path: path,
            backupPath: path + '.bak'
        };
    }
	/* @cogs_endfunc */
	/** Do not construct this class, but use the existing instance.
	 * basedir should include trailing slash.
	 */
	constructor(routeCallback,mountCallback,baseStyleUrls) {
		super(routeCallback,mountCallback,baseStyleUrls)
		if (!process.env.OPENAI_API_KEY) {
			alert('Error: Environment variable "OPENAI_API_KEY" is not set. Build functions will not work.');
			//process.exit(1);
		} else {
			this.openai_client = new OpenAI.OpenAI({apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true})
		}
	}
	/** @private */
	async init() {
		this.setWorkspaceDir(this.getWorkspaceDir())
		if (this.workspacedir) {
			await this.initWorkspace()
		}
	}
	/** @private */
	async initWorkspace() {
		try {
			this.globals = await this.loadJSON("globals.json",[])
			this.levels = await this.loadJSON("levels.json",[])
			this.tilemapping = await this.loadJSON("tilemapping.json",{})
			this.sprites = await this.loadJSON("sprites.json",{})
			this.sounds = await this.loadJSON("sounddefs.json",{
    			"zzfx-sound-generator": "1.0",
    			"sounds": []
			})
			this.promptbuildfiles["maps"] = await this.loadJSON("webcogs/promptbuild_maps.json")
			this.promptbuildfiles["entities"] = await this.loadJSON("webcogs/promptbuild_entities.json")
			this.promptbuildfiles["particles"] = await this.loadJSON("webcogs/promptbuild_particles.json")
			await this.loadModules(this.basedir, this.basedir+"webcogs/promptbuild_maps.json", this.mapModules)
			await this.loadModules(this.basedir, this.basedir+"webcogs/promptbuild_entities.json", this.entityModules)
			await this.loadModules(this.basedir, this.basedir+"webcogs/promptbuild_particles.json", this.particleModules)
			localStorage.setItem("tmtg.net.TinyPixelEditor.0",await this.loadAsDataURL(this.basedir+"images/spritesheet.png"));
			// force dimensions in sprite editor
			//var config = {
			//	tilex: 10,
			//	tiley: 10,
			//	nrtilesx: 10,
			//	nrtilesy: 10,
			//}
			//localStorage.setItem("tmtg.net.TinyPixelEditor.config", JSON.stringify(config))
			var gamesrc = await this.loadTextFile(this.basedir+"game.js")
			var gamesettings = this.parseGameInit(gamesrc)
			var spritedims = this.parseGameSpriteDims(gamesrc)
			this.setGameTitle(gamesettings.title)
			this.setGameDescription(gamesettings.description)
			this.setSpriteEditorDims(spritedims)
		} catch (err) {
			console.error(`Error initing workspace:`)
			console.error(err)
			// failed to load files -> clear workspace + basedir folder, reload UI?
		}
	}
	/** @private */
	getSpriteEditorDims() {
		var ret = {unitx:10, unity:10, countx:10, county:10}
		var editorconfig = JSON.parse(localStorage.getItem("tmtg.net.TinyPixelEditor.config"))
		if (editorconfig) {
			ret.unitx = editorconfig.tilex ?? 10
			ret.unity = editorconfig.tiley ?? 10
			ret.countx = editorconfig.nrtilesx ?? 10
			ret.county = editorconfig.nrtilesy ?? 10
		}
		return ret
	}

	/** @private */
	setSpriteEditorDims(spritedims) {
		var editorconfig = localStorage.getItem("tmtg.net.TinyPixelEditor.config")
		if (editorconfig) {
			editorconfig = JSON.parse(editorconfig)
		} else {
			editorconfig = {}
		}
		editorconfig.tilex = spritedims.unitx;
		editorconfig.tiley = spritedims.unity;
		editorconfig.nrtilesx = spritedims.countx;
		editorconfig.nrtilesy = spritedims.county;
		localStorage.setItem("tmtg.net.TinyPixelEditor.config",
			JSON.stringify(editorconfig) )
	}

	/** @private
	 * @param {string} path  path to extract template into, with trailing slash
	 * @return {string} error message or false if no error
	 */
	async createWorkspace(path) {
		if (fs.existsSync(path)) {
			return "Directory already exists."
		}
		var zipfile = process.cwd()+"/workspace-template.zip"
		console.log(`Unzipping ${zipfile} into ${path}`)
		await fs
			.createReadStream(zipfile)
			.pipe(unzipper.Extract({ path: path }))
			.promise();
		this.setWorkspaceDir(path)
		return false
	}
	/** Get game workspace directory.
	 * @return {string} path to current workspace, or null if none
	 */
	getWorkspaceDir() {
		return localStorage.getItem("borisvanschooten.jgame-ai-ui.workspace");
	}
	/** @private */
	setWorkspaceDir(dir) {
		console.log(`>>> Setting workspace dir to ${dir}.`)
		if (dir) {
			localStorage.setItem("borisvanschooten.jgame-ai-ui.workspace", dir);
		} else {
			localStorage.removeItem("borisvanschooten.jgame-ai-ui.workspace");
		}
		this.workspacedir = dir
		if (this.workspacedir) {
			this.basedir = this.workspacedir + "jgame-games/ai-game/"
		} else {
			this.basedir = null
		}
	}
	/** Pick a directory from the local filesystem and return it.
	 * @return a Promise which resolves to the full path string.
	 */
	pickDirectory() {
		return new Promise(function (resolve, reject) {
			const input = document.createElement("input");
			input.type = "file";
			input.setAttribute("nwdirectory", ""); 
			//input.setAttribute("nwworkingdir", options.workingDirectory); // set this to set a default dir

			input.addEventListener("change", function () {
				if (input.value) {
					resolve(input.value);
				} else {
					resolve(null);
				}
			});
			input.addEventListener("cancel", function () {
				resolve(null);
			});
			input.click();
		});
	}
	gametitle = "My Game";
	gamedescription = "Controls: W,S,A,D"
	/** 
	 * @return {string} game title
	 */
	getGameTitle() {
		return this.gametitle
	}
	/** 
	 * @return {string} game description
	 */
	getGameDescription() {
		return this.gamedescription
	}
	/** 
	 * @param {string} title - game title
	 */
	setGameTitle(title) {
		this.gametitle = title
	}
	/** 
	 * @param {string} description - game description
	 */
	setGameDescription(description) {
		this.gamedescription = description
	}
	/** Get the menu items to display with their routes.
	 * @returns an object with as keys the menu item names, and as values the route names.
	 */
	getMenuItems() {
		if (this.basedir) {
			return {
				"💾": "savegameassets",
				"🚪": "closeworkspace",
				"⚙️": "globalsettings",
				"Sprite editor": "spriteeditor",
				"Map Tiles": "tilemappings",
				"Maps": "maps",
				"Levels": "levels",
				"Globals": "globals",
				"Entities": "entities",
				"Sprites": "sprites",
				"Particles": "particles",
				"Sounds": "sounds",
				"Play Game": "playgame",
			}
		} else {
			return {
				"Open workspace": "openworkspace",
				"New workspace": "newworkspace",
			}
		}
	}
	/** @private */
	async saveGameAssets() {
		if (!this.basedir) {
			alert("Cannot save, basedir not defined!")
			return
		}
		this.saveJSON(this.basedir+"globals.json",this.globals)
		this.saveJSON(this.basedir+"levels.json",this.levels)
		this.saveJSON(this.basedir+"tilemapping.json",this.tilemapping)
		this.saveJSON(this.basedir+"sprites.json",this.sprites)
		this.saveJSON(this.basedir+"sounddefs.json",this.sounds)
		this.saveJSON(this.basedir+"webcogs/promptbuild_maps.json", this.promptbuildfiles["maps"])
		this.saveJSON(this.basedir+"webcogs/promptbuild_entities.json", this.promptbuildfiles["entities"])
		this.saveJSON(this.basedir+"webcogs/promptbuild_particles.json", this.promptbuildfiles["particles"])
		this.savePngDataUrl(localStorage.getItem("tmtg.net.TinyPixelEditor.0"), this.basedir+"images/spritesheet.png")
		var gamesrc = await this.loadTextFile(this.basedir+"game.js")
		gamesrc = this.updateGameInit(gamesrc, this.getGameTitle(), this.getGameDescription())
		gamesrc = this.updateGameSpriteDims(gamesrc, this.getSpriteEditorDims())
		this.saveTextFile(this.basedir+"game.js",gamesrc)
	}

	/** Plays a given sound.
	 * @param {string} name - the name of the sound
	 */
	playSound(name) {
		for (var i=0; i<this.sounds.sounds.length; i++) {
			if (this.sounds.sounds[i].name == name) {
				window.playSound(this.sounds.sounds[i])
				return;
			}
		}
	}
	/** @private
	 * Shows a popup message.
	 * @param {string} message - the message to display
	 */
	showPopupMessage(message) {
		window.showPopupMessage(message)
	}
	/** Get game URL.
	 * @return {string} URL where game can be found
	 */
	getGameUrl() {
		this.saveGameAssets()
		return "http://localhost:9876/index.html"
	}
	/** Get the path of the source code of a module.
	 * @async
	 * @param {string} type - one of "maps", "entities", "particles"
	 * @param {string} name - the name of the module
	 * @return {Promise<string>} full path of source code or null if not found
	 */
	async getModuleSourcePath(type,name) {
		var pbf = await this.loadJSON("webcogs/promptbuild_"+type+".json")
		for (var i=0; i<pbf.targets.length; i++) {
			var tg = pbf.targets[i]
			if (tg.name == name) {
				return this.basedir + "webcogs/" + pbf.wd + tg.file
			}
		}
		return null;
	}
	/** Build a module (that is, a map, entity, or particle generator).
	 * @param {string} type - one of "maps", "entities", "particles"
	 * @param {string} name - the name of the module
	*/
	async buildModule(type,name) {
		window.alert(`Starting build: ${type}.${name}.`)
		try {
			// save prompt buildfile
			var manifestPath = this.basedir+"webcogs/promptbuild_"+type+".json"
			this.saveJSON(manifestPath, this.promptbuildfiles[type])
			console.log(`Building ${type} module '${name}' with buildfile ${manifestPath}`)
			var buildcog = new BuildCog(this.openai_client,"build",[name],manifestPath)
			// TODO report errors
			var err = await buildcog.runCommand()
			this.showPopupMessage(`Build of module ${type}.${name} complete.`)
			// reload modules
			var modules = this.mapModules
			if (type == "entities") {
				modules = this.entityModules
			} else if (type == "particles") {
				modules = this.particleModules
			}
			// reload modules
			await this.loadModules(this.basedir, this.basedir+"webcogs/promptbuild_"+type+".json", modules)
		} catch (error) {
			console.log(error.stack)
			console.error('Failed to read or parse manifest file:', err.message);
			process.exit(1);
		}
	}
	/** Get sprite editor URL
	 * @return {string} URL where sprite editor can be found
	 */
	getSpriteEditor() {
		return "tinyspriteeditor.html"
	}
	/** Get a HTML img element showing the sprite corresponding to the given sprite sheet index. 
	 * @param {Number} spriteIndex - integer sprite index
	 * @param {string} size - either "small" (for item lists) or "large" (for form fields)
	 * @return {HTMLElement} an img element showing the sprite
	 */
	getSpriteIndexImg(spriteIndex,size) {
		var spritedims = this.getSpriteEditorDims()
		const spritesPerRow = spritedims.countx;
		const spriteXSize = spritedims.unitx;
		const spriteYSize = spritedims.unity;
		// originally, for 10x10, normal size -> scale 2, large size -> scale 3
		var scale = 2
		var imageRendering = 'pixelated'
		if (spriteYSize > 24) {
			scale = 24/spriteYSize
			imageRendering = 'smooth'
		} else if (spriteYSize > 12) { // 12-24
			scale = 1
		}
		if (size == "large") scale *= 1.5;
		const x = (spriteIndex % spritesPerRow) * spriteXSize;
		const y = Math.floor(spriteIndex / spritesPerRow) * spriteYSize;
		// size and pos offset by a small amount to avoid interpolation artifacts
		const img = document.createElement("img");
		img.src = localStorage.getItem("tmtg.net.TinyPixelEditor.0");
		img.style.width = `${spriteXSize-0.2}px`;
		img.style.height = `${spriteYSize-0.2}px`;
		img.style.objectFit = "none";
		img.style.objectPosition = `-${x+0.1}px -${y+0.1}px`;
		
		img.style.imageRendering = imageRendering;
		img.style.transform = `scale(${scale})`;
		img.style.transformOrigin = "center center";

		return img;
		//return img.outerHTML; // string representation
	}
	/** Get the option parameters of a given module.
	 * @param {string} type - module type, one of 'maps', 'entities', or 'particles'
	 * @param {string} name - name of the module
	 * @return {object} an object with key-value pairs. The keys are the option names, the values the default values. Values are always one of: string, number, or boolean
	 */
	getModuleOptions(type,name) {
		if (type == "maps") {
			return this.convertOptions(this.parseFuncOptionsParam(this.mapModules[name]))
		} else if (type == "entities") {
			return this.convertOptions(this.parseFuncOptionsParam(this.getConstructorHead(this.entityModules[name])))
		} else if (type == "particles") {
			return this.convertOptions(this.parseFuncOptionsParam(this.particleModules[name]))

		} else {
			throw new Error(`Unknown type: ${type}.`)
		}
	}
	/** Return editable level definitions. This is an array of objects with the following properties:
	* name: the name of the level 
	* type: the level type, which is the name of a map generator,
	* tilemap: width and height of the tile map, given by an object { "nrtilesx": width, "nrtilesy": height}. Minimum width is 32. Minimum height is 18.
	* bg: name of the background texture
	* wincond: The level's win condition. This is an object { type: [type of win condition], position: [optional position name], mask: [optional tile mask name] }.
	           Type is one of: "no_enemies", "no_pickups", "no_tiles_with_mask", or "player_reaches".
			   For no_tiles_with_mask, the mask parameter has to be supplied, which is the tile mask name
			   For player_reaches, the position parameter has to be supplied, which can be one of: "top", "bottom", "left", "right".
	* options: an options object containing key-value pairs, which are numbers, strings, or booleans.
	* @return {array} level definitions
]	*/
	getLevels() {
		return this.levels
	}

	/** Return editable game globals definitions. This is an array of objects with the following properties:
	* name: the name of the global 
	* type: the globals' type, which is 'int' or 'float'
	* value: the initial value
	* min: numeric minimum value
	* max: numeric maximum value
	* display: the global's display method: 'none', 'bar', 'count', or 'number'
	* label: a label string to show next to the display
	* sprite: integer sprite index to use for display
	* @return {array} game global definitions
]	*/
	getGlobals() {
		return this.globals
	}

	/** Return editable sprite definitions. This is an object with as keys the currently defined sprite names, and as values the sprite definitions.
	 * The sprite defintions are objects with the following structure:
	 *  {
			spawnDelay: [integer delay before spawning],
    		anim: { start:[start sprite index], end:[end sprite index], speed:[animation speed, between 0 and 1], mode:[animation mode], dir:[animation direction] },
			onCreate: { particle: [particle parameters], sound: [name of sound] },
			onRemove: { particle: [particle parameters], sound: [name of sound] },
		}
	 * anim.mode is one of: "always", "moving", and "moving-x".
	 * anim.dir is one of: "nodir", "rotany", "rot4", "mirx", "miry", "rot-mir", "copy".
	 * onCreate and onRemove are optional, their properties particle and sound are also optional.
	 * The particle property is an object with the following properties: { type: [name of particle function], size: [particle size], sprite: [spritesheet index], options: [options object] }
	 * @return {object} sprite definitions
	 */
	getSprites() {
		return this.sprites
	}

	// NOTE: this function has a cogs func directive just for referring to it
	/** @cogs_func getTileMapping
	 * Returns editable tile mapping definitions. This is an object with as keys one-character strings that represent map symbols, and as values objects that represent tile and optionally entity definitions.
	 * A tile definition looks like this:
	   {
	       tile: [spritesheet index],
	       mask_name: [a string representing the tile mask],
	       onRemove: { particle: [particle parameters], sound: [name of sound] },
	   }
	 * onRemove is optional, their properties particle and sound are also optional.
	 * The particle property is an object with the following properties: { type: [name of particle function], size: [particle size], sprite: [spritesheet index], options: [options object] }
	 * 
	 * Additionally, an entity can be defined, which looks like this:
	   {
	       entity: { name: [name of entity class], unique:[boolean], mask: [entity mask name], sprite: [name of the sprite, as defined in the result of getSprites()], options: [options object] } 
	   }
	 * mask is one of: "player", "player_bullet", "enemy", "enemy_bullet", "pickup", "special".
	 * @return {object} tile mapping definitions
	 */
	getTileMapping() {
		return this.tilemapping;
	}
	/** @cogs_endfunc */

	/** Returns editable sound definitions. This is an object with the property "sounds" which is an array of sound definitions.
	 * A sound definitions looks like this:
	   { name: [name of sound], type: [sound type], "seed": [integer random seed] }
	 * type is one of: 'Random', 'Pickup','Powerup','Jump','Shoot','Blip','Hit','Explo'.
	 * @return {object} sound definitions
 	 */
	getSounds() {
		return this.sounds;
	}
	/** Returns map info as an object with as keys the map names and as values the map properties {prompt: [prompt text], chars: [array of chars used in the map, which are 1-letter strings]}
	 * @return {object} the map info
	 */
	getMaps() {
		var maps = this.getPrompts("maps")
		for (var key in maps) {
			var map = maps[key]
			if (map.charinfo) {
				map.chars = this.parseMapChars(map.charinfo)
			}
		}
		return maps
	}
	/** Set map info for a specific map.
	 * @param {string} name the map name
	 * @param {object} info the map info, an object with {prompt,chars} fields
	 */
	setMap(name,info) {
		//console.log(`setMap called with ${name} ${JSON.stringify(info)}`)
		var tileprompt = "Create a function that generates a level map for a game. "
				+ this.generateMapCharPrompt(info.chars)
				+ ". The description follows. "
		this.pbfReplacePrompt(this.promptbuildfiles["maps"],name,[tileprompt,info.prompt])
	}
	/** Remove a specific map.
	 * @param {string} name the map name
	 */
	removeMap(name) {
		console.log(`removeMap called with ${name}`)
		this.pbfRemoveTarget(this.promptbuildfiles["maps"],name)
	}
	/** Returns an editable entity info object, with as keys the entity names and as values the entity properties {prompt: [prompt text]}.
	 * @return {object} the entity info
	 */
	getEntities() {
		var entities = this.getPrompts("entities")
		//for (var key in entities) {
		//	var entity = entities[key]
		//	entity.options = this.convertOptions(this.parseFuncOptionsParam(this.getConstructorHead(this.entityModules[key])))
		//}
		return entities
	}
	/** Set entity info for a specific entity.
	 * @param {string} name the entity name
	 * @param {object} info the entity info, an object with properties {prompt: [prompt text]}
	 */
	setEntity(name,info) {
		var globalsprompt = this.getGlobalsPrompt()
		console.log(`setEntity called with ${name} ${JSON.stringify(info)}`)
		this.pbfReplacePrompt(this.promptbuildfiles["entities"],name,[globalsprompt,info.prompt])
	}
	/** @private
	 * get prompt describing game globals.
	 * @return {string} prompt describing game globals
	 */
	getGlobalsPrompt() {
		var prompt = "The following game globals exist. "
		for (var i=0; i<this.globals.length; i++) {
			var g = this.globals[i]
			prompt += `Name: '${g.name}'; type: ${g.type}.\n`
		}
		return prompt
	}
	/** Remove a specific entity.
	 * @param {string} name the entity name
	 */
	removeEntity(name) {
		console.log(`removeEntity called with ${name}`)
		this.pbfRemoveTarget(this.promptbuildfiles["entities"],name)
	}
	/** Returns particle info as an object with as keys the particle generator names and as values the particle properties {prompt: [prompt text]}.
	 * @return {object} the entity info
	 */
	getParticles() {
		var particles = this.getPrompts("particles")
		//for (var key in particles) {
		//	var particle = particles[key]
		//	particle.options = this.convertOptions(this.parseFuncOptionsParam(this.particleModules[key]))
		//}
		return particles
	}
	/** Set particle info for a specific particle.
	 * @param {string} name the particle name
	 * @param {object} info the particle info, an object with properties {prompt: [prompt text]}
	 */
	setParticle(name,info) {
		console.log(`setParticle called with ${name} ${JSON.stringify(info)}`)
		this.pbfReplacePrompt(this.promptbuildfiles["particles"],name,[info.prompt])
	}
	/** Remove a specific particle.
	 * @param {string} name the particle name
	 */
	removeParticle(name) {
		console.log(`removeParticle called with ${name}`)
		this.pbfRemoveTarget(this.promptbuildfiles["particles"],name)
	}
	/** @private
	 * Replace prompt in a given prompt build file json structure. Adds target if not found.
	 * @param {string} prompts an array of prompts
	 */
	pbfReplacePrompt(pbf,name,prompts) {
		var pbfprompts = []
		for (var i=0; i<prompts.length; i++) {
			pbfprompts.push({"text": prompts[i]})
		}
		if (!pbf.targets) {
			throw new Error("Targets property not found.")
		}
		for (var i=0; i<pbf.targets.length; i++) {
			var tg = pbf.targets[i]
			if (tg.name == name) {
				tg.prompts = pbfprompts
				return;
			}
		}
		pbf.targets.push({
			name: name,
			prompts: pbfprompts,
			file: name+".js",
		})
	}
	/** @private
	 * Remove target in a given prompt build file json structure.
	 * @param {string} prompts an array of prompts
	 */
	pbfRemoveTarget(pbf,name) {
		if (!pbf.targets) {
			throw new Error("Targets property not found.")
		}
		for (var i=0; i<pbf.targets.length; i++) {
			var tg = pbf.targets[i]
			if (tg.name == name) {
				pbf.targets.splice(i,1)
				return;
			}
		}
		// TODO delete generated js file
		console.log(`Warning: target ${name} not found.`)
	}
	/** @private
	 * Returns an object with as keys the module names and as values an array of prompt texts. */
	getPrompts(type) {
		var prompts = this.promptbuildfiles[type].targets
		var ret = {}
		for (var i=0; i<prompts.length; i++) {
			var name = prompts[i].name
			var prompttexts = prompts[i].prompts
			if (prompttexts.length >= 1) {
				ret[name] = {prompt: prompttexts[prompttexts.length-1].text}
				if (type=="maps") {
					if (prompttexts.length == 2) {
						ret[name].charinfo = prompttexts[0].text
					} else if (prompttexts.length > 2) {
						throw new Error(`Unexpected number of prompt texts ${prompttexts.length} for ${name}`)
					}
				}
			} else {
				throw new Error(`No prompt texts for ${name}.`)
			}
		}
		return ret
	}
	/** @private
	 * @cogs_func convertOptions
	 * The method convertOptions(opts) converts options in the format {names: [array of option names], defaults: [array of default values]} to the format { [name]: [default value]}.
	 * @param {object} opts options in input format
	 * @return {object} options in output format
	 */
//@cogs_build 0.6.0 openai-gpt-5.4 2026-05-12T14:46:54.287Z
    convertOptions(opts) {
        const result = {};

        if (!opts || !Array.isArray(opts.names) || !Array.isArray(opts.defaults)) {
            return result;
        }

        const length = Math.min(opts.names.length, opts.defaults.length);

        for (let i = 0; i < length; i++) {
            result[opts.names[i]] = opts.defaults[i];
        }

        return result;
    }
	/* @cogs_endfunc */

	/** @private
	 * @cogs_func parseMapChars
	 * The method parseMapChars(string) parses the map characters from a prompt string.
	 * The prompt string contains a sentence: 'Each tile on the map is either: [name1] ([character1]), [name2] ([character2]), ...'. Note that characters can be '.', single quotes, double quotes, brackets. So you cannot scan for the end of the sentence by scanning for '.'. Instead, scan for the pattern [name] '(' [char] ')'.
	 * @return {array} the characters in the prompt string as a flat array, or null if parse unsuccessful.
	 */
//@cogs_build 0.6.0 openai-gpt-5.4 2026-05-12T14:15:32.750Z
    parseMapChars(string) {
        if (typeof string !== 'string') {
            return null;
        }

        const marker = 'Each tile on the map is either:';
        const markerIndex = string.indexOf(marker);
        if (markerIndex === -1) {
            return null;
        }

        const section = string.slice(markerIndex + marker.length);
        const pattern = /\s*([^,]+?)\s*\((.)\)/g;
        const chars = [];
        let match;
        let foundAny = false;

        while ((match = pattern.exec(section)) !== null) {
            foundAny = true;
            chars.push(match[2]);
        }

        return foundAny ? chars : null;
    }
	/** @cogs_endfunc */

	/** @private
	 * @cogs_func generateMapCharPrompt
	 * The function generateMapCharPrompt(mapchars) generates a prompt sentence from an array of characters.
	 * The prompt string should follow this structure: 'Each tile on the map is either: [name1] ([character1]), [name2] ([character2]), ...'.
	 * The characters can be obtained from the mapchars parameter, the names should be taken from the tilemappings. For entities, use the name field. For tiles, use the mask_name field.  If the character, name or mask_name fields cannot be found, throw an error.
	 * 
	 * @param {array} mapchars an array of characters (single-character strings)
	 * @return {string} the prompt sentence
	 * 
	 * Use the getTileMapping() function to check the names. Specification follows:
	 * @cogs_ref "getTileMapping".
	 */
//@cogs_build 0.6.0 openai-gpt-5.4 2026-05-12T13:26:12.700Z
    generateMapCharPrompt(mapchars) {
        const tilemappings = this.getTileMapping();

        if (!Array.isArray(mapchars)) {
            throw new Error('mapchars must be an array');
        }

        const parts = mapchars.map((character) => {
            const mapping = tilemappings[character];

            if (!mapping) {
                throw new Error('Could not find mapping for character: ' + character);
            }

            let name;

            if (mapping.entity) {
                name = mapping.entity.name;
                if (typeof name !== 'string' || name.length === 0) {
                    throw new Error('Could not find entity name for character: ' + character);
                }
            } else {
                name = mapping.mask_name;
                if (typeof name !== 'string' || name.length === 0) {
                    throw new Error('Could not find tile mask_name for character: ' + character);
                }
            }

            if (typeof character !== 'string' || character.length !== 1) {
                throw new Error('Invalid character: ' + character);
            }

            return name + ' (' + character + ')';
        });

        return 'Each tile on the map is either: ' + parts.join(', ');
    }
	/** @cogs_endfunc */

	/** @private
	 * @cogs_func parseFuncOptionsParam
	 * Write a Javascript method parseFuncOptionsParam(func) that parses a given function's options object, provided that is has as its last parameter a destructured options object with defaults, e.g. {option1=value1, option2=value2, ...} = {}. Parameter func is either a function or a string with the function's source code without comments.  It returns {names: [array of option names], defaults: [array of default values]}.  For default values it supports only numbers, strings, and booleans. If no such last parameter exists, return empty lists {names:[], defaults:[]}.
	 * Use 4 spaces per indent level.
	 */
	//@cogs_build 0.6.0 openai-gpt-5.4 2026-05-10T15:23:33.618Z
	parseFuncOptionsParam(func) {
		var source = typeof func === 'function' ? Function.prototype.toString.call(func) : String(func);
		var start = source.indexOf('(');
		if (start === -1) {
			return { names: [], defaults: [] };
		}

		var depth = 0;
		var end = -1;
		for (var i = start; i < source.length; i++) {
			var ch = source[i];
			if (ch === '(') {
				depth++;
			} else if (ch === ')') {
				depth--;
				if (depth === 0) {
					end = i;
					break;
				}
			}
		}

		if (end === -1) {
			return { names: [], defaults: [] };
		}

		var params = source.slice(start + 1, end).trim();
		if (!params) {
			return { names: [], defaults: [] };
		}

		var parts = [];
		var current = '';
		var braceDepth = 0;
		var bracketDepth = 0;
		var parenDepth = 0;
		var inString = false;
		var stringQuote = '';
		var escape = false;

		for (var j = 0; j < params.length; j++) {
			var c = params[j];

			if (inString) {
				current += c;
				if (escape) {
					escape = false;
				} else if (c === '\\') {
					escape = true;
				} else if (c === stringQuote) {
					inString = false;
					stringQuote = '';
				}
				continue;
			}

			if (c === '"' || c === "'" || c === '`') {
				inString = true;
				stringQuote = c;
				current += c;
				continue;
			}

			if (c === '{') {
				braceDepth++;
			} else if (c === '}') {
				braceDepth--;
			} else if (c === '[') {
				bracketDepth++;
			} else if (c === ']') {
				bracketDepth--;
			} else if (c === '(') {
				parenDepth++;
			} else if (c === ')') {
				parenDepth--;
			}

			if (c === ',' && braceDepth === 0 && bracketDepth === 0 && parenDepth === 0) {
				parts.push(current.trim());
				current = '';
			} else {
				current += c;
			}
		}
		if (current.trim()) {
			parts.push(current.trim());
		}

		if (parts.length === 0) {
			return { names: [], defaults: [] };
		}

		var lastParam = parts[parts.length - 1].trim();
		var match = lastParam.match(/^\{([\s\S]*)\}\s*=\s*\{\s*\}$/);
		if (!match) {
			return { names: [], defaults: [] };
		}

		var body = match[1].trim();
		if (!body) {
			return { names: [], defaults: [] };
		}

		var entries = [];
		current = '';
		braceDepth = 0;
		bracketDepth = 0;
		parenDepth = 0;
		inString = false;
		stringQuote = '';
		escape = false;

		for (var k = 0; k < body.length; k++) {
			var d = body[k];

			if (inString) {
				current += d;
				if (escape) {
					escape = false;
				} else if (d === '\\') {
					escape = true;
				} else if (d === stringQuote) {
					inString = false;
					stringQuote = '';
				}
				continue;
			}

			if (d === '"' || d === "'" || d === '`') {
				inString = true;
				stringQuote = d;
				current += d;
				continue;
			}

			if (d === '{') {
				braceDepth++;
			} else if (d === '}') {
				braceDepth--;
			} else if (d === '[') {
				bracketDepth++;
			} else if (d === ']') {
				bracketDepth--;
			} else if (d === '(') {
				parenDepth++;
			} else if (d === ')') {
				parenDepth--;
			}

			if (d === ',' && braceDepth === 0 && bracketDepth === 0 && parenDepth === 0) {
				entries.push(current.trim());
				current = '';
			} else {
				current += d;
			}
		}
		if (current.trim()) {
			entries.push(current.trim());
		}

		var names = [];
		var defaults = [];

		for (var m = 0; m < entries.length; m++) {
			var entry = entries[m];
			var eqIndex = -1;
			inString = false;
			stringQuote = '';
			escape = false;
			braceDepth = 0;
			bracketDepth = 0;
			parenDepth = 0;

			for (var n = 0; n < entry.length; n++) {
				var e = entry[n];

				if (inString) {
					if (escape) {
						escape = false;
					} else if (e === '\\') {
						escape = true;
					} else if (e === stringQuote) {
						inString = false;
						stringQuote = '';
					}
					continue;
				}

				if (e === '"' || e === "'" || e === '`') {
					inString = true;
					stringQuote = e;
					continue;
				}

				if (e === '{') {
					braceDepth++;
				} else if (e === '}') {
					braceDepth--;
				} else if (e === '[') {
					bracketDepth++;
				} else if (e === ']') {
					bracketDepth--;
				} else if (e === '(') {
					parenDepth++;
				} else if (e === ')') {
					parenDepth--;
				} else if (e === '=' && braceDepth === 0 && bracketDepth === 0 && parenDepth === 0) {
					eqIndex = n;
					break;
				}
			}

			if (eqIndex === -1) {
				continue;
			}

			var name = entry.slice(0, eqIndex).trim();
			var valueText = entry.slice(eqIndex + 1).trim();

			if (!/^[$A-Z_a-z][$\w]*$/.test(name)) {
				continue;
			}

			var value;
			if (/^(?:true|false)$/.test(valueText)) {
				value = valueText === 'true';
			} else if (/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(valueText)) {
				value = Number(valueText);
			} else {
				var stringMatch = valueText.match(/^(['"])([\s\S]*)\1$/);
				if (!stringMatch) {
					continue;
				}
				try {
					value = JSON.parse('"' + stringMatch[2].replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"');
				} catch (err) {
					value = stringMatch[2].replace(/\\([\\'"`bnrtvf0])/g, function (_, ch) {
						switch (ch) {
							case 'b': return '\b';
							case 'n': return '\n';
							case 'r': return '\r';
							case 't': return '\t';
							case 'v': return '\v';
							case 'f': return '\f';
							case '0': return '\0';
							default: return ch;
						}
					});
				}
			}

			names.push(name);
			defaults.push(value);
		}

		return { names: names, defaults: defaults };
	}
	/* @cogs_endfunc */

	/** @private
	 * @cogs_func getConstructorHead
	 * Write a Javascript method getConstructorHead(classref) that parses the code of a class via class.toString(). It returns the string containing the class constructor's head, as in: constructor(params). Return null on error.
	 * Use 4 spaces per indent level.
	 */
	//@cogs_build 0.6.0 openai-gpt-5.4 2026-05-10T13:05:11.142Z
	getConstructorHead(classref) {
		try {
			if (typeof classref !== 'function') {
				return null;
			}

			var source = classref.toString();
			if (typeof source !== 'string') {
				return null;
			}

			var classMatch = source.match(/^\s*class\b/);
			if (!classMatch) {
				return null;
			}

			var index = source.indexOf('{');
			if (index === -1) {
				return null;
			}

			var depth = 1;
			var inSingle = false;
			var inDouble = false;
			var inTemplate = false;
			var inLineComment = false;
			var inBlockComment = false;
			var escaped = false;
			var constructorIndex = -1;

			for (var i = index + 1; i < source.length; i++) {
				var char = source[i];
				var next = source[i + 1];

				if (inLineComment) {
					if (char === '\n' || char === '\r') {
						inLineComment = false;
					}
					continue;
				}

				if (inBlockComment) {
					if (char === '*' && next === '/') {
						inBlockComment = false;
						i++;
					}
					continue;
				}

				if (inSingle) {
					if (!escaped && char === '\\') {
						escaped = true;
						continue;
					}
					if (!escaped && char === '\'') {
						inSingle = false;
					}
					escaped = false;
					continue;
				}

				if (inDouble) {
					if (!escaped && char === '\\') {
						escaped = true;
						continue;
					}
					if (!escaped && char === '"') {
						inDouble = false;
					}
					escaped = false;
					continue;
				}

				if (inTemplate) {
					if (!escaped && char === '\\') {
						escaped = true;
						continue;
					}
					if (!escaped && char === '`') {
						inTemplate = false;
					}
					escaped = false;
					continue;
				}

				if (char === '/' && next === '/') {
					inLineComment = true;
					i++;
					continue;
				}

				if (char === '/' && next === '*') {
					inBlockComment = true;
					i++;
					continue;
				}

				if (char === '\'') {
					inSingle = true;
					continue;
				}

				if (char === '"') {
					inDouble = true;
					continue;
				}

				if (char === '`') {
					inTemplate = true;
					continue;
				}

				if (char === '{') {
					depth++;
					continue;
				}

				if (char === '}') {
					depth--;
					if (depth === 0) {
						break;
					}
					continue;
				}

				if (depth === 1) {
					if (/\s/.test(char)) {
						continue;
					}

					if (source.slice(i, i + 11) === 'constructor') {
						var before = i === 0 ? '' : source[i - 1];
						var after = source[i + 11];
						if ((!before || /[^\w$]/.test(before)) && after === '(') {
							constructorIndex = i;
							break;
						}
					}
				}
			}

			if (constructorIndex === -1) {
				return null;
			}

			var start = constructorIndex;
			var parenIndex = constructorIndex + 11;
			if (source[parenIndex] !== '(') {
				return null;
			}

			var parenDepth = 0;
			inSingle = false;
			inDouble = false;
			inTemplate = false;
			inLineComment = false;
			inBlockComment = false;
			escaped = false;

			for (var j = parenIndex; j < source.length; j++) {
				var c = source[j];
				var n = source[j + 1];

				if (inLineComment) {
					if (c === '\n' || c === '\r') {
						inLineComment = false;
					}
					continue;
				}

				if (inBlockComment) {
					if (c === '*' && n === '/') {
						inBlockComment = false;
						j++;
					}
					continue;
				}

				if (inSingle) {
					if (!escaped && c === '\\') {
						escaped = true;
						continue;
					}
					if (!escaped && c === '\'') {
						inSingle = false;
					}
					escaped = false;
					continue;
				}

				if (inDouble) {
					if (!escaped && c === '\\') {
						escaped = true;
						continue;
					}
					if (!escaped && c === '"') {
						inDouble = false;
					}
					escaped = false;
					continue;
				}

				if (inTemplate) {
					if (!escaped && c === '\\') {
						escaped = true;
						continue;
					}
					if (!escaped && c === '`') {
						inTemplate = false;
					}
					escaped = false;
					continue;
				}

				if (c === '/' && n === '/') {
					inLineComment = true;
					j++;
					continue;
				}

				if (c === '/' && n === '*') {
					inBlockComment = true;
					j++;
					continue;
				}

				if (c === '\'') {
					inSingle = true;
					continue;
				}

				if (c === '"') {
					inDouble = true;
					continue;
				}

				if (c === '`') {
					inTemplate = true;
					continue;
				}

				if (c === '(') {
					parenDepth++;
					continue;
				}

				if (c === ')') {
					parenDepth--;
					if (parenDepth === 0) {
						return source.slice(start, j + 1);
					}
				}
			}

			return null;
		} catch (error) {
			return null;
		}
	}
	/* @cogs_endfunc */
	/** @private
	 * @cogs_func parseGameInit
	 * Create a method parseGameInit(src) that scans a config string for the following patterns:
	 *  'GameConfig.title = [title string literal]'
	 *  'GameConfig.description = [description string literal]'
	 * Note that the string literals can contain '\n' characters, these should be translated as proper newlines.
	 * @return {object} an object with the structure {title:[title string], description: [description string]}
	 */
//@cogs_build 0.6.0 openai-gpt-5.4 2026-05-16T10:36:37.613Z
    parseGameInit(src) {
        const result = {
            title: "",
            description: ""
        };

        const parseStringLiteral = (literal) => {
            try {
                return JSON.parse(literal);
            } catch (e) {
                return literal.slice(1, -1).replace(/\\n/g, "\n").replace(/\\\\/g, "\\").replace(/\\"/g, '"').replace(/\\'/g, "'");
            }
        };

        const titleMatch = src.match(/GameConfig\.title\s*=\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/);
        if (titleMatch) {
            result.title = parseStringLiteral(titleMatch[1]);
        }

        const descriptionMatch = src.match(/GameConfig\.description\s*=\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/);
        if (descriptionMatch) {
            result.description = parseStringLiteral(descriptionMatch[1]);
        }

        return result;
    }
	/* @cogs_endfunc */
	/** @private
	 * @cogs_func updateGameInit
	 * Create a method updateGameInit(src,title,description) that scans a config string for the following patterns:
	 *  'GameConfig.title = [title string literal]'
	 *  'GameConfig.description = [description string literal]'
	 * If either are found, replace the corresponding string literal with the supplied title or description parameters.
	 * @param {string} src - the config string to scan
	 * @param {string} title - title to insert
	 * @param {string} description - description to insert
	 */
//@cogs_build 0.6.0 openai-gpt-5.4 2026-05-16T10:22:29.956Z
    updateGameInit(src, title, description) {
        const escapeForSingleQuotedJs = (value) => {
            return String(value)
                .replace(/\\/g, '\\\\')
                .replace(/'/g, "\\'")
                .replace(/\r/g, '\\r')
                .replace(/\n/g, '\\n');
        };

        let result = String(src);

        result = result.replace(
            /(GameConfig\.title\s*=\s*)(['"])(?:\\.|(?!\2)[^\\])*\2/g,
            (match, prefix) => {
                return prefix + "'" + escapeForSingleQuotedJs(title) + "'";
            }
        );

        result = result.replace(
            /(GameConfig\.description\s*=\s*)(['"])(?:\\.|(?!\2)[^\\])*\2/g,
            (match, prefix) => {
                return prefix + "'" + escapeForSingleQuotedJs(description) + "'";
            }
        );

        return result;
    }
	/* @cogs_endfunc */

	/** @private
	 * @cogs_func parseGameSpriteDims
	 * Create a method parseGameSpriteDims(src) that scans a config string for the following patterns:
	 *  'GameConfig.spritesheet.unitx = [integer]'
	 *  'GameConfig.spritesheet.unity = [integer]'
	 *  'GameConfig.spritesheet.countx = [integer]'
	 *  'GameConfig.spritesheet.county = [integer]'
	 * It returns the integer values found. If one or more values are not found, use the following defaults:
	 * {unitx:10, unity:10, countx:10, county:10}
	 * @return {object} an object with the structure {unitx,unity,countx,county}
	 */
//@cogs_build 0.7.0 openai-gpt-5.5 2026-08-02T18:18:46.956Z
    parseGameSpriteDims(src) {
        const defaults = {
            unitx: 10,
            unity: 10,
            countx: 10,
            county: 10
        };
        const result = { ...defaults };
        const text = String(src || "");

        Object.keys(defaults).forEach((key) => {
            const pattern = new RegExp("GameConfig\\.spritesheet\\." + key + "\\s*=\\s*(-?\\d+)");
            const match = text.match(pattern);

            if (match) {
                result[key] = parseInt(match[1], 10);
            }
        });

        return result;
    }
	/* @cogs_endfunc */

	/** @private
	 * @cogs_func updateGameSpriteDims
	 * Create a method updateGameSpriteDims(src,values) that scans a config string for the following patterns:
	 *  'GameConfig.spritesheet.unitx = [integer]'
	 *  'GameConfig.spritesheet.unity = [integer]'
	 *  'GameConfig.spritesheet.countx = [integer]'
	 *  'GameConfig.spritesheet.county = [integer]'
	 *  'GameConfig.tilemap.unitx = [integer]'
	 *  'GameConfig.tilemap.unity = [integer]'
	 *  'GameConfig.tilemap.countx = [integer]'
	 *  'GameConfig.tilemap.county = [integer]'
	 * If a pattern is found, insert the corresponding value from values in place of the [integer].
	 * If a pattern is not found, skip.
	 * @param {string} src - the config string
	 * @param {object} values - an object with the properties {unitx,unity,countx,county}
	 * @return {string} - the modified config string
	 */
//@cogs_build 0.7.0 openai-gpt-5.5 2026-08-02T18:19:51.303Z
    updateGameSpriteDims(src, values) {
		console.log(`###########`)
		console.log(values)
        const replacements = {
            unitx: values.unitx,
            unity: values.unity,
            countx: values.countx,
            county: values.county
        };

        return String(src).replace(/(GameConfig\.(?:spritesheet|tilemap)\.(unitx|unity|countx|county)\s*=\s*)-?\d+/g, (match, prefix, key) => {
            return prefix + replacements[key];
        });
    }
	/* @cogs_endfunc */

}

export {AppCore}

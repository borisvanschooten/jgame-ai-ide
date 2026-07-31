/*@webcogs_build 0.6.0 openai-gpt-5.4 2026-05-18T08:45:09.124Z
@webcogs_system_prompt

# Single Page Application core API

<a name="SPACore"></a>

## SPACore
SPACore is the core API class for a single page application. 

In this SPA architecture, a SPA is made up out of modules. A module is a user interface component that can interact with the user via one or more HTML widgets, and process information.  A module is always defined as a single export class, and should be written in vanilla Javascript. Always define the class as an "export class". Do not assume any libraries are available.  For example, do not use jquery.  The class constructor always has this signature: 
constructor(core, params). Parameter "core" is the SPACore object, and params is an object with named parameters. 
Through the core object, a module can mount HTML widgets (core.mount) and invoke the core router (core.route). 

A module class is constructed when the app invokes the module, and can be destroyed and constructed any number of times during the app's lifecycle.

**Kind**: global class  

* [SPACore](#SPACore)
    * [.mount(location, html_code, css_code)](#SPACore+mount) ⇒ <code>HTMLElement</code>
    * [.route(location, params)](#SPACore+route)

<a name="SPACore+mount"></a>

### spaCore.mount(location, html_code, css_code) ⇒ <code>HTMLElement</code>
Shows a widget to the user by mounting the given HTML in a shadow DOM, on the elementID given by the location parameter.  Returns the shadow root element, which should be used to query the HTML inside the widget.  It is possible for a module to have multiple widgets, or none.

**Kind**: instance method of [<code>SPACore</code>](#SPACore)  
**Returns**: <code>HTMLElement</code> - - the root element on which the widget was mounted  
**Params**

- location <code>string</code> - A location string. The complete set of available locations is defined elsewhere. Use only the provided locations.
- html_code <code>string</code> - a string with a plain vanilla HTML snippet that contains the user interface for the widget
- css_code <code>string</code> - corresponding styling for html_code.  This should be a CSS snippet.  The \<style\> tag should not be included.

<a name="SPACore+route"></a>

### spaCore.route(location, params)
Invoke the core router. Default implementation is to invoke the module named "location".

**Kind**: instance method of [<code>SPACore</code>](#SPACore)  
**Params**

- location <code>string</code> - a string that indicates where to route to
- params <code>object</code> - key-value pairs denoting named parameters



# Single Page Application additional API functions

<a name="AppCore"></a>

## AppCore
AppCore is the SPACore subclass used for this application. It contains extra methods specific to this app.

**Kind**: global class  

* [AppCore](#AppCore)
    * [new AppCore()](#new_AppCore_new)
    * [.getWorkspaceDir()](#AppCore+getWorkspaceDir) ⇒ <code>string</code>
    * [.pickDirectory()](#AppCore+pickDirectory) ⇒
    * [.getGameTitle()](#AppCore+getGameTitle) ⇒ <code>string</code>
    * [.getGameDescription()](#AppCore+getGameDescription) ⇒ <code>string</code>
    * [.setGameTitle(title)](#AppCore+setGameTitle)
    * [.setGameDescription(description)](#AppCore+setGameDescription)
    * [.getMenuItems()](#AppCore+getMenuItems) ⇒
    * [.playSound(name)](#AppCore+playSound)
    * [.getGameUrl()](#AppCore+getGameUrl) ⇒ <code>string</code>
    * [.buildModule(type, name)](#AppCore+buildModule)
    * [.getSpriteEditor()](#AppCore+getSpriteEditor) ⇒ <code>string</code>
    * [.getSpriteIndexImg(spriteIndex, size)](#AppCore+getSpriteIndexImg) ⇒ <code>HTMLElement</code>
    * [.getModuleOptions(type, name)](#AppCore+getModuleOptions) ⇒ <code>object</code>
    * [.getLevels()](#AppCore+getLevels) ⇒ <code>array</code>
    * [.getSprites()](#AppCore+getSprites) ⇒ <code>object</code>
    * [.getTileMapping()](#AppCore+getTileMapping) ⇒ <code>object</code>
    * [.getSounds()](#AppCore+getSounds) ⇒ <code>object</code>
    * [.getMaps()](#AppCore+getMaps) ⇒ <code>object</code>
    * [.setMap(name, info)](#AppCore+setMap)
    * [.removeMap(name)](#AppCore+removeMap)
    * [.getEntities()](#AppCore+getEntities) ⇒ <code>object</code>
    * [.setEntity(name, info)](#AppCore+setEntity)
    * [.removeEntity(name)](#AppCore+removeEntity)
    * [.getParticles()](#AppCore+getParticles) ⇒ <code>object</code>
    * [.setParticle(name, info)](#AppCore+setParticle)
    * [.removeParticle(name)](#AppCore+removeParticle)

<a name="new_AppCore_new"></a>

### new AppCore()
Do not construct this class, but use the existing instance.basedir should include trailing slash.

<a name="AppCore+getWorkspaceDir"></a>

### appCore.getWorkspaceDir() ⇒ <code>string</code>
Get game workspace directory.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>string</code> - path to current workspace, or null if none  
<a name="AppCore+pickDirectory"></a>

### appCore.pickDirectory() ⇒
Pick a directory from the local filesystem and return it.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: a Promise which resolves to the full path string.  
<a name="AppCore+getGameTitle"></a>

### appCore.getGameTitle() ⇒ <code>string</code>
**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>string</code> - game title  
<a name="AppCore+getGameDescription"></a>

### appCore.getGameDescription() ⇒ <code>string</code>
**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>string</code> - game description  
<a name="AppCore+setGameTitle"></a>

### appCore.setGameTitle(title)
**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- title <code>string</code> - game title

<a name="AppCore+setGameDescription"></a>

### appCore.setGameDescription(description)
**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- description <code>string</code> - game description

<a name="AppCore+getMenuItems"></a>

### appCore.getMenuItems() ⇒
Get the menu items to display with their routes.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: an object with as keys the menu item names, and as values the route names.  
<a name="AppCore+playSound"></a>

### appCore.playSound(name)
Plays a given sound.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- name <code>string</code> - the name of the sound

<a name="AppCore+getGameUrl"></a>

### appCore.getGameUrl() ⇒ <code>string</code>
Get game URL.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>string</code> - URL where game can be found  
<a name="AppCore+buildModule"></a>

### appCore.buildModule(type, name)
Build a module (that is, a map, entity, or particle generator).

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- type <code>string</code> - one of "maps", "entities", "particles"
- name <code>string</code> - the name of the module

<a name="AppCore+getSpriteEditor"></a>

### appCore.getSpriteEditor() ⇒ <code>string</code>
Get sprite editor URL

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>string</code> - URL where sprite editor can be found  
<a name="AppCore+getSpriteIndexImg"></a>

### appCore.getSpriteIndexImg(spriteIndex, size) ⇒ <code>HTMLElement</code>
Get a HTML img element showing the sprite corresponding to the given sprite sheet index.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>HTMLElement</code> - an img element showing the sprite  
**Params**

- spriteIndex <code>Number</code> - integer sprite index
- size <code>string</code> - either "small" (for item lists) or "large" (for form fields)

<a name="AppCore+getModuleOptions"></a>

### appCore.getModuleOptions(type, name) ⇒ <code>object</code>
Get the option parameters of a given module.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>object</code> - an object with key-value pairs. The keys are the option names, the values the default values. Values are always one of: string, number, or boolean  
**Params**

- type <code>string</code> - module type, one of 'maps', 'entities', or 'particles'
- name <code>string</code> - name of the module

<a name="AppCore+getLevels"></a>

### appCore.getLevels() ⇒ <code>array</code>
Return editable level definitions. This is an array of objects with the following properties:name: the name of the level type: the level type, which is the name of a map generator,tilemap: width and height of the tile map, given by an object { "nrtilesx": width, "nrtilesy": height}. Minimum width is 32. Minimum height is 18.bg: name of the background texturewincond: The level's win condition. This is an object { type: [type of win condition], position: [optional position name], mask: [optional tile mask name] }.
	           Type is one of: "no_enemies", "no_pickups", "no_tiles_with_mask", or "player_reaches".
			   For no_tiles_with_mask, the mask parameter has to be supplied, which is the tile mask name
			   For player_reaches, the position parameter has to be supplied, which can be one of: "top", "bottom", "left", "right".options: an options object containing key-value pairs, which are numbers, strings, or booleans.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>array</code> - level definitions
]  
<a name="AppCore+getSprites"></a>

### appCore.getSprites() ⇒ <code>object</code>
Return editable sprite definitions. This is an object with as keys the currently defined sprite names, and as values the sprite definitions.The sprite defintions are objects with the following structure: {
    		anim: { start:[start sprite index], end:[end sprite index], speed:[animation speed, between 0 and 1], mode:[animation mode], dir:[animation direction] },
			onCreate: { particle: [particle parameters], sound: [name of sound] },
			onRemove: { particle: [particle parameters], sound: [name of sound] },
		}anim.mode is one of: "always", "moving", and "moving-x".anim.dir is one of: "nodir", "rotany", "rot4", "mirx", "miry", "rot-mir".onCreate and onRemove are optional, their properties particle and sound are also optional.The particle property is an object with the following properties: { type: [name of particle function], size: [particle size], sprite: [spritesheet index], options: [options object] }

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>object</code> - sprite definitions  
<a name="AppCore+getTileMapping"></a>

### appCore.getTileMapping() ⇒ <code>object</code>
**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>object</code> - tile mapping definitions  
**Cogs_func**: getTileMappingReturns editable tile mapping definitions. This is an object with as keys one-character strings that represent map symbols, and as values objects that represent tile or entity definitions.A tile definition looks like this:
	   {
	       tile: [spritesheet index],
	       mask_name: [a string representing the tile mask],
	       onRemove: { particle: [particle parameters], sound: [name of sound] },
	   }onRemove is optional, their properties particle and sound are also optional.The particle property is an object with the following properties: { type: [name of particle function], size: [particle size], sprite: [spritesheet index], options: [options object] }An entity definition looks like this:
	   {
	       entity: { name: [name of entity class], unique:[boolean], mask: [entity mask name], sprite: [name of the sprite, as defined in the result of getSprites()], options: [options object] } 
	   }mask is one of: "player", "player_bullet", "enemy", "pickup".  
<a name="AppCore+getSounds"></a>

### appCore.getSounds() ⇒ <code>object</code>
Returns editable sound definitions. This is an object with the property "sounds" which is an array of sound definitions.A sound definitions looks like this:
	   { name: [name of sound], type: [sound type], "seed": [integer random seed] }type is one of: 'Random', 'Pickup','Powerup','Jump','Shoot','Blip','Hit','Explo'.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>object</code> - sound definitions  
<a name="AppCore+getMaps"></a>

### appCore.getMaps() ⇒ <code>object</code>
Returns map info as an object with as keys the map names and as values the map properties {prompt: [prompt text], chars: [array of chars used in the map, which are 1-letter strings]}

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>object</code> - the map info  
<a name="AppCore+setMap"></a>

### appCore.setMap(name, info)
Set map info for a specific map.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- name <code>string</code> - the map name
- info <code>object</code> - the map info, an object with {prompt,chars} fields

<a name="AppCore+removeMap"></a>

### appCore.removeMap(name)
Remove a specific map.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- name <code>string</code> - the map name

<a name="AppCore+getEntities"></a>

### appCore.getEntities() ⇒ <code>object</code>
Returns an editable entity info object, with as keys the entity names and as values the entity properties {prompt: [prompt text]}.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>object</code> - the entity info  
<a name="AppCore+setEntity"></a>

### appCore.setEntity(name, info)
Set entity info for a specific entity.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- name <code>string</code> - the entity name
- info <code>object</code> - the entity info, an object with properties {prompt: [prompt text]}

<a name="AppCore+removeEntity"></a>

### appCore.removeEntity(name)
Remove a specific entity.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- name <code>string</code> - the entity name

<a name="AppCore+getParticles"></a>

### appCore.getParticles() ⇒ <code>object</code>
Returns particle info as an object with as keys the particle generator names and as values the particle properties {prompt: [prompt text]}.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>object</code> - the entity info  
<a name="AppCore+setParticle"></a>

### appCore.setParticle(name, info)
Set particle info for a specific particle.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- name <code>string</code> - the particle name
- info <code>object</code> - the particle info, an object with properties {prompt: [prompt text]}

<a name="AppCore+removeParticle"></a>

### appCore.removeParticle(name)
Remove a specific particle.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Params**

- name <code>string</code> - the particle name



# Additional documentation

## available core.mount locations

- modal_dialog - modal dialog that displays as an overlay
- nav_bar - a navigation bar at the top of the screen
- side_bar - a bar on the side for showing lists
- main - main area of screen

## Style guide

Use the classes, styles, and properties in the supplied CSS definitions as much as possible. Do not override the styles in the CSS classes you use, use them as-is.  You can assume they are available to any widgets you mount.

## General guidelines

Do not try to write any files directly, this will be taken care of by the system. Do not import node.js libraries directly.

### forms

Form fields, labels, and buttons should be left-aligned.

For all edit functions that allow editing multiple items, show the list of items with summaries and delete item / duplicate item buttons in the side_bar. List items should be shown as blocks which can be clicked to select the item.  Do not show any prompts in the item summaries. The add item button should be at the top of the list.

For values representing sprite indexes shown in the item list, display an image of the sprite obtained via getSpriteIndexImg() next to the index value, size small.

For form fields where you can fill in sprite indexes, show a preview image of the sprite obtained via getSpriteIndexImg() next to the field, size large.

For levels, sprites, tilemapping, sounds, you can edit the data structure obtained through the getter functions directly. 

For entities, maps, and particles, use the core get, set, and remove functions to read and write the data. Note that when the name is changed, you need to call remove first to remove the old item.

Do not show save buttons, but autosave changes made to the forms.

Selectors for sound, particle, entity, map, should be dropdowns showing the available elements.  Show '---Please select---' if none is selected yet.

onCreate and onRemove properties are optional. Make them optional in the user interface via an enabled checkbox, only show details when enabled.  Within onCreate and onRemove, sound and particle are optional.  Also show an enabled checkbox here, with details shown only when enabled.



# Base styles

:root {
  --text-color: #000;
  --main-bg-color: #fff;
  --button-bg-color: #bbf;
  --button-text-color: #006;
  --highlight-bg-color: #fcc;
  --mainmenu-item-selected-bg-color: #88f;
  \/* Colors for list items in the side_bar lists *\/
  --list-item-border-color: #999;
  --list-item-bg-color: #ddd;
  --list-item-selected-bg-color: #b0c0ff;
}
body {
	margin: 0;
	padding: 0;
	font-size: 16px;
}

\/* Use UL/LI with the following classes for mainmenu *\/
ul.mainmenu {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 8px;
  padding: 0px;
  padding-left: 15px;
  \/*background-image: url('../images/jgame-ai-logo-2-tr-64x52.png');
  background-repeat: no-repeat;
  background-position: 0% 50%;*\/
}
li.mainmenu-item {
  cursor: pointer;
  padding: 10px 5px;
  user-select: none;
  color: #fff;
}

input[type="text"], input[type="number"], select {
	font-size: 16px;
	padding: 6px;
}

input[type="checkbox"] {
	transform: scale(1.3);
	margin-right: 8px;
}

button {
	font-size: 16px;
	padding: 8px 12px;
	cursor: pointer;
}

\/* Use the .side-bar-list and .item styles below to style side_bar lists and items *\/
.side-bar-list {
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.item {
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 8px;
	padding-bottom: 6px;
	border: 1px solid var(--list-item-border-color);
	cursor: pointer;
	background: var(--list-item-bg-color);
}
.item.selected {
	background: var(--list-item-selected-bg-color);
}
.item-name {
	float: left;
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 4px;
	padding-right: 15px;
	word-break: break-word;
}
.item-summary {
	float: left;
	font-size: 14px;
	margin-bottom: 4px;
	word-break: break-word;
}
.item-actions {
	float: right;
	display: flex;
	gap: 4px;
	flex-wrap: wrap;
}
.item-actions button {
	font-size: 10px;
	padding: 2px 2px;
}
\/* use for copy/duplicate button *\/
.item-actions button.duplicate {
	content: "📋";
}
\/* use for delete button *\/
.item-actions button.delete {
	content: "🗑️";
}
\/* In the maps screen, use the following styles to show the map's used map char selection list, and minimize vertical space. *\/
span.usedmapchars-char {
	font-size: 16px;
	font-weight: bold;
	font-family: monospace;
}
span.usedmapchars-description {
	font-size: 16px;
	padding-left: 15px;
}

@webcogs_user_prompt
Write a module that shows a modal dialog to edit a CSS linear gradient, and previews it on a 480x270 canvas. It has a parameter 'store' that is an object containing a field 'bg' where the CSS gradient string is stored. The user can select the angle, colors, and stops of the gradient. Use the standard HTML color picker. All changes should be saved in store immediately. There is an OK button that routes to hide_modal_dialog.
@webcogs_end_prompt_section*/
export class LinearGradientModal {
  constructor(core, params) {
    this.core = core;
    this.params = params || {};
    this.store = this.params.store || {};
    this.root = null;
    this.state = this.parseGradient(this.store.bg);
    this.previewCanvas = null;
    this.stopList = null;
    this.angleInput = null;
    this.angleValue = null;
    this.init();
  }

  init() {
    const html = `
      <div class="gradient-modal">
        <h2>Edit Linear Gradient</h2>
        <div class="form-row">
          <label for="angle">Angle</label>
          <div class="angle-row">
            <input id="angle" type="range" min="0" max="360" step="1">
            <input id="angle-number" type="number" min="0" max="360" step="1">
            <span>deg</span>
          </div>
        </div>

        <div class="form-row">
          <label>Color stops</label>
          <div id="stop-list" class="stop-list"></div>
          <button id="add-stop" type="button">Add color stop</button>
        </div>

        <div class="form-row">
          <label>Preview</label>
          <canvas id="preview" width="480" height="270"></canvas>
        </div>

        <div class="actions">
          <button id="ok-button" type="button">OK</button>
        </div>
      </div>
    `;

    const css = `
      .gradient-modal {
        background: var(--main-bg-color);
        color: var(--text-color);
        padding: 16px;
        max-width: 760px;
        box-sizing: border-box;
      }
      h2 {
        margin-top: 0;
      }
      .form-row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        margin-bottom: 16px;
      }
      .angle-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .stop-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
      }
      .stop-item {
        display: grid;
        grid-template-columns: auto auto auto auto;
        gap: 10px;
        align-items: center;
        border: 1px solid var(--list-item-border-color);
        background: var(--list-item-bg-color);
        padding: 10px;
        box-sizing: border-box;
      }
      .stop-controls {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .preview-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      canvas {
        width: 480px;
        height: 270px;
        border: 1px solid var(--list-item-border-color);
        display: block;
      }
      .actions {
        display: flex;
        justify-content: flex-start;
      }
      button.remove-stop {
        padding: 6px 10px;
      }
      @media (max-width: 640px) {
        canvas {
          width: 100%;
          height: auto;
        }
        .stop-item {
          grid-template-columns: 1fr;
        }
      }
    `;

    this.root = this.core.mount('modal_dialog', html, css);
    this.previewCanvas = this.root.getElementById('preview');
    this.stopList = this.root.getElementById('stop-list');
    this.angleInput = this.root.getElementById('angle');
    this.angleValue = this.root.getElementById('angle-number');

    this.bindEvents();
    this.render();
    this.save();
  }

  bindEvents() {
    this.angleInput.addEventListener('input', () => {
      this.state.angle = this.normalizeAngle(this.angleInput.value);
      this.angleValue.value = String(this.state.angle);
      this.onStateChanged();
    });

    this.angleValue.addEventListener('input', () => {
      this.state.angle = this.normalizeAngle(this.angleValue.value);
      this.angleInput.value = String(this.state.angle);
      this.angleValue.value = String(this.state.angle);
      this.onStateChanged();
    });

    this.root.getElementById('add-stop').addEventListener('click', () => {
      this.addStop();
    });

    this.root.getElementById('ok-button').addEventListener('click', () => {
      this.core.route('hide_modal_dialog', {});
    });
  }

  normalizeAngle(value) {
    const num = Number(value);
    if (!isFinite(num)) return 90;
    let normalized = Math.round(num);
    while (normalized < 0) normalized += 360;
    while (normalized > 360) normalized -= 360;
    return normalized;
  }

  parseGradient(input) {
    const fallback = {
      angle: 90,
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 }
      ]
    };

    if (typeof input !== 'string' || !input.trim()) {
      return fallback;
    }

    const text = input.trim();
    const match = text.match(/^linear-gradient\s*\((.*)\)$/i);
    if (!match) {
      return fallback;
    }

    const inner = match[1];
    const parts = this.splitGradientArgs(inner);
    if (parts.length < 2) {
      return fallback;
    }

    let angle = 90;
    const first = parts[0].trim();
    const angleMatch = first.match(/^(-?\d+(?:\.\d+)?)deg$/i);
    let stopStartIndex = 0;
    if (angleMatch) {
      angle = this.normalizeAngle(angleMatch[1]);
      stopStartIndex = 1;
    }

    const stops = [];
    for (let i = stopStartIndex; i < parts.length; i++) {
      const parsed = this.parseStop(parts[i], i - stopStartIndex, parts.length - stopStartIndex);
      if (parsed) stops.push(parsed);
    }

    if (stops.length < 2) {
      return fallback;
    }

    stops.sort((a, b) => a.position - b.position);
    return { angle: angle, stops: stops };
  }

  splitGradientArgs(inner) {
    const result = [];
    let current = '';
    let depth = 0;
    for (let i = 0; i < inner.length; i++) {
      const ch = inner[i];
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ',' && depth === 0) {
        result.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    if (current.trim()) result.push(current.trim());
    return result;
  }

  parseStop(text, index, total) {
    const trimmed = String(text || '').trim();
    const match = trimmed.match(/^(.*)\s+(\d+(?:\.\d+)?)%$/);
    if (match) {
      const color = this.toHexColor(match[1].trim());
      const position = this.clampPercent(match[2]);
      return { color: color, position: position };
    }

    const colorOnly = this.toHexColor(trimmed);
    const defaultPos = total <= 1 ? 0 : Math.round((index * 100) / (total - 1));
    return { color: colorOnly, position: defaultPos };
  }

  toHexColor(colorText) {
    const probe = document.createElement('div');
    probe.style.color = '';
    probe.style.color = colorText;
    if (!probe.style.color) {
      return '#000000';
    }
    document.body.appendChild(probe);
    const computed = getComputedStyle(probe).color;
    probe.remove();
    const rgb = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!rgb) {
      return '#000000';
    }
    const r = Number(rgb[1]).toString(16).padStart(2, '0');
    const g = Number(rgb[2]).toString(16).padStart(2, '0');
    const b = Number(rgb[3]).toString(16).padStart(2, '0');
    return '#' + r + g + b;
  }

  clampPercent(value) {
    const num = Number(value);
    if (!isFinite(num)) return 0;
    return Math.max(0, Math.min(100, Math.round(num)));
  }

  addStop() {
    let position = 50;
    let color = '#808080';

    if (this.state.stops.length >= 2) {
      const sorted = this.getSortedStops();
      let largestGap = -1;
      let insertPos = 50;
      for (let i = 0; i < sorted.length - 1; i++) {
        const gap = sorted[i + 1].position - sorted[i].position;
        if (gap > largestGap) {
          largestGap = gap;
          insertPos = Math.round((sorted[i].position + sorted[i + 1].position) / 2);
        }
      }
      position = insertPos;
      color = sorted[sorted.length - 1].color;
    }

    this.state.stops.push({ color: color, position: position });
    this.state.stops.sort((a, b) => a.position - b.position);
    this.onStateChanged();
  }

  removeStop(index) {
    if (this.state.stops.length <= 2) return;
    this.state.stops.splice(index, 1);
    this.onStateChanged();
  }

  updateStopColor(index, value) {
    if (!this.state.stops[index]) return;
    this.state.stops[index].color = value;
    this.onStateChanged(false);
  }

  updateStopPosition(index, value) {
    if (!this.state.stops[index]) return;
    this.state.stops[index].position = this.clampPercent(value);
    this.state.stops.sort((a, b) => a.position - b.position);
    this.onStateChanged();
  }

  getSortedStops() {
    return this.state.stops.slice().sort((a, b) => a.position - b.position);
  }

  buildGradientString() {
    const stops = this.getSortedStops()
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(', ');
    return `linear-gradient(${this.state.angle}deg, ${stops})`;
  }

  save() {
    this.store.bg = this.buildGradientString();
  }

  onStateChanged(shouldRenderList) {
    this.save();
    if (shouldRenderList !== false) {
      this.renderStopList();
    }
    this.renderPreview();
  }

  render() {
    this.angleInput.value = String(this.state.angle);
    this.angleValue.value = String(this.state.angle);
    this.renderStopList();
    this.renderPreview();
  }

  renderStopList() {
    this.stopList.innerHTML = '';

    for (let i = 0; i < this.state.stops.length; i++) {
      const stop = this.state.stops[i];
      const row = document.createElement('div');
      row.className = 'stop-item';

      const colorLabel = document.createElement('label');
      colorLabel.textContent = 'Color';
      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.value = stop.color;
      colorInput.addEventListener('input', () => {
        this.updateStopColor(i, colorInput.value);
      });

      const posLabel = document.createElement('label');
      posLabel.textContent = 'Stop';
      const posInput = document.createElement('input');
      posInput.type = 'number';
      posInput.min = '0';
      posInput.max = '100';
      posInput.step = '1';
      posInput.value = String(stop.position);
      posInput.addEventListener('input', () => {
        this.updateStopPosition(i, posInput.value);
      });

      const percent = document.createElement('span');
      percent.textContent = '%';

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'remove-stop';
      removeButton.textContent = 'Remove';
      removeButton.disabled = this.state.stops.length <= 2;
      removeButton.addEventListener('click', () => {
        this.removeStop(i);
      });

      const colorWrap = document.createElement('div');
      colorWrap.className = 'stop-controls';
      colorWrap.appendChild(colorLabel);
      colorWrap.appendChild(colorInput);

      const posWrap = document.createElement('div');
      posWrap.className = 'stop-controls';
      posWrap.appendChild(posLabel);
      posWrap.appendChild(posInput);
      posWrap.appendChild(percent);

      const preview = document.createElement('div');
      preview.style.width = '48px';
      preview.style.height = '24px';
      preview.style.border = '1px solid var(--list-item-border-color)';
      preview.style.background = stop.color;

      row.appendChild(colorWrap);
      row.appendChild(posWrap);
      row.appendChild(preview);
      row.appendChild(removeButton);
      this.stopList.appendChild(row);
    }
  }

  renderPreview() {
    const canvas = this.previewCanvas;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const angleRad = ((this.state.angle - 90) * Math.PI) / 180;
    const cx = width / 2;
    const cy = height / 2;
    const length = Math.abs(Math.cos(angleRad)) * width + Math.abs(Math.sin(angleRad)) * height;
    const dx = Math.cos(angleRad) * length / 2;
    const dy = Math.sin(angleRad) * length / 2;

    const gradient = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
    const stops = this.getSortedStops();
    for (let i = 0; i < stops.length; i++) {
      gradient.addColorStop(stops[i].position / 100, stops[i].color);
    }

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
}

/*@webcogs_build 0.6.0 openai-gpt-5.4 2026-05-24T10:12:02.840Z
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
    * [.getModuleSourcePath(type, name)](#AppCore+getModuleSourcePath) ⇒ <code>Promise.&lt;string&gt;</code>
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
Do not construct this class, but use the existing instance.
basedir should include trailing slash.

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
<a name="AppCore+getModuleSourcePath"></a>

### appCore.getModuleSourcePath(type, name) ⇒ <code>Promise.&lt;string&gt;</code>
Get the path of the source code of a module.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>Promise.&lt;string&gt;</code> - full path of source code or null if not found  
**Params**

- type <code>string</code> - one of "maps", "entities", "particles"
- name <code>string</code> - the name of the module

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
Return editable level definitions. This is an array of objects with the following properties:
name: the name of the level 
type: the level type, which is the name of a map generator,
tilemap: width and height of the tile map, given by an object { "nrtilesx": width, "nrtilesy": height}. Minimum width is 32. Minimum height is 18.
bg: name of the background texture
wincond: The level's win condition. This is an object { type: [type of win condition], position: [optional position name], mask: [optional tile mask name] }.
	           Type is one of: "no_enemies", "no_pickups", "no_tiles_with_mask", or "player_reaches".
			   For no_tiles_with_mask, the mask parameter has to be supplied, which is the tile mask name
			   For player_reaches, the position parameter has to be supplied, which can be one of: "top", "bottom", "left", "right".
options: an options object containing key-value pairs, which are numbers, strings, or booleans.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>array</code> - level definitions
]  
<a name="AppCore+getSprites"></a>

### appCore.getSprites() ⇒ <code>object</code>
Return editable sprite definitions. This is an object with as keys the currently defined sprite names, and as values the sprite definitions.
The sprite defintions are objects with the following structure:
 {
			spawnDelay: [integer delay before spawning],
    		anim: { start:[start sprite index], end:[end sprite index], speed:[animation speed, between 0 and 1], mode:[animation mode], dir:[animation direction] },
			onCreate: { particle: [particle parameters], sound: [name of sound] },
			onRemove: { particle: [particle parameters], sound: [name of sound] },
		}
anim.mode is one of: "always", "moving", and "moving-x".
anim.dir is one of: "nodir", "rotany", "rot4", "mirx", "miry", "rot-mir".
onCreate and onRemove are optional, their properties particle and sound are also optional.
The particle property is an object with the following properties: { type: [name of particle function], size: [particle size], sprite: [spritesheet index], options: [options object] }

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>object</code> - sprite definitions  
<a name="AppCore+getTileMapping"></a>

### appCore.getTileMapping() ⇒ <code>object</code>
**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>object</code> - tile mapping definitions  
**Cogs_func**: getTileMapping
Returns editable tile mapping definitions. This is an object with as keys one-character strings that represent map symbols, and as values objects that represent tile and optionally entity definitions.
A tile definition looks like this:
	   {
	       tile: [spritesheet index],
	       mask_name: [a string representing the tile mask],
	       onRemove: { particle: [particle parameters], sound: [name of sound] },
	   }
onRemove is optional, their properties particle and sound are also optional.
The particle property is an object with the following properties: { type: [name of particle function], size: [particle size], sprite: [spritesheet index], options: [options object] }

Additionally, an entity can be defined, which looks like this:
	   {
	       entity: { name: [name of entity class], unique:[boolean], mask: [entity mask name], sprite: [name of the sprite, as defined in the result of getSprites()], options: [options object] } 
	   }
mask is one of: "player", "player_bullet", "enemy", "pickup".  
<a name="AppCore+getSounds"></a>

### appCore.getSounds() ⇒ <code>object</code>
Returns editable sound definitions. This is an object with the property "sounds" which is an array of sound definitions.
A sound definitions looks like this:
	   { name: [name of sound], type: [sound type], "seed": [integer random seed] }
type is one of: 'Random', 'Pickup','Powerup','Jump','Shoot','Blip','Hit','Explo'.

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

Form fields, labels, and buttons should be left-aligned, with labels left of the field.

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
\/* style for primsjs code *\/
code[class*="language-"], pre[class*="language-"] {
    white-space: pre-wrap;
	font-size: 14px;
}
@webcogs_user_prompt
Write a module that displays in main which allows to edit sprites. For the particle options, there should be an options button that routes to editoptions, with as parameters type='particles', name=[particle name], and store=[particle object].
@webcogs_end_prompt_section*/
export class SpriteEditor {
  constructor(core, params) {
    this.core = core;
    this.params = params || {};
    this.sprites = this.core.getSprites();
    this.selectedName = null;
    this.sidebarRoot = null;
    this.mainRoot = null;

    const names = Object.keys(this.sprites || {});
    if (this.params && this.params.name && this.sprites[this.params.name]) {
      this.selectedName = this.params.name;
    } else if (names.length > 0) {
      this.selectedName = names[0];
    }

    this.mount();
  }

  mount() {
    this.sidebarRoot = this.core.mount('side_bar', '<div class="side-bar-list"></div>', `
      .add-row { margin-bottom: 8px; }
      .empty { padding: 8px; color: #555; }
      .item::after { content: ''; display: block; clear: both; }
      .sprite-thumb { display: inline-flex; align-items: center; gap: 6px; margin-top: 4px; }
    `);

    this.mainRoot = this.core.mount('main', '<div class="sprite-editor"></div>', `
      .sprite-editor { padding: 16px; }
      .form-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
      .form-row > label { min-width: 180px; }
      .section { border: 1px solid #ccc; padding: 12px; margin-bottom: 14px; }
      .section-title { font-weight: bold; margin-bottom: 10px; }
      .subsection { border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px; }
      .inline-preview { display: inline-flex; align-items: center; min-width: 40px; min-height: 40px; }
      .button-row { display: flex; gap: 8px; align-items: center; }
      .empty-main { padding: 16px; }
      .option-block { margin-left: 24px; margin-top: 8px; }
      h2 { margin-top: 0; }
    `);

    this.renderSidebar();
    this.renderMain();
  }

  renderSidebar() {
    const container = this.sidebarRoot.querySelector('.side-bar-list');
    container.innerHTML = '';

    const addRow = document.createElement('div');
    addRow.className = 'add-row';
    const addButton = document.createElement('button');
    addButton.textContent = 'Add sprite';
    addButton.addEventListener('click', () => this.addSprite());
    addRow.appendChild(addButton);
    container.appendChild(addRow);

    const names = Object.keys(this.sprites || {}).sort();
    if (names.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'No sprites defined.';
      container.appendChild(empty);
      return;
    }

    names.forEach((name) => {
      const sprite = this.sprites[name] || {};
      const item = document.createElement('div');
      item.className = 'item' + (name === this.selectedName ? ' selected' : '');
      item.addEventListener('click', () => {
        this.selectedName = name;
        this.renderSidebar();
        this.renderMain();
      });

      const actions = document.createElement('div');
      actions.className = 'item-actions';

      const duplicateButton = document.createElement('button');
      duplicateButton.className = 'duplicate';
      duplicateButton.type = 'button';
      duplicateButton.textContent = '📋';
      duplicateButton.title = 'Duplicate';
      duplicateButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.duplicateSprite(name);
      });
      actions.appendChild(duplicateButton);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete';
      deleteButton.type = 'button';
      deleteButton.textContent = '🗑️';
      deleteButton.title = 'Delete';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteSprite(name);
      });
      actions.appendChild(deleteButton);

      const nameDiv = document.createElement('div');
      nameDiv.className = 'item-name';
      nameDiv.textContent = name;

      const summaryDiv = document.createElement('div');
      summaryDiv.className = 'item-summary';
      const startIndex = sprite.anim && typeof sprite.anim.start === 'number' ? sprite.anim.start : '-';
      const endIndex = sprite.anim && typeof sprite.anim.end === 'number' ? sprite.anim.end : '-';
      summaryDiv.textContent = 'Anim ' + startIndex + ' → ' + endIndex;

      item.appendChild(actions);
      item.appendChild(nameDiv);
      item.appendChild(summaryDiv);

      if (sprite.anim && typeof sprite.anim.start === 'number') {
        const thumb = document.createElement('div');
        thumb.className = 'sprite-thumb';
        const img = this.core.getSpriteIndexImg(sprite.anim.start, 'small');
        thumb.appendChild(img);
        const text = document.createElement('span');
        text.textContent = String(sprite.anim.start);
        thumb.appendChild(text);
        item.appendChild(thumb);
      }

      container.appendChild(item);
    });
  }

  renderMain() {
    const container = this.mainRoot.querySelector('.sprite-editor');
    container.innerHTML = '';

    if (!this.selectedName || !this.sprites[this.selectedName]) {
      const empty = document.createElement('div');
      empty.className = 'empty-main';
      empty.textContent = 'Select or add a sprite.';
      container.appendChild(empty);
      return;
    }

    const sprite = this.sprites[this.selectedName];
    this.ensureSpriteDefaults(sprite);

    const title = document.createElement('h2');
    title.textContent = 'Edit sprite';
    container.appendChild(title);

    const nameSection = document.createElement('div');
    nameSection.className = 'section';
    nameSection.appendChild(this.createTextField('Name', this.selectedName, (value) => {
      this.renameSprite(this.selectedName, value);
    }));
    container.appendChild(nameSection);

    const generalSection = document.createElement('div');
    generalSection.className = 'section';
    const generalTitle = document.createElement('div');
    generalTitle.className = 'section-title';
    generalTitle.textContent = 'General';
    generalSection.appendChild(generalTitle);

    generalSection.appendChild(this.createNumberField('Spawn delay', sprite.spawnDelay, 1, (value) => {
      sprite.spawnDelay = value;
      this.renderSidebar();
    }));
    container.appendChild(generalSection);

    const animSection = document.createElement('div');
    animSection.className = 'section';
    const animTitle = document.createElement('div');
    animTitle.className = 'section-title';
    animTitle.textContent = 'Animation';
    animSection.appendChild(animTitle);

    animSection.appendChild(this.createSpriteIndexField('Start sprite index', sprite.anim.start, (value) => {
      sprite.anim.start = value;
      this.renderSidebar();
      this.renderMain();
    }));
    animSection.appendChild(this.createSpriteIndexField('End sprite index', sprite.anim.end, (value) => {
      sprite.anim.end = value;
      this.renderSidebar();
      this.renderMain();
    }));
    animSection.appendChild(this.createNumberField('Speed', sprite.anim.speed, 0.01, (value) => {
      sprite.anim.speed = value;
    }, true));
    animSection.appendChild(this.createSelectField('Mode', sprite.anim.mode, ['always', 'moving', 'moving-x'], (value) => {
      sprite.anim.mode = value;
    }));
    animSection.appendChild(this.createSelectField('Direction', sprite.anim.dir, ['nodir', 'rotany', 'rot4', 'mirx', 'miry', 'rot-mir', 'copy'], (value) => {
      sprite.anim.dir = value;
    }));
    container.appendChild(animSection);

    container.appendChild(this.createLifecycleSection('On create', sprite, 'onCreate'));
    container.appendChild(this.createLifecycleSection('On remove', sprite, 'onRemove'));
  }

  createLifecycleSection(titleText, sprite, key) {
    const section = document.createElement('div');
    section.className = 'section';

    const title = document.createElement('div');
    title.className = 'section-title';
    title.textContent = titleText;
    section.appendChild(title);

    const enabled = !!sprite[key];
    section.appendChild(this.createCheckboxField('Enabled', enabled, (checked) => {
      if (checked) {
        sprite[key] = {};
      } else {
        delete sprite[key];
      }
      this.renderMain();
    }));

    if (!sprite[key]) {
      return section;
    }

    const block = document.createElement('div');
    block.className = 'option-block';

    const soundNames = ((this.core.getSounds() || {}).sounds || []).map((s) => s.name);
    block.appendChild(this.createCheckboxField('Sound enabled', !!sprite[key].sound, (checked) => {
      if (checked) {
        sprite[key].sound = '';
      } else {
        delete sprite[key].sound;
      }
      this.renderMain();
    }));

    if (Object.prototype.hasOwnProperty.call(sprite[key], 'sound')) {
      block.appendChild(this.createSelectField('Sound', sprite[key].sound || '', soundNames, (value) => {
        sprite[key].sound = value;
      }, true));
    }

    block.appendChild(this.createCheckboxField('Particle enabled', !!sprite[key].particle, (checked) => {
      if (checked) {
        sprite[key].particle = { type: '', size: 0, sprite: 0, options: {} };
      } else {
        delete sprite[key].particle;
      }
      this.renderMain();
    }));

    if (sprite[key].particle) {
      const particle = sprite[key].particle;
      if (typeof particle.options !== 'object' || particle.options === null) {
        particle.options = {};
      }
      const particleNames = Object.keys(this.core.getParticles() || {}).sort();
      block.appendChild(this.createSelectField('Particle type', particle.type || '', particleNames, (value) => {
        particle.type = value;
      }, true));
      block.appendChild(this.createNumberField('Particle size', particle.size, 1, (value) => {
        particle.size = value;
      }));
      block.appendChild(this.createSpriteIndexField('Particle sprite', particle.sprite, (value) => {
        particle.sprite = value;
        this.renderMain();
      }));

      const buttonRow = document.createElement('div');
      buttonRow.className = 'form-row';
      const label = document.createElement('label');
      label.textContent = 'Particle options';
      buttonRow.appendChild(label);
      const buttons = document.createElement('div');
      buttons.className = 'button-row';
      const optionsButton = document.createElement('button');
      optionsButton.type = 'button';
      optionsButton.textContent = 'Options';
      optionsButton.addEventListener('click', () => {
        this.core.route('editoptions', {
          type: 'particles',
          name: particle.type || '',
          store: particle
        });
      });
      buttons.appendChild(optionsButton);
      buttonRow.appendChild(buttons);
      block.appendChild(buttonRow);
    }

    section.appendChild(block);
    return section;
  }

  createTextField(labelText, value, onChange) {
    const row = document.createElement('div');
    row.className = 'form-row';
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value == null ? '' : String(value);
    input.addEventListener('input', () => onChange(input.value));
    row.appendChild(label);
    row.appendChild(input);
    return row;
  }

  createNumberField(labelText, value, step, onChange, allowFloat) {
    const row = document.createElement('div');
    row.className = 'form-row';
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'number';
    input.step = step != null ? String(step) : '1';
    input.value = value == null ? '0' : String(value);
    input.addEventListener('input', () => {
      const parsed = allowFloat ? parseFloat(input.value) : parseInt(input.value, 10);
      onChange(Number.isNaN(parsed) ? 0 : parsed);
    });
    row.appendChild(label);
    row.appendChild(input);
    return row;
  }

  createCheckboxField(labelText, value, onChange) {
    const row = document.createElement('div');
    row.className = 'form-row';
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!value;
    input.addEventListener('change', () => onChange(input.checked));
    row.appendChild(label);
    row.appendChild(input);
    return row;
  }

  createSelectField(labelText, value, options, onChange, includeEmpty) {
    const row = document.createElement('div');
    row.className = 'form-row';
    const label = document.createElement('label');
    label.textContent = labelText;
    const select = document.createElement('select');

    if (includeEmpty) {
      const emptyOption = document.createElement('option');
      emptyOption.value = '';
      emptyOption.textContent = '---Please select---';
      select.appendChild(emptyOption);
    }

    (options || []).forEach((optionValue) => {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionValue;
      select.appendChild(option);
    });

    select.value = value == null ? '' : String(value);
    if (select.value !== (value == null ? '' : String(value)) && includeEmpty) {
      select.value = '';
    }
    select.addEventListener('change', () => onChange(select.value));
    row.appendChild(label);
    row.appendChild(select);
    return row;
  }

  createSpriteIndexField(labelText, value, onChange) {
    const row = document.createElement('div');
    row.className = 'form-row';
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'number';
    input.step = '1';
    input.value = value == null ? '0' : String(value);
    const preview = document.createElement('div');
    preview.className = 'inline-preview';

    const updatePreview = () => {
      preview.innerHTML = '';
      const parsed = parseInt(input.value, 10);
      const img = this.core.getSpriteIndexImg(Number.isNaN(parsed) ? 0 : parsed, 'large');
      preview.appendChild(img);
    };

    input.addEventListener('input', () => {
      const parsed = parseInt(input.value, 10);
      onChange(Number.isNaN(parsed) ? 0 : parsed);
      updatePreview();
    });

    row.appendChild(label);
    row.appendChild(input);
    row.appendChild(preview);
    updatePreview();
    return row;
  }

  ensureSpriteDefaults(sprite) {
    if (typeof sprite.spawnDelay !== 'number') sprite.spawnDelay = 0;
    if (!sprite.anim || typeof sprite.anim !== 'object') sprite.anim = {};
    if (typeof sprite.anim.start !== 'number') sprite.anim.start = 0;
    if (typeof sprite.anim.end !== 'number') sprite.anim.end = 0;
    if (typeof sprite.anim.speed !== 'number') sprite.anim.speed = 0;
    if (typeof sprite.anim.mode !== 'string') sprite.anim.mode = 'always';
    if (typeof sprite.anim.dir !== 'string') sprite.anim.dir = 'nodir';
  }

  addSprite() {
    let base = 'sprite';
    let index = 1;
    let name = base + index;
    while (this.sprites[name]) {
      index += 1;
      name = base + index;
    }
    this.sprites[name] = {
      spawnDelay: 0,
      anim: {
        start: 0,
        end: 0,
        speed: 0,
        mode: 'always',
        dir: 'nodir'
      }
    };
    this.selectedName = name;
    this.renderSidebar();
    this.renderMain();
  }

  duplicateSprite(name) {
    if (!this.sprites[name]) return;
    let index = 1;
    let newName = name + '_copy' + index;
    while (this.sprites[newName]) {
      index += 1;
      newName = name + '_copy' + index;
    }
    this.sprites[newName] = JSON.parse(JSON.stringify(this.sprites[name]));
    this.selectedName = newName;
    this.renderSidebar();
    this.renderMain();
  }

  deleteSprite(name) {
    if (!this.sprites[name]) return;
    delete this.sprites[name];
    const names = Object.keys(this.sprites).sort();
    this.selectedName = names.length > 0 ? names[0] : null;
    this.renderSidebar();
    this.renderMain();
  }

  renameSprite(oldName, newName) {
    const trimmed = (newName || '').trim();
    if (!trimmed || trimmed === oldName) {
      return;
    }
    if (this.sprites[trimmed]) {
      return;
    }
    this.sprites[trimmed] = this.sprites[oldName];
    delete this.sprites[oldName];
    this.selectedName = trimmed;
    this.renderSidebar();
    this.renderMain();
  }
}

/*@webcogs_build 0.7.0 openai-gpt-5.4 2026-06-21T21:37:42.228Z
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
    * [.saveModuleState(Instance, An)](#SPACore+saveModuleState)
    * [.loadModuleState(Instance)](#SPACore+loadModuleState) ⇒ <code>object</code>

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

<a name="SPACore+saveModuleState"></a>

### spaCore.saveModuleState(Instance, An)
Save a module's state.

**Kind**: instance method of [<code>SPACore</code>](#SPACore)  
**Params**

- Instance <code>object</code> - of module
- An <code>object</code> - object containing state information

<a name="SPACore+loadModuleState"></a>

### spaCore.loadModuleState(Instance) ⇒ <code>object</code>
Load a module's state.

**Kind**: instance method of [<code>SPACore</code>](#SPACore)  
**Returns**: <code>object</code> - The state information object previously saved with saveModuleState, or null if no state  
**Params**

- Instance <code>object</code> - of module



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
    * [.getGlobals()](#AppCore+getGlobals) ⇒ <code>array</code>
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
Return editable level definitions. This is an array of objects with the following properties:name: the name of the level type: the level type, which is the name of a map generator,tilemap: width and height of the tile map, given by an object { "nrtilesx": width, "nrtilesy": height}. Minimum width is 32. Minimum height is 18.bg: name of the background texturewincond: The level's win condition. This is an object { type: [type of win condition], position: [optional position name], mask: [optional tile mask name] }.
	           Type is one of: "no_enemies", "no_pickups", "no_tiles_with_mask", or "player_reaches".
			   For no_tiles_with_mask, the mask parameter has to be supplied, which is the tile mask name
			   For player_reaches, the position parameter has to be supplied, which can be one of: "top", "bottom", "left", "right".options: an options object containing key-value pairs, which are numbers, strings, or booleans.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>array</code> - level definitions
]  
<a name="AppCore+getGlobals"></a>

### appCore.getGlobals() ⇒ <code>array</code>
Return editable game globals definitions. This is an array of objects with the following properties:name: the name of the global type: the globals' type, which is 'int' or 'float'value: the initial valuemin: numeric minimum valuemax: numeric maximum valuedisplay: the global's display method: 'none', 'bar', 'count', or 'number'label: a label string to show next to the displaysprite: integer sprite index to use for display

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: <code>array</code> - game global definitions
]  
<a name="AppCore+getSprites"></a>

### appCore.getSprites() ⇒ <code>object</code>
Return editable sprite definitions. This is an object with as keys the currently defined sprite names, and as values the sprite definitions.The sprite defintions are objects with the following structure: {
			spawnDelay: [integer delay before spawning],
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
**Cogs_func**: getTileMappingReturns editable tile mapping definitions. This is an object with as keys one-character strings that represent map symbols, and as values objects that represent tile and optionally entity definitions.A tile definition looks like this:
	   {
	       tile: [spritesheet index],
	       mask_name: [a string representing the tile mask],
	       onRemove: { particle: [particle parameters], sound: [name of sound] },
	   }onRemove is optional, their properties particle and sound are also optional.The particle property is an object with the following properties: { type: [name of particle function], size: [particle size], sprite: [spritesheet index], options: [options object] }Additionally, an entity can be defined, which looks like this:
	   {
	       entity: { name: [name of entity class], unique:[boolean], mask: [entity mask name], sprite: [name of the sprite, as defined in the result of getSprites()], options: [options object] } 
	   }mask is one of: "player", "player_bullet", "enemy", "enemy_bullet", "pickup", "special".  
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

If there are Build and View Source buttons, they should be at the bottom of the form.

## General guidelines

Do not try to write any files directly, this will be taken care of by the system. Do not import node.js libraries directly.

### Saving state

A module can save state using core.saveModuleState(this,{stateinfo}), then reload it using core.loadModuleState(this).  Modules should always load their state on initialisation, if saved state is used.  Modules that show a selectable item list in the side_bar, should save the selected item in their saved state. On initialisation, the module should then set the respective item in the list as selected.

### forms

Do not re-render widgets using core.mount, instead, update elements inside the already mounted widget. 

Form fields, labels, and buttons should be left-aligned, with labels left of the field, except for textareas, where the label should be above the textarea.

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
Write a module that displays in main which allows to edit tile mappings. When selecting an entity, set the unique property to checked. For the entity options and particle options, there should be an options button that routes to editoptions, with as parameters type=['entities' or 'particles'], name=[entity or particle name], and store=[entity or particle object].
@webcogs_end_prompt_section*/
export class TileMappingsEditor {
  constructor(core, params) {
    this.core = core;
    this.params = params || {};
    this.tileMapping = this.core.getTileMapping() || {};
    this.sprites = this.core.getSprites() || {};
    this.entities = this.core.getEntities() || {};
    this.particles = this.core.getParticles() || {};
    this.sounds = this.core.getSounds() || {};
    this.selectedKey = null;
    this.mainRoot = null;
    this.sidebarRoot = null;
    this.spritePreviewCache = {};

    const saved = this.core.loadModuleState(this) || {};
    if (saved.selectedKey && this.tileMapping[saved.selectedKey]) {
      this.selectedKey = saved.selectedKey;
    } else {
      const keys = Object.keys(this.tileMapping).sort();
      this.selectedKey = keys.length ? keys[0] : null;
    }

    this.renderSidebar();
    this.renderMain();
  }

  saveState() {
    this.core.saveModuleState(this, { selectedKey: this.selectedKey });
  }

  renderSidebar() {
    const html = `
      <div>
        <button id="addItemBtn" type="button">Add mapping</button>
        <div id="list" class="side-bar-list" style="margin-top:8px;"></div>
      </div>
    `;
    this.sidebarRoot = this.core.mount('side_bar', html, '');
    this.sidebarRoot.getElementById('addItemBtn').addEventListener('click', () => this.addItem());
    this.refreshSidebarList();
  }

  refreshSidebarList() {
    if (!this.sidebarRoot) return;
    const list = this.sidebarRoot.getElementById('list');
    const keys = Object.keys(this.tileMapping).sort();
    list.innerHTML = '';

    keys.forEach((key) => {
      const info = this.tileMapping[key] || {};
      const item = document.createElement('div');
      item.className = 'item' + (this.selectedKey === key ? ' selected' : '');

      const name = document.createElement('div');
      name.className = 'item-name';
      name.textContent = key;
      item.appendChild(name);

      const summary = document.createElement('div');
      summary.className = 'item-summary';
      const summaryParts = [];
      if (info.tile !== undefined && info.tile !== null) {
        summaryParts.push('tile ' + info.tile);
      }
      if (info.entity && info.entity.name) {
        summaryParts.push('entity ' + info.entity.name);
      }
      summary.textContent = summaryParts.join(' • ');
      item.appendChild(summary);

      const actions = document.createElement('div');
      actions.className = 'item-actions';

      const dupBtn = document.createElement('button');
      dupBtn.type = 'button';
      dupBtn.className = 'duplicate';
      dupBtn.textContent = 'Duplicate';
      dupBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.duplicateItem(key);
      });
      actions.appendChild(dupBtn);

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'delete';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteItem(key);
      });
      actions.appendChild(delBtn);

      item.appendChild(actions);

      const clear = document.createElement('div');
      clear.style.clear = 'both';
      item.appendChild(clear);

      item.addEventListener('click', () => {
        this.selectedKey = key;
        this.saveState();
        this.refreshSidebarList();
        this.populateForm();
      });

      list.appendChild(item);
    });
  }

  renderMain() {
    const html = `
      <div class="tilemappings-editor">
        <div id="emptyState">Select or add a tile mapping.</div>
        <form id="form" style="display:none;">
          <div style="display:flex; flex-direction:column; gap:14px; max-width:900px;">

            <div>
              <label for="mapChar">Map char</label>
              <input id="mapChar" type="text" maxlength="1" style="margin-left:12px; width:60px;" />
            </div>

            <fieldset>
              <legend>Tile</legend>
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div>
                  <label for="tileIndex">Sprite index</label>
                  <input id="tileIndex" type="number" step="1" style="margin-left:12px; width:120px;" />
                  <span id="tilePreview" style="margin-left:10px; vertical-align:middle;"></span>
                </div>
                <div>
                  <label for="maskName">Mask name</label>
                  <input id="maskName" type="text" style="margin-left:12px; width:220px;" />
                </div>
                <div>
                  <label><input id="tileOnRemoveEnabled" type="checkbox" />Enable onRemove</label>
                </div>
                <div id="tileOnRemoveSection" style="display:none; padding-left:18px;">
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <div>
                      <label><input id="tileOnRemoveSoundEnabled" type="checkbox" />Enable sound</label>
                    </div>
                    <div id="tileOnRemoveSoundSection" style="display:none;">
                      <label for="tileOnRemoveSound">Sound</label>
                      <select id="tileOnRemoveSound" style="margin-left:12px;"></select>
                    </div>
                    <div>
                      <label><input id="tileOnRemoveParticleEnabled" type="checkbox" />Enable particle</label>
                    </div>
                    <div id="tileOnRemoveParticleSection" style="display:none; padding-left:18px;">
                      <div style="display:flex; flex-direction:column; gap:10px;">
                        <div>
                          <label for="tileOnRemoveParticleType">Particle</label>
                          <select id="tileOnRemoveParticleType" style="margin-left:12px;"></select>
                          <button id="tileOnRemoveParticleOptionsBtn" type="button" style="margin-left:10px;">Options</button>
                        </div>
                        <div>
                          <label for="tileOnRemoveParticleSize">Size</label>
                          <input id="tileOnRemoveParticleSize" type="number" step="any" style="margin-left:12px; width:120px;" />
                        </div>
                        <div>
                          <label for="tileOnRemoveParticleSprite">Sprite index</label>
                          <input id="tileOnRemoveParticleSprite" type="number" step="1" style="margin-left:12px; width:120px;" />
                          <span id="tileOnRemoveParticleSpritePreview" style="margin-left:10px; vertical-align:middle;"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Entity</legend>
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div>
                  <label><input id="entityEnabled" type="checkbox" />Enable entity</label>
                </div>
                <div id="entitySection" style="display:none; padding-left:18px;">
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <div>
                      <label for="entityName">Entity</label>
                      <select id="entityName" style="margin-left:12px;"></select>
                      <button id="entityOptionsBtn" type="button" style="margin-left:10px;">Options</button>
                    </div>
                    <div>
                      <label><input id="entityUnique" type="checkbox" />Unique</label>
                    </div>
                    <div>
                      <label for="entityMask">Mask</label>
                      <select id="entityMask" style="margin-left:12px;"></select>
                    </div>
                    <div>
                      <label for="entitySprite">Sprite</label>
                      <select id="entitySprite" style="margin-left:12px;"></select>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

          </div>
        </form>
      </div>
    `;

    this.mainRoot = this.core.mount('main', html, '');
    this.bindMainEvents();
    this.populateStaticOptions();
    this.populateForm();
  }

  bindMainEvents() {
    const root = this.mainRoot;
    const ids = [
      'mapChar','tileIndex','maskName','tileOnRemoveEnabled','tileOnRemoveSoundEnabled','tileOnRemoveSound',
      'tileOnRemoveParticleEnabled','tileOnRemoveParticleType','tileOnRemoveParticleSize','tileOnRemoveParticleSprite',
      'entityEnabled','entityName','entityUnique','entityMask','entitySprite'
    ];
    ids.forEach((id) => {
      const el = root.getElementById(id);
      const eventName = el && (el.tagName === 'INPUT' && el.type === 'text') ? 'input' : 'change';
      if (el) {
        el.addEventListener(eventName, () => this.handleFormChange(id));
        if (eventName !== 'input') {
          el.addEventListener('input', () => this.handleFormChange(id));
        }
      }
    });

    root.getElementById('tileOnRemoveEnabled').addEventListener('change', () => this.updateVisibility());
    root.getElementById('tileOnRemoveSoundEnabled').addEventListener('change', () => this.updateVisibility());
    root.getElementById('tileOnRemoveParticleEnabled').addEventListener('change', () => this.updateVisibility());
    root.getElementById('entityEnabled').addEventListener('change', () => this.updateVisibility());
    root.getElementById('entityName').addEventListener('change', () => {
      root.getElementById('entityUnique').checked = true;
      this.handleFormChange('entityName');
    });

    root.getElementById('entityOptionsBtn').addEventListener('click', () => {
      const entry = this.getSelectedEntry();
      if (!entry || !entry.entity || !entry.entity.name) return;
      this.core.route('editoptions', {
        type: 'entities',
        name: entry.entity.name,
        store: entry.entity
      });
    });

    root.getElementById('tileOnRemoveParticleOptionsBtn').addEventListener('click', () => {
      const entry = this.getSelectedEntry();
      if (!entry || !entry.onRemove || !entry.onRemove.particle || !entry.onRemove.particle.type) return;
      this.core.route('editoptions', {
        type: 'particles',
        name: entry.onRemove.particle.type,
        store: entry.onRemove.particle
      });
    });
  }

  populateStaticOptions() {
    const root = this.mainRoot;
    const soundSelect = root.getElementById('tileOnRemoveSound');
    const particleSelect = root.getElementById('tileOnRemoveParticleType');
    const entitySelect = root.getElementById('entityName');
    const entityMask = root.getElementById('entityMask');
    const entitySprite = root.getElementById('entitySprite');

    this.fillSelect(soundSelect, this.getSoundNames());
    this.fillSelect(particleSelect, Object.keys(this.particles).sort());
    this.fillSelect(entitySelect, Object.keys(this.entities).sort());
    this.fillSelect(entitySprite, Object.keys(this.sprites).sort());
    this.fillSelect(entityMask, ['player', 'player_bullet', 'enemy', 'enemy_bullet', 'pickup', 'special'], false);
  }

  fillSelect(select, values, includeEmpty = true) {
    select.innerHTML = '';
    if (includeEmpty) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = '---Please select---';
      select.appendChild(opt);
    }
    values.forEach((value) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      select.appendChild(opt);
    });
  }

  getSoundNames() {
    if (this.sounds && Array.isArray(this.sounds.sounds)) {
      return this.sounds.sounds.map((s) => s.name).filter(Boolean).sort();
    }
    return [];
  }

  getSelectedEntry() {
    if (!this.selectedKey || !this.tileMapping[this.selectedKey]) return null;
    return this.tileMapping[this.selectedKey];
  }

  populateForm() {
    const entry = this.getSelectedEntry();
    const emptyState = this.mainRoot.getElementById('emptyState');
    const form = this.mainRoot.getElementById('form');

    if (!entry) {
      emptyState.style.display = 'block';
      form.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    form.style.display = 'block';

    this.mainRoot.getElementById('mapChar').value = this.selectedKey || '';
    this.mainRoot.getElementById('tileIndex').value = entry.tile !== undefined ? entry.tile : '';
    this.mainRoot.getElementById('maskName').value = entry.mask_name || '';

    const onRemove = entry.onRemove || {};
    this.mainRoot.getElementById('tileOnRemoveEnabled').checked = !!entry.onRemove;
    this.mainRoot.getElementById('tileOnRemoveSoundEnabled').checked = !!onRemove.sound;
    this.mainRoot.getElementById('tileOnRemoveSound').value = onRemove.sound || '';
    this.mainRoot.getElementById('tileOnRemoveParticleEnabled').checked = !!onRemove.particle;
    this.mainRoot.getElementById('tileOnRemoveParticleType').value = onRemove.particle && onRemove.particle.type ? onRemove.particle.type : '';
    this.mainRoot.getElementById('tileOnRemoveParticleSize').value = onRemove.particle && onRemove.particle.size !== undefined ? onRemove.particle.size : '';
    this.mainRoot.getElementById('tileOnRemoveParticleSprite').value = onRemove.particle && onRemove.particle.sprite !== undefined ? onRemove.particle.sprite : '';

    this.mainRoot.getElementById('entityEnabled').checked = !!entry.entity;
    this.mainRoot.getElementById('entityName').value = entry.entity && entry.entity.name ? entry.entity.name : '';
    this.mainRoot.getElementById('entityUnique').checked = !!(entry.entity && entry.entity.unique);
    this.mainRoot.getElementById('entityMask').value = entry.entity && entry.entity.mask ? entry.entity.mask : 'player';
    this.mainRoot.getElementById('entitySprite').value = entry.entity && entry.entity.sprite ? entry.entity.sprite : '';

    this.updateVisibility();
    this.updateSpritePreview('tileIndex', 'tilePreview');
    this.updateSpritePreview('tileOnRemoveParticleSprite', 'tileOnRemoveParticleSpritePreview');
  }

  updateVisibility() {
    const root = this.mainRoot;
    root.getElementById('tileOnRemoveSection').style.display = root.getElementById('tileOnRemoveEnabled').checked ? 'block' : 'none';
    root.getElementById('tileOnRemoveSoundSection').style.display = root.getElementById('tileOnRemoveSoundEnabled').checked ? 'block' : 'none';
    root.getElementById('tileOnRemoveParticleSection').style.display = root.getElementById('tileOnRemoveParticleEnabled').checked ? 'block' : 'none';
    root.getElementById('entitySection').style.display = root.getElementById('entityEnabled').checked ? 'block' : 'none';
  }

  updateSpritePreview(inputId, previewId) {
    const input = this.mainRoot.getElementById(inputId);
    const container = this.mainRoot.getElementById(previewId);
    container.innerHTML = '';
    const value = input.value;
    if (value === '') return;
    const num = Number(value);
    if (isNaN(num)) return;
    const img = this.core.getSpriteIndexImg(num, 'large');
    if (img) container.appendChild(img);
  }

  handleFormChange(id) {
    const entry = this.getSelectedEntry();
    if (!entry) return;

    const root = this.mainRoot;

    if (id === 'mapChar') {
      const newKeyRaw = root.getElementById('mapChar').value || '';
      const newKey = newKeyRaw.substring(0, 1);
      root.getElementById('mapChar').value = newKey;
      if (!newKey || newKey === this.selectedKey) {
        return;
      }
      if (this.tileMapping[newKey]) {
        root.getElementById('mapChar').value = this.selectedKey;
        return;
      }
      this.tileMapping[newKey] = entry;
      delete this.tileMapping[this.selectedKey];
      this.selectedKey = newKey;
      this.saveState();
      this.refreshSidebarList();
      return;
    }

    entry.tile = this.readNumberField('tileIndex', true);
    entry.mask_name = root.getElementById('maskName').value || '';
    if (!entry.mask_name) delete entry.mask_name;

    if (root.getElementById('tileOnRemoveEnabled').checked) {
      if (!entry.onRemove) entry.onRemove = {};
      if (root.getElementById('tileOnRemoveSoundEnabled').checked) {
        const soundVal = root.getElementById('tileOnRemoveSound').value;
        if (soundVal) entry.onRemove.sound = soundVal;
        else delete entry.onRemove.sound;
      } else {
        delete entry.onRemove.sound;
      }

      if (root.getElementById('tileOnRemoveParticleEnabled').checked) {
        if (!entry.onRemove.particle) entry.onRemove.particle = { options: {} };
        const p = entry.onRemove.particle;
        p.type = root.getElementById('tileOnRemoveParticleType').value || '';
        p.size = this.readNumberField('tileOnRemoveParticleSize', false);
        p.sprite = this.readNumberField('tileOnRemoveParticleSprite', true);
        if (!p.options) p.options = {};
        if (!p.type) delete p.type;
        if (p.size === null) delete p.size;
        if (p.sprite === null) delete p.sprite;
        if (!p.type && p.size === undefined && p.sprite === undefined && !p.options) {
          delete entry.onRemove.particle;
        }
      } else {
        delete entry.onRemove.particle;
      }

      if (!entry.onRemove.sound && !entry.onRemove.particle) {
        delete entry.onRemove;
      }
    } else {
      delete entry.onRemove;
    }

    if (root.getElementById('entityEnabled').checked) {
      if (!entry.entity) entry.entity = { options: {} };
      entry.entity.name = root.getElementById('entityName').value || '';
      entry.entity.unique = !!root.getElementById('entityUnique').checked;
      entry.entity.mask = root.getElementById('entityMask').value || '';
      entry.entity.sprite = root.getElementById('entitySprite').value || '';
      if (!entry.entity.options) entry.entity.options = {};
      if (!entry.entity.name) delete entry.entity.name;
      if (!entry.entity.mask) delete entry.entity.mask;
      if (!entry.entity.sprite) delete entry.entity.sprite;
    } else {
      delete entry.entity;
    }

    this.updateVisibility();
    this.updateSpritePreview('tileIndex', 'tilePreview');
    this.updateSpritePreview('tileOnRemoveParticleSprite', 'tileOnRemoveParticleSpritePreview');
    this.refreshSidebarList();
    this.saveState();
  }

  readNumberField(id, integerOnly) {
    const value = this.mainRoot.getElementById(id).value;
    if (value === '') return null;
    const num = integerOnly ? parseInt(value, 10) : parseFloat(value);
    return isNaN(num) ? null : num;
  }

  addItem() {
    let key = 'A';
    const used = this.tileMapping;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+?';
    for (let i = 0; i < chars.length; i++) {
      if (!used[chars[i]]) {
        key = chars[i];
        break;
      }
    }
    while (used[key]) {
      key = String.fromCharCode((key.charCodeAt(0) + 1) % 127);
      if (key.length !== 1 || key < ' ') key = 'A';
    }
    this.tileMapping[key] = { tile: 0 };
    this.selectedKey = key;
    this.saveState();
    this.refreshSidebarList();
    this.populateForm();
  }

  duplicateItem(key) {
    const source = this.tileMapping[key];
    if (!source) return;
    const clone = JSON.parse(JSON.stringify(source));
    let newKey = key;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+?';
    for (let i = 0; i < chars.length; i++) {
      if (!this.tileMapping[chars[i]]) {
        newKey = chars[i];
        break;
      }
    }
    if (this.tileMapping[newKey]) return;
    this.tileMapping[newKey] = clone;
    this.selectedKey = newKey;
    this.saveState();
    this.refreshSidebarList();
    this.populateForm();
  }

  deleteItem(key) {
    delete this.tileMapping[key];
    const keys = Object.keys(this.tileMapping).sort();
    this.selectedKey = keys.length ? keys[0] : null;
    this.saveState();
    this.refreshSidebarList();
    this.populateForm();
  }
}

/*@webcogs_build 0.6.0 openai-gpt-5.4 2026-05-13T14:06:24.779Z
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
    * [.getMenuItems()](#AppCore+getMenuItems) ⇒
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

<a name="AppCore+getMenuItems"></a>

### appCore.getMenuItems() ⇒
Get the menu items to display with their routes.

**Kind**: instance method of [<code>AppCore</code>](#AppCore)  
**Returns**: an object with as keys the menu item names, and as values the route names.  
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
Return editable level definitions. This is an array of objects with the following properties:name: the name of the level type: the level type, which is the name of a map generator,tilemap: width and height of the tile map, given by an object { "nrtilesx": width, "nrtilesy": height}bg: name of the background texturewincond: The level's win condition. This is an object { type: [type of win condition], position: [optional position name], mask: [optional tile mask name] }.
	           Type is one of: "no_enemies", "no_pickups", "no_tiles_with_mask", or "player_reaches".
			   For no_tiles_with_mask, the mask parameter has to be supplied, which is the tile mask name
			   For player_reaches, the position parameter has to be supplied, which can be one of: "top", "botton", "left", "right".options: an options object containing key-value pairs, which are numbers, strings, or booleans.

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
Returns entity info as an object with as keys the entity names and as values the entity properties {prompt: [prompt text]}.

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

Do not try to write any files, this will be taken care of by the system.

Form fields, labels, and buttons should be left-aligned.

For all edit functions that allow editing multiple items, show the list of items with summaries and delete item / duplicate item buttons in the side_bar. List items should be shown as blocks which can be clicked to select the item. Unselected items are shown in grey, selected in light blue.   Do not show any prompts in the item summaries.

For levels, sprites, tilemapping, sounds, you can edit the data structure obtained through the getter functions directly. 

For entities, maps, and particles, use the core get, set, and remove functions to read and write the data.

Sound selector should be a dropdown with the available sounds.

onCreate and onRemove properties are optional. Make them optional in the user interface via an enabled checkbox, only show details when enabled.  Within onCreate and onRemove, sound and particle are optional.  Also show an enabled checkbox here, with details shown only when enabled.



# Base styles

:root {
  --text-color: #000;
  --main-bg-color: #fff;
  --button-bg-color: #bbf;
  --button-text-color: #006;
  --highlight-ticket-bg-color: #fcc;
  --mainmenu-item-selected-bg-color: #88f;
}
body {
	margin: 0;
	padding: 0;
	font-size: 18px;
}

\/* Use UL/LI with the following classes for mainmenu *\/
ul.mainmenu {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 8px;
  padding: 0px;
  padding-left: 90px;
  background-image: url('../images/logo40-title.png');
  background-repeat: no-repeat;
  background-position: 0% 50%;
}
li.mainmenu-item {
  cursor: pointer;
  padding: 10px 5px;
  user-select: none;
  color: #fff;
}

@media (max-width: 700px) {
    ul.mainmenu {
        display: block;
        height: auto;
        background: none;
        padding-left: 0px;
    }
}

input[type="text"], input[type="email"], input[type="password"] {
  width: 100%;
  min-width: 300px;
}

select {
  background-color: var(--button-bg-color);
  font-size: 18px;
  border: 2px solid #88c;
  padding: 4px;
  margin: 4px;
  border-radius: 4px;
}

button {
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  padding: 4px 12px;
  font-size: 18px;
  cursor: pointer;
  border: 2px solid #88c;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
}

\/* menu title style *\/
.menu-title {
	width: 100%;
	font-size: 24px;
	text-align: center;
}

\/* Use the following CSS classes for tiles in the tile menus *\/
.menutile-container {
	width: 45%;
	display: inline-block;
	padding-left: 8px;
	padding-top: 8px;
}
\/* Put a div with this class inside .menutile-container *\/
.menutile {
	position: relative;

}
\/* image inside tile *\/
.menutile img {
	width: 98%;
	height: 98%;
	position: absolute;
}
\/* tile text *\/
.menutile .text {
	width: 98%;
	text-align: center;
	background-color: rgba(255,255,255,0.7);
	position: absolute;
	bottom: 14px;
	font-size: 20px;
}

.menutile.empty-add:after {
	content: "+";
}

\/* use this for all camera buttons *\/
button.camera {
	width: 64px;
	height: 56px;
	line-height: 48px;
	font-size: 48px;
	display: inline-block;
	content: "📷";
	padding: 0px;
	position: absolute;
}

\/* Use for 'klaar met aanpassen' button *\/
.menutile-done-button {
	position: fixed;
	right: 16px;
	bottom: 16px;
	z-index: 200;
	background-color: rgba(255,0,0,0.4);
}


\/* use this for all delete buttons *\/
button.delete {
	width: 56px;
	height: 56px;
	line-height: 48px;
	font-size: 48px;
	display: inline-block;
	content: "🗑️";
	padding: 0px;
	position: absolute;
}

\/* use this for edit tile buttons *\/
button.edit {
	width: 56px;
	height: 56px;
	line-height: 48px;
	font-size: 48px;
	display: inline-block;
	content: "✏️";
	padding: 0px;
	position: absolute;
}

.humanfigure {
	\/* orig: 300x800 *\/
	width: 200px;
	height: 500px;
	background-size: contain;
	background-image: url('../images/humanfigure-300x800.jpg');
	cursor: crosshair;
}

.pain_0, .pain_1, .pain_2, .pain_3 {
	width: 64px;
	height: 64px;
	cursor: pointer;
	background-size: contain;
}

.pain_0 {
	background-color: 5abd4c;
	background-image: url('../images/icon_pain_0.png');
}
.pain_1 {
	background-color: f8cd35;
	background-image: url('../images/icon_pain_1.png');
}
.pain_2 {
	background-color: f89931;
	background-image: url('../images/icon_pain_2.png');
}
.pain_3 {
	background-color: e84a3e;
	background-image: url('../images/icon_pain_3.png');
}

@webcogs_user_prompt
Write a module that displays in nav_bar that shows a horizontal menu that routes to the different modules, based on getMenuItems(). Highlight menu items when clicked.
@webcogs_end_prompt_section*/
export class NavMenu {
  constructor(core, params) {
    this.core = core;
    this.params = params || {};
    this.menuItems = this.core.getMenuItems ? this.core.getMenuItems() : {};
    this.selectedRoute = this.params.selectedRoute || null;

    this.root = this.core.mount(
      'nav_bar',
      this.renderHtml(),
      this.renderCss()
    );

    this.bindEvents();
  }

  renderHtml() {
    var items = [];
    for (var label in this.menuItems) {
      if (Object.prototype.hasOwnProperty.call(this.menuItems, label)) {
        var route = this.menuItems[label];
        var selectedClass = this.selectedRoute === route ? ' selected' : '';
        items.push(
          '<li class="mainmenu-item' + selectedClass + '" data-route="' + this.escapeAttr(route) + '">' +
            this.escapeHtml(label) +
          '</li>'
        );
      }
    }
    return '' +
      '<ul class="mainmenu">' +
        items.join('') +
      '</ul>';
  }

  renderCss() {
    return '' +
      'ul.mainmenu { background-color: #44a; }' +
      'li.mainmenu-item.selected {' +
        'background-color: var(--mainmenu-item-selected-bg-color);' +
        'border-radius: 4px;' +
      '}' +
      'li.mainmenu-item:hover {' +
        'background-color: rgba(255,255,255,0.2);' +
        'border-radius: 4px;' +
      '}';
  }

  bindEvents() {
    var self = this;
    var items = this.root.querySelectorAll('.mainmenu-item');
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function() {
        var route = this.getAttribute('data-route');
        self.setSelected(route);
        self.core.route(route, {});
      });
    }
  }

  setSelected(route) {
    this.selectedRoute = route;
    var items = this.root.querySelectorAll('.mainmenu-item');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.getAttribute('data-route') === route) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    }
  }

  escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  escapeAttr(value) {
    return this.escapeHtml(value);
  }
}

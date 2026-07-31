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


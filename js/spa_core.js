// Note: the JSDoc is used to give instructions to the AI for creating modules.
//       @private is used to hide irrelevant parts from the AI.
/**
SPACore is the core API class for a single page application. 

In this SPA architecture, a SPA is made up out of modules. A module is a user interface component that can interact with the user via one or more HTML widgets, and process information.  A module is always defined as a single export class, and should be written in vanilla Javascript. Always define the class as an "export class". Do not assume any libraries are available.  For example, do not use jquery.  The class constructor always has this signature: 
constructor(core, params). Parameter "core" is the SPACore object, and params is an object with named parameters. 
Through the core object, a module can mount HTML widgets (core.mount) and invoke the core router (core.route). 

A module class is constructed when the app invokes the module, and can be destroyed and constructed any number of times during the app's lifecycle.

*/
class SPACore {

	routeCallback = null;
	mountCallback = null;
	baseStyleUrls = null;
	loadedModules = {};
	persistentVars = {}; // varname -> true
	persistentValues = {}; // varname -> value

	constructor(routeCallback,mountCallback,baseStyleUrls) {
		this.routeCallback = routeCallback;
		this.mountCallback = mountCallback;
		this.baseStyleUrls = baseStyleUrls;
	}

	/** @private
	 * Make a parameter with a given name persistent or disable persistence. This means the parameter will be stored in persistentValues when a route call contains a parameter with the given name.  The value is then automatically added to all route calls.
	 */
	makePersistent(varname,enable) {
		if (enable) {
			this.persistentVars[varname] = true
		} else {
			delete this.persistentVars[varname]
			delete this.persistentValues[varname]

		}
	}

	/** @private
	 * Extract persistent values from parameters, and add missing values from persistentValues to params. If a params key is defined that is in persistentVars, add it to persistentValues. Any persistentValues are added to parans. If a key is already defined, value is not replaced.
	 */
	processPersistent(params) {
		// extract persistent values
		for(var key in params) {
			if (this.persistentVars[key]) {
				this.persistentValues[key] = params[key]
			}
		}
		// insert persistent values
		for(var key in this.persistentValues) {
			if (typeof params[key] == 'undefined') {
				params[key] = persistentValues[key]
			}
		}
		return params
	}

    /** Shows a widget to the user by mounting the given HTML in a shadow DOM, on the elementID given by the location parameter.  Returns the shadow root element, which should be used to query the HTML inside the widget.  It is possible for a module to have multiple widgets, or none.
     * @param {string} location - A location string. The complete set of available locations is defined elsewhere. Use only the provided locations.
     * @param {string} html_code - a string with a plain vanilla HTML snippet that contains the user interface for the widget
     * @param {string} css_code - corresponding styling for html_code.  This should be a CSS snippet.  The \<style\> tag should not be included.
	 * @return {HTMLElement} - the root element on which the widget was mounted
     */
	mount(location, html_code, css_code) {
		if (this.mountCallback) {
			return this.mountCallback(location,html_code,css_code)
		} else {
			return this.mountShadowDom(location,html_code,css_code)
		}
	}

    /** @private
	 *  Mounts the supplied HTML and CSS code into a Shadow DOM attached to the given element.
     * @param {string} location - The id of the target HTML element.
     * @param {string} html_code - The HTML code to be rendered inside the Shadow DOM.
     * @param {string} css_code - The CSS code to be applied within the Shadow DOM.
	 * @return {htmlElement} - the shadow root
     */
	mountShadowDom(location, html_code, css_code) {
        const host = document.getElementById(location);
        if (!host) return;
		// purge any old shadow root and any event listeners by cloning host node
		const newHost = host.cloneNode(false);
        const shadow = /*host.shadowRoot ||*/ newHost.attachShadow({ mode: 'open' });
        //shadow.innerHTML = '';
		if (this.baseStyleUrls) {
			for (var i=0; i<this.baseStyleUrls.length; i++) {
				const baseLink = document.createElement('link');
				baseLink.setAttribute('rel', 'stylesheet');
				baseLink.setAttribute('href', this.baseStyleUrls[i]);
				shadow.appendChild(baseLink);
			}
		}
        if (css_code) {
            const style = document.createElement('style');
            style.textContent = css_code;
            shadow.appendChild(style);
		}
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html_code;
        shadow.appendChild(wrapper);
  		host.replaceWith(newHost);
		return shadow;
    }
	
    /** @private
	 * Unmounts the content within the Shadow DOM attached to the given element, effectively clearing it.
     * @param {string} location - The id of the target HTML element.
     */
    unmountShadowDom(location) {
        const host = document.getElementById(location);
        if (!host || !host.shadowRoot) return;
        host.shadowRoot.innerHTML = '';
    }

	/** Invoke the core router. Default implementation is to invoke the module named "location".
	 * @param {string} location - a string that indicates where to route to
	 * @param {object} params - key-value pairs denoting named parameters
	 */
	route(location,params) {
		this.processPersistent(params)
		if (this.routeCallback) {
			this.routeCallback(location,params)
		} else {
			this.initModule(route, params)
		}
	}

	/** @private
	 * Load module from JS file
	 * @param {string} path - location of JS file
	 * @param {string} name - name to give to the module
	 * @param {object} target_obj - object to store the module in, null = this.loadedModules
	 */
	async loadModule(path, name, target_obj) {
		if (typeof target_obj == "undefined") {
			target_obj = this.loadedModules
		}
		try {
			//console.log(`Loading module ${name}...`)
			const module = await import(path+"?t="+Date.now())
			var loadedSyms = 0
			for (const key in module) {
				//if (typeof target_obj[name] != "undefined") {
				//	console.error(`Module named ${name} already loaded.`)
				//	return;
				//}
				console.log(`Loaded module ${name}.`)
				console.log(module[key])
				target_obj[name] = module[key]
				loadedSyms += 1
			}
			if (loadedSyms != 1) {
				console.error(`Unexpected number of symbols in module ${name}: ${loadedSyms}`)
			}
        } catch (error) {
            console.error(`Failed to load module ${path}:`, error)
        }
	}

    /** @private
	 * Load multiple modules from a manifest JSON file.
     * @param {string} manifest_path - Path to the manifest JSON file.
	 * @param {object} target_obj - object to store the module in, null = this.loadedModules
     */
    async loadModules(app_basedir,manifest_path,target_obj) {
        try {
            const res = await fetch(manifest_path);
            if (!res.ok) {
                throw new Error(`Failed to load manifest: ${res.statusText}`);
            }

            const manifest = await res.json();
            const { wd, targets } = manifest;

            if (Array.isArray(targets)) {
                for (const target of targets) {
                    const { file, name } = target;
					// XXX absolute path will only work if manifest is read from the same root as the web server
					const fullpath = `${app_basedir}/${wd}${file}`
					console.log(fullpath)
                    await this.loadModule(fullpath, name, target_obj);
                }
            } else {
                console.error("Manifest targets should be an array.");
            }
        } catch (error) {
            console.error('Error loading modules from manifest:', error);
        }
    }
	
	// hack to get the name of a module being constructed
	_loadingModule = null

	/** @private
	 * Init a previously loaded module. Constructs the class; passes any custom arguments on to the class constructor.
	 * @param {string} name - the name given to the module at load time
	 * @param {object} params - key-value pairs denoting named parameters
	 * @return {object} - the created instance, or null on failure
	 */
	initModule(name,params) {
		console.log(`Called initModule ${name} with ${JSON.stringify(params)}`)
		if (this.loadedModules[name]) {
			this._loadingModule = name
			var module = new this.loadedModules[name](this,params)
			module._moduleName = name
			this._loadingModule = null
			return module
		} else {
			console.error(`Cannot find module ${name}`)
			return null
		}
	}

	/** Save a module's state.
	 * @param {object} Instance of module
	 * @param {object} An object containing state information
	*/
	saveModuleState(module,state) {
		var moduleName = this._loadingModule
		if (module._moduleName) moduleName = module._moduleName
		localStorage.setItem(`cogs_spa_core_modulestate_${moduleName}`, JSON.stringify(state))
		console.log(`Saving module state ${moduleName} ${JSON.stringify(state)}`)
	}

	/** Load a module's state.
	 * @param {object} Instance of module
	 * @return {object} The state information object previously saved with saveModuleState, or null if no state
	*/
	loadModuleState(module) {
		var moduleName = this._loadingModule
		if (module._moduleName) moduleName = module._moduleName
		var statejson = localStorage.getItem(`cogs_spa_core_modulestate_${moduleName}`, )
		return JSON.parse(statejson)
	}
}

export {SPACore};
//
//if (typeof module == "object") {
//	module.exports = {SPACore}
//}
// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash',
	'path',
	'callsite'
],
function(_, path, callsite) {
	'use strict';

	function non_throwing_require(file_path) {
		try {
			return require(file_path);
		}
		catch(e) {
			if(e.code !== 'MODULE_NOT_FOUND')
				console.error('easyconf require error for "' + file_path + '" :', e);
			return null;
		}
	}

	function Store(source, options) {
		// save params
		this.source = source;
		this.options = options || {};

		this.description = ''; //< debugging description of this store

		// final data
		this.data = {}; //< final data
		this.file_full_path = null; //< optional, full resolved path of file read (if .source was a file)

		this.load();
	}

	Store.prototype.explain = function(name) {
		console.log('store ' + name, this.description, this.options);
		console.log('store ' + name, this.data);
	};

	Store.prototype.load = function() {
		if(this.source instanceof Store) {
			// copy construct
			this._load_from_another_store(this.source);
		}
		else if(_.isObject(this.source)) {
			this._load_from_object(); // direct
		}
		else if(_.isString(this.source)) {
			// most likely a file
			console.log('working on file :', this.source, this.options.calldir);

			// harmonize path
			var target_absolute_path = this.source;
			if(! path.isAbsolute(target_absolute_path)) {
				var caller_site = callsite()[1 + (this.options.callSiteShift || 0)];
				var calldir = this.options.calldir || path.dirname(caller_site.getFileName());
				target_absolute_path = path.join( calldir, target_absolute_path );
			}
			this.file_full_path = target_absolute_path;

			if(path.basename(target_absolute_path) === 'environmentalist.json')
				this._load_from_env();
			else
				this._load_from_file();
		}
		else {
			throw new Error('easyconfig store load() : unrecognized source !');
		}
	};

	////////////////////////////////////
	Store.prototype._load_from_object = function() {
		// direct, with a copy
		this.data = _.cloneDeep(this.source);
		this.description = 'direct data';
	};

	Store.prototype._load_from_file = function() {
		var data = non_throwing_require(this.file_full_path);
		if(data === null)
			throw new Error('easyconf store : couldn’t find the given file "' + this.file_full_path + '" !');

		if(data instanceof Store) {
			this._load_from_another_store(data);
			return;
		}

		this.data = _.cloneDeep(data);
		this.description = 'direct file';

		// is there a pattern hinting at more optional files ?
		/*if(this.options.pattern)
			this._addPatternFiles();*/
	};
/*
	Store.prototype._addPatternFiles = function() {
		if(this.options.pattern !== 'env+local')
			throw new Error('easyconf : unknown pattern "' + this.options.pattern + '" !');

		// extract the extension
		var extension = path.extname(this.);

		// get the basename (without extension)
		var confRadix = confPath.slice(0, -extension.length);

		// get env
		var env = this.get('env') || process.env.NODE_ENV || 'development';
		console.log('detecting env from easyconf (c,p,f)', this.get('env'), process.env.NODE_ENV, env);


		// load the candidates
		var envConfPath = confRadix + '.' + env + extension;
		var env_data = non_throwing_require(envConfPath);
		//if(env_data === null) console.warn('easyconf : couldn’t find the given file "' + envConfPath + '" either in absolute or in relative !');
		if(env_data !== null) this._addStore( env_data, 'patterned file "' + envConfPath + '"', options);

		var envLocalConfPath = confRadix + '.' + env + '.local' + extension;
		var env_local_data = non_throwing_require(envLocalConfPath);
		//if(env_local_data === null) console.warn('easyconf : couldn’t find the given file "' + envLocalConfPath + '" either in absolute or in relative !');
		if(env_local_data !== null) this._addStore( env_local_data, 'patterned file "' + envLocalConfPath + '"', options);
	};
*/
	Store.prototype._load_from_env = function() {
		var required_missing = false; // missing required entries, empty so far
		var data = {};
		var environmentalist_spec = non_throwing_require(this.file_full_path);

		environmentalist_spec.forEach(function(env_var_spec) {
			data[env_var_spec.name] = process.env[env_var_spec.name];

			if(env_var_spec.easyconf_alias) {
				data[env_var_spec.easyconf_alias] = data[env_var_spec.name];
			}

			// NO we don't use the "default" environmentalist field
			// since it's not how it works.

			if(env_var_spec.required && _.isUndefined(data[env_var_spec.name])) {
				console.warn('* Missing env var "' + env_var_spec.name + '" (' + env_var_spec.description + '), please define it : export ' + env_var_spec.name + '=...');
				required_missing = true;
			}
		});

		if(required_missing /*&& ! this.options.nothrow*/) {
			throw new Error('easyconf store : Missing required env vars !');
		}

		this.data = data;
		this.description = 'environmentalist spec and corresponding env vars';
	};

	////////////////////////////////////

	Store.prototype._load_from_another_store = function(store) {
		// copy final data only
		this.description    = store.description;
		this.data           = store.data;
		this.file_full_path = store.file_full_path;
	};

	return Store;
});

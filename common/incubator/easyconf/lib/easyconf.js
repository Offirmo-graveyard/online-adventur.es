// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash',
	'./get-set',
	'path',
	'callsite',
],
function(_, get_set, path, callsite) {
	'use strict';
	var get = get_set.get;


	function safeRequire(filePath) {
		try {
			return require(filePath);
		}
		catch(e) {
			if(e.code !== 'MODULE_NOT_FOUND') console.error('easyconf require error for "' + filePath + '" :', e);
			return null;
		}
	}


	function Easyconf(options) {
		this.separator = ':';
		this._stores = [];
		this._aggregated = {};
	}

	////////////////////////////////////
	Easyconf.prototype.get = function(propertyPath) {
		return get(this._aggregated, propertyPath, this.separator);
	};

	Easyconf.prototype.set = function(propertyPath, value) {
		// todo
	};

	Easyconf.prototype.explain = function() {
		this._stores.forEach(function(store, index) {
			console.log('store #' + index, store.description, store.options);
			console.log('store #' + index, store.data);
		});
	};


	Easyconf.prototype.add = function(stuff, options) {
		options = options || {};
		// Immediately extract parent callsite if not explicitely provided.
		// (This is to ease path stuff for the user)
		options.calldir = options.calldir || path.dirname(callsite()[1].getFileName());

		if(_.isObject(stuff)) {
			// direct
			this._addObject(stuff, options)
		}
		else if(_.isString(stuff)) {
			// most likely a file
			this._addFile(stuff, options);
		}
		else {
			throw new Error('easyconfig.add() unrecognized data !');
		}
		return this;
	};



	////////////////////////////////////
	Easyconf.prototype._addFile = function(confPath, options) {
		//console.log('working on file :', confPath, options.calldir);

		// harmonize path
		if(! path.isAbsolute(confPath)) {
			var calldir = options.calldir || path.dirname(callsite()[2].getFileName());
			confPath = path.join( calldir, confPath );
		}

		// different kind of files...
		var basename = path.basename(confPath);

		if(basename === 'environmentalist.json') {
			this._addEnv(confPath, options);
		}
		else {
			var data = safeRequire(confPath, options.calldir);
			if(data === null) throw new Error('easyconf : couldn’t find the given file "' + confPath + '" either in absolute or in relative (to "' + options.calldir +'"!');
			if(data instanceof Easyconf)
				this._addEasyconf(data, options);
			else
				this._addStore( data, 'direct file "' + confPath + '"', options);

			// is there a pattern hinting at more optional files ?
			if(options.pattern)
				this._addPatternFiles(confPath, options);
		}
	};

	Easyconf.prototype._addPatternFiles = function(confPath, options) {
		if(options.pattern !== 'env+local') throw new Error('easyconf : unknown pattern "' + options.pattern + '" !');

		// extract the extension
		var extension = path.extname(confPath);

		// get the basename (without extension)
		var confRadix = confPath.slice(0, -extension.length);

		// get env
		var env = this.get('env') || process.env.NODE_ENV || 'development';


		// load the candidates
		var envConfPath = confRadix + '.' + env + extension;
		var env_data = safeRequire(envConfPath, options.calldir);
		//if(env_data === null) console.warn('easyconf : couldn’t find the given file "' + envConfPath + '" either in absolute or in relative !');
		if(env_data !== null) this._addStore( env_data, 'patterned file "' + envConfPath + '"', options);

		var envLocalConfPath = confRadix + '.' + env + '.local' + extension;
		var env_local_data = safeRequire(envLocalConfPath, options.calldir);
		//if(env_local_data === null) console.warn('easyconf : couldn’t find the given file "' + envLocalConfPath + '" either in absolute or in relative !');
		if(env_local_data !== null) this._addStore( env_local_data, 'patterned file "' + envLocalConfPath + '"', options);
	};

	Easyconf.prototype._addEnv = function(envSpecPath, options) {
		var required_missing = false; // so far
		var data = {};
		var environmentalistSpec = safeRequire(envSpecPath, options.calldir);

		environmentalistSpec.forEach(function(envVarSpec) {
			data[envVarSpec.name] = process.env[envVarSpec.name];

			if(envVarSpec.easyconf_alias) {
				data[envVarSpec.easyconf_alias] = data[envVarSpec.name];
			}

			// NO we don't use the "default" environmentalist field
			// since it's not how it works.

			if(envVarSpec.required && _.isUndefined(data[envVarSpec.name])) {
				console.warn('* Missing env var "' + envVarSpec.name + '" (' + envVarSpec.description + '), please define it : export ' + envVarSpec.name + '=...');
				required_missing = true;
			}
		});

		if(required_missing && ! options.nothrow) {
			throw new Error('easyconf : Missing required env vars !');
		}
		this._addStore( data, 'environmentalist env vars from "' + envSpecPath + '"', options);
	};

	////////////////////////////////////
	Easyconf.prototype._addObject = function(data, options) {
		if(data instanceof Easyconf) {
			this._addEasyconf(data, options);
		}
		else {
			// direct, with a copy
			this._addStore(_.cloneDeep(data), 'direct data', options);
		}
	};

	Easyconf.prototype._addEasyconf = function(easyConfig, options) {
		var that = this;
		// grab data, store by store
		easyConfig._stores.forEach(function(store) {
			that._addStore(_.cloneDeep(store.data), '[easy>] ' + store.description, store.options);
		});
	};

	////////////////////////////////////
	Easyconf.prototype._addStore = function(data, description, options) {
		if (! _.isObject(data)) throw new Error('easyconfig internal error [_addStore] !');

		this._stores.push({
			data: data,
			description: description,
			options: options
		});

		//console.log('adding conf data', data);
		_.merge(this._aggregated, data);
	};



	return {
		create: function (options) {
			return new Easyconf(options);
		}
	};
});

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash',
	'./get-set',
	'path',
	'callsite',
	'./store'
],
function(_, get_set, path, callsite, Store) {
	'use strict';
	var get = get_set.get;

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
		// todo. needed ?
	};

	Easyconf.prototype.explain = function() {
		this._stores.forEach(function(store, index) {
			store.explain('#' + index);
		});
	};

	////////////////////////////////////
	Easyconf.prototype.add = function(source, options) {
		options = options || {};
		// Immediately extract parent call site if not explicitly provided.
		// (This is to ease path stuff for the user)
		options.calldir = options.calldir || path.dirname(callsite()[1].getFileName());

		if(source instanceof Easyconf) {
			// copy stores one by one
			var that = this;
			source._stores.forEach(function(store) {
				that._addStore(new Store(store, options));
			});
		}
		else {
			var store = new Store(source, options);
			this._addStore(store);
		}

		return this;
	};

	////////////////////////////////////
	Easyconf.prototype._addStore = function(store) {
		if (! _.isObject(store.data)) throw new Error('easyconfig internal error [_addStore] !');

		this._stores.push(store);

		console.log('adding conf data', store.data);
		_.merge(this._aggregated, store.data);
	};


	return {
		create: function (options) {
			return new Easyconf(options);
		}
	};
});

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash'
],
function(_) {
	'use strict';

	function Easyconf() {
		this.data_layers = [];
		this.aggregated = {};
	}

	Easyconf.prototype._addLayer = function(data, options) {
		this.data_layers.push({
			data: data,
			options: options
		});

		_.defaults(this.aggregated, data);
	};

	Easyconf.prototype.add = function(stuff, options) {
		if(_.isObject(stuff)) {
			this._addRaw()
		}
		return this;
	};

	Easyconf.prototype._addRaw = function(data, options) {
		this._addLayer(data, options);
	};



	return {
		create: function () {
			return new Easyconf();
		}
	};
});

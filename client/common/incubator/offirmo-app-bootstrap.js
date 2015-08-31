/**
 * Factoring some base stuff.
 */
console.log('Loading require js bootstrap…');

define([
	'angular'
], function (angular) {
	'use strict';

	console.log('executing require js bootstrap...');
	var global_module_instance;

	window.offirmo_app = {
		server_title: document.title,
		global_ng_module: undefined, // for now
		global_ng_module_dependencies: [] // default
	};

	// angular modules simplified ;-)
	// nothing will execute before trying to access window.global_ng_module
	Object.defineProperty(window.offirmo_app, 'global_ng_module', {
		enumerable: true, // why not ?
		set: function() {
			throw new Error('You can’t assign window.global_ng_module !');
		},
		get: function() {
			if(global_module_instance) return global_module_instance; // already OK
			console.log('building global ng module...');
			global_module_instance = angular.module(
				'global_ng_module',
				window.offirmo_app.global_ng_module_dependencies
			);
			return global_module_instance;
		}
	});

	console.log('require js bootstrap fully executed');
	return window.offirmo_app;
});

console.log('require js bootstrap parsed.');

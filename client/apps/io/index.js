console.log('loading i/o index js...');

window.offirmo_app_global_ng_module_dependencies = [];

define([
	'lodash',
	'carnet',
],
function(_, Carnet) {
	'use strict';

	console.log('executing root js...');

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	window.offirmo_loader.change_stage(2);
});

console.log('Loaded i/o index js.');

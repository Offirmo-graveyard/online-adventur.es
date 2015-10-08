console.log('loading i/o index js...');

window.offirmo_app_global_ng_module_dependencies = [];

define([
	'lodash',
	'carnet',
	'primus'
],
function(_, Carnet, primus) {
	'use strict';

	console.log('executing root js...');

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	window.offirmo_loader.change_stage(2);

	// connect to current URL
	var primus = Primus.connect()

	primus.on('open', function () {
		console.log('* primus : connected to server.');
	});

	primus.on('data', function(data) {
		console.log('* primus : data received from server :', data);
	});
});

console.log('Loaded i/o index js.');

define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'jquery',
	'boringrpg/lib/state-tree',
],
function(offirmo_app, _, Rx, $, state_tree) {
	'use strict';

	var screen_size_cursor = state_tree.select('view', 'screen', 'size');

	function on_screen_size_update() {
		var screen_size = screen_size_cursor.get();

		console.log('XXX on_screen_size_update : recomputing game content layout…', screen_size);
	}

	//on_screen_size_update();
	screen_size_cursor.on('update', on_screen_size_update);
});

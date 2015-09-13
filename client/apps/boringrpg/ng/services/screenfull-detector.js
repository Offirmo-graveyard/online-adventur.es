define([
	'offirmo-app-bootstrap',
	'lodash',
	'screenfull',
	'client/apps/boringrpg/ng/services/state-tree/state-tree',
],
function(offirmo_app, _, screenfull) {
	'use strict';

	offirmo_app.global_ng_module
	.service('screenfullDetector', ['stateTree', function (state_tree) {
		console.log('installing screenfullDetector...');

		var view_cursor = state_tree.select('view');

		function update_fullscreen_state() {
			console.log('New fullscreen state detected : ' + (screenfull.isFullscreen ? '' : 'not ') + 'in full screen');
			view_cursor.set('fullscreen', screenfull.isFullscreen);
		}

		if (screenfull.enabled) {
			document.addEventListener(screenfull.raw.fullscreenchange, update_fullscreen_state);
			document.addEventListener(screenfull.raw.fullscreenerror, function (event) {
				console.error('Failed to enable fullscreen', event);
			});
		}
		update_fullscreen_state();
	}]);
});
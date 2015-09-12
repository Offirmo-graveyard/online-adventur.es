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

		if (screenfull.enabled) {
			document.addEventListener(screenfull.raw.fullscreenchange, function () {
				//console.log('Am I fullscreen? ' + (screenfull.isFullscreen ? 'Yes' : 'No'));
				view_cursor.set('fullscreen', screenfull.isFullscreen);
			});
			document.addEventListener(screenfull.raw.fullscreenerror, function (event) {
				console.error('Failed to enable fullscreen', event);
			});
		}
		view_cursor.set('fullscreen', screenfull.isFullscreen);
	}]);
});

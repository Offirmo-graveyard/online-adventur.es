define([
	'lodash',
	'screenfull',
	'boringrpg/lib/state-tree',
],
function(_, screenfull, state_tree) {
	'use strict';

	//console.log('installing screenfullDetector...');

	var view_cursor = state_tree.select('view');

	function update_fullscreen_state() {
		console.info('* screenfullDetector : New fullscreen state detected : ' + (screenfull.isFullscreen ? '' : 'NOT ') + 'in full screen');
		view_cursor.set('fullscreen', screenfull.isFullscreen);
	}

	if (screenfull.enabled) {
		document.addEventListener(screenfull.raw.fullscreenchange, update_fullscreen_state);
		document.addEventListener(screenfull.raw.fullscreenerror, function (event) {
			console.error('Failed to enable fullscreen', event);
		});
	}
	update_fullscreen_state();
});

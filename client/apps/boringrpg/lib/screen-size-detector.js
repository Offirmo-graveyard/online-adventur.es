define([
	'lodash',
	'rx',
	'jquery',
	'boringrpg/lib/state-tree',
],
function(_, Rx, $, state_tree) {
	'use strict';

	//console.log('installing screenSizeDetector...');

	var screen_size_cursor = state_tree.select('view', 'screen', 'size');

	var observable_screen_size = Rx.Observable.create(function(observer) {
		// http://stackoverflow.com/questions/2996431/detect-when-a-window-is-resized-using-javascript
		var window_elt = $(window);

		// initial value
		observer.onNext([ window_elt.width(), window_elt.height() ]);

		// dynamic value
		window_elt.resize(function() {
			observer.onNext([ window_elt.width(), window_elt.height() ]);
		});
	});

	observable_screen_size
	.throttle(200) // ms
	.distinctUntilChanged()
	.subscribe(function(new_screen_size) {
		console.info('screenSizeDetector : new stable screen size detected :', new_screen_size);
		screen_size_cursor.set(new_screen_size);
	});
});

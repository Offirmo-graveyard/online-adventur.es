define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'jquery',
	'boringrpg/lib/state-tree',
],
function(offirmo_app, _, Rx, $, state_tree) {
	'use strict';

	offirmo_app.global_ng_module
	.service('screenSizeDetector', ['$rootScope', function ($rootScope) {
		console.log('installing screenSizeDetector...');

		var view_cursor = state_tree.select('view');

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
			console.log('new screen size detected :', new_screen_size);
			view_cursor.set('screen_size', new_screen_size);
			// not pretty but will do for now :
			// try to help famo.us to correctly repaint the screen
			$rootScope.$evalAsync();
		});
	}]);
});

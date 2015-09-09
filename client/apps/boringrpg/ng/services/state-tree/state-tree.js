/** This app global state
 */
define([
	'offirmo-app-bootstrap',
	'lodash',
	'jquery',
	'baobab',
	'rx',
	'screenfull',
	'css!client/apps/boringrpg/ng/directives/app/content/content.css'
],
function(offirmo_app, _, $, Baobab, Rx, screenfull) {
	'use strict';

	offirmo_app.global_ng_module
	.service('stateTree', ['$rootScope', function ($rootScope) {

		function debug_observable(observable, name) {
			observable.subscribe(
				function (x) {
					console.log('@' + name + ' - Next:', x);
				},
				function (err) {
					console.log('@' + name + ' - Error:', err);
				},
				function () {
					console.log('@' + name + ' - Completed.');
				}
			);
		}

		// state, as a baobab tree
		var state_tree = new Baobab({
			version: '0.0.1',
			view: {
				lang: 'en',
				fullscreen: undefined,
				screen_size: [0, 0],
				STATES: ['loading', 'loaded'],
				state: 'loading',
				// global layout
				layout: {
					STATES: ['loader', 'app', 'meta'],
					//state: 'meta',
					state: 'app',
					app: {
						// which tab is currently selected ?
						TABS: ['adventure', 'stuff', 'knowledge', 'social', 'achievements', 'chat'],
						selected_tab: 'adventure',
					}
				}
			},
			model: {

			}
		});

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
			.debounce(250 /* ms */)
			.distinctUntilChanged()
			.subscribe(function(new_screen_size) {
				console.log('new screen size detected :', new_screen_size);
				view_cursor.set('screen_size', new_screen_size);
				// not pretty but will do it for now
				// try to help famo.us to correctly repaint the screen
				$rootScope.$apply();
			});


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

		return state_tree;
	}]);
});

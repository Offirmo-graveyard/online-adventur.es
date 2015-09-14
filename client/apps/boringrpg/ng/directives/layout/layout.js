define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/layout/layout.html',
	//'css!client/apps/boringrpg/ng/directives/layout/layout.css',
	'boringrpg/ng/directives/app/layout/layout',
	'boringrpg/ng/directives/meta/layout/layout',
],
function(offirmo_app, _, Rx, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('layout', ['$q', '$famous', function ($q, $famous) {
		return {
			template: tpl,
			controller: ['$scope', function($scope) {
				var Transitionable = $famous['famous/transitions/Transitionable'];

				var APP_SCALE = 1;
				var META_SCALE = 0.85;
				var ZOOM_DURATION_MS = 200;
				var FLIP_DURATION_MS = 500;

				var scale_transitionable = new Transitionable(APP_SCALE);
				var cursor = state_tree.select('view', 'layout');
				var state_cursor = cursor.select('state');

				$scope.link = {};
				$scope.link.flipper_element_deferred = $q.defer();

				$scope.get_scale = function() {
					return scale_transitionable.get();
				};

				// initial state
				$scope.link.flipper_element_deferred.promise.then(function() {
					// by default, we're in app view
					// if not, update view without animation
					if(state_cursor.get() === 'meta') {
						scale_transitionable.set(META_SCALE);
						$scope.link.flipper_element.flip({duration : 0});
					}
				});

				// dynamic state
				var dynamic_source = Rx.Observable.create(function(observer) {
					state_cursor.on('update', function() {
						observer.onNext(state_cursor.get());
					});
				});
				dynamic_source.distinctUntilChanged().subscribe(on_state_change);

				function on_state_change(new_state) {
					switch (new_state) {
						case 'meta':
							go_to_meta();
							break;
						case 'app':
							go_to_app();
							break;
						default:
							console.error('???');
							break;
					}
				}

				function go_to_meta() {
					// unzoom
					scale_transitionable.set(META_SCALE, {
						curve: 'linear',
						duration: ZOOM_DURATION_MS
					}, function() {
						// then flip
						flip_meta(FLIP_DURATION_MS);
					});
				}

				function go_to_app() {
					// flip and zoom at the same time
					flip_meta(FLIP_DURATION_MS);
					scale_transitionable.set(APP_SCALE, {
						curve: 'linear',
						duration: ZOOM_DURATION_MS
					});
				}

				function flip_meta() {
					$scope.link.flipper_element.flip({
						curve : 'easeInOut', // easeOutBounce
						duration : FLIP_DURATION_MS
					});
				}
			}],
			link: function postLink(scope, iElement, iAttrs, controller) {

				scope.link.flipper_element = $famous.find('fa-flipper.meta-switcher')[0];
				scope.link.flipper_element_deferred.resolve(scope.link.flipper_element);

			}
		};
	}]);
});

define([
	'offirmo-app-bootstrap',
	'lodash',
	'moment',
	'humanize-duration',
	'boringrpg/lib/static-data/view/view',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/on-click',
	'text!client/apps/boringrpg/ng/directives/app/content/panels/adventure/adventure.html',
	'css!client/apps/boringrpg/ng/directives/app/content/panels/adventure/adventure.css'
],
function(offirmo_app, _, moment, humanizeDuration, view_static_data, state_tree, on_click, tpl) {
	'use strict';

	offirmo_app.global_ng_module.directive('appContentPanelAdventure', [
		'$timeout',
		'$q',
		'$famous',
		function ($timeout, $q, $famous) {
			return {
				scope: {},
				template: tpl,
				controller: ['$scope', function($scope) {
					var Transitionable = $famous['famous/transitions/Transitionable'];

					var last_click_cursor = state_tree.select('model', 'last_click');
					var model_cursor = state_tree.select('model');
					var lang_cursor = state_tree.select('view', 'locale');

					var VIEW_CONSTS = $scope.VIEW_CONSTS = view_static_data.layout.panels.adventure;

					var transitionables = $scope.transitionables = {
						message: {
							translate: new Transitionable([0, 0, 0]),
							rotate: new Transitionable(0),
							scale: new Transitionable(1)
						},
						play_button: {
							scale: new Transitionable(VIEW_CONSTS.button.normal_scale)
						}
					};

					var timer_off = true;
					var next_click_opening_moment_utc = null;
					$scope.timer_data = {
						delay_s: 0,
						humanized_delay: '...'
					};
					var localizedHumanizeDuration = null;
					var message_out_deferred = $q.defer();
					message_out_deferred.resolve(true); //init

					// we need to listen to locale change for reconfiguring humanizeDuration
					function update_locale() {
						localizedHumanizeDuration = humanizeDuration.humanizer({
							language: lang_cursor.get() || 'en'
						});
					}
					lang_cursor.on('update', update_locale);
					update_locale();

					// expose stats
					function update_exposed_stats() {
						$scope.$evalAsync(function () {
							$scope.model = model_cursor.get();
						});
					}
					model_cursor.on('update', update_exposed_stats);
					update_exposed_stats();

					function update_click_message() {
						message_out_deferred.promise.finally(function() {
							var click_data = last_click_cursor.get();
							//console.log('new click_data', click_data);
							$scope.click_data = click_data;
							$scope.click_gains = click_data.gained;
							$scope.click_message = click_data.msg;
							console.log(click_data);

							next_click_opening_moment_utc = click_data.date_moment_utc
								.clone()
								.add(click_data.wait_interval_s, 's');

							if (timer_off) {
								timer_off = false;
								update_timer();
							}

							$scope.$evalAsync(function () {
								transitionables.message.scale.set(0);
								transitionables.message.scale.set(1, {
									curve: 'linear',
									duration: VIEW_CONSTS.dialog.animations.in_duration_ms
								});
								transitionables.message.translate.set([$scope.dialog_size[0],0,0]);
								transitionables.message.translate.set([0, 0, 0], {
									curve: 'linear',
									duration: VIEW_CONSTS.dialog.animations.in_duration_ms
								});
								transitionables.message.rotate.set(8);
								transitionables.message.rotate.set(0, {
									curve: 'linear',
									duration: VIEW_CONSTS.dialog.animations.in_duration_ms
								});
							});
						});
					}
					last_click_cursor.on('update', update_click_message);
					update_click_message();

					function update_timer() {
						var now_utc = moment.utc();
						var delay_s = Math.max(0, Math.ceil( next_click_opening_moment_utc.diff(now_utc) / 1000. ));
						$scope.timer_data.delay_s = delay_s;
						//console.log(delay_s);
						if (delay_s <= 0) {
							timer_off = true;
						}
						else {
							$scope.timer_data.humanized_delay = localizedHumanizeDuration(delay_s * 1000);
							//console.log($scope.timer_data.humanized_delay);
							$timeout(update_timer, 1000);
						}
					}

					// Note : debounce to not penalty a user on natural rebound
					// mousedown = nothing except an animation
					$scope.mousedown = _.debounce(function (src) {
						//console.log('mousedown', src);
						// click is not sent here, @see mouseup

						transitionables.play_button.scale.set(VIEW_CONSTS.button.normal_scale);
						transitionables.play_button.scale.set(VIEW_CONSTS.button.pressed_scale, {
							curve: 'easeOutBounce',
							duration: VIEW_CONSTS.button.animations.press_duration_ms
						});

						message_out_deferred = $q.defer();
						transitionables.message.scale.set(1);
						transitionables.message.scale.set(0, {
							curve: 'linear',
							duration: VIEW_CONSTS.dialog.animations.out_duration_ms
						});
						transitionables.message.translate.set([0,0,0]);
						transitionables.message.translate.set([-$scope.dialog_size[0], 0, 0], {
							curve: 'linear',
							duration: VIEW_CONSTS.dialog.animations.out_duration_ms
						});
						transitionables.message.rotate.set(0);
						transitionables.message.rotate.set(-8, {
							curve: 'linear',
							duration: VIEW_CONSTS.dialog.animations.out_duration_ms
						}, function() {
							message_out_deferred.resolve(true);
						});

					}, VIEW_CONSTS.button.click_debounce_ms, true);
					// mouseup : real stuff is done here
					$scope.mouseup = _.debounce(function (src) {
						//console.log('mouseup', src);
						// trigger model
						on_click.clicks_subject.onNext();
						transitionables.play_button.scale.set(VIEW_CONSTS.button.released_scale);
						transitionables.play_button.scale.set(VIEW_CONSTS.button.normal_scale, {
							curve: 'easeOutBounce',
							duration: VIEW_CONSTS.button.animations.release_duration_ms
						});
					}, VIEW_CONSTS.button.click_debounce_ms, true);
				}],
				link: function postLink($scope) {
					var layout_cursor = state_tree.select('view', 'layout', 'panels', 'adventure');

					function on_layout_update() {
						var layout = layout_cursor.get();

						$scope.$evalAsync(function () {
							$scope.dialog_size = layout.dialog_size;
							$scope.dialog_position = layout.dialog_position;
							$scope.button_size = layout.button_size;
							$scope.button_position = layout.button_position;

							// signal the loader to hide if needed
							if (window.offirmo_loader.stage < 2) setTimeout(function() {
								window.onerror = window.offirmo_loader.display_unhandled_error; // reinstall
								if (window.offirmo_loader.stage < 2)
									window.offirmo_loader.change_stage(2);
							}, 100); // extra wait for avoiding FOUC on localized strings
						});
					}

					on_layout_update();
					layout_cursor.on('update', on_layout_update);
				}
			};
		}
	]);
});

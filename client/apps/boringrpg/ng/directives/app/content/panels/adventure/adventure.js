define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'boringrpg/lib/static-data/view/view',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/model',
	'text!client/apps/boringrpg/ng/directives/app/content/panels/adventure/adventure.html',
	'css!client/apps/boringrpg/ng/directives/app/content/panels/adventure/adventure.css'
],
function(offirmo_app, _, Rx, view_static_data, state_tree, model, tpl) {
	'use strict';

	offirmo_app.global_ng_module.directive('appContentPanelAdventure', [
		'$q',
		'$famous',
		function ($q, $famous) {
			return {
				scope: {},
				template: tpl,
				controller: ['$scope', function($scope) {
					var Transitionable = $famous['famous/transitions/Transitionable'];

					var last_click_cursor = state_tree.select('model', 'last_click');
					var model_cursor = state_tree.select('model');

					var VIEW_CONSTS = $scope.VIEW_CONSTS = view_static_data.layout.panels.adventure;

					var button_scale_transitionable = new Transitionable(VIEW_CONSTS.button.normal_scale);
					$scope.get_button_scale = function() { return button_scale_transitionable.get(); };

					// expose stats
					function update_exposed_stats() {
						$scope.$evalAsync(function () {
							$scope.model = model_cursor.get();
						});
					}
					model_cursor.on('update', update_exposed_stats);
					update_exposed_stats();

					function update_click_message() {
						var click_data = last_click_cursor.get();
						//console.log('new click_data', click_data);
						$scope.click_gains = click_data.gained;
						$scope.click_message = click_data.msg;
						//console.log(click_data);

						$scope.$evalAsync(function () {
						});
					}
					last_click_cursor.on('update', update_click_message);
					update_click_message();

					// Note : debounce to not penalty a user on natural rebound
					// mousedown = nothing except an animation
					$scope.mousedown = _.debounce(function (src) {
						console.log('mousedown', src);
						// click is not sent here, @see mouseup
						button_scale_transitionable.set(VIEW_CONSTS.button.normal_scale);
						button_scale_transitionable.set(VIEW_CONSTS.button.pressed_scale, {
							curve: 'easeOutBounce',
							duration: VIEW_CONSTS.button.animations.press_duration_ms
						});
					}, VIEW_CONSTS.button.click_debounce_ms, true);
					// mouseup : real stuff is done here
					$scope.mouseup = _.debounce(function (src) {
						console.log('mouseup', src);
						// trigger model
						model.subjects.clicks.onNext();
						button_scale_transitionable.set(VIEW_CONSTS.button.released_scale);
						button_scale_transitionable.set(VIEW_CONSTS.button.normal_scale, {
							curve: 'easeOutBounce',
							duration: VIEW_CONSTS.button.animations.release_duration_ms
						});
					}, VIEW_CONSTS.button.click_debounce_ms, true);
				}],
				link: function postLink($scope) {
					var VIEW_CONSTS = view_static_data;
					var ADVENTURE_VIEW_CONSTS = VIEW_CONSTS.layout.panels.adventure;

					$scope.dialog_position = [10, 10, 0];
					$scope.dialog_size = [ 300, 200 ];

					$scope.button_position = [10, 10, 0];
					$scope.button_size = [ 300, 60 ];

					//var background_isolate = $famous.find('fa-surface.adventure-panel-background')[0];

					// dynamic sizing
					var screen_size_cursor = state_tree.select('view', 'screen', 'size');

					function on_screen_size_update() {
						var screen_size = screen_size_cursor.get();
						console.log('screen_size', screen_size);

						// get the size of our element
						//var background_element = $(background_isolate.renderNode._element);
						//var content_size = [background_element.width(), background_element.height()];
						var panel_size = [
							screen_size[0],
							screen_size[1] - VIEW_CONSTS.layout.header_height_px - VIEW_CONSTS.layout.footer_height_px
						];

						var world_size_width = panel_size[0];
						var world_size_height = panel_size[1] - ADVENTURE_VIEW_CONSTS.stats_height_px;

						if(! panel_size[0]) {
							// for whatever reason, element size is not ready. Plan it later
							// XXX TODO couple it with document visibility
							console.log('element sizes not ready, reprogramming...');
							setTimeout(on_screen_size_update, 250);
							return;
						}

						console.log('on_screen_size_update : recomputing game content layout…',
							panel_size,
							[world_size_width, world_size_height]
						);

						$scope.button_size = [
							ADVENTURE_VIEW_CONSTS.button.width_px,
							ADVENTURE_VIEW_CONSTS.button.height_px
						];

						// margin unit used in various calculations
						var margin_unit = 20; // so far

						// are we constrained horizontally ?
						var actual_button_side_margin = Math.max(0, (world_size_width - ADVENTURE_VIEW_CONSTS.button.width_px) / 2);
						// button should be separated from borders by at last 2 units = 40px
						// but we'll accept less if not enough room
						if (actual_button_side_margin < (margin_unit * 2)) {
							// we are constrained in width
							console.info('constrained in width ', margin_unit, actual_button_side_margin / 2);
							// scale accordingly
							margin_unit = actual_button_side_margin / 2;
						}

						// aliases for understanding computations
						var dialog_margin_top = margin_unit;
						var dialog_margin_side = margin_unit;
						var min_button_margin_top = margin_unit; // between dialog and button
						var min_button_margin_bottom = margin_unit;


						var max_possible_dialog_width = world_size_width - dialog_margin_side * 2;
						var max_possible_dialog_height = world_size_height
							- dialog_margin_top
							- min_button_margin_top
							- ADVENTURE_VIEW_CONSTS.button.height_px
							- min_button_margin_bottom;
						var dialog_size = $scope.dialog_size = [
							Math.min(ADVENTURE_VIEW_CONSTS.dialog.max_width_px, max_possible_dialog_width),
							Math.min(ADVENTURE_VIEW_CONSTS.dialog.max_height_px, max_possible_dialog_height)
						];

						// are we constrained vertically ?
						if ( ADVENTURE_VIEW_CONSTS.dialog.max_width_px > max_possible_dialog_width || ADVENTURE_VIEW_CONSTS.dialog.max_height_px > max_possible_dialog_height ) {
							console.info('dialog was constrained in size');
						}
						// constrain the dialog size
						//dialog_size[1] = Math.min(ADVENTURE_VIEW_CONSTS.dialog.max_height_px, world_size_height - ADVENTURE_VIEW_CONSTS.button.height_px - margin_unit - min_button_margin_top - min_button_margin_bottom);

						// we can now compute positions
						$scope.dialog_position = [
							(world_size_width - dialog_size[0]) / 2, // horizontally centered
							margin_unit * 1
						];

						$scope.button_position = [
							(world_size_width - ADVENTURE_VIEW_CONSTS.button.width_px) / 2, // horizontally centered
							// vertically centered in the space below the dialog
							dialog_margin_top + dialog_size[1] + (world_size_height - margin_unit - dialog_size[1] - ADVENTURE_VIEW_CONSTS.button.height_px) / 2
						];

						$scope.$evalAsync(function () {
							console.info('Content sizes recomputed :',
								$scope.dialog_size,
								$scope.dialog_position,
								$scope.button_size,
								$scope.button_position
							);
						});

						// signal the loader to hide
						if (window.offirmo_loader.stage < 2) {
							window.offirmo_loader.change_stage(2);
							window.onerror = window.offirmo_loader.display_unhandled_error; // reinstall
						}
					}
					//on_screen_size_update();
					screen_size_cursor.on('update', on_screen_size_update);
					on_screen_size_update();
				}
			};
		}
	]);
});

define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/model',
	'text!client/apps/boringrpg/ng/directives/app/content/content.html',
	'css!client/apps/boringrpg/ng/directives/app/content/content.css'
],
function(offirmo_app, _, Rx, state_tree, model, tpl) {
	'use strict';

	var NORMAL_SCALE = 1;
	var PRESSED_SCALE = 0.9;
	var PRESS_DURATION_MS = 50;
	var RELEASE_DURATION_MS = 250;

	offirmo_app.global_ng_module.directive('appContent', [
		'$q',
		'$famous',
		'angularDebounce',
		function ($q, $famous, angular_debounce) {
			return {
				template: tpl,
				controller: ['$scope', function($scope) {
					$scope.Transform = $famous['famous/core/Transform'];
					var Transitionable = $famous['famous/transitions/Transitionable'];

					var scale_transitionable = new Transitionable(NORMAL_SCALE);
					$scope.get_scale = function() {
						return scale_transitionable.get();
					};

					$scope.mousedown = function (src) {
						console.log('mousedown', src);
						scale_transitionable.set(NORMAL_SCALE);
						scale_transitionable.set(PRESSED_SCALE, {
							curve: 'easeOutBounce',
							duration: PRESS_DURATION_MS
						});
					};
					$scope.mouseup = function (src) {
						console.log('mouseup', src);
						model.subjects.clicks.onNext();
						scale_transitionable.set(1.15);
						scale_transitionable.set(NORMAL_SCALE, {
							curve: 'easeOutBounce',
							duration: RELEASE_DURATION_MS
						});
					};
					/*$scope.play = angular_debounce($scope, function () {
						model.subjects.clicks.onNext();
					}, 250, true);*/
				}],
				link: function postLink($scope) {

					$scope.STATS_PANEL_HEIGHT = 120;

					$scope.dialog_position = [10, 10];
					$scope.dialog_size = [ 300, 200 ];

					$scope.button_position = [10, 10];
					$scope.button_size = [ 300, 60 ];

					var background_isolate = $famous.find('fa-surface.app-content-background')[0];

					// dynamic sizing
					var screen_size_cursor = state_tree.select('view', 'screen_size');

					function on_screen_size_update() {
						console.log('on_screen_size_update : recomputing game content layout');
						// get the size of our element
						var background_element = $(background_isolate.renderNode._element);
						var content_size = [background_element.width(), background_element.height()];
						var world_size = [content_size[0], content_size[1] - $scope.STATS_PANEL_HEIGHT];

						// are we constrained vertically or horizontally ?

						// The button is the most important : 14x3 units (20px)
						var button_size = $scope.button_size = [ 280, 60 ];

						// then it must be correctly centered
						var remaining_side_size = Math.max(0, (world_size[0] - button_size[0]) / 2);
						// should be separated from stats by 2 units (40px) but we'll accept less if not enough room
						var vertical_button_margin = Math.min(40, remaining_side_size);
						var margin_unit = vertical_button_margin / 2;

						var DIALOG_IDEAL_WIDTH = 640;
						var DIALOG_IDEAL_HEIGHT = 440;
						//var DIALOG_IDEAL_WIDTH = 320;
						//var DIALOG_IDEAL_HEIGHT = 240;
						/*if(world_size[0] > 720) {
							DIALOG_IDEAL_WIDTH = DIALOG_IDEAL_WIDTH * 2;
							DIALOG_IDEAL_HEIGHT = DIALOG_IDEAL_HEIGHT * 2;
						}*/

						var dialog_size = $scope.dialog_size = [
							Math.min(DIALOG_IDEAL_WIDTH, world_size[0] - margin_unit * 2),
							DIALOG_IDEAL_HEIGHT // ideal
						];

						// are we constrained vertically ?
						if ( (world_size[1] - button_size[1] - margin_unit - vertical_button_margin * 2) < DIALOG_IDEAL_HEIGHT) {
							// yes.
							// make vertical margin smaller
							vertical_button_margin = margin_unit;
						}
						// constrain the dialog size
						dialog_size[1] = Math.min(DIALOG_IDEAL_HEIGHT, world_size[1] - button_size[1] - margin_unit - vertical_button_margin * 2);

						// we can now compute positions
						$scope.button_position = [
							(world_size[0] - button_size[0]) / 2, // horizontally centered
							//world_size[1] - button_size[1] - vertical_button_margin
							margin_unit + dialog_size[1] + (world_size[1] - margin_unit - dialog_size[1] - button_size[1]) / 2
						];

						// the dialog size and position can now be computed.
						$scope.dialog_position = [
							(world_size[0] - dialog_size[0]) / 2, // horizontally centered
							margin_unit * 1
						];

						// TODO scale dialog font so that it fits

						$scope.$evalAsync();
					}
					//on_screen_size_update();
					screen_size_cursor.on('update', on_screen_size_update);
				}
			};
		}
	]);
});

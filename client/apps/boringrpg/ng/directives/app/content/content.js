define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/app/content/content.html',
	'css!client/apps/boringrpg/ng/directives/app/content/content.css'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('appContent', ['$q', '$famous', 'stateTree', function ($q, $famous, state_tree) {
		return {
			template: tpl,
			controller: ['$scope', function($scope) {


			}],
			link: function postLink($scope) {

				$scope.STATS_PANEL_HEIGHT = 130;

				$scope.dialog_position = [10, 10];
				$scope.dialog_size = [ 300, 200 ];

				$scope.button_position = [10, 10];
				$scope.button_size = [ 300, 60 ];

				var background_isolate = $famous.find('fa-surface.app-content-background')[0];

				// dynamic sizing
				var screen_size_cursor = state_tree.select('view', 'screen_size');

				function on_screen_size_update() {
					console.log('on_screen_size_update');
					// get the size of our element
					var background_element = $(background_isolate.renderNode._element);
					var content_size = [background_element.width(), background_element.height()];
					var world_size = [content_size[0], content_size[1] - $scope.STATS_PANEL_HEIGHT];
					console.log('world size', world_size);

					var unit = Math.min(100, world_size[1] / 20);

					$scope.button_size = [ unit * 14, unit * 3 ];
					$scope.button_position = [
						(world_size[0] - $scope.button_size[0]) / 2,
						world_size[1] - unit * 5
					];
					console.log('button', $scope.button_size, $scope.button_position);

					$scope.dialog_size = [ unit * 16, world_size[1] - unit * 8];
					$scope.dialog_position = [
						(world_size[0] - $scope.dialog_size[0]) / 2,
						unit * 1
					];

				}
				//on_screen_size_update();
				screen_size_cursor.on('update', on_screen_size_update);


			}
		};
	}]);
});

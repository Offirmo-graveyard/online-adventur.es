define([
	'offirmo-app-bootstrap',
	'lodash',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/app/footer/footer.html',
	'css!client/apps/boringrpg/ng/directives/app/footer/footer.css'
],
function(offirmo_app, _, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('appFooter', ['$famous', function ($famous) {
		return {
			restrict: 'E', // element,
			scope: {},
			template: tpl,
			controller: ['$scope', function ($scope) {
				$scope.Transform = $famous['famous/core/Transform'];

				$scope.panels = [
					{
						id: 'adventure',
						icon: 'icomoon-treasure-map',

					},
					{
						id: 'stuff',
						icon: 'icomoon-battle-gear'
					},
					{
						id: 'knowledge',
						icon: 'icomoon-death-note',
					},
					{
						id: 'social',
						icon: 'icomoon-eagle-emblem',
					},
					{
						id: 'achievements',
						icon: 'icomoon-laurel-crown',
					},
					{
						id: 'chat',
						icon: 'icomoon-conversation',
					},
				];
				$scope.active_panel = 'adventure';

				$scope.flexible_layout_options = {
					ratios: _.map($scope.panels, function(){return 1;}), // everyone equal (for now)
					direction: 0 // FlexibleLayout.DIRECTION_X
				};

				var selected_panel_cursor = state_tree.select('view', 'layout', 'app', 'selected_panel');

				$scope.go_to = function(panel_id) {
					console.log(panel_id);
					selected_panel_cursor.set(panel_id);
				};

				selected_panel_cursor.on('update', function () {
					$scope.$evalAsync(function () {
						$scope.active_panel = selected_panel_cursor.get();
					});
				});

			}]
		};
	}]);
});

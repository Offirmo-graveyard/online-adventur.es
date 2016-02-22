define([
	'offirmo-app-bootstrap',
	'lodash',
	'boringrpg/lib/static-data/view/view',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/app/footer/footer.html',
	'css!client/apps/boringrpg/ng/directives/app/footer/footer.css'
],
function(offirmo_app, _, view_static_data, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('appFooter', ['$famous', function ($famous) {
		return {
			restrict: 'E', // element,
			scope: {},
			template: tpl,
			controller: ['$scope', function ($scope) {
				$scope.debug = {id: 'directive/appFooter'};
				var selected_panel_cursor = state_tree.select('view', 'layout', 'app', 'selected_panel');

				$scope.panels = view_static_data.panels;
				$scope.active_panel = selected_panel_cursor.get();

				$scope.flexible_layout_options = {
					ratios: _.map($scope.panels, function(){return 1;}), // everyone equal (for now)
					direction: 0 // FlexibleLayout.DIRECTION_X
				};


				$scope.go_to = function(panel_id) {
					console.log(panel_id);
					selected_panel_cursor.set(panel_id);
					ga('send', {
						'hitType': 'pageview',
						'page': '/app/' + panel_id,
					});
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

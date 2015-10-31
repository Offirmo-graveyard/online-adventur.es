define([
	'offirmo-app-bootstrap',
	'lodash',
	'boringrpg/lib/static-data/view/view',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/app/header/header.html',
	'css!client/apps/boringrpg/ng/directives/app/header/header.css'
],
function(offirmo_app, _, view_static_data, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('appHeader', ['$famous', function ($famous) {
		return {
			scope: {},
			template: tpl,
			controller: ['$scope', function($scope) {

				var selected_panel_cursor = state_tree.select('view', 'layout', 'app', 'selected_panel');
				var layout_state_cursor = state_tree.select('view', 'layout');
				var panels = view_static_data.panels;

				$scope.request_meta = function(event) {
					console.info('request_meta !');
					layout_state_cursor.set('state', 'meta');
				};

				selected_panel_cursor.on('update', function () {
					$scope.$evalAsync(function () {
						$scope.active_panel = _.find(panels, {id: selected_panel_cursor.get()});
					});
				});
				$scope.active_panel = _.find(panels, {id: selected_panel_cursor.get()});

			}]
		};
	}]);
});

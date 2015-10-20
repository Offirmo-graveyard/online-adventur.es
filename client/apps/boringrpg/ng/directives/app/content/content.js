define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/app/content/content.html',
	'css!client/apps/boringrpg/ng/directives/app/content/content.css',
	'boringrpg/ng/directives/app/content/panels/adventure/adventure',
	'boringrpg/ng/directives/app/content/panels/inventory/inventory',
],
function(offirmo_app, _, Rx, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module.directive('appContent', ['$q', '$famous', function ($q, $famous) {
		return {
			scope: {},
			template: tpl,
			controller: ['$scope', function($scope) {

				var PANEL_IDS = state_tree.select('view', 'layout', 'app', 'PANELS').get();
				var panels = $scope.panels = _.zipObject(PANEL_IDS, []);
				var selected_panel_cursor = state_tree.select('view', 'layout', 'app', 'selected_panel');

				function update_panels() {
					var active_panel = $scope.active_panel = selected_panel_cursor.get();
					//console.log('content panels', panels);
					_.forEach(panels, function (panel, key) {
						panels[key] = panel = panel || {};
						if(key === active_panel) {
							panel.translation = [0,0,10.001]; // we must set it to more the max that any panel may use
						}
						else {
							panel.translation = [0,0,2.002];
						}
					});
					$scope.$evalAsync(function () {
						console.log('content panels', $scope.panels, active_panel);
					});
				}

				selected_panel_cursor.on('update', update_panels);
				update_panels();
			}],
			link: function postLink($scope) {

				// signal the loader to hide
				if (window.offirmo_loader.stage < 2) {
					window.offirmo_loader.change_stage(2);
					window.onerror = window.offirmo_loader.display_unhandled_error; // reinstall
				}

				/*var selected_panel_cursor = state_tree.select('view', 'layout', 'app', 'selected_panel');
				function go_to_required_panel() {
					var target_panel_id = selected_panel_cursor.get();

					console.log('1 - trying to activate panel ', target_panel_id);
					$scope.$evalAsync(function () {
						console.log('2 - trying to activate panel ', target_panel_id);
						$scope.panel_id = target_panel_id;
						//$scope.$broadcast('panel_switch', target_panel_id);
					});
				}
				go_to_required_panel();
				selected_panel_cursor.on('update', go_to_required_panel);*/
			}
		};
	}]);
});

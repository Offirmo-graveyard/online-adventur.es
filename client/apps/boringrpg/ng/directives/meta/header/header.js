define([
	'offirmo-app-bootstrap',
	'lodash',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/meta/header/header.html',
	'css!client/apps/boringrpg/ng/directives/meta/header/header.css'
],
function(offirmo_app, _, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('metaHeader', [function () {
		return {
			scope: {},
			template: tpl,
			controller: ['$scope', function($scope) {
				$scope.debug = {id: 'directive/metaHeader'};
				var layout_state_cursor = state_tree.select('view', 'layout');

				$scope.request_app = function(event) {
					layout_state_cursor.set('state', 'app');
				};
			}]
		};
	}]);
});

define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/meta/header/header.html',
	'css!client/apps/boringrpg/ng/directives/meta/header/header.css'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('metaHeader', ['stateTree', function (state_tree) {
		return {
			template: tpl,
			controller: ['$scope', function($scope) {
				var layout_state_cursor = state_tree.select('view', 'layout');

				$scope.request_app = function(event) {
					layout_state_cursor.set('state', 'app');
				};
			}]
		};
	}]);
});
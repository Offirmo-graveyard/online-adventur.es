define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/app/header/header.html',
	'css!client/apps/boringrpg/ng/directives/app/header/header.css'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('appHeader', ['$famous', 'stateTree', function ($famous, state_tree) {
		return {
			template: tpl,
			controller: ['$scope', function($scope) {
				$scope.Transform = $famous['famous/core/Transform'];

				var layout_state_cursor = state_tree.select('view', 'layout');

				$scope.request_meta = function(event) {
					layout_state_cursor.set('state', 'meta');
				};
			}]
		};
	}]);
});

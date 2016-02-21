define([
	'offirmo-app-bootstrap',
	'lodash',
	'boringrpg/lib/static-data/view/view',
	'text!client/apps/boringrpg/ng/directives/app/layout/layout.html',
	'css!client/apps/boringrpg/ng/directives/app/layout/layout.css',
	'boringrpg/ng/directives/app/header/header',
	'boringrpg/ng/directives/app/content/content',
	'boringrpg/ng/directives/app/footer/footer',
],
function(offirmo_app, _, view_static_data, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('appLayout', function () {
		return {
			scope: {},
			template: tpl,
			controller: ['$scope', function($scope) {
				$scope.debug = {id: 'directive/appLayout'};
				$scope.SIZES = view_static_data.layout;
			}]
		};
	});
});

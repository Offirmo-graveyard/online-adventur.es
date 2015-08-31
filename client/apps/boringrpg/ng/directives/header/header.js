define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/header/header.html',
	//'css!client/apps/boringrpg/ng/directives/header/header.css'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('header', function client() {
		return {
			template: tpl,
			replace: true
		};
	})
	.controller('HeaderController', ['$scope', '$famous', function($scope, $famous) {
		logger.info('HeaderController…');

		logger.info('HeaderController initialized.');
	}]);
});

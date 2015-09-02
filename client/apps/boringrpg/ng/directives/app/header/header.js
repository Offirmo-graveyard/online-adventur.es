define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/app/header/header.html',
	'css!client/apps/boringrpg/ng/directives/app/header/header.css'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('appHeader', function () {
		return {
			template: tpl
		};
	})/*
	.controller('HeaderController', ['$scope', '$famous', function($scope, $famous) {
		logger.info('HeaderController…');

		logger.info('HeaderController initialized.');
	}])*/;
});

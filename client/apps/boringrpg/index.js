console.log('loading boringrpg main js...');

define([
	'offirmo-app-bootstrap',
	'lodash',
	'carnet',
	'screenfull',
	'famous-global',
	'text!client/apps/boringrpg/content.html',
	'client/apps/boringrpg/i18n/index',
	'css!client/apps/boringrpg/index.css',
	'angular',
	'famous-angular',
	'bootstrap'
],
function(offirmo_app, _, Carnet, screenfull, famous, tpl, langs) {
	'use strict';

	console.log('executing main...');
	console.log('lang', langs);
	offirmo_app.global_ng_module_dependencies = ['famous.angular'];

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	offirmo_app.global_ng_module
	.directive('contentDirective', function client() {
		return {
			template: tpl,
			replace: true
		};
	})
	.controller('LandingController', ['$scope', '$famous', function($scope, $famous) {
		logger.info('LandingController…');

		$scope.title = offirmo_app.server_title;

		logger.info('LandingController initialized.');
	}]);

	// angular manual initialisation since we use a script loader
	// cf. http://docs.angularjs.org/guide/bootstrap
	console.log('Bootstrapping angular...');
	// we must bind on document to encompass page title
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['global_ng_module'], {strictDi: true});
	});
});

console.log('boringrpg main js parsed.');

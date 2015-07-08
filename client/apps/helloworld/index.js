console.log('loading helloworld main js...');

define([
	'offirmo-app-bootstrap',
	'lodash',
	'angular',
	'carnet',
	'css!client/apps/helloworld/index'
],
function(offirmo_app, _, angular, Carnet) {
	'use strict';

	console.log('executing main...');

	offirmo_app.global_ng_module_dependencies = [];

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	offirmo_app.global_ng_module
	.controller('LandingController', ['$scope', '$document', function($scope, $document) {
		logger.info('LandingController…');
		$scope.title = offirmo_app.server_title;

		// TOREVIEW
		$scope.lang = $document[0].documentElement.lang;
		logger.info('detected lang :', $document[0].documentElement.lang);
		$scope.pready = true;

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

console.log('helloworld main js parsed.');

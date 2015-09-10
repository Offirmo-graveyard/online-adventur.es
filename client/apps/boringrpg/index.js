console.log('loading boringrpg index js...');

window.offirmo_app_global_ng_module_dependencies = ['famous.angular'];

define([
	'offirmo-app-bootstrap',
	'lodash',
	'carnet',
	'screenfull',
	'famous-global',
	'client/apps/boringrpg/i18n/index',
	'client/apps/boringrpg/ng/services/state-tree/state-tree', // to load it into angular
	'client/apps/boringrpg/ng/directives/content-directive/content-directive',
	'css!client/apps/boringrpg/assets/icomoon-TBRPG.css',
	'css!client/apps/boringrpg/index.css',
	'angular',
	'famous-angular',
	'bootstrap'
],
function(offirmo_app, _, Carnet, screenfull, famous, langs) {
	'use strict';

	console.log('executing main...');
	console.log('lang', langs);

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	// now that global module is ready, load ng modules
	// and now that bootstrap & famo.us are ready, load our override css
	offirmo_app.global_ng_module
	.controller('LandingController', ['$scope', function($scope) {
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

console.log('boringrpg index js parsed.');

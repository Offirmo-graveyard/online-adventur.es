console.log('loading boringrpg index js...');

window.offirmo_app_global_ng_module_dependencies = ['famous.angular'];

define([
	'offirmo-app-bootstrap',
	'lodash',
	'carnet',
	// misc
	'angular',
	'famous-angular',
	'bootstrap',
	'boringrpg/lib/update-watcher',
	// base css
	'css!client/apps/boringrpg/assets/icomoon-TBRPG.css',
	'css!client/apps/boringrpg/index.css',
	'boringrpg/ng/decorators/root-scope',
	'boringrpg/ng/directives/content-directive/content-directive', // root directive
	// preload some commonly used angular modules
	'client/common/ng/services/i18n-data/i18n-data',
	'client/common/ng/directives/i18n-content/i18n-content',
	'boringrpg/lib/state-tree',
	'boringrpg/ng/services/locale-detector',
	'boringrpg/ng/services/screen-size-detector',
	'boringrpg/ng/services/screenfull-detector',
],
function(offirmo_app, _, Carnet) {
	'use strict';

	console.log('executing root js...');


	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	// now that global module is ready, load ng modules
	// and now that bootstrap & famo.us are ready, load our override css
	offirmo_app.global_ng_module.controller('LandingController', [
		'$scope',
		// (pre)load those services.
		'localeDetector',
		'screenSizeDetector',
		'screenfullDetector',
		function($scope) {
			logger.info('LandingController…');

			// TODO locale
			$scope.title = offirmo_app.server_title;

			logger.info('LandingController initialized.');
		}
	]);


	// angular manual initialisation since we use a script loader
	// cf. http://docs.angularjs.org/guide/bootstrap
	console.log('Bootstrapping angular...');
	// we must bind on document to encompass page title
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['global_ng_module'], {strictDi: true});
	});
});

console.log('Loaded boringrpg index js.');

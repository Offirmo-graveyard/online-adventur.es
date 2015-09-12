console.log('loading boringrpg index js...');

window.offirmo_app_global_ng_module_dependencies = ['famous.angular'];

define([
	'offirmo-app-bootstrap',
	'lodash',
	'carnet',
	'screenfull',
	'famous-global',
	'i18n!client/apps/helloworld/i18n/nls/messages',
	'client/common/ng/services/i18n-data/i18n-data',
	// misc
	'angular',
	'famous-angular',
	'bootstrap',
	// base css
	'css!client/apps/boringrpg/assets/icomoon-TBRPG.css',
	'css!client/apps/boringrpg/index.css',
	// preload some commonly used angular modules
	'client/common/ng/directives/i18n-content/i18n-content',
	'client/apps/boringrpg/ng/services/state-tree/state-tree',
	'client/apps/boringrpg/ng/services/screen-size-detector',
	'client/apps/boringrpg/ng/services/screenfull-detector',
	'client/apps/boringrpg/ng/directives/content-directive/content-directive',
],
function(offirmo_app, _, Carnet, screenfull, famous, i18n_messages) {
	'use strict';

	console.log('executing main...');

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	// now that global module is ready, load ng modules
	// and now that bootstrap & famo.us are ready, load our override css
	offirmo_app.global_ng_module
	.controller('LandingController', ['$scope', 'i18nData', 'screenSizeDetector', 'screenfullDetector', function($scope, i18n_data) {
		logger.info('LandingController…');

		// TODO improve language resolution
		i18n_data.set_intl(i18n_messages.lang, i18n_messages, i18n_messages.custom_formats);

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

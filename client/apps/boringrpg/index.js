console.log('loading boringrpg index js...');

window.offirmo_app_global_ng_module_dependencies = ['famous.angular'];

define([
	'offirmo-app-bootstrap',
	'lodash',
	'carnet',
	'appcache-nanny',
	// misc
	'angular',
	'famous-angular',
	'bootstrap',
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
function(offirmo_app, _, Carnet, AppCacheNanny) {
	'use strict';

	console.log('executing main...');

	// https://github.com/gr2m/appcache-nanny
	appCacheNanny.on('update', function() {
		console.log('AppCacheNanny update', arguments);
	});
	appCacheNanny.on('error', function() {
		console.log('AppCacheNanny error', arguments);
	});
	appCacheNanny.on('obsolete', function() {
		console.log('AppCacheNanny obsolete', arguments);
	});
	appCacheNanny.on('noupdate', function() {
		console.log('AppCacheNanny noupdate', arguments);
	});
	appCacheNanny.on('downloading', function() {
		console.log('AppCacheNanny downloading', arguments);
	});
	appCacheNanny.on('progress', function() {
		console.log('AppCacheNanny progress', arguments);
	});
	appCacheNanny.on('cached', function() {
		console.log('AppCacheNanny cached', arguments);
	});
	appCacheNanny.on('updateready', function() {
		console.log('AppCacheNanny updateready', arguments);
	});
	AppCacheNanny.on('init:downloading', function() {
		console.log('AppCacheNanny init:downloading', arguments);
	});
	AppCacheNanny.on('init:progress', function() {
		console.log('AppCacheNanny init:progress', arguments);
	});
	AppCacheNanny.on('init:cached', function() {
		console.log('AppCacheNanny init:cached', arguments);
	});
	AppCacheNanny.on('start', function() {
		console.log('AppCacheNanny start');
	});
	AppCacheNanny.on('stop', function() {
		console.log('AppCacheNanny stop');
	});

	// check for an update immediately
	console.log('AN test');
	AppCacheNanny.update();
	console.log('AN test', AppCacheNanny.hasUpdate());
	if(AppCacheNanny.hasUpdate()) {
		return window.location.reload(true);
	}

	// and program periodic update checks
	AppCacheNanny.start({checkInterval: 60 * 60 * 1000}); // ms

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

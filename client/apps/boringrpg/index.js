//console.log('loading boringrpg index js...');

window.offirmo_app_global_ng_module_dependencies = ['famous.angular'];

define([
	'offirmo-app-bootstrap',
	'lodash',
	'carnet',
	// misc
	'angular',
	'famous-angular',
	'bootstrap',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/locale-detector',
	'boringrpg/lib/update-detector',
	'boringrpg/lib/screen-size-detector',
	'boringrpg/lib/screenfull-detector',
	// base css
	'css!client/apps/boringrpg/assets/icomoon-TBRPG.css',
	'css!client/apps/boringrpg/index.css',
	'boringrpg/ng/decorators/root-scope',
	'boringrpg/ng/directives/content-directive/content-directive', // root directive
	// preload some commonly used angular modules
	//'client/common/ng/services/i18n-data/i18n-data',
	'client/common/ng/directives/i18n-content/i18n-content',
],
function(offirmo_app, _, Carnet) {
	'use strict';

	//console.log('executing root js...');

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	// override the angular exception handler service.
	// http://blog.loadimpact.com/blog/exception-handling-in-an-angularjs-web-application-tutorial/
	offirmo_app.global_ng_module.config(['$provide', function($provide) {
		$provide.decorator('$exceptionHandler', ['$log', '$delegate', function($log, $delegate) {
				return function(exception, cause) {
					console.log(arguments);
					$log.error.apply($log, arguments);

					var p = document.createElement('p');
					p.textContent = 'XXA ' + exception.message;
					window.offirmo_loader.error_console.appendChild(p);

					$delegate(exception, cause);
				};
			}
		]);
	}]);

	// now that global module is ready, load ng modules
	// and now that bootstrap & famo.us are ready, load our override css
	offirmo_app.global_ng_module.controller('LandingController', ['$scope', function($scope) {
		logger.info('LandingController…');

		// reinstall our uncaught exception handler which got replaced by who knows ??
		window.onerror = window.offirmo_loader.display_unhandled_error;

		// TODO locale
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

//console.log('Loaded boringrpg index js.');

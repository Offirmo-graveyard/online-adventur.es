window.global_ng_module_dependencies = ['famous.angular'];

window.main = function() {
	'use strict';

	var app_radix = 'base-famous-app';
	console.log('Starting ' + app_radix + ' main js...');
	var server_title = document.title;

	requirejs([
		'lodash',
		'carnet',
		'appcache-nanny',
		'screenfull',
		'famous-global',
		'text!client/apps/' + app_radix + '/content.html',
		'css!client/apps/' + app_radix + '/index.css',
		'angular',
		'famous-angular',
		'bootstrap-with-cyborg-theme'
	],
	function(_, Carnet, AppCacheNanny, screenfull, famous, tpl) {
		console.log('main require done.');

		// build this app logger
		var logger = Carnet.make_new({enhanced: true});

		// ui
		global_ng_module.directive('contentDirective', function client() {
			return {
				template: tpl,
				replace: true
			};
		});

		global_ng_module.controller('LandingController', ['$q', '$scope', '$document', function($q, $scope, $document) {
			logger.info('LandingController…');
			$scope.title = server_title;
			$scope.update_available = false;

			// https://github.com/gr2m/appcache-nanny
			// check for an update immediately
			AppCacheNanny.update();
			if(AppCacheNanny.hasUpdate()) {
				// reload immediately if needed
				return document.location.reload();
			}
			// and program periodic update checks
			AppCacheNanny.on('updateready', function handleUpdateready() {
				console.log('updateready');
				$scope.$apply(function() {
					$scope.update_available = true;
				})
			});
			AppCacheNanny.start({checkInterval: 60*60*1000}); // ms

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
};

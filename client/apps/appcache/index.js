window.main = function() {
	'use strict';

	console.log('Starting index main js...');

	requirejs([
		'lodash',
		'carnet',
		'appcache-nanny',
		'text!apps/appcache/content.html',
		'angular'
	],
	function(_, Carnet, AppCacheNanny, tpl) {
		console.log('main require done.');

		// build this app logger
		var logger = Carnet.make_new({enhanced: true});

		// ui
		global_ng_module.directive('content', function client() {
			return {
				template: tpl,
				replace: true
			};
		});

		global_ng_module.controller('LandingCtrl', function($scope, $document) {
			logger.info('LandingCtrl…');

			$scope.update_available = false;

			AppCacheNanny.on('updateready', function handleUpdateready() {
				console.log('updateready');
				$scope.$apply(function() {
					$scope.update_available = true;
				})
			});
			// check for an update immediately
			AppCacheNanny.update();
			// and program periodic update checks
			AppCacheNanny.start({checkInterval: 60*60*1000}); // ms

			$scope.check_update = function() {
				console.log('check');
				// check for an update immediately
				AppCacheNanny.update();
			};

			$scope.update = function() {
				document.location.reload();
			};

			logger.info('LandingCtrl initialized.');
		});

		// angular manual initialisation since we use a script loader
		// cf. http://docs.angularjs.org/guide/bootstrap
		console.log('Bootstrapping angular...');
		// we must bind on document to encompass page title
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['global_ng_module']);
		});
	});
};

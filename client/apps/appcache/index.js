console.log('loading appcache index js...');

define([
	'offirmo-app-bootstrap',
	'lodash',
	'angular',
	'carnet',
	'appcache-nanny',
	'screenfull',
	'text!client/apps/appcache/content.html',
	//'css!client/apps/appcache/index.css',
],
function(offirmo_app, _, angular, Carnet, AppCacheNanny, screenfull, tpl) {
	console.log('executing main...');

	offirmo_app.global_ng_module_dependencies = [];

	AppCacheNanny.on('downloading', function() {
		console.log('downloading', arguments);
	});
	AppCacheNanny.on('progress', function() {
		console.log('progress', arguments);
	});
	AppCacheNanny.on('init:downloading', function() {
		console.log('init:downloading', arguments);
	});
	AppCacheNanny.on('init:progress', function() {
		console.log('init:progress', arguments);
	});
	AppCacheNanny.on('init:cached', function() {
		console.log('init:cached', arguments);
	});

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	// ui
	offirmo_app.global_ng_module
	.directive('contentDirective', function client() {
		return {
			template: tpl,
			replace: true
		};
	})
	.controller('LandingController', ['$scope', '$document', function($scope, $document) {
		logger.info('LandingController…');
		$scope.title = offirmo_app.server_title;
		$scope.update_available = false;

		AppCacheNanny.on('updateready', function handleUpdateready() {
			console.log('updateready');
			$scope.$apply(function() {
				$scope.update_available = true;
			});
		});

		// check for an update immediately
		AppCacheNanny.update();
		if(AppCacheNanny.hasUpdate()) {
			return document.location.reload();
		}
		// and program periodic update checks
		AppCacheNanny.start({checkInterval: 60 * 60 * 1000}); // ms

		$scope.check_update = function() {
			console.log('check');
			// check for an update immediately
			AppCacheNanny.update();
		};

		$scope.update = function() {
			document.location.reload();
		};

		$scope.fullscreen = function() {
			screenfull.request();
		};

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

console.log('appcache index js parsed.');


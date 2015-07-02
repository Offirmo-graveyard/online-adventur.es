window.global_ng_module_dependencies = [];

window.main = function() {
	'use strict';

	var app_radix = 'helloworld';
	console.log('Starting ' + app_radix + ' main js...');
	var server_title = document.title;

	requirejs([
		'lodash',
		'carnet',
		'angular-ui-router',
		'angular-strap',
		'css!apps/' + app_radix + '/index.css',
	],
	function(_, Carnet) {
		console.log('main require done.');

		// build this app logger
		var logger = Carnet.make_new({enhanced: true});
		logger.info('App is bootstrapping…');

		// ui
		global_ng_module.controller('LandingController', function($scope, $document) {
			logger.info('LandingController…');
			$scope.title = server_title;

			// TOREVIEW
			$scope.lang = $document[0].documentElement.lang;
			logger.info('detected lang :', $document[0].documentElement.lang);
			$scope.pready = true;
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

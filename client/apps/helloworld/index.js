console.log('loading helloworld main js...');

define([
	'offirmo-app-bootstrap',
	'lodash',
	'angular',
	'carnet',
	//'client/apps/helloworld/i18n/index',
	'i18n!client/apps/helloworld/i18n/nls/base',
	'client/common/ng/services/i18n-data/i18n-data',
	'client/common/ng/directives/i18n-content/i18n-content',
	'css!client/apps/helloworld/index'
],
function(offirmo_app, _, angular, Carnet, i18n_messages) {
	'use strict';

	console.log('executing main...');

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	offirmo_app.global_ng_module
	.controller('LandingController', ['$scope', '$document', 'i18nData', function($scope, $document, i18nData) {
		logger.info('LandingController…');
		$scope.title = offirmo_app.server_title;

		// TOREVIEW
		//$scope.lang = $document[0].documentElement.lang;
		logger.info('detected lang :', window.document.documentElement.lang);
		logger.info('messages :', i18n_messages);
		$scope.pready = true;

		_.merge($scope, {
			name: 'Mary',
			gender: 'female',
			numCats: 2,
			percentBlackCats: 0.33,
			now: new Date(),
			taxableArea: true,
			taxRate: 0.21,
			itemCount1: 0,
			itemCount2: 1,
			catAge: 3,
			price: 3
		});

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

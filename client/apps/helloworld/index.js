console.log('loading helloworld main js...');

define([
	'offirmo-app-bootstrap',
	'lodash',
	'angular',
	'carnet',
	'i18n!client/apps/helloworld/i18n/nls/messages',
	'offirmo-formatjs/lib/singleton-icu-data-container',
	'client/common/ng/directives/i18n-content/i18n-content',
	'css!client/apps/helloworld/index'
],
function(offirmo_app, _, angular, Carnet, i18n_messages, i18n_data) {
	'use strict';

	console.log('executing main...');

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	offirmo_app.global_ng_module
	.controller('LandingController', ['$rootScope', '$scope', '$document', function($rootScope, $scope, $document) {
		logger.info('LandingController…');

		$rootScope.$watch(function () {
			console.warn('~~~ $rootScope $digest ~~~');
		});

		i18n_data.set_intl(i18n_messages.locale, i18n_messages, i18n_messages.custom_formats);
		// expose service for debug
		$scope.i18n_data = i18n_data;
		$scope.navigator = window.navigator;

		$scope.title = offirmo_app.server_title;

		$scope.switch_locale = function(locale) {
			console.log('switching to lang', locale);
			require([
				'client/apps/helloworld/i18n/nls/root/messages',
				'client/apps/helloworld/i18n/nls/' + locale + '/messages'
			], function (root_messages, new_messages) {
				i18n_messages = _.merge({}, root_messages, new_messages);
				console.log(i18n_messages);
				i18n_data.set_intl(i18n_messages.locale, i18n_messages, i18n_messages.custom_formats);
			});
		};

		_.merge($scope, {
			name: 'Mary',
			gender: 'female',
			numCats: 2,
			percentBlackCats: 0.33,
			now: new Date(),
			taxableArea: true,
			taxRate: 0.21,
			itemCount1: 0,
			itemCount2: 0,
			catAge: 3,
			price: 3,
			changing_message: 'key_select_nested',
			sub1: {
				taxableArea: true,
				taxRate: 0.22,
			},
			sub2: {
				taxableArea: true,
				taxRate: 0.23,
			}
		});

		// Returns a random integer between min (included) and max (included)
		// Using Math.round() will give you a non-uniform distribution!
		function getRandomIntInclusive(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		$scope.change_data = function(locale) {
			console.log('randomly changing data');

			$scope.name = ($scope.name === 'John') ? 'Mary' : 'John';
			$scope.percentBlackCats = Math.random();
			$scope.gender = ($scope.gender === 'female') ? 'male' : 'female';
			$scope.itemCount1 = ($scope.itemCount1 + 1) % 3;
			$scope.itemCount2 = ($scope.itemCount2 + 1) % 3;
			$scope.catAge = (($scope.catAge) % 4) + 1;
			$scope.changing_message = ['key_select_nested', 'without_key', 'simple_key'][$scope.itemCount1];
			$scope.now = new Date();
			$scope.taxRate = Math.random();
			$scope.taxableArea = ! $scope.taxableArea;
			$scope.sub1.taxRate = $scope.taxRate + 0.01;
			$scope.sub2.taxRate = $scope.taxRate + 0.02;

			console.log('scope data changed', $scope);
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

console.log('helloworld main js parsed.');

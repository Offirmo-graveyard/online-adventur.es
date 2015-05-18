window.main = function() {
	'use strict';

	console.log('Starting index main js...');

	// angular modules simplified ;-)
	var global_module_instance;
	Object.defineProperty(window, 'global_ng_module', {
		enumerable: true, // why not ?
		set: function() {
			throw new Error('You can’t assign window.global_module !');
		},
		get: function() {
			if(global_module_instance) return global_module_instance; // already OK
			console.log('building');
			global_module_instance = angular.module('global_ng_module', [
				'mgcrea.ngStrap'
			]);
			return global_module_instance;
		}
	});


	// thank you http://patorjk.com/software/taag/#p=display&h=3&v=0&f=Rectangles&t=Rise%20%20of%20%20the%20%20replicators
	console.log('\n\n' +
		' _____ _                  ___      _   _                        _ _         _                \n' +
		'| __  |_|___ ___      ___|  _|    | |_| |_ ___      ___ ___ ___| |_|___ ___| |_ ___ ___ ___  \n' +
		"|    -| |_ -| -_|    | . |  _|    |  _|   | -_|    |  _| -_| . | | |  _| .'|  _| . |  _|_ -| \n" +
		'|__|__|_|___|___|    |___|_|      |_| |_|_|___|    |_| |___|  _|_|_|___|__,|_| |___|_| |___| \n' +
		'                                                           |_|                               \n' +
		' So you are curious ?\n\n ');

	requirejs([
		'lodash',
		'carnet',
		'app/ror/lib/core/server',
		'app/ror/lib/core/client',
		'ng/directives/ror/client',
		'angular-ui-router',
		'angular-strap',
		'css!app/ror/ror.css'
	],
	function(_, Carnet, RorServer, RorClient) {
		console.log('main require done.');

		// build this app logger
		var logger = Carnet.make_new({enhanced: true});
		logger.info('App is bootstrapping…');

		// server
		var server = RorServer.make_new({
			logger: logger
		});

		var client = RorClient.make_new(server, {
			logger: logger
		});
		// expose it as global
		window.client = client;

		// ui
		global_ng_module.service('$locale', ['$document', function($document) {
			// REM : correctly set by server to a supported locale
			this.id = $document[0].documentElement.lang;
		}]);

		global_ng_module.service('intl.messages', ['$locale', function($locale) {

		}]);

		//global_ng_module.value('$locale', {id: $document[0].documentElement.lang});

		global_ng_module.controller('LandingCtrl', function($scope, $document, $locale) {

			$scope.title = 'OA';
			$scope.scoped_angular = angular;

			$scope.client = client;

			logger.info('detected lang :', $locale.id);
		});

		// http://angular-ui.github.io/bootstrap/#/alert
		global_ng_module.controller('AlertCtrl', ['$scope', '$document', function($scope, $document) {
			$scope.alerts = [
				{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
			];

			$scope.add_alert = function(msg) {
				$scope.alerts.push({'msg': msg});
			};

			$scope.close_alert = function(index) {
				$scope.alerts.splice(index, 1);
			};
		}]);

		// angular manual initialisation since we use a script loader
		// cf. http://docs.angularjs.org/guide/bootstrap
		console.log('Bootstrapping angular...');
		// we must bind on document to encompass page title
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['global_ng_module']);
		});
	});
};

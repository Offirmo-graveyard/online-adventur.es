window.main = function()
{
	'use strict';

	console.log('Starting page main js...');

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
		' _____       _  _              _____    _                 _                        \n' +
		'|     | ___ | ||_| ___  ___   |  _  | _| | _ _  ___  ___ | |_  _ _  ___  ___  ___  \n' +
		'|  |  ||   || || ||   || -_|  |     || . || | || -_||   ||  _|| | ||  _|| -_||_ -| \n' +
		'|_____||_|_||_||_||_|_||___|  |__|__||___| \\_/ |___||_|_||_|  |___||_|  |___||___| \n' +
		'                                                                                   \n' +
		' So you are curious ?\n\n ');

	requirejs([
		'lodash',
		'carnet',
		'angular-ui-router',
		'angular-strap',
		'css!global'
	],
	function(_, Carnet) {
		console.log('main require done.');

		// build this app logger
		var logger = Carnet.make_new({enhanced: true});
		logger.info('App is bootstrapping…');

		// ui
		global_ng_module
		.controller('LandingCtrl', function($scope, $document) {
			$scope.lang = $document[0].documentElement.lang;
			logger.info('detected lang :', $document[0].documentElement.lang);
		});

		// angular manual initialisation since we use a script loader
		// cf. http://docs.angularjs.org/guide/bootstrap
		console.log('Bootstrapping angular 2...');
		angular.element(document).ready(function() {
			angular.bootstrap(document.body, ['global_ng_module']);
		});
	});
};

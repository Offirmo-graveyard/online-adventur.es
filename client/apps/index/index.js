'use strict';


XXX not used for now, to rework XXX


console.log('loading index main js...');

// thank you http://patorjk.com/software/taag/#p=display&h=3&v=0&f=Rectangles&t=Online%20%20Adventures
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
	'css!client/apps/index/index.css',
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
		$scope.title = 'OA';
		$scope.scoped_angular = angular;

		// TOREVIEW
		$scope.lang = $document[0].documentElement.lang;
		logger.info('detected lang :', $document[0].documentElement.lang);
		$scope.pready = true;
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

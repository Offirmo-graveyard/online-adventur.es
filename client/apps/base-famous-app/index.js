window.global_ng_module_dependencies = ['famous.angular'];
var app_radix = 'base-famous-app';

window.main = function() {
	'use strict';

	console.log('Starting index main js...');
	var server_title = document.title;

	requirejs([
		'lodash',
		'jquery',
		'carnet',
		'appcache-nanny',
		'screenfull',
		'famous-global',
		'messenger-theme-future',
		//'text!apps/' + app_radix + '/content.html',
		'css!apps/' + app_radix + '/style.css',
		'angular',
		'famous-angular',
		'bootstrap-with-cyborg-theme'
	],
	function(_, jq, Carnet, AppCacheNanny, screenfull, famous, Messenger, tpl) {
		console.log('main require done.');

		// build this app logger
		var logger = Carnet.make_new({enhanced: true});

		// ui
		/*global_ng_module.directive('contentDirective', function client() {
			return {
				template: tpl,
				replace: true
			};
		});*/

		global_ng_module.controller('LandingCtrl', ['$q', '$scope', '$document', function($q, $scope, $document) {
			logger.info('LandingCtrl…');
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


			var startMsg;

			var state = $scope.state = {
				playing: false,
				nTries: 0,
				guess: 50,
				target: undefined
			};

			function newGame() {
				console.log('starting a new game...');
				state.nTries = 0;
				state.target = _.random(1, 100);
				state.playing = true;
				startMsg.update({
					message: 'Je pense à un nombre...',
					type: 'info',
					actions: false
				});
				$scope.$digest();
			}

			$scope.haveAGuess = function() {
				state.nTries++;
				if(state.guess == state.target) {
					startMsg.update({
						message: 'Vous avez trouvé !',
						type: 'success',
						actions: {
							start: {
								label: 'Nouvelle partie',
								action: newGame
							}
						}
					});
				}
				else {
					Messenger().error({
						message: '' + state.guess + ' : ' + (state.guess < state.target ? 'trop petit' : 'trop grand')
					});
				}
			};

			console.log('hello 1');

			setTimeout(function() {
				console.log('hello 2');
				Messenger.options = {
					parentLocations: ['.content'],
					/*messageDefaults: {
					 //hideAfter: 0 // disable auto-hide
					 },*/
					extraClasses: 'messenger-fixed messenger-on-bottom',
					theme: 'future'
				};

				startMsg = Messenger().success({
					message: 'Bonjour',
					hideAfter: 0,
					actions: {
						start: {
							label: 'Nouvelle partie',
							action: newGame
						}
					}
				});
			});

			logger.info('LandingCtrl initialized.');
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

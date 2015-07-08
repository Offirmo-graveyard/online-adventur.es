console.log('loading jeudunombre main js...');

define([
	'offirmo-app-bootstrap',
	'lodash',
	'carnet',
	'screenfull',
	'famous-global',
	'messenger-theme-future',
	'text!client/apps/jeudunombre/content.html',
	'css!client/apps/jeudunombre/index.css',
	'angular',
	'famous-angular',
	'bootstrap-with-cyborg-theme'
],
function(offirmo_app, _, Carnet, screenfull, famous, Messenger, tpl) {
	'use strict';

	console.log('executing main...');

	offirmo_app.global_ng_module_dependencies = ['famous.angular'];

	// build this app logger
	var logger = Carnet.make_new({enhanced: true});

	offirmo_app.global_ng_module
	.directive('contentDirective', function client() {
		return {
			template: tpl,
			replace: true
		};
	})
	.controller('LandingController', ['$scope', function($scope) {
		logger.info('LandingController…');
		$scope.title = offirmo_app.server_title;

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
				messageDefaults: {
					hideAfter: 0 // disable auto-hide
				},
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
		}, 250); // to wait for angular to settle down

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

console.log('jeudunombre main js parsed.');

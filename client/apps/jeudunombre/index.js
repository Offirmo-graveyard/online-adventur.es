console.log('loading jeudunombre main js...');

define([
	'offirmo-app-bootstrap',
	'lodash',
	'carnet',
	'screenfull',
	'famous-global',
	'text!client/apps/jeudunombre/content.html',
	'css!client/apps/jeudunombre/index.css',
	'angular',
	'famous-angular',
	//'bootstrap',
	'bootstrap-with-cyborg-theme',
],
function(offirmo_app, _, Carnet, screenfull, famous, tpl) {
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
	.controller('LandingController', ['$scope', '$famous', function($scope, $famous) {
		logger.info('LandingController…');

		// famo.us stuff
		var EventHandler = $famous['famous/core/EventHandler'];
		var MouseSync    = $famous['famous/inputs/MouseSync'];
		$scope.title = offirmo_app.server_title;
		$scope.choices_scrollview_eventHandler = new EventHandler();
		$scope.choices_surfaces_eventHandler = new EventHandler();

		// http://stackoverflow.com/questions/24229238/how-can-i-scroll-a-scrollview-using-a-mouse-drag-with-famo-us
		$scope.choices_surfaces_eventHandler.pipe($scope.choices_scrollview_eventHandler); // direct for taps
		var choices_scrollview_MouseSync = new MouseSync({direction:0});
		$scope.choices_surfaces_eventHandler.pipe(choices_scrollview_MouseSync); // to this one for clicks
		choices_scrollview_MouseSync.pipe($scope.choices_scrollview_eventHandler); // then to sw

		var state = $scope.state = {
			guess_limit: 100, //< guess the number between 1 and this
			try_count: 0,
			to_guess: undefined, //< number to guess
			playing: false,
		};

		$scope.choices = [];
		for(var i=0; i < state.guess_limit; i++) {
			$scope.choices.push({
				title: '' + (i + 1),
				bg_color: 'lightgrey'
			});
		}
		console.log($scope.choices);

		$scope.new_game = function() {
			console.log('starting a new game...');
			state.try_count = 0;
			state.to_guess = _.random(1, state.guess_limit);
			state.playing = true;
		};

		$scope.abort_game = function() {
			console.log('aborting game...');
			state.playing = false;
		};

		$scope.have_a_guess = function() {
			state.try_count++;
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

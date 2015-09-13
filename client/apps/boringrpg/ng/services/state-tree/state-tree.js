/** This app global state
 */
define([
	'module',
	'offirmo-app-bootstrap',
	'lodash',
	'jquery',
	'baobab',
	'rx',
],
function(module, offirmo_app, _, $, Baobab, Rx) {
	'use strict';

	offirmo_app.global_ng_module
	.service('stateTree', ['$rootScope', function ($rootScope) {

		console.log('detected version : ', module.config());

		// state, as a baobab tree
		var state_tree = new Baobab({
			version: module.config().version,
			view: {
				locale: undefined, // see
				fullscreen: undefined,
				screen_size: [0, 0],
				STATES: ['loading', 'loaded'],
				state: 'loading',
				// global layout
				layout: {
					STATES: ['loader', 'app', 'meta'],
					//state: 'meta',
					state: 'app',
					app: {
						// which tab is currently selected ?
						TABS: ['adventure', 'stuff', 'knowledge', 'social', 'achievements', 'chat'],
						selected_tab: 'adventure',
					}
				}
			},
			model: {
			}
		});

		return state_tree;
	}]);
});

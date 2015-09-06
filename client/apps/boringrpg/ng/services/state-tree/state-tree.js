/** This app global state
 */
define([
	'offirmo-app-bootstrap',
	'lodash',
	'baobab',
	'rx',
	'css!client/apps/boringrpg/ng/directives/app/content/content.css'
],
function(offirmo_app, _, Baobab, Rx) {
	'use strict';

	offirmo_app.global_ng_module
	.service('stateTree', function () {

		// state, as a baobab tree
		var state_tree = new Baobab({
			version: '0.0.1',
			view: {
				STATES: ['loading', 'loaded'],
				state: 'loading',
				// lang
				lang: 'en',
				// global layout
				layout: {
					STATES: ['loader', 'app', 'meta'],
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
	});
});

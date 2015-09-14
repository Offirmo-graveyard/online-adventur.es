/** This app global state
 */
define([
	'module',
	'lodash',
	'baobab',
	'rx',
],
function(module, _, Baobab, Rx) {
	'use strict';

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
			click_count: 0,
			last_click: {
				date_moment_utc: undefined,
				wait_interval_s: 5,
				msg: 'clickmsg_none',
				coins: 12
			}
		}
	});

	return state_tree;
});

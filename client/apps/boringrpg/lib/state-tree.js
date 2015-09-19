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
				wait_interval_s: 1,
				msg: 'no_clickmsg',
				gained_coins: 0,
				gained_item: undefined,

			},
			stats: {
				level: 1,
				health: 1,
				mana: 0,

				strength: 1,
				agility: 1,
				vitality: 1,
				wisdom: 1,
				luck: 1,
			},
			currencies: {
				coins: 0,
				tokens: 0
			},
			inventory: [],
			skills: []
		}
	});

	return state_tree;
});

/** This app global state
 */
define([
	'lodash',
	'baobab',
	'rx',
	'client/common/config/config'
],
function(_, Baobab, Rx, config) {
	'use strict';

	console.log('detected version : ',config);

	// state, as a baobab tree
	// https://github.com/Yomguithereal/baobab
	var state_tree = new Baobab({
		version: config.version,
		update_pending: false,
		view: {
			requested_locale: undefined, // see the locale detector service.
			                             // May not be followed if requested locale can't be loaded
			locale: undefined, // actual locale
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

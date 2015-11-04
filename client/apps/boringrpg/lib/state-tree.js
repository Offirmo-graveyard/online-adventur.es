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

	console.info('Current app version :', config.version);

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
			screen: {
				stable: true,
				//stable: false,
				size: [0, 0],
			},
			// global layout
			layout: {
				STATES: ['loader', 'app', 'meta'],
				//state: 'meta',
				state: 'app',
				app: {
					// @see static-data/view/view.js
					// which tab is currently selected ?
					selected_panel: 'adventure',
					//selected_panel: 'inventory',
				},
				panels: {
					// @see layout-computer.js
					adventure: {
						dialog_size: [0, 0],
						dialog_position: [0, 0],
						button_size: [0, 0],
						button_position: [0, 0],
					},
					inventory: {
						widget_size: [0, 0],
						widget_position: [0, 0],
						scrollview_size: [0, 0],
						scrollview_relative_position: [0, 0],
					},
					knowledge: {
						widget_size: [0, 0],
						widget_position: [0, 0],
						scrollview_size: [0, 0],
						scrollview_relative_position: [0, 0],
					}
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
				replaced_item: undefined,
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
			inventory: [
				{
					type: 'weapon',
					id: 'spoon' // TODOOO
				}
			],
			skills: []
		}
	});

	return state_tree;
});

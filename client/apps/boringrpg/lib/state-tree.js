/** This app global state.
 */
define([
	'lodash',
	'moment',
	'baobab',
	'rx',
	'client/common/config/config'
],
function(_, moment, Baobab, Rx, config) {
	'use strict';

	//console.info('Current app version :', config.version);

	// state, as a baobab tree
	// https://github.com/Yomguithereal/baobab
	var state_tree = new Baobab({
		version: config.version,
		update_pending: false, //<< is there a pending app update ?
		view: {
			requested_locale: undefined, // see the locale detector service.
			                             // May not be followed if requested locale can't be loaded
			locale: undefined, // actual locale
			fullscreen: undefined,
			screen: {
				size: [0, 0],
			},
			// global layout
			layout: {
				STATES: ['loader', 'app', 'meta'],
				//state: 'meta',
				state: 'app',
				app: {
					// which tab is currently selected ?
					// @see static-data/view/view.js
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
					},
					social: {

					},
					achievements: {
						widget_size: [0, 0],
						widget_position: [0, 0]
					}
				}
			}
		},
		model: {
			saga: {},
			last_adventure: {}
		}
	});

	return state_tree;
});

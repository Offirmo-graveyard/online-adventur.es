'use strict';

define({
	panels: [
		{
			id: 'adventure',
			icon: 'icomoon-treasure-map',
		},
		{
			id: 'inventory',
			icon: 'icomoon-battle-gear',
		},
		{
			id: 'knowledge',
			icon: 'icomoon-death-note',
		},
		{
			id: 'social',
			icon: 'icomoon-eagle-emblem',
		},
		{
			id: 'achievements',
			icon: 'icomoon-laurel-crown',
		},
		{
			id: 'chat',
			icon: 'icomoon-conversation',
		}
	],
	layout: {
		header_height_px: 60,
		footer_height_px: 60,
		panels: {
			adventure: {
				button: {
					// 14x3 units (of 20px)
					width_px: 280,
					height_px: 60,

					click_debounce_ms: 250,

					normal_scale: 1,
					pressed_scale: 0.92, // final pressed state
					released_scale: 1.12, // unreleased start state (makes a good effect)

					animations: {
						press_duration_ms: 50,
						release_duration_ms: 250,
					}
				},
				dialog: {
					max_width_px: 640,
					max_height_px: 440,

					animations: {
						out_duration_ms: 200,
						in_duration_ms: 300,
					}
				},
				stats_width_px: 320,
				stats_height_px: 120,
			},
			inventory: {
				bag: {
					max_width_px: 640,
					scrollview_vertical_margin_px: 2,
					scrollview_horizontal_margin_px: 0,
				},
				bag_entry: {
					height_px: 24
				}
			}
		}
	},
	local_storage_keys: {
		user_explicitly_selected_locale: 'offirmo.online-adventures.user_explicitly_selected_locale',
		user_saga: 'offirmo.online-adventures.user_saga',
		outdated: [
			'offirmo.online-adventures.user_explicitely_selected_locale'
		]
	}
});

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
				},
				stats_width_px: 320,
				stats_height_px: 120,
			}
		}
	}
});

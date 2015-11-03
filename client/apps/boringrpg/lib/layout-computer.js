/** compute the layout (size + position) of some components
 */
define([
	'lodash',
	'rx',
	'boringrpg/lib/static-data/view/view',
	'boringrpg/lib/state-tree',
],
function(_, Rx, view_static_data, state_tree) {
	'use strict';

	var VIEW_CONSTS = view_static_data;
	var ADVENTURE_VIEW_CONSTS = VIEW_CONSTS.layout.panels.adventure;
	var INVENTORY_VIEW_CONSTS = VIEW_CONSTS.layout.panels.inventory;

	var screen_size_cursor = state_tree.select('view', 'screen', 'size');
	var layout_cursor = state_tree.select('view', 'layout', 'panels');

	// shared partial computations :
	// unit used in various calculations
	var layout_unit;
	// panel = area between the fixed header and footer
	var panel_area_width;
	var panel_area_height;
	// world = panel minus the "meta" bottom area
	var world_size_width;
	var world_size_height;

	function on_screen_size_update() {
		var screen_size = screen_size_cursor.get();
		if (! screen_size[0]) return; // screen size not detected yet

		console.log('* Layout computer : recomputing on screen size update…', screen_size);

		// update the shared computations
		panel_area_width = screen_size[0];
		panel_area_height = screen_size[1] - VIEW_CONSTS.layout.header_height_px - VIEW_CONSTS.layout.footer_height_px;
		world_size_width = panel_area_width;
		world_size_height = panel_area_height - ADVENTURE_VIEW_CONSTS.stats_height_px;

		layout_unit = compute_layout_unit();

		// output
		var layout = {
			adventure: compute_adventure_panel_layout(),
			inventory: compute_inventory_panel_layout(),
		};

		console.info('* Layout computer : layout recomputed :', layout);

		layout_cursor.set(layout);
	}

	on_screen_size_update();
	screen_size_cursor.on('update', on_screen_size_update);

	function compute_layout_unit() {
		var unit = 20; // default

		// are we constrained horizontally ?
		var actual_button_side_margin = Math.max(0, (world_size_width - ADVENTURE_VIEW_CONSTS.button.width_px) / 2);
		// button should be separated from borders by at last 2 units = 40px
		// but we'll reduce it if not enough room
		if (actual_button_side_margin < (unit * 2)) {
			// yes, we are constrained in width
			// scale accordingly
			unit = actual_button_side_margin / 2;
			console.info('* layout computer : layout is constrained in width, margin : 20px -> ' + unit + 'px');
		}

		return unit;
	}

	function compute_adventure_panel_layout() {
		var layout = {
			dialog_size: [0, 0],
			dialog_position: [0, 0],
			button_size: [0, 0],
			button_position: [0, 0],
		};

		// aliases for understanding computations
		var dialog_margin_top = layout_unit;
		var dialog_margin_side = layout_unit;
		var min_button_margin_top = layout_unit; // between dialog and button
		var min_button_margin_bottom = layout_unit;

		var max_possible_dialog_width = world_size_width - dialog_margin_side * 2;
		var max_possible_dialog_height = world_size_height
			- dialog_margin_top
			- min_button_margin_top
			- ADVENTURE_VIEW_CONSTS.button.height_px
			- min_button_margin_bottom;
		layout.dialog_size = [
			Math.min(ADVENTURE_VIEW_CONSTS.dialog.max_width_px, max_possible_dialog_width),
			Math.min(ADVENTURE_VIEW_CONSTS.dialog.max_height_px, max_possible_dialog_height)
		];

		// are we constrained vertically ?
		if ( ADVENTURE_VIEW_CONSTS.dialog.max_width_px > max_possible_dialog_width || ADVENTURE_VIEW_CONSTS.dialog.max_height_px > max_possible_dialog_height ) {
			console.info('* layout computer : dialog was constrained in size');
		}

		// we can now compute positions
		layout.dialog_position = [
			(world_size_width - layout.dialog_size[0]) / 2, // horizontally centered
			layout_unit * 1
		];

		// button size is fixed
		layout.button_size = [
			ADVENTURE_VIEW_CONSTS.button.width_px,
			ADVENTURE_VIEW_CONSTS.button.height_px
		];

		layout.button_position = [
			(world_size_width - ADVENTURE_VIEW_CONSTS.button.width_px) / 2, // horizontally centered
			// vertically centered in the space below the dialog
			dialog_margin_top + layout.dialog_size[1] + (world_size_height - layout_unit - layout.dialog_size[1] - ADVENTURE_VIEW_CONSTS.button.height_px) / 2
		];

		return layout;
	}

	function compute_inventory_panel_layout() {
		var layout = {
			bag_widget_size: [0, 0],
			bag_widget_position: [0, 0],
			bag_scrollview_size: [0, 0],
			bag_scrollview_relative_position: [0, 0],
		};

		// aliases for understanding computations
		var bag_margin_top_bottom = layout_unit;
		var bag_margin_left_right = layout_unit;

		var max_possible_bag_width = world_size_width - bag_margin_left_right * 2;
		var max_possible_bag_height = world_size_height - bag_margin_top_bottom * 2;

		layout.bag_widget_size = [
			Math.min(INVENTORY_VIEW_CONSTS.bag.max_width_px, max_possible_bag_width),
			max_possible_bag_height
		];

		layout.bag_widget_position = [
			(world_size_width - layout.bag_widget_size[0]) / 2, // horizontally centered
			layout_unit
		];

		layout.bag_scrollview_relative_position = [
			INVENTORY_VIEW_CONSTS.bag.scrollview_horizontal_margin_px,
			INVENTORY_VIEW_CONSTS.bag.scrollview_vertical_margin_px,
		];

		layout.bag_scrollview_size = [
			layout.bag_widget_size[0] - INVENTORY_VIEW_CONSTS.bag.scrollview_horizontal_margin_px * 2,
			layout.bag_widget_size[1] - INVENTORY_VIEW_CONSTS.bag.scrollview_vertical_margin_px * 2,
		];

		return layout;
	}

});

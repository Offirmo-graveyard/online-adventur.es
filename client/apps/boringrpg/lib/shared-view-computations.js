define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'jquery',
	'boringrpg/lib/state-tree',
],
function(offirmo_app, _, Rx, $, state_tree) {
	'use strict';

	var screen_size_cursor = state_tree.select('view', 'screen', 'size');

	function on_screen_size_update() {
		var screen_size = screen_size_cursor.get();

		console.log('on_screen_size_update : recomputing game content layout…', screen_size);

		// The button is the most important : 14x3 units (20px)
		var button_size = $scope.button_size = [ 280, 60 ];

		// then it must be correctly centered
		var remaining_side_size = Math.max(0, (world_size[0] - button_size[0]) / 2);
		// should be separated from stats by 2 units (40px) but we'll accept less if not enough room
		var vertical_button_margin = Math.min(40, remaining_side_size);
		var margin_unit = vertical_button_margin / 2;

		var DIALOG_IDEAL_WIDTH = 640;
		var DIALOG_IDEAL_HEIGHT = 440;
		//var DIALOG_IDEAL_WIDTH = 320;
		//var DIALOG_IDEAL_HEIGHT = 240;
		/*if(world_size[0] > 720) {
		 DIALOG_IDEAL_WIDTH = DIALOG_IDEAL_WIDTH * 2;
		 DIALOG_IDEAL_HEIGHT = DIALOG_IDEAL_HEIGHT * 2;
		 }*/

		var dialog_size = $scope.dialog_size = [
			Math.min(DIALOG_IDEAL_WIDTH, world_size[0] - margin_unit * 2),
			DIALOG_IDEAL_HEIGHT // ideal
		];

		// are we constrained vertically ?
		if ( (world_size[1] - button_size[1] - margin_unit - vertical_button_margin * 2) < DIALOG_IDEAL_HEIGHT) {
			// yes.
			// make vertical margin smaller
			vertical_button_margin = margin_unit;
		}
		// constrain the dialog size
		dialog_size[1] = Math.min(DIALOG_IDEAL_HEIGHT, world_size[1] - button_size[1] - margin_unit - vertical_button_margin * 2);

		// we can now compute positions
		$scope.button_position = [
			(world_size[0] - button_size[0]) / 2, // horizontally centered
			//world_size[1] - button_size[1] - vertical_button_margin
			margin_unit + dialog_size[1] + (world_size[1] - margin_unit - dialog_size[1] - button_size[1]) / 2,
			0
		];

		// the dialog size and position can now be computed.
		$scope.dialog_position = [
			(world_size[0] - dialog_size[0]) / 2, // horizontally centered
			margin_unit * 1,
			0
		];

		// TODO scale dialog font so that it fits

		console.info('Content sizes recomputed :',
			$scope.dialog_size,
			$scope.dialog_position,
			$scope.button_size,
			$scope.button_position
		);
		$scope.$evalAsync();

		// signal the loader to hide
		if (window.offirmo_loader.stage < 2) {
			window.offirmo_loader.change_stage(2);
			window.onerror = window.offirmo_loader.display_unhandled_error; // reinstall
		}
	}
	//on_screen_size_update();
	screen_size_cursor.on('update', on_screen_size_update);
});

/** Game model !
 */
define([
	'lodash',
	'moment',
	'rx',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/models/saga',
	'boringrpg/lib/models/adventure'
],
function(_, moment, Rx, state_tree, Saga, Adventure) {
	'use strict';

	/////// Load ///////
	var saga_data;
	// TODO !!!


	/////// Migrate ///////
	// TODO !!!


	/////// Model ///////
	var saga = Saga.create(saga_data);

	/////// Link to state tree ///////
	var model_cursor = state_tree.select('model');

	function update_saga() {
		var new_saga_data = saga.get();
		model_cursor.set('saga', new_saga_data);
	}

	// init
	model_cursor.set('last_adventure', Adventure.create({
		msg_id: 'no_clickmsg',
		good: true
	}).get());
	update_saga();


	/////// Actions ///////

	function do_click() {
		var adventure = saga.generate_click_adventure();
		model_cursor.set('last_adventure', adventure.get());
		update_saga();
	}

	function cycle_locale() {
		// TODO
	}


	/////// expose ///////
	return {
		click: do_click,
		cycle_locale: cycle_locale
	}
});

/** Game model !
 */
define([
	'lodash',
	'moment',
	'rx',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/models/saga',
	'boringrpg/lib/models/adventure',
	'boringrpg/lib/static-data/view/view',
],
function(_, moment, Rx, state_tree, Saga, Adventure, view_static_data) {
	'use strict';

	/////// Load ///////
	var saga_data;
	try {
		var str = window.localStorage.getItem(view_static_data.local_storage_keys.user_saga);
		if (str) {
			saga_data = JSON.parse(str);
			//console.info('* restored user progress !');
		}
	}
	catch (err) {
		// TODO better handle
		console.warn('XXX error while restoring user progress !!', err);
	}


	/////// Migrate ///////
	// TODO !!!


	/////// Model ///////
	var saga = Saga.create(saga_data);

	/////// Link to state tree ///////
	var model_cursor = state_tree.select('model');

	function update_saga() {
		var new_saga_data = saga.get();
		model_cursor.set('saga', new_saga_data);
		try {
			var str = JSON.stringify(new_saga_data);
			window.localStorage.setItem(view_static_data.local_storage_keys.user_saga, str);
		}
		catch (err) {
			// TODO better handle
			console.error('XXX error while saving progress !!', err);
		}
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

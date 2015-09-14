/** Game model !
 */
define([
	'lodash',
	'moment',
	'rx',
	'boringrpg/lib/state-tree',
],
function(_, moment, Rx, state_tree) {
	'use strict';

	var model_cursor = state_tree.select('model');

	var clicks_subject = new Rx.Subject();
	var observable_clicks = clicks_subject.map(function() {
		console.log('new play click detected');
		// we generate the click date ourselves
		return moment.utc();
	});

	observable_clicks.subscribe(function(click_date_utc) {
		console.log('new play click detected :', click_date_utc.format());
	});

	var observable_good_clicks = observable_clicks
	.filter(function(click_date_utc) {
		return true;
	});

	var observable_bad_clicks = observable_clicks
	.filter(function(click_date_utc) {
		return false;
	});

	var selector = 0;
	var available_adventures = [
		{
			msg: 'clickmsg_bored'
		},
		{
			msg: 'clickmsg_caravan'
		},
		{
			msg: 'clickmsg_dying_man'
		}
	];

	observable_good_clicks.subscribe(function(click_date_utc) {
		// pick a new adventure !
		selector = (selector + 1) % available_adventures.length;
		var adventure = available_adventures[selector];
		var click = {
			date_moment_utc: click_date_utc,
			wait_interval_s: 5,
			msg: adventure.msg,
			coins: 12
		};
		model_cursor.set('last_click', click);
	});

	return {
		subjects: {
			clicks: clicks_subject
		}
	};

});

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
	var last_click_cursor = model_cursor.select('last_click');

	var clicks_subject = new Rx.Subject();

	var observable_raw_clicks = clicks_subject.map(function() {
		// we generate the click date ourselves
		return moment.utc();
	});

	var observable_checked_clicks = observable_raw_clicks
	.map(function(click_date_utc) {
		var last_click = last_click_cursor.get();

		var elapsed_since_last_click_s = click_date_utc.diff(last_click.date_moment_utc)/1000.;

		console.log('diff',
			click_date_utc.format(),
			last_click.date_moment_utc.format(),
			elapsed_since_last_click_s,
			last_click.wait_interval_s
		);

		return {
			date_moment_utc: moment.utc(),
			is_valid: (elapsed_since_last_click_s >= last_click.wait_interval_s)
		};
	});

	var observable_good_clicks = observable_checked_clicks
	.filter(function(click) {
		return click.is_valid;
	});

	var observable_bad_clicks = observable_checked_clicks
	.filter(function(click) {
		return !click.is_valid;
	});

	observable_bad_clicks.subscribe(function(click) {
		console.error('clicked too soon !');
	});

	return {
		clicks_subject: clicks_subject,
		observable_clicks: observable_checked_clicks,
		observable_good_clicks: observable_good_clicks,
		observable_bad_clicks: observable_bad_clicks
	}
});

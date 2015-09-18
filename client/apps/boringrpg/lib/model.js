/** Game model !
 */
define([
	'lodash',
	'moment',
	'rx',
	'boringrpg/lib/state-tree',
	'i18n!client/apps/boringrpg/i18n/nls/messages',
],
function(_, moment, Rx, state_tree, i18n_messages) {
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

	// extract available adventures from the i18n messages
	var available_adventures = [];
	_.forOwn(i18n_messages, function(value, key) {
		if (key.substr(0, 9) === 'clickmsg_')
			available_adventures.push({
				msg: key
			});
	});

	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	var last_selector = -1;
	observable_good_clicks.subscribe(function(click_date_utc) {
		var selector;
		do {
			selector = getRandomInt(0, available_adventures.length);
		} while (selector === last_selector);
		last_selector = selector;
		var adventure = available_adventures[selector];
		var click = {
			date_moment_utc: click_date_utc,
			wait_interval_s: 5,
			msg: adventure.msg,
			//coins: 12
		};
		model_cursor.set('last_click', click);
	});

	function typeset(msg) {
		msg = msg.replace('\'', '’');
		msg = msg.replace(' ?', '&nbsp;?');
		msg = msg.replace(' !', '&nbsp;!');
		msg = msg.replace(' :', '&nbsp;:');
		msg = msg.replace(' ;', '&nbsp;;');
		msg = msg.replace(' »', '&nbsp;»');
		msg = msg.replace('« ', '«&nbsp;');
		msg = msg.replace('...', '…');
		msg = msg.replace(/(\d+) /, '$1&nbsp;');

		return msg;
	}

	return {
		subjects: {
			clicks: clicks_subject
		}
	};

});

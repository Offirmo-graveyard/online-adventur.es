/** Game model !
 */
define([
	'lodash',
	'moment',
	'rx',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/static-data/checked-adventures',
	'boringrpg/lib/weapon-generator',
],
function(_, moment, Rx, state_tree, adventures, weapon_generator) {
	'use strict';

	var model_cursor = state_tree.select('model');

	var clicks_subject = new Rx.Subject();
	var observable_clicks = clicks_subject.map(function() {
		//console.log('new play click detected');
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

	observable_good_clicks.subscribe(function(click_date_utc) {
		var adventure = select_next_adventure();
		var adventure_instance = instantiate_adventure(adventure);
		apply_adventure_instance(adventure_instance);
		var click = _.extend({
				date_moment_utc: click_date_utc,
				wait_interval_s: 5,
			},
			adventure_instance
		);
		model_cursor.set('last_click', click);
		model_cursor.apply('click_count', inc)
	});

	var last_selector = -1;
	var adventure_keys = _.keys(adventures);
	function select_next_adventure() {
		var selector;
		do {
			selector = getRandomInt(0, adventure_keys.length);
		} while (selector === last_selector);
		last_selector = selector;
		return adventures[adventure_keys[selector]];
	}

	var STAT_GAIN_KEYS = [
		'level',
		'health',
		'mana',

		'strength',
		'agility',
		'vitality',
		'wisdom',
		'luck',
	];
	var CURRENCY_GAIN_KEYS = [
		'coins',
		'tokens',
	];

	function instantiate_adventure(adventure) {
		var instance = {
			adventure: adventure, // just in case
			msg: adventure.msg,
			gained: {}
		};

		_.forOwn(adventure.post.gains, function (value, key) {
			if (_.includes(STAT_GAIN_KEYS, key))
				instance.gained[key] = value;
			else if (_.includes(CURRENCY_GAIN_KEYS, key))
				instance.gained[key] = value;
			else
				console.error('NIMP gain of ' + key);
		});

		return instance;
	}

	function apply_adventure_instance(adventure_instance) {
		_.forOwn(adventure_instance.gained, function (value, key) {
			if (_.includes(STAT_GAIN_KEYS, key)) {
				var prev = model_cursor.get('stats', key);
				model_cursor.set(['stats', key], prev + value);
			}
			else if (_.includes(CURRENCY_GAIN_KEYS, key)) {
				var prev = model_cursor.get('currencies', key);
				model_cursor.set(['currencies', key], prev + value);
			}
			else
				console.error('NIMP gain of ' + key);
		});
	}

	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	var inc = function(currentData) {
		return currentData + 1;
	};

	return {
		subjects: {
			clicks: clicks_subject
		}
	};

});

/** An saga = a complete state of a player's saga, made of several adventures
 */
define([
	'lodash',
	'boringrpg/lib/models/adventure',
	'boringrpg/lib/static-data/model/adventures-checked',
],
function(_, Adventure, adventures_data) {
	'use strict';

	var ADVENTURES_KEYS = _.keys(adventures_data);

	function Saga() {
		this.last_selector = -1;
	}


	Saga.prototype.select_next_progress = function () {
		var selector;
		do {
			selector = getRandomInt(0, ADVENTURES_KEYS.length);
		} while (selector === this.last_selector);
		this.last_selector = selector;
		return adventures_data[ADVENTURES_KEYS[selector]];
	};

	/**
	 *
	 * @returns Saga
	 */
	Saga.prototype.progress = function () {

	};

	return Saga;
});

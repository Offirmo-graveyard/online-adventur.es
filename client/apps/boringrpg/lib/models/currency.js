/** A currency = countable
 */
define([
	'lodash',
],
function(_) {
	'use strict';

	function Currency(name) {
		this.name = name;
	}

	return Currency;
});

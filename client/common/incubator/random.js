/** Game model !
 */
define([
	'lodash'
],
function(_) {
	'use strict';

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	// Returns a random integer between min (included) and max (included)
	// Using Math.round() will give you a non-uniform distribution!
	function getRandomIntInclusive(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Returns a random integer between 0 (included) and max (excluded)
	function getRandomIndex(length) {
		return Math.floor(Math.random() * length);
	}

	return {
		getRandomIntExclusive: getRandomInt,

		getRandomIntInclusive: getRandomIntInclusive,

		getRandomIndex: getRandomIndex
	};
});

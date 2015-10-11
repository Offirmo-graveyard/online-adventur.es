// if node.js : use amdefine
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash'
	],
function(_) {
	'use strict';

	// https://github.com/yahoo/intl-locales-supported/blob/master/index.js
	// Copyright 2015, Yahoo Inc.
	function areIntlLocalesSupported(locales) {
		if (typeof Intl === 'undefined') {
			return false;
		}

		if (!locales) {
			throw new Error('locales must be supplied.');
		}

		if (!Array.isArray(locales)) {
			locales = [locales];
		}

		var intlConstructors = [
			Intl.Collator,
			Intl.DateTimeFormat,
			Intl.NumberFormat
		].filter(function (intlConstructor) {
			return intlConstructor;
		});

		// ?
		if (intlConstructors.length === 0) {
			return false;
		}

		return intlConstructors.every(function (intlConstructor) {
			var supportedLocales = intlConstructor.supportedLocalesOf(locales);
			return supportedLocales.length === locales.length;
		});
	}

	var supported = areIntlLocalesSupported(['en', 'fr']);
	if (! supported) {
		console.error('Intl doesn’t support usual locales !');
	}

	return areIntlLocalesSupported;
});

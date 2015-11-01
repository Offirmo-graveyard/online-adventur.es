// if node.js : use amdefine
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash',
	'./are-intl-locales-supported'
],
function(_, are_intl_locales_supported) {
	'use strict';

	var intl = undefined;
	var locale_change_listeners = [];

	/**
	 *
	 * @param locale - string
	 * @param messages - associative array of string key -> ICU message OR offirmo ICU function
	 * @param custom_formats - (deprecated)
	 */
	function set_icu_data(locale, messages, custom_formats) {
		intl = {
			locale: locale,
			messages: messages,
			formats: custom_formats || {}
		};

		_.forEach(locale_change_listeners, function(listener) {
			listener(intl);
		})
	}

	function on_locale_change(listener_to_add) {
		if (_.includes(locale_change_listeners, listener_to_add))
			throw new Error('Trying to attach a locale change listener which is already present !');

		locale_change_listeners.push(listener_to_add);

		if (intl) {
			// call it immediately
			listener_to_add(intl);
		}
	}

	function off_locale_change(listener_to_remove) {
		if (! _.includes(locale_change_listeners, listener_to_remove))
			throw new Error('Trying to remove a locale change listener which is not present !');

		locale_change_listeners = _.reject(locale_change_listeners, function (listener) {
			return (listener === listener_to_remove);
		});
	}


	return {
		// setter
		set_icu_data: set_icu_data,

		// getters
		// locale change listeners (called at init if a lang is already avail)
		on_locale_change: on_locale_change,
		off_locale_change: off_locale_change
	}
});

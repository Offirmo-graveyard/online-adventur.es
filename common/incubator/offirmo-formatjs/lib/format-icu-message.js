/** Resolve an ICU MessageFormat to a string.
 * http://userguide.icu-project.org/formatparse/messages
 * http://formatjs.io/
 *
 * Design notes :
 * While message resolution may fail, we try to not aggressively fail with a throw,
 * but instead return the "best possible message".
 * We prefer to display the raw key to the user (in UI) rather than nothing.
 */

// if node.js : use amdefine
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'lodash',
	'intl-messageformat'
],
function(_, IntlMessageFormat) {
	'use strict';

	/**
	 *
	 * @param message - an ICU MessageFormat string http://userguide.icu-project.org/formatparse/messages
	 * @param values
	 * @param locale
	 * @param custom_formats [not recommended]
	 * @returns {String}
	 */
	function format(message, values, locale, custom_formats, parent_debug_id) {
		// errors while resolving the message
		var errors = [];

		// fix parameters without crashing
		if(!_.isString(locale)) {
			errors.push('Invalid locale');
			locale = 'en';
		}
		// message : can't be fixed, see later
		values = values || {};
		custom_formats = custom_formats || {};

		// final result
		var formatted_msg = '[unknown localized message]'; // for now

		// debugging
		var debug = {
			prefix: '[i18n|' + locale + '|',
			message: message || '???',
			suffix: (parent_debug_id ? ('|' + parent_debug_id) : '') + ']',
			locale: locale,
			values: values
		};
		function update_with_best_available_data_so_far() {
			debug.id = debug.prefix + debug.message + debug.suffix;
			formatted_msg = debug.id; // so far : only a debug message
		}
		update_with_best_available_data_so_far();

		// try to resolve stuff
		resolution : {
			if(!_.isString(message)) {
				errors.push('Invalid message');
				break resolution;
			}

			var message_format;
			try {
				message_format =  new IntlMessageFormat(message, locale, custom_formats);
			}
			catch(err) {
				console.error(debug.id + ' error : unable to parse message format !', err, debug);
				break resolution;
			}

			// eventually
			try {
				formatted_msg = message_format.format(values);
			}
			catch(err) {
				console.error(debug.id + ' error : unable to compile message !', err, debug);
				break resolution;
			}
		}

		return formatted_msg;
	}

	return format;
});

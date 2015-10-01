/** Resolve an ICU MessageFormat to a string.
 * http://userguide.icu-project.org/formatparse/messages
 * http://formatjs.io/
 *
 * Design notes :
 * While message resolution may fail, we try to not aggressively fail with a throw,
 * but instead return the "best possible message".
 * We prefer to display the raw key to the user (in UI) rather than nothing.
 */


define(
[
	'angular',
	'lodash',
	'intl-messageformat'
],
function(angular, _, IntlMessageFormat) {
	'use strict';


	/**
	 *
	 * @param key
	 * @param values
	 * @param intl.locale
	 * @param intl.messages
	 * @param intl.formats [not recommended]
	 * @returns {String}
	 */
	function format(key, values, intl) {

		values = values || {};

		// serious, irrecoverable programming error -> we can throw
		if (! intl) throw new Error('missing i18n data !');
		if (! _.isObject(intl)) throw new Error('incorrect i18n data !');

		// we'll now try to no longer throw
		intl.messages = intl.messages || {};
		intl.locale = intl.locale || intl.messages.locale;
		intl.formats = intl.formats || {};

		// final result
		var formatted_msg = '[i18n]'; // for now

		// debugging
		var debug = {
			prefix: '[i18n|',
			message: key || '???',
			suffix: ']',
			intl: intl,
			values: values
		};
		function update_with_best_available_data_so_far() {
			debug.id = debug.prefix + debug.message + debug.suffix;
			formatted_msg = debug.id; // so far : only a debug message
		}
		update_with_best_available_data_so_far();

		// try to resolve stuff
		resolution : {
			if (! key) {
				console.error(id + ' error : missing key !');
				break resolution;
			}

			if (! intl.locale) {
				console.error(id + ' error : missing i18n locale !');
				break resolution;
			}

			debug.prefix = debug.prefix + locale + '|';
			update_with_best_available_data_so_far();

			if (! intl.messages[key]) {
				console.error(id + ' error : couldn’t resolve key "' + key + '" in intl.messages !');
				break resolution;
			}

			var message = debug.message = intl.messages[key];
			update_with_best_available_data_so_far();

			var message_format;
			try {
				message_format =  new IntlMessageFormat(message, locale, intl.formats);
			}
			catch(err) {
				console.error(id + ' error : unable to parse message format !', err, debug);
				break resolution;
			}

			// eventually
			try {
				formatted_msg = message_format.format(values);
			}
			catch(err) {
				console.error(id + ' error : unable to compile message !', err, debug);
				break resolution;
			}
		}

		return formatted_msg;
	}

	return {
		libs: {
			IntlMessageFormat: IntlMessageFormat
		}
	};
});

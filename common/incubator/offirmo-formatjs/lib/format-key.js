/** Resolve a key
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
	'underscore.string',
	'./singleton-icu-data-container',
	'./format-icu-message'
],
function(_, _s, i18n_data, format_icu_message) {
	'use strict';

	/**
	 * @param key
	 * @param values
	 * @param intl.locale
	 * @param intl.messages
	 * @param intl.formats [not recommended]
	 * @returns {String}
	 */
	function format_single_key(key, values, intl, parent_debug_id) {

		//console.log('key', key);
		//console.log('values', values);
		//console.log('intl', intl);
		//console.log('parent_debug_id', parent_debug_id);

		// serious, irrecoverable programming error -> we can throw
		if (! intl) throw new Error('missing i18n data !');
		if (! _.isObject(intl)) throw new Error('incorrect i18n data ! (intl is not an associative array)');
		if (! _.isObject(intl.messages)) throw new Error('incorrect i18n data ! (intl.messages is not an associative array)');

		// errors encountered
		var errors = [];

		// fix parameters without crashing
		if(!_.isString(intl.locale)) {
			errors.push('Invalid locale');
			intl.locale = intl.messages.locale || 'en';
		}
		// message : can't be fixed, see later
		values = values || {};
		intl.formats = intl.formats || {};

		// final result
		var formatted_msg;

		// debugging
		var debug = {
			prefix: '[i18n|' + intl.locale + '|',
			message: key || '???',
			suffix: (parent_debug_id ? ('|' + parent_debug_id) : '') + ']',
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
				console.error(debug.id + ' error : missing key !');
				break resolution;
			}
			if (!_.isString(key)) {
				console.error(debug.id + ' error : incorrect key !');
				break resolution;
			}

			if (! intl.messages[key]) {
				console.error(debug.id + ' error : couldn’t resolve key "' + key + '" in intl.messages !');
				break resolution;
			}

			var message = debug.message = intl.messages[key];

			try {
				if(_.isFunction(message)) {
					var build_message = message;
					debug.message = '?!?';
					var exposed = {
						_: _,
						_s: _s,
						format: _.partialRight(format, intl, debug.id),
						format_multiple: _.partialRight(format_multiple_keys, intl, debug.id),
					};

					formatted_msg = build_message(values, intl, exposed);
					if(! _.isString(formatted_msg)) {
						console.error(debug.id + ' error : custom formatting function associated to key "' + key + '" didn’t return a string !');
						update_with_best_available_data_so_far();
					}
				}
				else {
					formatted_msg = format_icu_message(
						message,
						values,
						intl.locale,
						intl.formats,
						parent_debug_id
					);
				}
			}
			catch (e) {
				console.error('error while formatting', e);
				update_with_best_available_data_so_far();
			}
		}

		return formatted_msg;
	}

	function format_multiple_keys(keys, values, intl, parent_debug_id) {
		var formatted_msgs = keys.map(function(key) {
			return format(key, values, intl, parent_debug_id);
		});
		return formatted_msgs;
	}

	function format(key, values, intl, parent_debug_id) {
		if(_.isArray(key))
			return format_multiple_keys(key, values, intl, parent_debug_id);
		else
			return format_single_key(key, values, intl, parent_debug_id);
	}

	return format;
});

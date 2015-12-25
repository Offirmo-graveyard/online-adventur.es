define([
	'lodash',
	'underscore.string',
	'boringrpg/i18n/nls/en/messages',
],
function(_, _s, i18n_messages) {
	'use strict';


	/**
	 *
	 * @param Model - a contructor (which a .create() function)
	 * @param raw_data_by_id - a hash by id
	 */
	function load_model_from_static_data(Model, raw_data_by_id, options) {
		options = options || {};
		options.i18n_messages = options.i18n_messages || i18n_messages; // allow override mainly for test

		var msg_ids = [];

		// preprocess
		_.forOwn(raw_data_by_id, function (value, key) {

			// remove "commented" items (can't use .filter since we want to keep the hash format)
			if (key[0] === '_') { // leading _ means "commented out"
				delete raw_data_by_id[key];
				return
			}

			// build some properties
			value.id = key;
			if (options.msg_radix) {
				// copy msg if needed
				value.msg_id = value.msg_id || (options.msg_radix + value.id);
				// save for later
				msg_ids.push(value.msg_id);
			}
		});

		// check i18n
		if (options.msg_radix) {
			// extract used msgs from their model declarations
			var used_msgs = _.keys(raw_data_by_id);

			// extract available msgs from the i18n messages
			var available_msgs = [];
			var radix_length = options.msg_radix.length;
			_.forOwn(options.i18n_messages, function (value, key) {
				if (key.substr(0, radix_length) === options.msg_radix)
					available_msgs.push(key.slice(radix_length));
			});

			// check if they match
			var mismatched_keys = _.xor(used_msgs, available_msgs);
			mismatched_keys.forEach(function (key) {
				if (raw_data_by_id.hasOwnProperty(key)) {
					console.error('Static data declare model "' + options.msg_radix + key + '" which has no i18n entry !');
					// this is serious, remove this model from the list
					delete raw_data_by_id[key];
				}
				else {
					console.error('i18n messages reference model "' + options.msg_radix + key + '" which is not declared in static data !');
				}
			});
		}

		// instantiate
		_.forOwn(raw_data_by_id, function (value, key) {
			try {
				raw_data_by_id[key] = Model.create(value);
			}
			catch(err) {
				console.error('Static data model "' + key + '" was rejected at instantiation !', err);
				// this is serious, remove this model from the list
				delete raw_data_by_id[key];
			}
		});

		var data = _.values(raw_data_by_id);
		// attach hashes
		data.by_id = raw_data_by_id;

		return data;
	}

	return load_model_from_static_data;
});

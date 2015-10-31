define([
	'lodash',
	'boringrpg/i18n/nls/en/messages',
	'boringrpg/lib/static-data/model/adventures',
],
function(_, i18n_messages, adventures) {
	'use strict';

	// preprocess
	_.forOwn(adventures, function (value, key) {
		if ( key[0] === '_') {
			// leading _ means "commented out"
			delete adventures[key];
			return;
		}

		_.defaultsDeep(value, {
			msg: 'clickmsg_' + key,
			pre: {},
			post: {
				gains: {}
			}
		});
	});

	// extract available adventures from their model declarations
	var available_adventures_from_model = _.keys(adventures);

	// extract available adventures from the i18n messages
	var available_adventures_from_msgs = [];
	_.forOwn(i18n_messages, function(value, key) {
		if (key.substr(0, 9) === 'clickmsg_')
			available_adventures_from_msgs.push(key.slice(9));
	});

	// check if they match
	var mismatched_keys = _.xor(available_adventures_from_model, available_adventures_from_msgs);
	mismatched_keys.forEach(function(key) {
		if (available_adventures_from_model.hasOwnProperty(key)) {
			console.error('Static data declare adventure "' + key + '" which has no text !');
			// this is serious, remove this adventure from the list
			delete adventures[key];
		}
		else {
			console.error('Locale messages reference adventure "' + key + '" which is not declared in static data !');
		}
	});

	return adventures;
});

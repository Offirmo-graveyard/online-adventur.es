define([
	'lodash',
	'boringrpg/i18n/nls/en/messages',
	'boringrpg/lib/static-data/model/weapons',
],
function(_, i18n_messages, weapon) {
	'use strict';

	// preprocess
	_.forOwn(weapon.types, function (value, key) {
		_.defaultsDeep(value, {
			id: key,
			msg_key: 'weapon_' + key,
			affinities: {}
		});
	});

	_.forOwn(weapon.primary_qualifiers, function (value, key) {
		_.defaultsDeep(value, {
			id: key,
			msg_key: 'weaponqualif1_' + key,
			affinities: {}
		});
	});

	_.forOwn(weapon.secondary_qualifiers, function (value, key) {
		_.defaultsDeep(value, {
			id: key,
			msg_key: 'weaponqualif2_' + key,
			affinities: {}
		});
	});

	function filter_commented_out(collection) {
		return _.reject(collection, function(value, key) {
			return key[0] === '_';
		});
	}

	weapon.types = filter_commented_out(weapon.types);
	weapon.primary_qualifiers = filter_commented_out(weapon.primary_qualifiers);
	weapon.secondary_qualifiers = filter_commented_out(weapon.secondary_qualifiers);

	function check_msg_keys(model, radix, i18n_messages) {
		// extract keys from model declarations
		var available_from_model = _.pluck(model, 'id');
		//_.keys(model);

		// extract keys from the i18n messages
		var match_length = radix.length;
		var available_from_msgs = _.keys(
			_.omit(i18n_messages, function(value, key) {
				return key.substr(0, match_length) !== radix;
			})
		)
		.map(function(key) {
			return key.slice(match_length);
		});

		// check if they match
		var mismatched_keys = _.xor(available_from_model, available_from_msgs);
		mismatched_keys.forEach(function(key) {
			var msg_key = radix + key;
			if (_.contains(available_from_model, key)) {
				console.error('Static data declare "' + key + '" which has no text ! (' + msg_key + ')');
				// this is serious, remove this entry from the model
				delete model[key];
			}
			else {
				console.error('Locale messages reference "' + msg_key + '" which is not declared in static data !');
			}
		});
	}

	check_msg_keys(weapon.types,                'weapon_',        i18n_messages);
	check_msg_keys(weapon.primary_qualifiers,   'weaponqualif1_', i18n_messages);
	check_msg_keys(weapon.secondary_qualifiers, 'weaponqualif2_', i18n_messages);

	// let's generate !


	return weapon;
});

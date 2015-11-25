define([
	'lodash',
	'client/common/incubator/random',
	'boringrpg/lib/static-data/model/weapons-checked',
],
function(_, random, weapon_data) {
	'use strict';

	// let's generate !
	var TYPE_COUNT = weapon_data.types.length;
	var QUALIF1_COUNT = weapon_data.primary_qualifiers.length;
	var QUALIF2_COUNT = weapon_data.secondary_qualifiers.length;

	function Weapon(data) {
		data = data || {};
		data = _.pick(data, ['type', 'qualif1', 'qualif2']);

		var generated = {
			type: weapon_data.types[random.getRandomIndex(TYPE_COUNT)],
			qualif1: weapon_data.primary_qualifiers[random.getRandomIndex(QUALIF1_COUNT)],
			qualif2: weapon_data.secondary_qualifiers[random.getRandomIndex(QUALIF2_COUNT)]
		};

		data = _.defaults(data, generated);

		_.extend(this, data);
	}

	Weapon.create = function(data) {
		return new Weapon(data);
	};

	return Weapon;
});

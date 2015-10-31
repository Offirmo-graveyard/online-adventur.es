define([
	'lodash',
	'client/common/incubator/random',
	'boringrpg/lib/static-data/model/weapons-checked',
],
function(_, random, weapon_data) {
	'use strict';

	// let's generate !
	var type_count = weapon_data.types.length;
	var qualif1_count = weapon_data.primary_qualifiers.length;
	var qualif2_count = weapon_data.secondary_qualifiers.length;
	function generate() {
		return {
			type: weapon_data.types[random.getRandomIndex(type_count)],
			qualif1: weapon_data.primary_qualifiers[random.getRandomIndex(qualif1_count)],
			qualif2: weapon_data.secondary_qualifiers[random.getRandomIndex(qualif2_count)]
		};
	}

	return {
		generate: generate
	};
});

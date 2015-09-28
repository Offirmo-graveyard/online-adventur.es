define([
	'lodash',
	'client/common/incubator/random',
	'boringrpg/lib/static-data/checked-weapons',
],
function(_, random, weapon_data) {
	'use strict';

	// let's generate !
	var type_count = weapon_data.types.length;
	var qualif1_count = weapon_data.primary_qualifiers.length;
	var qualif2_count = weapon_data.secondary_qualifiers.length;
	function generate() {
		var type = weapon_data.types[random.getRandomIndex(type_count)];
		var qualif1 = weapon_data.primary_qualifiers[random.getRandomIndex(qualif1_count)];
		var qualif2 = weapon_data.secondary_qualifiers[random.getRandomIndex(qualif2_count)];

		console.log(type, qualif1, qualif2);
	}

	generate();
	generate();
	generate();
});

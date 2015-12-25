define([
	'lodash',
	'boringrpg/lib/static-data/model/model_loader',
	'boringrpg/lib/models/adventure-archetype',
	'boringrpg/lib/static-data/model/raw-adventure-archetypes',
	'boringrpg/lib/models/weapon-component',
	'boringrpg/lib/static-data/model/raw-weapon-components',
],
function(_, load_model_from_static_data,
         AdventureArchetype, raw_AdventureArchetypes,
         WeaponComponent, raw_WeaponComponents)
{
	'use strict';

	var adventure_archetypes = load_model_from_static_data(AdventureArchetype, raw_AdventureArchetypes, {
		msg_radix: 'clickmsg_'
	});

	var weapon_components = load_model_from_static_data(WeaponComponent, raw_WeaponComponents, {
		msg_radix: 'weapon_'
	});

	return {
		AdventureArchetype: adventure_archetypes,
		WeaponComponent: weapon_components
	};
});

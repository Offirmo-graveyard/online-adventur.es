define([
	'lodash',
	'boringrpg/lib/static-data/model/model_loader',
	'boringrpg/lib/models/adventure-archetype',
	'boringrpg/lib/static-data/model/raw-adventure-archetypes',
],
function(_, load_model_from_static_data, AdventureArchetype, raw_AdventureArchetypes) {
	'use strict';

	var adventure_archetypes = load_model_from_static_data(AdventureArchetype, raw_AdventureArchetypes, {
		msg_radix: 'clickmsg_'
	});

	return {
		AdventureArchetype: adventure_archetypes
	};
});

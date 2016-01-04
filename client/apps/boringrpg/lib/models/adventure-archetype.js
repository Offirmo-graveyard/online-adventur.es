/** An adventure "archetype" (or "template") which can be instantiated to an actual adventure.
 */
define([
	'lodash',
	'moment',
	'jsen',
	'json!boringrpg/lib/models/adventure-archetype.schema.json'
],
function(_, moment, jsen, schema) {
	'use strict';

	/////// Validation ///////
	var is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema);
	if (! is_schema_valid) throw new Error('AdventureArchetype model : internal schema is invalid !');
	var _validate = jsen(schema, {
		greedy: true,
		formats: {}
	});

	var build = _validate.build;

	function validate(data) {
		if (!_validate(data)) {
			var err = new Error('AdventureArchetype model : provided data are invalid !');
			err.bad_data = _.cloneDeep(data);
			err.validation_errors = _.cloneDeep(_validate.errors);
			console.error('AdventureArchetype model : validation error !', err.bad_data, err.validation_errors);
			throw err;
		}
	}


	/////// Methods ///////

	function AdventureArchetype(data) {
		data = build(data || {}, { additionalProperties: false });
		validate(data);

		_.defaults(this, data);
	}


	/////// Creation ///////

	AdventureArchetype.create = function(data) {
		return new AdventureArchetype(data);
	};


	return AdventureArchetype;
});

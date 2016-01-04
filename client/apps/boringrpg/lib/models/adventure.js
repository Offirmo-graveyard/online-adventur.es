/** An adventure progress, "instantiated" from an AdventureArchetype
 */
define([
	'lodash',
	'jsen',
	'json!boringrpg/lib/models/adventure.schema.json'
],
function(_, jsen, schema) {
	'use strict';

	/////// Validation ///////
	var is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema);
	if (! is_schema_valid) throw new Error('Adventure model : internal schema is invalid !');
	var _validate = jsen(schema, {
		greedy: true,
		formats: {}
	});

	var build = _validate.build;

	function validate(data) {
		var err = new Error('Adventure model : provided data are invalid !');
		err.bad_data = _.cloneDeep(data);
		err.validation_errors = [];

		if (!_validate(data)) {
			err.validation_errors = _.cloneDeep(_validate.errors);
			console.error('Adventure model : validation error !', err.bad_data, err.validation_errors);
			throw err;
		}
	}


	/////// Methods ///////
	function Adventure(data) {
		data = build(data || {}, { additionalProperties: false });
		validate(data);

		_.defaults(this, data);
	}

	Adventure.prototype.get = function () {
		var data = build(this); // REM : perform a copy

		if (data.gains.weapon)
			data.gains.weapon = data.gains.weapon.get();

		if (data.gains.armor)
			data.gains.armor = data.gains.armor.get();

		return data;
	};

	Adventure.create = function(data) {
		return new Adventure(data);
	};

	return Adventure;
});

/** An adventure progress (result of a good click)
 */
define([
	'lodash',
	'jsen',
	'json!./adventure-schema.json'
],
function(_, jsen, schema) {
	'use strict';

	var DEFAULTS = {

	};

	var is_schema_valid = jsen({"$ref": "http://json-schema.org/draft-04/schema#"})(schema);
	if (! is_schema_valid) throw new Error('Adventure : internal schema is invalid !');

	var validate_schema = jsen(schema);
	function validate(data) {
		var is_valid = validate_schema(data);
		if (!is_valid)
			throw new Error('Adventure : provided data are invalid !');
	}

	function Adventure(data) {
		if (data) validate(data);
		data = data || {};

		_.defaults(this, data, DEFAULTS);
	}

	Adventure.create = function(data) {
		return new Adventure(data);
	};

	return Adventure;
});

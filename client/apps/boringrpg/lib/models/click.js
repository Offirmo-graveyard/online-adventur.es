/** A click, good or bad
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
	if (! is_schema_valid) throw new Error('Click : internal schema is invalid !');

	var validate_schema = jsen(schema);
	function validate(data) {
		var is_valid = validate_schema(data);
		if (!is_valid)
			throw new Error('Click : provided data are invalid !');
	}

	function Click(data) {
		if (data) validate(data);
		data = data || {};

		_.defaults(this, data, DEFAULTS);
	}

	Click.create = function(data) {
		return new Click(data);
	};

	return Click;
});

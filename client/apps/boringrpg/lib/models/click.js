/** A click, good or bad
 */
define([
	'lodash',
	'jsen',
	'json!./click-schema.json'
],
function(_, jsen, schema) {
	'use strict';

	console.log(schema);

	var DEFAULTS = {

	};

	var is_schema_valid = jsen({"$ref": "http://json-schema.org/draft-04/schema#"})(schema);
	if (! is_schema_valid) throw new Error('Click : internal schema is invalid !');

	var _validate = jsen(schema, {
		greedy: true,
		formats: {
		}
	});
	var build = _validate.build;
	function validate(data) {
		console.log('validating...', data);
		var is_valid = _validate(data);
		console.log('valid', is_valid);
		if (!is_valid) {
			console.error('Click validation error', _validate.errors);
			throw new Error('Click : provided data are invalid !');
		}
	}

	function Click(data) {
		data = build(data || {}, { additionalProperties: false });
		validate(data);

		_.defaults(this, data);
	}

	Click.create = function(data) {
		return new Click(data);
	};

	return Click;
});

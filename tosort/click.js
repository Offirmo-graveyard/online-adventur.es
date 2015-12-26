/** A click, good or bad
 */
define([
	'lodash',
	'moment',
	'jsen',
	'json!./click.schema.json'
],
function(_, moment, jsen, schema) {
	'use strict';

	/////// Validation ///////
	var is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema);
	if (! is_schema_valid) throw new Error('Click model : internal schema is invalid !');
	var _validate = jsen(schema, {
		greedy: true,
		formats: {}
	});

	var build = _validate.build;

	function validate(data) {
		if (!_validate(data)) {
			console.error('Click model : validation error !', _validate.errors);
			var err = new Error('Click model : provided data are invalid !');
			err.errors = _validate.errors;
			throw err;
		}
	}


	/////// Methods ///////

	function Click(data) {
		data = build(data || {}, { additionalProperties: false });
		validate(data);

		_.defaults(this, data);

		this.date_moment_utc = this.date_moment_utc || moment.utc();
	}


	/////// Creation ///////

	Click.create = function(data) {
		return new Click(data);
	};


	return Click;
});

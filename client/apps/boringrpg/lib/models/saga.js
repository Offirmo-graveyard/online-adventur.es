/** An saga = a complete state of a player's saga, made of several adventures
 */
define([
	'lodash',
	'moment',
	'jsen',
	'json!./saga.schema.json'
],
function(_, moment, jsen, schema) {
	'use strict';

	/////// Validation ///////
	var is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema);
	if (! is_schema_valid) throw new Error('Saga model : internal schema is invalid !');
	var _validate = jsen(schema, {
		greedy: true,
		formats: {}
	});

	var build = _validate.build;

	function validate(data) {
		if (!_validate(data)) {
			console.error('Saga model : validation error !', _validate.errors);
			throw new Error('Saga model : provided data are invalid !');
		}
	}


	/////// Methods ///////

	function Saga(data) {
		data = build(data || {}, { additionalProperties: false });
		validate(data);

		_.defaults(this, data);

		this.date_moment_utc = this.date_moment_utc || moment.utc();
	}


	/////// Creation ///////

	Saga.create = function(data) {
		return new Saga(data);
	};


	return Saga;
});

/*
define([
	'lodash',
	'boringrpg/lib/models/adventure',
	'boringrpg/lib/static-data/model/adventures-checked',
],
function(_, Adventure, adventures_data) {
	'use strict';

	var ADVENTURES_KEYS = _.keys(adventures_data);

	function Saga() {
		this.last_selector = -1;
	}


	Saga.prototype.select_next_progress = function () {
		var selector;
		do {
			selector = getRandomInt(0, ADVENTURES_KEYS.length);
		} while (selector === this.last_selector);
		this.last_selector = selector;
		return adventures_data[ADVENTURES_KEYS[selector]];
	};


	Saga.prototype.progress = function () {

	};

	return Saga;
});
*/

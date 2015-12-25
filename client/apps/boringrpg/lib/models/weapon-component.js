/** A weapon component = one of the qualifiers needed to generate a weapon
 */
define([
	'lodash',
	'moment',
	'jsen',
	'json!./weapon-component.schema.json',
	'boringrpg/lib/static-data/model/db',
	'client/common/incubator/random',
],
function(_, moment, jsen, schema, StaticDb, random) {
	'use strict';

	/////// Validation ///////
	var is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema);
	if (! is_schema_valid) throw new Error('WeaponComponent model : internal schema is invalid !');
	var _validate = jsen(schema, {
		greedy: true,
		formats: {}
	});

	var build = _validate.build;

	function validate(data) {
		var err = new Error('WeaponComponent model : provided data are invalid !');
		err.bad_data = _.cloneDeep(data);
		err.validation_errors = [];

		if (!_validate(data)) {
			err.validation_errors = _.cloneDeep(_validate.errors);
			console.error('WeaponComponent model : validation error !', err.bad_data, err.validation_errors);
			throw err;
		}

		if (!_.contains([ 'base', 'qualifier1', 'qualifier2', 'quality'], data.type)) {
			err.validation_errors.push('type must be base, qualifier1, qualifier2 or quality');
			console.error('WeaponComponent model : validation error !', err.bad_data, err.validation_errors);
			throw err;
		}
	}


	/////// Utils ///////
	var get_components_by_type = _.memoize(function (type) {
		return _.filter(StaticDb.WeaponComponent.all, {
			type: type
		});
	});


	/////// Methods ///////
	function WeaponComponent(data) {
		// to ease building from static data, this model has a special type inference :
		data = data || {};
		data.type = data.type || data.id.slice(0, data.id.indexOf('_'));

		data = build(data, { additionalProperties: false });
		validate(data);

		_.defaults(this, data);
	}

	WeaponComponent.prototype.generate = function() {
	};


	/////// Creation ///////
	WeaponComponent.create = function(data) {
		return new WeaponComponent(data);
	};


	/////// misc ///////
	WeaponComponent.schema = schema;
	WeaponComponent.validate = validate;


	return WeaponComponent;
});

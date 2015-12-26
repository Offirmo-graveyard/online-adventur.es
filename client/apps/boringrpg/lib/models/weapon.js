define([
	'lodash',
	'jsen',
	'json!./weapon.schema.json',
	'boringrpg/lib/static-data/model/db',
	'client/common/incubator/random',
],
function(_, jsen, schema, StaticDb, random) {
	'use strict';

	/////// Validation ///////
	var is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema);
	if (! is_schema_valid) throw new Error('Weapon model : internal schema is invalid !');
	var _validate = jsen(schema, {
		greedy: true,
		formats: {}
	});

	var build = _validate.build;

	function validate(data) {
		var err = new Error('Weapon model : provided data are invalid !');
		err.bad_data = _.cloneDeep(data);
		err.validation_errors = [];

		if (!_validate(data)) {
			err.validation_errors = _.cloneDeep(_validate.errors);
			console.error('Weapon model : validation error !', err.bad_data, err.validation_errors);
			throw err;
		}
	}


	/////// Utils ///////
	var get_components_by_type = _.memoize(function (type) {
		return _.filter(StaticDb.WeaponComponent.all, {
			type: type
		});
	});

	// pick a random component of given type
	function pick_new_random_component (type) {
		var pool = get_components_by_type(type);
		return pool[random.getRandomIndex(pool.length)];
	}

	// auto-fill missing parts in given data
	function generate_missing_components (data) {
		[ 'base', 'qualifier1', 'qualifier2', 'quality'].forEach(function(type) {
			if (data[type].id) return;
			// TODO pick matching components
			var component = pick_new_random_component(type);
			data[type] = _.pick(component, [ 'id', 'msg_id' ]);
		});
	}


	/////// Methods ///////
	function Weapon(data) {
		data = build(data || {}, { additionalProperties: false });
		generate_missing_components(data);
		// autogen the hash
		data.components_hash = [data.base.id, data.qualifier1.id, data.qualifier2.id, data.quality.id].join('+');
		validate(data);

		_.defaults(this, data);
	}


	/////// Creation ///////
	Weapon.create = function(data) {
		return new Weapon(data);
	};


	/////// misc ///////
	Weapon.schema = schema;
	Weapon.validate = validate;


	return Weapon;
});

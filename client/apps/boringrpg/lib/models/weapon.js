define([
	'lodash',
	'jsen',
	'json!boringrpg/lib/models/weapon.schema.json',
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
		// TODO restrict "artifact" quality
		return pool[random.getRandomIndex(pool.length)];
	}

	// auto-fill missing parts in given data
	var QUALITY_BONUS = {
		quality_common:      0,
		quality_uncommon:    1,
		quality_rare:        3,
		quality_epic:        4,
		quality_legendary:   5,
		quality_artifact:    6
	};
	function generate_missing_components (data) {
		[ 'base', 'qualifier1', 'qualifier2', 'quality' ].forEach(function(type) {
			if (data[type].id) return;
			// TODO pick matching components thanks to affinities ?
			var component = pick_new_random_component(type);
			data[type] = _.pick(component, [ 'id', 'msg_id' ]);
		});

		if (! _.isNumber(QUALITY_BONUS[data.quality.id])) {
			console.error(data, data.quality, QUALITY_BONUS[data.quality.id], schema.properties.base_strength.maximum);
			throw new Error('Internal error at weapon generation !');
		}
		if (_.isUndefined(data.base_strength))
			data.base_strength = random.getRandomIntInclusive( 1 + QUALITY_BONUS[data.quality.id], schema.properties.base_strength.maximum );
	}


	/////// Methods ///////
	function Weapon(data) {
		data = build(data || {}, { additionalProperties: false });
		generate_missing_components(data);
		validate(data);

		_.defaults(this, data);
	}

	Weapon.prototype.get = function () {
		return build(this); // REM : perform a copy
	};

	// A hash for this weapon components only
	Weapon.prototype.get_components_hash = function () {
		return [data.base.id, data.qualifier1.id, data.qualifier2.id, data.quality.id].join('+');
	};

	// A full id for this weapon
	Weapon.prototype.get_hash = function () {
		return [this.get_components_hash(), this.base_strength, this.enhancement_level].join('+');
	};

	// actualized strength
	// quality multipliers (see spreadsheet for calculation)
	var QUALITY_STRENGTH_MULTIPLIER = {
		quality_common:      1,
		quality_uncommon:   19,
		quality_rare:       46,
		quality_epic:       91,
		quality_legendary: 182,
		quality_artifact:  333
	};
	var QUALITY_SPREAD = {
		quality_common:      6,
		quality_uncommon:    5,
		quality_rare:        4,
		quality_epic:        3,
		quality_legendary:   2,
		quality_artifact:    1
	};
	var ENHANCEMENT_MULTIPLIER = 0.2;
	Weapon.prototype.get_strength = function () {
		if (! this.quality.id || ! QUALITY_STRENGTH_MULTIPLIER[this.quality.id]|| ! QUALITY_SPREAD[this.quality.id])
			throw new Error('Weapon strength computation : invalid quality "' + this.quality.id + '" !');

		var spread = QUALITY_SPREAD[this.quality.id];
		var min_strength = Math.max(this.base_strength - spread, 1);
		var max_strength = Math.min(this.base_strength + spread, 20);
		return [
			this.strengthToDamage(min_strength),
			this.strengthToDamage(max_strength)
		]
	};

	Weapon.prototype.strengthToDamage = function(strength) {
		return strength
			* QUALITY_STRENGTH_MULTIPLIER[this.quality.id]
			* (1 + ENHANCEMENT_MULTIPLIER * this.enhancement_level);
	};


	/////// Creation ///////
	Weapon.create = function(data) {
		return new Weapon(data);
	};


	/////// misc ///////
	Weapon.schema = schema;
	Weapon.validate = validate;


	return Weapon;
});

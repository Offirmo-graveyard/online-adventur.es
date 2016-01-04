/** An saga = a complete state of a player's saga, made of several adventures
 */
define([
	'lodash',
	'moment',
	'jsen',
	'json!boringrpg/lib/models/saga.schema.json',
	'boringrpg/lib/static-data/model/db',
	'client/common/incubator/random',
	'boringrpg/lib/models/adventure',
	'boringrpg/lib/models/weapon',
],
function(_, moment, jsen, schema, StaticDb, random, Adventure, Weapon) {
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
		var err = new Error('Saga model : provided data are invalid !');
		err.bad_data = _.cloneDeep(data);
		err.validation_errors = [];

		if (!_validate(data)) {
			err.validation_errors = _.cloneDeep(_validate.errors);
			console.error('Saga model : validation error !', err.bad_data, err.validation_errors);
			throw err;
		}

		if (data.valid_click_count > data.click_count) {
			err.validation_errors.push('valid_click_count must be <= click_count');
			console.error('Saga model : validation error !', err.bad_data, err.validation_errors);
			throw err;
		}
	}


	/////// Utils ///////
	var get_AdventureArchetypes_by_click_validity = _.memoize(function (validity) {
		return _.filter(StaticDb.AdventureArchetype.all, {
			pre: {
				good_click: validity
			}
		});
	});


	/////// Methods ///////
	var STARTING_WEAPON_DATA = {
		base_strength: 1,
		base: {
			id: 'base_spoon',
			msg_id: 'weapon_base_spoon'
		},
		qualifier1: {
			id: 'qualifier1_crafted',
			msg_id: 'weapon_qualifier1_crafted'
		},
		qualifier2: {
			id: 'qualifier2_noob',
			msg_id: 'weapon_qualifier2_noob'
		},
		quality: {
			id: 'quality_common',
			msg_id: 'weapon_quality_common'
		}
	};
	function Saga(data) {
		data = build(data || {}, { additionalProperties: false });
		if (! data.inventory.length)
			data.inventory.push(STARTING_WEAPON_DATA);
		data.inventory = _.map(data.inventory, function (data) {
			return Weapon.create(data);
		});
		validate(data);

		_.defaults(this, data);

		this.next_allowed_click_date_moment_utc = this.next_allowed_click_date_moment_utc || moment.utc();
	}

	Saga.prototype.get = function () {
		var data = build(this); // REM : perform a copy
		data.inventory = _.map(data.inventory, function(item) {
			return item.get();
		});
		return data;
	};

	Saga.prototype.generate_click_adventure = function() {
		var click_date_moment_utc = moment.utc();
		var elapsed_since_click_allowed = click_date_moment_utc.diff(this.next_allowed_click_date_moment_utc);
		var is_click_valid = elapsed_since_click_allowed > 0;
		var adventure_archetypes_pool = get_AdventureArchetypes_by_click_validity(is_click_valid);

		var selected_adventure_archetype = this._pick_acceptable_new_adventure_archetype(adventure_archetypes_pool);

		return this._instantiate_adventure_archetype(selected_adventure_archetype);
	};

	Saga.prototype._pick_acceptable_new_adventure_archetype = function(adventure_archetypes_pool) {
		var pool_length = adventure_archetypes_pool.length;
		var selected_adventure_archetype;
		var infinite_loop_safety = 0;
		while(! selected_adventure_archetype) {
			infinite_loop_safety++;
			if (infinite_loop_safety > 100) throw new Error('Infinite loop !');
			var candidate = adventure_archetypes_pool[random.getRandomIndex(pool_length)];
			//console.log('* trying adventure archetype #' + candidate.id + '...');
			pertinence_check: {
				if (_.contains(this.flags.recent_adventure_ids, candidate.id)) {
					//console.log('  REJECTED : too recently selected.');
					break pertinence_check;
				}

				if (!this._is_adventure_archetype_matching_current_preconditions(candidate)) {
					//console.log('  REJECTED : preconditions not met.');
					break pertinence_check;
				}

				// ok !
				selected_adventure_archetype = candidate;
			}
		}

		this.flags.recent_adventure_ids.push(selected_adventure_archetype.id);
		var limit = schema.properties.flags.properties.recent_adventure_ids.maxItems;
		if (this.flags.recent_adventure_ids.length > limit)
			this.flags.recent_adventure_ids = this.flags.recent_adventure_ids.slice(-limit);

		return selected_adventure_archetype;
	};

	Saga.prototype._is_adventure_archetype_matching_current_preconditions = function(archetype) {
		return true; // no preconditions so far
	};

	Saga.prototype._instantiate_adventure_archetype = function(archetype) {
		// TODO adjust according to player's level

		var data = {
			archetype_id: archetype.id,
			msg_id: archetype.msg_id,
			good: archetype.pre.good_click,
			gains: _.cloneDeep(archetype.post.gains)
		};

		_.forEach(schema.properties.stats.properties, function(etc, key) {
			this.stats[key] += data.gains[key];
		}, this);

		_.forEach(schema.properties.currencies.properties, function(etc, key) {
			this.currencies[key] += data.gains[key];
		}, this);

		if (archetype.post.gains.weapon) {
			// TODO ensure no weapon duplication
			// TODO scale weapon according level ?
			data.gains.weapon = Weapon.create();
			this.add_to_inventory(data.gains.weapon);
		}
		else delete data.gains.weapon;

		if (archetype.post.gains.armor) {
			console.error('XXX Not Implemented !');
		}
		else delete data.gains.armor;

		if (archetype.post.gains.weapon_improvement) {
			console.error('XXX Not Implemented !');
		}
		else delete data.gains.weapon_improvement;

		if (archetype.post.gains.armor_improvement) {
			console.error('XXX Not Implemented !');
		}
		else delete data.gains.armor_improvement;

		if (archetype.post.gains.flags) {
			throw new Error('Not Implemented !');
		}
		else delete data.gains.flags;

		return Adventure.create(data);
	};

	Saga.prototype.add_to_inventory = function(gear) {
		this.inventory.push(gear);
		// TODO sort
		if (this.inventory.length > schema.properties.inventory.maxItems)
			this._make_room_in_inventory();
	};

	Saga.prototype._make_room_in_inventory = function() {
		var least_precious_item;
		xxx
	};

	/////// Creation ///////
	Saga.create = function(data) {
		return new Saga(data);
	};


	/////// misc ///////
	Saga.schema = schema;
	Saga.validate = validate;


	return Saga;
});

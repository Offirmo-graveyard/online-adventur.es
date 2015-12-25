/** An saga = a complete state of a player's saga, made of several adventures
 */
define([
	'lodash',
	'moment',
	'jsen',
	'json!./saga.schema.json',
	'boringrpg/lib/static-data/model/db',
	'client/common/incubator/random',
	'boringrpg/lib/models/adventure',
],
function(_, moment, jsen, schema, StaticDb, random, Adventure) {
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
	var get_bad_AdventureArchetypes = _.memoize(function () {
		return _.filter(StaticDb.AdventureArchetype.all, {
			pre: {
				good_click: false
			}
		});
	});
	var get_good_AdventureArchetypes = _.memoize(function () {
		return _.filter(StaticDb.AdventureArchetype.all, {
			pre: {
				good_click: true
			}
		});
	});


	/////// Methods ///////
	function Saga(data) {
		data = build(data || {}, { additionalProperties: false });
		validate(data);

		_.defaults(this, data);

		this.next_allowed_click_date_moment_utc = this.next_allowed_click_date_moment_utc || moment.utc();
	}

	Saga.prototype.generate_click_adventure = function() {
		var click_date_moment_utc = moment.utc();
		var elapsed_since_click_allowed = click_date_moment_utc.diff(this.next_allowed_click_date_moment_utc);
		var is_click_valid = elapsed_since_click_allowed > 0;
		var adventure_archetypes_pool = is_click_valid ? get_good_AdventureArchetypes() : get_bad_AdventureArchetypes();

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
			console.log('* trying adventure archetype #' + candidate.id + '...');
			pertinence_check: {
				if (_.contains(this.flags.recent_adventure_ids, candidate.id)) {
					console.log('  REJECTED : too recently selected.');
					break pertinence_check;
				}

				if (!this._is_adventure_archetype_matching_current_preconditions(candidate)) {
					console.log('  REJECTED : preconditions not met.');
					break pertinence_check;
				}

				// ok !
				selected_adventure_archetype = candidate;
			}
		}
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
			gains: archetype.post.gains
		};

		_.forEach(schema.properties.stats.properties, function(etc, key) {
			this.stats[key] += data.gains[key];
		}, this);

		_.forEach(schema.properties.currencies.properties, function(etc, key) {
			this.currencies[key] += data.gains[key];
		}, this);

		if (archetype.post.gains.weapon) {
			throw new Error('Not Implemented !');
		}
		if (archetype.post.gains.armor) {
			throw new Error('Not Implemented !');
		}
		if (archetype.post.gains.weapon_improvement) {
			throw new Error('Not Implemented !');
		}
		if (archetype.post.gains.armor_improvement) {
			throw new Error('Not Implemented !');
		}
		if (archetype.post.gains.flags) {
			throw new Error('Not Implemented !');
		}

		return Adventure.create(data);
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

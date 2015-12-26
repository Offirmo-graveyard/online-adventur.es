if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'moment',
	'boringrpg/lib/models/saga',
	'boringrpg/lib/static-data/model/db',
	'boringrpg/lib/models/adventure-archetype',
	'boringrpg/lib/models/adventure',
	'boringrpg/lib/models/weapon'
], function(chai, mocha, moment, CUT, StaticDb, AdventureArchetype, Adventure, Weapon) {
	'use strict';

	var expect = chai.expect;
	var original_staticDb_AdventureArchetype = StaticDb.AdventureArchetype;

	describe('Saga Model', function() {
		var clock;
		var expected_default_weapon;

		beforeEach(function () {
			clock = sinon.useFakeTimers(1234, 'Date'); // needed to have a reproducible timestamp
		});
		afterEach(function () {
			clock.restore();
		});

		beforeEach(function () {
			expected_default_weapon = Weapon.create({
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
			});
			var template = {
				// gain everything !!
				post: {
					gains: {
						level: 3,
						health: 3,
						mana: 3,
						strength: 3,
						agility: 3,
						vitality: 3,
						wisdom: 3,
						luck: 3,
						coins: 3,
						tokens: 3,
						weapon: true,
						// TODO :
						//armor: true,
						//weapon_improvement: true,
						//armor_improvement: true
					}
				}
			};
			var good_archetype_1 = AdventureArchetype.create(_.merge({
				id: 'good1',
				msg_id: 'm_good1'
			}, template));
			var good_archetype_2 = AdventureArchetype.create(_.merge({
				id: 'good2',
				msg_id: 'm_good2'
			}, template));
			var good_archetype_3 = AdventureArchetype.create(_.merge({
				id: 'good3',
				msg_id: 'm_good3'
			}, template));
			var bad_archetype_1 = AdventureArchetype.create({
				id: 'bad1',
				msg_id: 'm_bad1',
				pre: {
					good_click: false
				}
			});
			StaticDb.AdventureArchetype = {
				all: [ good_archetype_1, good_archetype_2, good_archetype_3, bad_archetype_1 ],
				by_id: {
					good1: good_archetype_1,
					good2: good_archetype_2,
					good3: good_archetype_3,
					bad1: bad_archetype_1
				}
			}
		});
		afterEach(function () {
			StaticDb.AdventureArchetype = original_staticDb_AdventureArchetype;
		});

		describe('creation', function () {

			context('without data', function () {

				it('should work', function () {
					var out = CUT.create();
					expect(out).to.be.an.object;
					expect(out).to.be.an.instanceOf(CUT);
				});

				it('should provide sane defaults', function () {
					var out = CUT.create();
					var expected = {
						random_seed: 123,
						click_count: 0,
						valid_click_count: 0,
						next_allowed_click_date_moment_utc: moment.utc(),
						stats: {
							agility: 1,
							health: 1,
							level: 1,
							luck: 1,
							mana: 0,
							strength: 1,
							vitality: 1,
							wisdom: 1
						},
						currencies: {
							coins: 0,
							tokens: 0
						},
						inventory: [
							expected_default_weapon
						],
						skills: [],
						flags: {
							recent_adventure_ids: []
						}
					};
					expect(_.cloneDeep(out), 'full').to.deep.equal(_.cloneDeep(expected));
				});

			});

			context('with data', function () {

				it('should work', function () {
					var test_weapon = Weapon.create();
					var out = CUT.create({
						random_seed: 2345,
						click_count: 10,
						valid_click_count: 1,
						next_allowed_click_date_moment_utc: 2345,
						stats: {
							agility: 2,
							health: 3,
							level: 4,
							luck: 5,
							mana: 6,
							strength: 7,
							vitality: 8,
							wisdom: 9
						},
						currencies: {
							coins: 10,
							tokens: 11
						},
						inventory: [
							test_weapon
						],
						skills: [],
						flags: {
							recent_adventure_ids: [ 'foo', 'bar' ]
						}
					});
					var expected = {
						random_seed: 2345,
						click_count: 10,
						valid_click_count: 1,
						next_allowed_click_date_moment_utc: 2345,
						stats: {
							agility: 2,
							health: 3,
							level: 4,
							luck: 5,
							mana: 6,
							strength: 7,
							vitality: 8,
							wisdom: 9
						},
						currencies: {
							coins: 10,
							tokens: 11
						},
						inventory: [
							test_weapon
						],
						skills: [],
						flags: {
							recent_adventure_ids: [ 'foo', 'bar' ]
						}
					};
					//console.log('actual', _.cloneDeep(out));
					//console.log('expected', _.cloneDeep(expected));
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep(expected));
				});

				it('should validate', function () {
					var tempfn = function() { CUT.create({
						click_count: 1,
						valid_click_count: 2,
					}); };
					expect(tempfn).to.throw(Error, 'Saga model : provided data are invalid !');
				});

				it('should strip extra properties', function () {
					var out = CUT.create({
						foo: 'bar'
					});
					expect(out).to.not.have.property('foo');
				});

				it('should provide sane defaults for missing properties', function () {
					var out = CUT.create({
						click_count: 2,
						stats: {
							level: 3
						}
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
						random_seed: 123,
						click_count: 2,
						valid_click_count: 0,
						next_allowed_click_date_moment_utc: moment.utc(),
						stats: {
							agility: 1,
							health: 1,
							level: 3,
							luck: 1,
							mana: 0,
							strength: 1,
							vitality: 1,
							wisdom: 1
						},
						currencies: {
							coins: 0,
							tokens: 0
						},
						inventory: [
							expected_default_weapon
						],
						skills: [],
						flags: {
							recent_adventure_ids: []
						}
					}));
				});
			})
		});

		describe('progress generation', function () {
			var saga;

			beforeEach(function() {
				saga = CUT.create();
			});

			context('when the click is valid', function () {
				beforeEach(function() {
					clock.tick(1);
				});

				it('should generate a "good click" adventure', function () {
					var adventure_instance = saga.generate_click_adventure();
					expect([ 'good1', 'good2', 'good3' ]).to.contain(adventure_instance.archetype_id);
					expect(adventure_instance).to.be.an.instanceOf(Adventure);
				});

				it('should update stats accordingly', function () {
					var adventure_instance = saga.generate_click_adventure();

					_.forEach(CUT.schema.properties.stats.properties, function(etc, key) {
						expect(adventure_instance.gains[key]).to.be.above(0); // check the test itself
						expect(saga.stats[key]).to.equal(
							CUT.schema.properties.stats.properties[key].default
							+ adventure_instance.gains[key]
						);
					});
				});

				it('should update currencies accordingly', function () {
					var adventure_instance = saga.generate_click_adventure();

					_.forEach(CUT.schema.properties.currencies.properties, function(etc, key) {
						expect(adventure_instance.gains[key]).to.be.above(0); // check the test itself
						expect(saga.currencies[key]).to.equal(
							CUT.schema.properties.currencies.properties[key].default
							+ adventure_instance.gains[key]
						);
					});
				});

				describe('weapon addition', function () {

					context('when the inventory has room', function () {
						it('should add it to the inventory');
					});

					context('when the inventory is full', function () {
						it('should add it to the inventory AND drop the other least precious non-equipped item');
					});

				});

				describe('armor addition', function () {

					context('when the inventory has room', function () {
						it('should add it to the inventory');
					});

					context('when the inventory is full', function () {
						it('should add it to the inventory AND drop the other least precious non-equipped item');
					});
				});

				describe('skill addition', function () {

					context('when not already known', function () {
						it('should add it to knowledge');
					});

					context('when already known', function () {
						// XXX possible or precondition ?
						it('should do nothing');
					});
				});

				describe('flag update', function () {
					it('should update flags accordingly');
				});

				it('should NOT repeat the same adventure', function () {
					for(var i = 0; i < 5; i++) {
						saga = CUT.create();

						clock.tick(100000); // for clicks to be valid
						var inst1 = saga.generate_click_adventure();

						clock.tick(100000);
						var inst2 = saga.generate_click_adventure();
						expect(inst2.archetype_id).to.not.equal(inst1.archetype_id);

						clock.tick(100000);
						var inst3 = saga.generate_click_adventure();
						expect(inst3.archetype_id).to.not.equal(inst2.archetype_id);
						expect(inst3.archetype_id).to.not.equal(inst1.archetype_id);
					}
				});
			});

			context('when the click is INvalid', function () {
				it('should generate a "bad click" adventure', function () {
					var adventure_instance = saga.generate_click_adventure();
					expect([ 'bad1' ]).to.contain(adventure_instance.archetype_id);
					expect(adventure_instance).to.be.an.instanceOf(Adventure);
				});
			});

		});

	});
});

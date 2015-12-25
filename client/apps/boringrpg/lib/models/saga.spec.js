if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'moment',
	'client/apps/boringrpg/lib/models/saga'
], function(chai, mocha, moment, CUT) {
	'use strict';

	var expect = chai.expect;

	describe('Saga Model', function() {
		var clock;

		beforeEach(function () {
			clock = sinon.useFakeTimers(1234, 'Date'); // needed to have a reproducible timestamp
		});
		afterEach(function () {
			clock.restore();
		});

		describe('creation', function () {

			context('without data', function () {

				it('should work', function () {
					var out = CUT.create();
					expect(out).to.be.an.object;
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
						inventory: [],
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
						inventory: [],
						skills: [],
						flags: {
							recent_adventure_ids: [ 'foo', 'bar' ]
						}
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
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
						inventory: [],
						skills: [],
						flags: {
							recent_adventure_ids: [ 'foo', 'bar' ]
						}
					}));
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
					console.log(out);
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
						inventory: [],
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
				});
				it('should update stats accordingly', function () {

				});
				it('should update inventory accordingly', function () {

				});
				it('should update skills accordingly', function () {

				});
				it('should update flags accordingly', function () {

				});
				it('should NOT repeat the same adventure', function () {

				});
			});

			context('when the click is INvalid', function () {
				it('should generate a "bad click" adventure', function () {

				});
			});

		});

	});
});

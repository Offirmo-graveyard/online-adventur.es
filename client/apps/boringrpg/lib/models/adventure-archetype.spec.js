if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'client/apps/boringrpg/lib/models/adventure-archetype'
], function(chai, mocha, CUT) {
	'use strict';

	var expect = chai.expect;

	describe('AdventureArchetype Model', function() {
		describe('creation', function () {
			context('with data (mandatory)', function () {
				it('should work', function () {
					var out = CUT.create({
						id: 'hi',
						msg_id: 'm_hi',
						pre: {
							good_click: false
						},
						post: {
							gains: {
								level: 1,
								health: 2,
								mana: 3,
								strength: 4,
								agility: 5,
								vitality: 6,
								wisdom: 7,
								luck: 8,
								coins: 9,
								tokens: 10,
								weapon: true,
								armor: true,
								weapon_improvement: true,
								armor_improvement: true
							}
						}
					});
					expect(out).to.deep.equal({
						id: 'hi',
						msg_id: 'm_hi',
						pre: {
							good_click: false
						},
						post: {
							gains: {
								level: 1,
								health: 2,
								mana: 3,
								strength: 4,
								agility: 5,
								vitality: 6,
								wisdom: 7,
								luck: 8,
								coins: 9,
								tokens: 10,
								weapon: true,
								armor: true,
								weapon_improvement: true,
								armor_improvement: true
							}
						}
					});
				});

				it('should validate', function () {
					var tempfn = function() { CUT.create(); };
					expect(tempfn).to.throw(Error, 'AdventureArchetype model : provided data are invalid !');
				});

				it('should strip extra properties', function () {
					var out = CUT.create({
						id: 'hello',
						msg_id: 'm_hello',
						foo: 'bar'
					});
					expect(out).to.not.have.property('foo');
				});

				it('should provide sane defaults for missing properties', function () {
					var out = CUT.create({ id: 'hello', msg_id: 'hello' });
					console.log(out);
					expect(out).to.deep.equal({
						id: 'hello',
						msg_id: 'hello',
						pre: {
							good_click: true
						},
						post: {
							gains: {
								level: 0,
								health: 0,
								mana: 0,
								strength: 0,
								agility: 0,
								vitality: 0,
								wisdom: 0,
								luck: 0,
								coins: 0,
								tokens: 0,
								weapon: false,
								armor: false,
								weapon_improvement: false,
								armor_improvement: false
							}
						}
					});
				});
			})
		});
	});
});

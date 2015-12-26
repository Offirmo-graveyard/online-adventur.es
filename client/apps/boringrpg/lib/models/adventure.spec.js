if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'boringrpg/lib/models/adventure'
], function(chai, mocha, CUT) {
	'use strict';

	var expect = chai.expect;

	describe('Adventure', function() {

		describe('creation', function () {

			context('with data (mandatory)', function () {

				it('should work', function () {
					var out = CUT.create({
						archetype_id: 'hello',
						msg_id: 'm_hello',
						good: true,
						gains: {
							weapon: {
								id: 'foo'
							}
						}
					});
					var expected = {
						archetype_id: 'hello',
						msg_id: 'm_hello',
						good: true,
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
							weapon: {
								id: 'foo'
							}
							//armor:
							//weapon_improvement:
							//armor_improvement:
						}
					};
					expect(_.cloneDeep(out)).to.deep.equal(expected);
				});

				it('should validate', function () {
					var tempfn = function() { CUT.create({
						archetype_id: 'hello',
						msg_id: 'x',
						good: true
					}); };
					expect(tempfn).to.throw(Error, 'Adventure model : provided data are invalid !');
				});

				it('should strip extra properties', function () {
					var out = CUT.create({
						archetype_id: 'hello',
						msg_id: 'm_hello',
						good: true,
						foo: 'bar'
					});
					expect(out).to.not.have.property('foo');
				});

				it('should provide sane defaults for missing properties', function () {
					var out = CUT.create({
						archetype_id: 'hello',
						msg_id: 'm_hello',
						good: true,
						gains: {
							level: 3
						}
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
						archetype_id: 'hello',
						msg_id: 'm_hello',
						good: true,
						gains: {
							level: 3,
							health: 0,
							mana: 0,
							strength: 0,
							agility: 0,
							vitality: 0,
							wisdom: 0,
							luck: 0,
							coins: 0,
							tokens: 0,
							//weapon:
							//armor:
							//weapon_improvement:
							//armor_improvement:
						}
					}));
				});
			})
		});
	});
});

if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'moment',
	'boringrpg/lib/models/weapon-component',
	'boringrpg/lib/static-data/model/db',
	//'boringrpg/lib/models/weapon',
], function(chai, mocha, moment, CUT, StaticDb, Weapon) {
	'use strict';

	var expect = chai.expect;

	describe.only('WeaponComponent Model', function() {

		describe('creation', function () {

			context('with data (mandatory)', function () {

				it('should work', function () {
					var out = CUT.create({
						id: 'foo',
						msg_id: 'm_foo',
						type: 'base'
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
						id: 'foo',
						msg_id: 'm_foo',
						type: 'base',
						affinities: {}
					}));
				});

				it('should infer type from id', function () {
					var out;

					// base
					out = CUT.create({
						id: 'base_foo',
						msg_id: 'm_foo'
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
						id: 'base_foo',
						msg_id: 'm_foo',
						type: 'base',
						affinities: {}
					}));

					// q1
					out = CUT.create({
						id: 'qualifier1_foo',
						msg_id: 'm_foo'
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
						id: 'qualifier1_foo',
						msg_id: 'm_foo',
						type: 'qualifier1',
						affinities: {}
					}));

					// q2
					out = CUT.create({
						id: 'qualifier2_foo',
						msg_id: 'm_foo'
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
						id: 'qualifier2_foo',
						msg_id: 'm_foo',
						type: 'qualifier2',
						affinities: {}
					}));

					// quality
					out = CUT.create({
						id: 'quality_foo',
						msg_id: 'm_foo'
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
						id: 'quality_foo',
						msg_id: 'm_foo',
						type: 'quality',
						affinities: {}
					}));
				});

				it('should validate', function () {
					var tempfn = function() { CUT.create({
						id: 'base_foo',
						msg_id: 'm_foo',
						type: 'xyz'
					}); };
					expect(tempfn).to.throw(Error, 'WeaponComponent model : provided data are invalid !');
				});

				it('should strip extra properties', function () {
					var out = CUT.create({
						id: 'base_foo',
						msg_id: 'm_foo',
						foo: 'bar'
					});
					expect(out).to.not.have.property('foo');
				});

				it('should provide sane defaults for missing properties', function () {
					var out = CUT.create({
						id: 'base_foo',
						msg_id: 'm_foo'
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
						id: 'base_foo',
						msg_id: 'm_foo',
						type: 'base',
						affinities: {}
					}));
				});
			})
		});

		describe('random generation', function () {

		});

	});
});

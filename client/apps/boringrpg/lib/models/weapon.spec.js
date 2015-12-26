if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'boringrpg/lib/models/weapon'
], function(chai, mocha, CUT) {
	'use strict';

	var expect = chai.expect;

	describe('Weapon', function() {

		describe('creation', function () {

			context('without data', function () {

				it('should work', function () {
					var out = CUT.create();
					expect(out).to.be.an.object;
					expect(out).to.be.an.instanceOf(CUT);
				});

				it('should provide sane defaults', function () {
					for(var i = 0; i < 10; ++i) {
						var out = CUT.create();
						expect(out).to.have.property('base_strength');
						expect(out.base_strength).to.be.above(0);
						expect(out.base_strength).to.be.below(21);
						expect(out).to.have.property('enhancement_level', 0);
						expect(out).to.have.deep.property('base.id');
						expect(out).to.have.deep.property('base.msg_id');
						expect(out).to.have.deep.property('qualifier1.id');
						expect(out).to.have.deep.property('qualifier1.msg_id');
						expect(out).to.have.deep.property('qualifier2.id');
						expect(out).to.have.deep.property('qualifier2.msg_id');
						expect(out).to.have.deep.property('quality.id');
						expect(out).to.have.deep.property('quality.msg_id');
						/*
						expect(out).to.have.property(
							'components_hash',
							[ out.base.id, out.qualifier1.id, out.qualifier2.id, out.quality.id ].join('+')
						);
						*/
					}
				});
			});

			context('with data', function () {

				it('should work', function () {
					var out = CUT.create({
						base: {
							id: 'base',
							msg_id: 'm_base'
						},
						qualifier1: {
							id: 'qualifier1',
							msg_id: 'm_qualifier1'
						},
						qualifier2: {
							id: 'qualifier2',
							msg_id: 'm_qualifier2'
						},
						quality: {
							id: 'quality',
							msg_id: 'm_quality'
						},
						base_strength: 7
					});
					expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
						base: {
							id: 'base',
							msg_id: 'm_base'
						},
						qualifier1: {
							id: 'qualifier1',
							msg_id: 'm_qualifier1'
						},
						qualifier2: {
							id: 'qualifier2',
							msg_id: 'm_qualifier2'
						},
						quality: {
							id: 'quality',
							msg_id: 'm_quality'
						},
						base_strength: 7,
						enhancement_level: 0
					}));
				});

				it('should validate', function () {
					var tempfn = function() { CUT.create({
						base_strength: 0
					}); };
					expect(tempfn).to.throw(Error, 'Weapon model : provided data are invalid !');
				});

				it('should strip extra properties', function () {
					var out = CUT.create({
						base_strength: 12,
						foo: 'bar'
					});
					expect(out).to.not.have.property('foo');
				});

				it('should provide sane defaults for missing properties', function () {
					var out = CUT.create({
						base_strength: 12,
						base: {
							id: 'base',
							msg_id: 'm_base'
						},
						quality: {
							id: 'quality',
							msg_id: 'm_quality'
						}
					});
					expect(out).to.have.property('base_strength', 12);
					expect(out).to.have.property('enhancement_level', 0);
					expect(out.base).to.deep.equal({
						id: 'base',
						msg_id: 'm_base'
					});
					expect(out).to.have.deep.property('qualifier1.id');
					expect(out).to.have.deep.property('qualifier1.msg_id');
					expect(out).to.have.deep.property('qualifier2.id');
					expect(out).to.have.deep.property('qualifier2.msg_id');
					expect(out.quality).to.deep.equal({
						id: 'quality',
						msg_id: 'm_quality'
					});
				});
			})
		});
	});
});

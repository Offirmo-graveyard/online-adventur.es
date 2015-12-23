if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'client/apps/boringrpg/lib/models/click'
], function(chai, mocha, CUT) {
	'use strict';

	var expect = chai.expect;

	describe('Click', function() {

		describe('creation', function () {
			context('with no data', function () {

				it('should work', function () {
					var out = CUT.create();
				});

				it('should provide sane defaults', function () {
					var out = CUT.create();
					expect(out).to.deep.equal({
						is_valid: true,
						date_moment_utc: 0,
						wait_interval_s: 0,
						msg: 'no_clickmsg'
					});
				});

			});

			context('with data', function () {

				it('should work', function () {
					var out = CUT.create({
						is_valid: false,
						date_moment_utc: 123,
						wait_interval_s: 12,
						msg: 'foo'
					});
					expect(out).to.deep.equal({
						is_valid: false,
						date_moment_utc: 123,
						wait_interval_s: 12,
						msg: 'foo'
					});
				});

				it('should validate', function () {
					var tempfn = function() { CUT.create({ wait_interval_s: -3}); };
					expect(tempfn).to.throw(Error, 'Click : provided data are invalid !');
				});

				it('should strip extra properties', function () {
					var out = CUT.create({
						foo: 'bar'
					});
					expect(out).to.not.have.property('foo');
				});

				it('should provide sane defaults for missing properties', function () {
					var out = CUT.create({
						date_moment_utc: 123,
						msg: 'foo'
					});
					expect(out).to.deep.equal({
						is_valid: true,
						date_moment_utc: 123,
						wait_interval_s: 0,
						msg: 'foo'
					});
				});
				
			})
		});
	});
});

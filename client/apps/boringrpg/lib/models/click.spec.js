if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'moment',
	'boringrpg/lib/models/click'
], function(chai, mocha, moment, CUT) {
	'use strict';

	var expect = chai.expect;

	describe('Click Model', function() {
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
					expect(out).to.deep.equal({
						is_valid: true,
						date_moment_utc: moment.utc(),
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
					expect(tempfn).to.throw(Error, 'Click model : provided data are invalid !');
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

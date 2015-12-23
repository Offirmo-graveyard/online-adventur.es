if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'client/apps/boringrpg/lib/models/adventure'
], function(chai, mocha, CUT) {
	'use strict';

	var expect = chai.expect;

	describe('Adventure', function() {

		describe('creation', function () {
			context('with no data', function () {
				it('should work', function () {
					var out = CUT.create();
				});
				it('should provide sane defaults', function () {
					var out = CUT.create();
				});
			});

			context('with data', function () {
				it('should work', function () {
					var out = CUT.create({
						foo: 'bar'
					});
				});
				it('should validate', function () {
					var out = CUT.create({
						foo: 'bar'
					});
				});
				it('should provide sane defaults for missing properties', function () {
					expect(true).to.be.false;
				});
			})
		});
	});
});

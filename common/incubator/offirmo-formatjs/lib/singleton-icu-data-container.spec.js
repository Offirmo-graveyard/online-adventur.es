'use strict';

var path = require('path');

var lut = require('./singleton-icu-data-container');

describe('singleton-icu-data-container', function () {

	describe('setter', function () {

		it('should be exposed', function () {
			expect(lut.set_icu_data).to.be.a('function');
		});

		context('when given correct parameters', function () {
			it('should work', function () {

			});
		});

		context('when given bad parameters', function () {
			it('should revert to last good known lang if available', function () {

			});
		});


	});

	describe('getter', function () {

		describe('locale change listener', function () {
			it('should be called on locale change', function () {

			});
		});

	});
});

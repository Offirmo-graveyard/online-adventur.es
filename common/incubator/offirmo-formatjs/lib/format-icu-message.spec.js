'use strict';

var path = require('path');

var format = require('./format-icu-message');


describe('format-icu-message', function () {

	it('should expose a function', function () {
		expect(format).to.be.a('function');
	});

	describe('format()', function () {

		context('when passed correct parameters', function () {

			var test_cases = [
				{
					message: 'foo',
					expected: 'foo'
				}
			];

			test_cases.forEach(function (test_case) {
				it('should format correctly "' + test_case.message + '"', function () {
					var res = format(
						test_case.message,
						test_case.values,
						test_case.locale,
						test_case.custom_formats
					);

					expect(res).to.equal(test_case.expected);
				});
			});

		});

		context('when passed incorrect parameters', function () {

			// TODO

		});

	});

});

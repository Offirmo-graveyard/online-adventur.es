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
				},
				{
					message: 'Bonjour {name} !',
					expected: 'Bonjour M. World !',
					values: {
						name: 'M. World'
					}
				},
				{
					locale: 'fr',
					message: 'Il est {now, time, long} et tout va bien.',
					expected: 'Il est 6:56:07 et tout va bien.',
					values: {
						now: 1234567890
					}
				},
				{
					locale: 'en',
					message: 'It’s {now, time, long} and all is well.',
					// TODO check the suspicious double space
					expected: 'It’s 6:56:07 AM  and all is well.',
					values: {
						now: 1234567890
					}
				},
				{
					locale: 'fr',
					message: 'J’ai {numCats, number} chats. Environ {percentBlackCats, number, percent} d’entre eux sont noirs.',
					expected: 'J’ai 5 chats. Environ 23\u00A0% d’entre eux sont noirs.',
					values: {
						numCats: 5,
						percentBlackCats: 0.234
					}
				},
				{
					locale: 'en',
					message: 'I have {numCats, number} cats. Almost {percentBlackCats, number, percent} of them are black.',
					expected: 'I have 5 cats. Almost 23% of them are black.',
					values: {
						numCats: 5,
						percentBlackCats: 0.234
					}
				},
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

			var test_cases = [
				{
					locale: null, // will auto fallback to en
					message: 'Il est {now, time, long  } et tout va bien.',
					expected: 'Il est 6:56:07 AM  et tout va bien.', // fr string with en formatted date
					values: {
						now: 1234567890
					}
				},
				{
					locale: 'fr',
					message: null,
					expected: '[i18n|fr|???|TC#123]'
				}
			];

			test_cases.forEach(function (test_case, index) {
				it('should return a best effort string,' +
					' as explicit as possible and containing maximum information - case #' + index, function () {
					var res = format(
						test_case.message,
						test_case.values,
						test_case.locale,
						test_case.custom_formats,
						'TC#123' // example debug id
					);

					expect(res).to.equal(test_case.expected);
				});
			});
		});

	});

});

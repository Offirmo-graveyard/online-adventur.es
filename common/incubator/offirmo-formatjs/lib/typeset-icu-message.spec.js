'use strict';

var path = require('path');

var typeset_lib = require('./typeset');

var typeset_icu_message = require('./typeset-icu-message');


describe('typeset-icu-message', function () {

	it('should expose a function', function () {
		expect(typeset_icu_message).to.be.a('function');
	});

	context('when passed correct parameters', function () {

		var test_cases = [
			{
				data: '',
				expected: ''
			},
			{
				data: 'a',
				expected: 'a'
			},
			{
				data: '{',
				expected: '{'
			},
			{
				data: '}',
				expected: '}'
			},
			{
				data: 'foo',
				expected: 'foo'
			},
			{
				data: '...',
				expected: '…'
			},
			{
				data: 'foo...bar......',
				expected: 'foo…bar……'
			},
			{
				data: '...{...',
				expected: '…{...'
			},
			{
				data: '...{...}',
				expected: '…{...}'
			},
			{
				data: '...{...}...',
				expected: '…{...}…'
			},
			{
				data: '...}...',
				expected: '…}…'
			},
			{
				data: '{...}',
				expected: '{...}'
			},
			{
				data: '{...}...',
				expected: '{...}…'
			},
			{
				data: '{...{...}}',
				expected: '{...{...}}'
			},
			{
				data: '{{...}...}',
				expected: '{{...}...}'
			},
			{
				data: '{...{...}...}',
				expected: '{...{...}...}'
			},
			{
				data: '...{...{...}...}...',
				expected: '…{...{...}...}…'
			},
			{
				data: '...{...}...{...}...',
				expected: '…{...}…{...}…'
			},
			{
				data: 'Vous {itemCount1, plural, =0 {n’avez aucun objet} one {avez 1 objet} other {avez {itemCount1} objets}}.',
				expected: 'Vous {itemCount1, plural, =0 {n’avez aucun objet} one {avez 1 objet} other {avez {itemCount1} objets}}.'
			},
		];

		function base_typeset (text) {
			return typeset_lib.typeset(
				text,
				typeset_lib.rule_sets.fr
			);
		}

		test_cases.forEach(function (test_case) {
			it('should format correctly "' + test_case.data + '" into "' + test_case.expected + '"', function () {
				var res = typeset_icu_message(test_case.data, base_typeset);

				expect(res).to.equal(test_case.expected);
			});
		});
	});

	context('when passed incorrect parameters', function () {

	});

	context('when used with the typeset lib', function () {

	});

});

'use strict';

var path = require('path');

var lib = require('./typeset');


describe.only('typeset', function () {

	it('should expose a function', function () {
		expect(lib.typeset).to.be.a('function');
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

		test_cases.forEach(function (test_case) {
			it('should format correctly "' + test_case.message + '"', function () {
				var res = lib.typeset(test_case.data, lib.rule_sets.fr);

				expect(res).to.equal(test_case.expected);
			});
		});

	});

	context('when passed incorrect parameters', function () {

	});

});

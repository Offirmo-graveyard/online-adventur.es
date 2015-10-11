'use strict';

var path = require('path');

var _ = require('lodash');

var lib = require('./typeset');


describe('typeset', function () {

	it('should expose a function', function () {
		expect(lib.typeset).to.be.a('function');
	});

	var rule_test_cases = {
		APOSTROPHE_to_RIGHT_SINGLE_QUOTATION_MARK: {
			matched: '\'',
			output: '’'
		},
		NO_BREAK_SPACE_before_QUESTION_MARK: {
			matched: ' ?',
			output: '\u00A0?'
		},
		NO_BREAK_SPACE_before_EXCLAMATION_MARK: {
			matched: ' !',
			output: '\u00A0!'
		},
		NO_BREAK_SPACE_before_COLON: {
			matched: ' :',
			output: '\u00A0:'
		},
		NO_BREAK_SPACE_before_SEMICOLON: {
			matched: ' ;',
			output: '\u00A0;'
		},
		NO_BREAK_SPACE_after_LEFT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK: {
			matched: '« ',
			output: '«\u00A0'
		},
		NO_BREAK_SPACE_before_RIGHT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK: {
			matched: ' »',
			output: '\u00A0»'
		},
		FULL_STOP_to_HORIZONTAL_ELLIPSIS: {
			matched: '...',
			output: '…'
		},
		NO_BREAK_SPACE_after_integer: {
			matched: '8 bits',
			output: '8\u00A0bits'
		}
	};

	describe('rules', function () {
		beforeEach(function () {
			expect(lib.rules.length).to.equal(rule_test_cases.length);
		});

		function build_pattern(l, o) {
			return [
				l,
				l + o,
				o + l,
				o + l + o,
				l + l,
				l + l + o,
				o + l + l,
				o + l + l + o,
				o + l + o + l + o,
				o + l + o + l,
				l + o + l + o
			];
		}
		var pattern_ids = build_pattern(' l ', ' o ');

		_.forEach(rule_test_cases, function (test_data, rule_key) {
			describe('rule ' + rule_key, function () {
				it('should work on multiple patterns', function () {
					var input = build_pattern(test_data.matched, 'xyz');
					var expected_output = build_pattern(test_data.output, 'xyz');

					pattern_ids.forEach(function(id, index) {
						expect(lib.typeset(input[index], rule_key), 'pattern "' + id + '"')
							.to.equal(expected_output[index]);
					});
				});
			});
		})
	});

	context('when passed undefined', function () {
		_.forEach(lib.rules, function (value, rule_key) {
			it('should return empty string with rule ' + rule_key, function () {
				expect(lib.typeset(undefined, rule_key)).to.equal('');
			});
		});
	});

	context('when passed an empty string', function () {
		_.forEach(lib.rules, function (value, rule_key) {
			it('should return empty string with rule ' + rule_key, function () {
				expect(lib.typeset(undefined, rule_key)).to.equal('');
			});
		});
	});

	describe('rule sets', function () {

		it('should combine included rules', function () {
			expect(lib.typeset('5 more tests to write...', lib.rule_sets.generic))
				.to.equal('5\u00A0more tests to write…');
		});

		describe('predefined rule sets', function () {

			describe('fr', function () {
				it('should work', function () {
					// TODO improve
					expect(lib.typeset(
						'« 5 tests à écrire... » soupira-t-il : J\'ai bientôt fini !',
						lib.rule_sets.fr)
					).to.equal('«\u00A05\u00A0tests à écrire…\u00A0» soupira-t-il\u00A0: J’ai bientôt fini\u00A0!');
				});
			});

		});
	});

	// more examples than tests
	describe('usage cases', function () {

		describe('partial form', function () {
			it('should work', function () {
				var typeset_function = _.partialRight(lib.typeset, lib.rule_sets.fr);
				expect(typeset_function('« 5 tests à écrire... » soupira-t-il : J\'ai bientôt fini !'))
					.to.equal('«\u00A05\u00A0tests à écrire…\u00A0» soupira-t-il\u00A0: J’ai bientôt fini\u00A0!');
			});
		});

	});
});

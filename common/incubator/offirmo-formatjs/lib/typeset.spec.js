'use strict';

var path = require('path');

var _ = require('lodash');

var lib = require('./typeset');


describe.only('typesetX', function () {

	it('should expose a function', function () {
		expect(lib.typeset).to.be.a('function');
	});

	var rule_test_cases = {
		APOSTROPHE_to_RIGHT_SINGLE_QUOTATION_MARK: '\'',
		NO_BREAK_SPACE_before_QUESTION_MARK: ' ?',
		NO_BREAK_SPACE_before_EXCLAMATION_MARK: ' !',
		NO_BREAK_SPACE_before_COLON: ' :',
		NO_BREAK_SPACE_before_SEMICOLON: ' ;',
		NO_BREAK_SPACE_after_LEFT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK: '« ',
		NO_BREAK_SPACE_before_RIGHT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK: ' »',
		FULL_STOP_to_HORIZONTAL_ELLIPSIS: '...',
		NO_BREAK_SPACE_after_integer: '$1 '
	};

	describe('rules', function () {
		beforeEach(function () {
			expect(lib.rules.length).to.equal(rule_test_cases.length);
		});

		_.forEach(rule_test_cases, function (matched_pattern, rule_key) {
			describe('rule ' + rule_key, function () {
				it('should work on string "' + matched_pattern + '"', function () {
					expect(lib.typeset(matched_pattern, rule_key))
						.to.equal(lib.rules[rule_key].newSubStr);
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

});

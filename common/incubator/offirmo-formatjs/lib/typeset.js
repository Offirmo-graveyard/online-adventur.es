// if node.js : use amdefine
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'lodash',
],
function(_) {
	'use strict';

	// UPPER CASE corresponds to unicode char name
	// http://www.fileformat.info/info/unicode/char/search.htm
	var rules = {
		APOSTROPHE_to_RIGHT_SINGLE_QUOTATION_MARK: {
			regexp: /'/g,
			newSubStr: '’'
		},
		NO_BREAK_SPACE_before_QUESTION_MARK: {
			regexp: / \?/g,
			newSubStr: '\u00A0?'
		},
		NO_BREAK_SPACE_before_EXCLAMATION_MARK: {
			regexp: / !/g,
			newSubStr: '\u00A0!'
		},
		NO_BREAK_SPACE_before_COLON: {
			regexp: / :/g,
			newSubStr: '\u00A0:'
		},
		NO_BREAK_SPACE_before_SEMICOLON: {
			regexp: / ;/g,
			newSubStr: '\u00A0;'
		},
		NO_BREAK_SPACE_after_LEFT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK: {
			regexp: /« /g,
			newSubStr: '«\u00A0'
		},
		NO_BREAK_SPACE_before_RIGHT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK: {
			regexp: / »/g,
			newSubStr: '\u00A0»'
		},
		FULL_STOP_to_HORIZONTAL_ELLIPSIS: {
			regexp: /\.\.\./g,
			newSubStr: '…'
		},
		NO_BREAK_SPACE_after_integer: {
			regexp: /(\d+) /g,
			newSubStr:'$1\u00A0'
		},
	};

	var ruleset_fr = [
		rules.APOSTROPHE_to_RIGHT_SINGLE_QUOTATION_MARK,
		rules.NO_BREAK_SPACE_before_QUESTION_MARK,
		rules.NO_BREAK_SPACE_before_EXCLAMATION_MARK,
		rules.NO_BREAK_SPACE_before_COLON,
		rules.NO_BREAK_SPACE_before_SEMICOLON,
		rules.NO_BREAK_SPACE_after_LEFT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK,
		rules.NO_BREAK_SPACE_before_RIGHT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK,
		rules.FULL_STOP_to_HORIZONTAL_ELLIPSIS,
		rules.NO_BREAK_SPACE_after_integer
	];

	var ruleset_en = [
		rules.APOSTROPHE_to_RIGHT_SINGLE_QUOTATION_MARK,
		rules.NO_BREAK_SPACE_after_LEFT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK,
		rules.NO_BREAK_SPACE_before_RIGHT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK,
		rules.FULL_STOP_to_HORIZONTAL_ELLIPSIS,
		rules.NO_BREAK_SPACE_after_integer
	];

	var ruleset_generic = [
		rules.APOSTROPHE_to_RIGHT_SINGLE_QUOTATION_MARK,
		rules.FULL_STOP_to_HORIZONTAL_ELLIPSIS,
		rules.NO_BREAK_SPACE_after_integer
	];

	function typeset(text, rule_set) {
		text = text || '';

		rule_set = _.isArray(rule_set)
			? rule_set
			: [ _.isObject(rule_set) ? rule_set : rules[rule_set] ];

		_.forEach(rule_set, function(rule) {
			//console.log('applying rule ' + rule + ' to "' + text + '" ' + rule.newSubStr);
			text = text.replace(rule.regexp, rule.newSubStr);
		});

		return text;
	}

	return {
		rules: rules,
		rule_sets: {
			generic: ruleset_generic,
			fr: ruleset_fr,
			en: ruleset_en
		},
		typeset: typeset
	};

});

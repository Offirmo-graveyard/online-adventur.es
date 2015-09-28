define(
[
	'angular',
	'lodash',
],
function(angular, _) {
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
			newSubStr: '&nbsp;?'
		},
		NO_BREAK_SPACE_before_EXCLAMATION_MARK: {
			regexp: / !/g,
			newSubStr: '&nbsp;!'
		},
		NO_BREAK_SPACE_before_COLON: {
			regexp: / :/g,
			newSubStr: '&nbsp;:'
		},
		NO_BREAK_SPACE_before_SEMICOLON: {
			regexp: / ;/g,
			newSubStr: '&nbsp;;'
		},
		NO_BREAK_SPACE_after_LEFT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK: {
			regexp: /« /g,
			newSubStr: '«&nbsp;'
		},
		NO_BREAK_SPACE_before_RIGHT_POINTING_DOUBLE_ANGLE_QUOTATION_MARK: {
			regexp: / »/g,
			newSubStr: '&nbsp;»'
		},
		FULL_STOP_to_HORIZONTAL_ELLIPSIS: {
			regexp: /\.\.\./g,
			newSubStr: '…'
		},
		NO_BREAK_SPACE_after_integer: {
			regexp: /(\d+) /,
			newSubStr:'$1&nbsp;'
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

	function typeset(text, rule_set) {
		text = text | '';

		_.forEach(rule_set, function(rule) {
			text = text.replace(rule.regexp, rule.newSubStr);
		});

		return text;
	}

	return {
		rules: rules,
		rule_sets: {
			fr: ruleset_fr,
			en: ruleset_en
		},
		typeset: typeset
	};

});

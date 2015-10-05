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
		text = text || '';

		_.forEach(rule_set, function(rule) {
			text = text.replace(rule.regexp, rule.newSubStr);
		});

		return text;
	}


	function typeset_icu_message(text, base_typeset) {
		text = text || '';
		var result = '';

		var imbricated_curlies = 0;
		var current_pos = 0;

		function onOpeningCurly(opening_curly_pos) {
			var extra_content = text.slice(current_pos, opening_curly_pos + 1);
			if(imbricated_curlies === 0)
				extra_content = base_typeset(extra_content);
			result = result + extra_content;
			current_pos = opening_curly_pos + 1;
			imbricated_curlies++;
		}

		function onClosingCurly(closing_curly_pos) {
			result = result + text.slice(current_pos, closing_curly_pos + 1);
			current_pos = closing_curly_pos + 1;
			imbricated_curlies--;
		}

		var safety = 0;
		while(current_pos < text.length) {
			if ((safety++) > 100) throw new Error('suspicious loop in ypeset-icu-message !');

			var next_opening_curly = text.indexOf('{', current_pos);
			if(imbricated_curlies === 0) {
				if (next_opening_curly >= 0) {
					onOpeningCurly(next_opening_curly);
				}
				else {
					result = result + base_typeset(text.slice(current_pos));
					current_pos = text.length;
				}
			}
			else {
				var next_closing_curly = text.indexOf('}', current_pos);
				if (next_opening_curly >= 0 && next_closing_curly >=0) {
					if(next_opening_curly < next_closing_curly)
						onOpeningCurly(next_opening_curly);
					else
						onClosingCurly(next_closing_curly);
				}
				else if (next_closing_curly >= 0) {
					onClosingCurly(next_closing_curly);
				}
				else {
					result = result + text.slice(current_pos);
					current_pos = text.length;
				}
			}
		}

		return result;
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

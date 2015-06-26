// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../i18n/common.en');

	var messages = {
		title: 'OA', //'Offirmo’s online adventures',
		description: 'Offirmo’s handmade or recommended online adventures games.',
		keywords: 'game, videogame, rpg, adventure',
	};

	return _.defaults(messages, parent_messages);
});

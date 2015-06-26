// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../i18n/common.fr');

	var messages = {
		title: 'Le jeu du nombre par Offirmo',
		description: 'un jeu de nombre à deviner',
		keywords: 'jeu',
	};

	return _.defaults(messages, parent_messages);
});

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../common/i18n/common.en');

	var messages = {
		title: 'The Boring RPG reloaded',
		description: 'The most simple RPG',
		keywords: 'game, RPG, adventure',
	};

	return _.defaults(messages, parent_messages);
});

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../i18n/common.fr');

	var messages = {
		title: 'Test d’une appli web utilisant famous'
	};

	return _.defaults(messages, parent_messages);
});

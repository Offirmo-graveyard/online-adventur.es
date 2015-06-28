// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../i18n/common.en');

	var messages = {
		title: 'Test of a famous-based web app'
	};

	return _.defaults(messages, parent_messages);
});

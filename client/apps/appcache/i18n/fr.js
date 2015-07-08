// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../common/i18n/common.fr');
	var fallback_messages = require('./en.fr');

	var messages = {
		title: 'Une web app qui fonctionne hors-ligne'
	};

	return _.defaults(messages, parent_messages, fallback_messages);
});

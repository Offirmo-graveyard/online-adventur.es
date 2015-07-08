// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../common/i18n/common.fr');
	var fallback_messages = require('./en');
	// clearly mark the missing translations
	_.forEach(fallback_messages, function(value, key, collection) {
		collection[key] = '[' + key + ']' + value;
	});

	var messages = {
		hello_world: 'Bonjour, monde !',
		title: 'Une web app bonjour monde',

		server_side_i18n: 'i18n côté serveur',
		client_side_i18n: 'i18n côté client',
	};

	return _.defaults(messages, parent_messages, fallback_messages);
});

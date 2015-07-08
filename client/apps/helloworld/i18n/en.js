// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../common/i18n/common.en');

	var messages = {
		hello_world: 'Hello world !',
		title: 'An hello world web app',

		server_side_i18n: 'Server-side i18n',
		client_side_i18n: 'Client-side i18n',
	};

	return _.defaults(messages, parent_messages);
});

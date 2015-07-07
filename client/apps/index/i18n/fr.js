// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('../../../common/i18n/common.fr');

	var messages = {
		title: 'Jeux d’aventures en ligne par Offirmo',
		description: 'Jeux d’aventures en ligne par Offirmo',
		keywords: 'jeu, jeu vidéo, rpg, aventure',
	};

	return _.defaults(messages, parent_messages);
});

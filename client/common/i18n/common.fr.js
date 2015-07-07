// common strings in given language

if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require) {
	'use strict';

	var _ = require('lodash');

	var parent_messages = require('./common');

	var messages = {
		title: 'Une appli web',
		description: 'Une appli web en development',
		keywords: '',

		warning_nojs: 'Soit votre navigateur n’offre pas le javascript, soit vous l’avez désactivé. Dans les deux cas, ce site ne peut pas fonctionner.',
		warning_lowie: 'Votre navigateur est <strong>périmé</strong>. Veuillez le <a href="http://browsehappy.com/">mettre à jour</a> pour accéder à ce site.',

		coming_soon: 'bientôt disponible',
	};

	return _.defaults(messages, parent_messages);
});

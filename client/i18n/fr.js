// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
	'use strict';

	return {
		warning_nojs: 'Soit votre navigateur n’offre pas le javascript, soit vous l’avez désactivé. Dans les deux cas, ce site ne peut pas fonctionner.',
		warning_lowie: 'Votre navigateur est <strong>périmé</strong>. Veuillez le <a href="http://browsehappy.com/">mettre à jour</a> pour accéder à ce site.',

		//canonical_url: ,
		//facebook_page: ,

		title: 'Jeux d’aventures en ligne par Offirmo',
		description: 'Jeux d’aventures en ligne par Offirmo',
		keywords: 'jeu, jeu vidéo, rpg, aventure',
		author: 'Offirmo',

		coming_soon: 'bientôt disponible',
	};
});

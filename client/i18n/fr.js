// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
	'use strict';

	return {
		warning_nojs: 'Soit votre navigateur n’offre pas le javascript, soit vous l’avez désactivé. Dans les deux cas, ce site ne peut pas marcher...',
		warning_lowie: 'Votre navigateur est <strong>périmé</strong>. Veuillez le <a href="http://browsehappy.com/">mettre à jour</a> pour accéder à ce site.',
		//canonical_url: ,
		//facebook_page: ,
		meta_description: 'Aventures en ligne par Offirmo',
		meta_keywords: 'jeu, jeu vidéo, jeux, jeux vidéos, rpg, aventure',
		meta_author: 'Offirmo',
		title: 'Les aventures en ligne d’Offirmo',
		coming_soon: 'bientôt disponible',
	};
});

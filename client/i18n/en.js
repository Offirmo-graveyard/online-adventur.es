// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
	'use strict';

	return {
		warning_nojs: 'Your browser either does not support JavaScript, or has it turned off. Either way, this website can’t work...',
		warning_lowie: 'You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.',

		canonical_url: 'http://www.online-adventur.es/',
		facebook_page: 'https://www.facebook.com/TODO',

		title: 'Offirmo’s online adventures',
		description: 'Offirmo’s handmade or recommended online adventures games.',
		keywords: 'game, videogame, rpg, adventure',
		author: 'Offirmo',

		coming_soon: 'coming soon',
	};
});

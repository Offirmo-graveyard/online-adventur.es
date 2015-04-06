// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
	'use strict';

	return {
		warning_nojs: 'Your browser either does not support JavaScript, or has it turned off. Either way, this website can’t work...',
		warning_lowie: 'You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.',
		canonical_url: 'http://www.online-adventur.es/',
		facebook_page: 'https://www.facebook.com/TODO',
		meta_description: 'Offirmo’s online adventures',
		meta_keywords: 'game, rpg, adventure',
		meta_author: 'Offirmo',
		title: 'Offirmo’s online adventures',
		coming_soon: 'coming soon',
	};
});

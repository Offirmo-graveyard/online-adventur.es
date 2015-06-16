'use strict';

var _ = require('lodash');
var express = require('express');

var config = require('../../config');

var router = module.exports = new express.Router();

// builds { en: {…}, fr: {…}, …}
var messages = _.zipObject(
	config.supported_locales,
	config.supported_locales.map(function(locale) {
		return _.defaults(require('../../../../client/i18n/apps/index/' + locale), {
			canonical_url: 'http://www.online-adventur.es/',
			tab_color: '#181712',
		});
	})
);

function build_intl(locale) {
	return {
		locales: locale,
		messages: messages[locale],
	};
}

router.get('/l3', function(req, res) {
	res.header('Content-Type', 'text/plain');
	res.send('Level 3 OK');
});

router.get('/', function (req, res) {
	/*
	 canonical_url: 'http://www.online-adventur.es/',
	 twitter_account: '@offirmo',
	 tab_color: '#181712',
	 author: 'Offirmo'

	canonical_url: 'http://www.online-adventur.es/',
		facebook_page: 'https://www.facebook.com/TODO',
		tab_color: '#181712',
*/

	res.render('apps/index', {
		tpl: 'index',
		lang: req.locale,
		intl: build_intl(req.locale),

		title: 'Express',
		num      : 42000,
		completed: 0.9,
		price    : 100.95,
		date: new Date()
	});
});



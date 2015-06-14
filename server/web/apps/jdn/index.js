'use strict';

var _ = require('lodash');
var express = require('express');

var config = require('../../config');

var app = module.exports = new express.Router();

// builds { en: {…}, fr: {…}, …}
var messages = _.zipObject(
	config.supported_locales,
	config.supported_locales.map(function(locale) {
		return _.defaults(require('../../../../client/i18n/apps/jdn/' + locale), {
			canonical_url: 'http://www.online-adventur.es/jdn',
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


app.get('/', function (req, res) {
	res.render('apps/jdn', {
		tpl: 'jdn',
		lang: req.locale,
		intl: build_intl(req.locale),

		num      : 42000,
		completed: 0.9,
		price    : 100.95,
		date: new Date()
	});
});



'use strict';

var _ = require('lodash');
var express = require('express');

var config = require('../../config');

var router = module.exports = new express.Router();

// builds { en: {…}, fr: {…}, …}
var messages = _.zipObject(
	config.supported_locales,
	config.supported_locales.map(function(locale) {
		return _.defaults(require('../../../../client/i18n/apps/helloworld/' + locale), {
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
	// REM : path relative to template root
	res.render('../apps/appcache/view', {
		tpl: 'index',
		appcache_manifest: 'apps/appcache/manifest.appcacheX',
		lang: req.locale,
		intl: build_intl(req.locale),
	});
});

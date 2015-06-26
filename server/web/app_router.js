'use strict';

var _ = require('lodash');
var express = require('express');

var config = require('./config');




module.exports = function(app_radix, app_route, extra_view_data) {
	if(! app_route) app_route = '/' + app_radix;
	if(! extra_view_data) extra_view_data = {};

	var router = new express.Router();


	// builds { en: {…}, fr: {…}, …}
	var app_messages = _.zipObject(
		config.supported_locales,
		config.supported_locales.map(function(locale) {
			var messages;
			try {
				//console.log('trying ' + '../../client/apps/' + app_radix + '/i18n/' + locale);
				if(! messages) messages = require('../../client/apps/' + app_radix + '/i18n/' + locale);
			} catch(e) {
				console.warn('it seems that app ' + app_radix + ' has no locale ' + locale, e);
			}
			// maybe this lang is not avail ?
			try {
				//console.log('trying ' + '../../client/apps/' + app_radix + '/i18n/en');
				if(! messages) messages = require('../../client/apps/' + app_radix + '/i18n/en');
			} catch(e) {
				console.warn('it seems that app ' + app_radix + ' has no default locale ! (en)', e);
			}
			// maybe there is no i18n at all ?
			try {
				//console.log('trying ' + '../../client/i18n/common.' + locale);
				if(! messages) messages = require('../../client/i18n/common.' + locale);
			} catch(e) {
				console.error('Couldn’t event find the common locale for ' + locale + ' !', e);
			}

			return _.defaults({
				canonical_url: config.canonical_url + app_route
			},messages);
		})
	);


	// REM : local was negotiated, so we know we have it
	function build_intl(locale) {
		console.log('build_intl', locale, app_messages[locale]);
		return {
			locales: locale,
			messages: app_messages[locale],
		};
	}

	function serve(req, res) {
		// REM : path relative to template root
		res.render('../apps/' + app_radix + '/view', _.defaults({
			tpl: app_radix,
			appcache_manifest: '', // None !
			lang: req.locale,
			intl: build_intl(req.locale)
		}, extra_view_data));
	}

	router.get(app_route, serve);

	// useful for dev
	var no_appcache_route = ((app_route === '/') ? ('/' + app_radix) : app_route) + '-no-appcache';
	router.get(no_appcache_route, serve);

	return router;
};

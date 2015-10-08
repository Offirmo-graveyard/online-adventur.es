'use strict';

var _ = require('lodash');
var express = require('express');

var config = require('./config');

var language_independent_i18n_messages = require('../../client/common/i18n/common');
var shared_i18n_languages = {};
config.supported_locales.forEach(function(locale) {
	shared_i18n_languages[locale] = require('../../client/common/i18n/common.' + locale);
});

var DEFAULT_LOCALE = 'en';


module.exports = function(app_radix, options) {
	options = options || {};
	options.template_data = options.template_data || {};

	var default_route = '/' + app_radix;

	var router = new express.Router();

	// builds { en: {…}, fr: {…}, …}
	var formatJS_intls = _.zipObject(
		config.supported_locales,
		config.supported_locales.map(function(locale) {
			var root_messages;
			var messages;
			var next_try;

			//console.log('~~~ resolving i18n for app ' + app_radix + ', lang ' + locale + ' ~~~');
			next_try = '../../client/apps/' + app_radix + '/i18n/nls/root/messages';
			try {
				//console.log('trying ' + next_try);
				root_messages = require(next_try);
			} catch(e) {
				console.warn('it seems that app ' + app_radix + ' has no root messages !', e);
			}
			next_try = '../../client/apps/' + app_radix + '/i18n/nls/' + locale + '/messages';
			try {
				//console.log('trying ' + next_try);
				if(! messages) messages = require(next_try);
			} catch(e) {
				console.warn('it seems that app ' + app_radix + ' has no ' + locale + ' locale !', e);
			}
			// maybe this lang is not avail ?
			if(locale !== DEFAULT_LOCALE) {
				next_try = '../../client/apps/' + app_radix + '/i18n/' + DEFAULT_LOCALE + '/messages';
				try {
					//console.log('trying ' + next_try);
					if(! messages) messages = require(next_try);
				} catch(e) {
					console.warn('it seems that app ' + app_radix + ' has no ' + DEFAULT_LOCALE + ' locale !', e);
				}
			}

			messages = _.defaults(
				{
					canonical_url: config.canonical_url + (options.custom_route || default_route)
				},
				messages,
				root_messages,
				shared_i18n_languages[locale],
				language_independent_i18n_messages
			);

			// as expected by formatJS
			return {
				locales: locale,
				messages: messages
			};
		})
	);


	// REM : path relative to template root
	var template_path = options.custom_template || 'single-page_webapp';

	// common data
	var common_view_data = _.defaults({
		template_path: template_path, //< for debug

		// app radix, needed for some paths
		app_radix: app_radix,

		// requirejs module to load
		app_requirejs_module_name: 'app-' + app_radix,

		// path to the appcache manifest file (relative to ?)
		appcache_manifest: 'client/apps/' + app_radix + '/manifest.appcache',

		// path to the minified js
		minified_js: 'client/apps/' + app_radix + '/all_js.concat+min.js',
	}, options.template_data);

	/////// routes ///////

	// production route : appcache, js concatenated and minified
	//console.log('* SPA ' + app_radix + ' : registering route ' + default_route);
	router.get(default_route, function serve_production(req, res) {
		var template_data = _.defaults({
			appcache_enabled: true,
			jsminification_enabled: true,
			livereload_enabled: false,
			// formatJS i18n dynamic data
			lang: req.locale,
			intl: formatJS_intls[req.locale]
		}, common_view_data);
		//console.log('template data', template_data);
		res.render(template_path, template_data);
	});

	// nearly-production route without appcache (to build or debug the appcache)
	var nearly_prod_route = default_route + '-minified-no-appcache';
	//console.log('* SPA ' + app_radix + ' : registering route ' + nearly_prod_route);
	router.get(nearly_prod_route, function serve_production_without_appcache(req, res) {
		var template_data = _.defaults({
			appcache_enabled: false, //<<<
			jsminification_enabled: true,
			livereload_enabled: false,
			// formatJS i18n dynamic data
			lang: req.locale,
			intl: formatJS_intls[req.locale]
		}, common_view_data);
		res.render(template_path, template_data);
	});

	// dev route
	var dev_route = default_route + '-dev';
	//console.log('* SPA ' + app_radix + ' : registering route ' + dev_route);
	router.get(dev_route, function serve_dev(req, res) {
		var template_data = _.defaults({
			appcache_enabled: false, //<<<
			jsminification_enabled: false, //<<<
			livereload_enabled: true, //<<<
			// formatJS i18n dynamic data
			lang: req.locale,
			intl: formatJS_intls[req.locale]
		}, common_view_data);
		//console.log(template_data);
		res.render(template_path, template_data);
	});

	// custom route (if any)
	if(options.custom_route) {
		// production route alias
		//console.log('* SPA ' + app_radix + ' : registering custom route ' + options.custom_route);
		router.get(options.custom_route, function serve_production(req, res) {
			var template_data = _.defaults({
				appcache_enabled: true,
				jsminification_enabled: true,
				livereload_enabled: false,
				// formatJS i18n dynamic data
				lang: req.locale,
				intl: formatJS_intls[req.locale]
			}, common_view_data);
			//console.log('template data', template_data);
			res.render(template_path, template_data);
		});
	}

	return router;
};

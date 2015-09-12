'use strict';

var _ = require('lodash');
var express = require('express');

var config = require('./config');




module.exports = function(app_radix, options) {
	options = options || {};
	options.template_data = options.template_data || {};

	var default_route = '/' + app_radix;

	var router = new express.Router();

	// builds { en: {…}, fr: {…}, …}
	var formatJS_intls = _.zipObject(
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
				if(! messages) messages = require('../../client/common/i18n/common.' + locale);
			} catch(e) {
				console.error('Couldn’t even find the common locale for ' + locale + ' !', e);
			}

			messages = _.defaults({
				canonical_url: config.canonical_url + (options.custom_route || default_route)
			}, messages);

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
	console.log('* SPA ' + app_radix + ' : registering route ' + default_route);
	router.get(default_route, function serve_production(req, res) {
		var template_data = _.defaults({
			appcache_enabled: true,
			jsminification_enabled: true,
			livereload_enabled: false,
			// formatJS i18n dynamic data
			lang: req.locale,
			intl: formatJS_intls[req.locale]
		}, common_view_data);
		console.log('template data', template_data);
		res.render(template_path, template_data);
	});

	// nearly-production route without appcache (to build or debug the appcache)
	var nearly_prod_route = default_route + '-no-appcache';
	console.log('* SPA ' + app_radix + ' : registering route ' + nearly_prod_route);
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
	console.log('* SPA ' + app_radix + ' : registering route ' + dev_route);
	router.get(dev_route, function serve_dev(req, res) {
		var template_data = _.defaults({
			appcache_enabled: false, //<<<
			jsminification_enabled: false, //<<<
			livereload_enabled: true, //<<<
			// formatJS i18n dynamic data
			lang: req.locale,
			intl: formatJS_intls[req.locale]
		}, common_view_data);
		res.render(template_path, template_data);
	});

	// custom route (if any)
	if(options.custom_route) {
		// production route alias
		console.log('* SPA ' + app_radix + ' : registering route ' + options.custom_route);
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

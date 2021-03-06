'use strict';

var express = require('express');

var config = require('./config');

// Load and use intl polyfill
// http://formatjs.io/guides/runtime-environments/#server
var areIntlLocalesSupported = require('intl-locales-supported');
var localesMyAppSupports = config.supported_locales;
if (global.Intl) {
	// Determine if the built-in `Intl` has the locale data we need.
	if (!areIntlLocalesSupported(localesMyAppSupports)) {
		// `Intl` exists, but it doesn't have the data we need, so load the
		// polyfill and replace the constructors with need with the polyfill's.
		console.log('* polyfilling partial intl...');
		var IntlPolyfill = require('intl');
		Intl.NumberFormat   = IntlPolyfill.NumberFormat;
		Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
	}
} else {
	// No `Intl`, so use and load the polyfill.
	console.log('* polyfilling entire intl...');
	global.Intl = require('intl');
}

// http://expressjs.com/4x/api.html
var app = express();

module.exports = app;


// templating
var consolidated_templates = require('consolidate'); // always needed
// now require all templating engines we wish to use
var dust = require('dustjs-linkedin'); // http://dejanglozic.com/2014/01/27/dust-js-such-templating/
var DustIntl = require('dust-intl'); // http://formatjs.io/dust/
DustIntl.registerWith(dust);
require('dustjs-helpers'); // also
dust.optimizers.format = function(ctx, node) { return node; }; // https://github.com/linkedin/dustjs/wiki/Dust-Tutorial#controlling-whitespace-suppression
app.engine('dust', consolidated_templates.dust); // .dust will be rendered with...

// default template engine
app.set('view engine', 'dust'); // default extension to use when omitted

// views directory : from base dir, defaults to /views
app.set('views', config.dust_views_dir); // default extension to use when omitted


// Because you're the type of developer who cares about this sort of thing!
app.enable('strict routing'); // default false, TODO combine with https://github.com/ericf/express-slash
app.enable('case sensitive routing'); // default false
app.disable('x-powered-by'); // default true

// REM : app.locals includes settings
//var prettyjson = require('prettyjson');
//console.log('app.locals :\n', prettyjson.render(app.locals));

// to review : for running behind nginx or equiv.
//app.enable('trust proxy');

/*app.configure('development', function() {
 var edt = require('express-debug'); // https://github.com/devoidfury/express-debug
 edt(app, {
 // settings
 });
});*/

/*
 var errorhandler = require('errorhandler'); // https://github.com/expressjs/errorhandler
 if (config.env === 'development') {
 app.use(errorhandler());
 }*/

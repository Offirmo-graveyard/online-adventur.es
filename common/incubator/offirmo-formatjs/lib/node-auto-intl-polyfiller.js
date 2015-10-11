'use strict';

// Load and use intl polyfill
// http://formatjs.io/guides/runtime-environments/#server
var areIntlLocalesSupported = require('intl-locales-supported');


// basic polyfilling
// This one doesn't need user infos
if (! global.Intl) {
	// use and load the polyfill.
	console.log('* polyfilling entire intl...');
	global.Intl = require('intl');
}

// basic auto check
var USUAL_LOCALES = ['en', 'fr'];
if (! areIntlLocalesSupported(USUAL_LOCALES)) {
	console.warn('! Current intl doesn’t support usual locales !', USUAL_LOCALES);
}

module.exports = function polyfill_intl_for_locales(localesMyAppSupports) {
	// Determine if current `Intl` has the locale data we need.
	if (!areIntlLocalesSupported(localesMyAppSupports)) {
		// `Intl` exists, but it doesn't have the data we need, so load the
		// polyfill and replace the constructors with need with the polyfill's.
		console.log('* polyfilling partial intl...');
		var IntlPolyfill = require('intl');
		Intl.NumberFormat   = IntlPolyfill.NumberFormat;
		Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
	}
};

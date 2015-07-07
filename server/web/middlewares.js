'use strict';



module.exports = {

	// wraps handling into a domain
	// https://github.com/expressjs/domain-middleware
	using_domains: require('domain-middleware'),


	logging: require('morgan'),

	// https://github.com/expressjs/serve-favicon
	// favicon serving middleware
	// (static-favicon is an alias)
	serving_favicon: require('serve-favicon'),

	//var method_unifier = require('method-override'); // https://github.com/expressjs/method-override

	//var bodyParser = require('body-parser'); // for, well, parsing body.
	// mainly useful for REST (POST, PUT)
	// https://github.com/expressjs/body-parser


	// https://github.com/expressjs/serve-static
	// Serve static files
	serving_static_files: require('express').static,

	// https://github.com/expressjs/serve-index
	// Serve directory listings
	serving_directory_listing: require('serve-index'),

	// https://github.com/expressjs/response-time
	// adds a X-Response-Time header to responses.
	adding_XResponseTime_header: require('response-time'),


	// https://github.com/jed/locale
	// locale negotiation
	// TODO replace with a more subtile one (handling facebook etc.)
	//detecting_best_locale: require('locale'),
	detecting_best_locale: require('../common/incubator/localizer'),

};

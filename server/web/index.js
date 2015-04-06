#!/usr/bin/env node

/** State of the art web server serving an advanced AngularJS single-page web app
 */
'use strict';


/************************************************************************/
var logger = require('../../common/incubator/carnet')({enhanced: true});
var rapport = require('../../common/incubator/rapport').make_new();

require('../common/globals')(logger, rapport);

var config     = require('./config');
rapport.base.config = config;

var _ = require('lodash');
var path = require('path');

var middleware = require('./middlewares');
var app        = require('./express-app');
var utils      = require('./utils');
var shutdown   = require('./shutdown');
var routes     = require('./routes');

logger.log('[web server] config =', config);


/************************************************************************/
// manual creation of the http server
// in order to use domainMiddleware
// cf. http://expressjs.com/4x/api.html#app.listen
var server = require('http').createServer(app);

// onflight requests counter (experimental)
var onflight_count = 0;
server.on('request', function(req, res) {
	onflight_count++;
	logger.log('* seen server.request "' + req.originalUrl + '", on flight =' + onflight_count);
	res.once('finish', function() {
		onflight_count--;
		logger.log('* seen response.finish, on flight =' + onflight_count);
	});
	res.once('close', function() {
		onflight_count--;
		logger.log('* seen response.close, on flight =' + onflight_count);
	});
});
server.on('close', function() {
	logger.log('* seen server.close, on flight =' + onflight_count);
});

// shutdown our server at exit
var cluster = require('cluster');
shutdown.add_shutdown_step(function(callback, err, exit_code, misc) {
	if(cluster.worker)
		return callback(undefined, '[Shutdown step : close http server] OK : have a cluster master'); // not applicable

	logger.log('* [shutdown server step] shutting down http server…', err);
	server.close(function() {
		return callback(undefined, '[Shutdown step : close http server] OK : server has closed.');
	});
	//return callback(undefined, 'OK : cluster master signaled of our problems');
});


/************************************************************************/
// https://www.npmjs.org/package/express-livereload
// (install itself in all env except production)
if(true && config.env === 'development') {
	logger.log('* configuring express-livereload to watch "' + process.cwd() + '/client"…');
	require('express-livereload')(app, {
		watchDir:  process.cwd() + '/client', // optim
		// https://github.com/napcs/node-livereload#api-options
		debug: true,
		port: config.livereload_port,
		exts: [ 'dust', 'html', 'css', 'js', 'png', 'gif', 'jpg' ],
		// cool, our new file structure makes exclusions useless ;)
		/*exclusions: [
			'node modules/',
			'client/bower_components/',
		]*/
	});
}


/********************************** Middlewares **************************************/

// top
app.use(middleware.using_domains({
	server: server,
	killTimeout: config.kill_timeout_s * 1000,
	onError: function onErrorDefault(req, res, next, err, options) {
		logger.log('using_domains onError');
		// trigger shutdown
		shutdown.start(err);

		// let current connection close.
		res.setHeader('Connection', 'close');
		next(err);
	}
}));

app.use(middleware.logging('dev'));

// Typically this middleware will come very early in your stack (maybe even first)
// to avoid processing any other middleware if we already know the request is for /favicon.ico
app.use(middleware.serving_favicon(path.join(__dirname, '../../client/favicon.ico')));

// then static files which doesn't require special processing
// Note : if using a reverse proxy, should never match so may be moved at bottom (or completely removed)
app.use(middleware.serving_static_files(path.join(__dirname, '../../client')));
app.use(middleware.serving_static_files(path.join(__dirname, '../../common')));
app.use('/bower_components', middleware.serving_static_files(path.join(__dirname, '../../bower_components')));

// TOREVIEW
//app.use('/ht', middleware.serving_directory_listing('../../client', {'icons': true}));

// now that we've passed static data which may be CDN'd or served by a reverse proxy,
// add the X-Response-Time header to our responses
app.use(middleware.adding_XResponseTime_header());

// detect and pick the best locale
app.use(middleware.detecting_best_locale(config.supported_locales, {logger: logger}));


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

//  It is very important that this module is used before any module
// that needs to know the method of the request
//app.use(require('method-override')()); // https://github.com/expressjs/method-override

// "express debug toolbar"
// https://github.com/devoidfury/express-debug
if(config.env === 'development')
	require('express-debug')(app, {/* settings */});



/********************************** routes **************************************/
app.use(routes);


/************************************************************************/
// error handling at the end
// "Though not mandatory error-handling middleware are typically defined very last,
//  below any other app.use() calls"
// http://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
app.use(function (err, req, res, next) {
	logger.log('1st error handler', err, err['stack']);
	//logger.exception(err);

	// so we have an error. Do we have a status ?
	var status = err.status || 500;
	// (todo validate err.status)
	res.status(status);

	if(utils.is_internal_request(req)) {
		// Will not be seen by the user.
		// Respond the best we can.
		if (req.accepts('json'))
			return res.send({ error: 'server error : ' + status + ' (as json)' });
		else
			return res.type('txt').send('server error : ' + status + ' (as text)');
	}

	// ok, most likely a user browsing.
	// is it a full page or just an asset ?
	// (we don't want to costly render a template just for a missing favicon)
	if(req.url.slice(-4).indexOf('.') !== -1) {
		// there is a . (dot) in the last 4 chars,
		// most likely an file extension
		// so it must be an asset since our clean page urls don't have extensions.
		return res.send('error'); // short answer
	}

	// eventually
	try {
		res.render('error', { tpl: 'error', error: err });
	}
	catch(e) {
		logger.error('The error template didn´t work :', e);
		res.send(500, 'Something broke and the nice error template didn´t work !');
	}
});



/************************************************************************/
server.listen(config.listening_port, function() {
	logger.log('* Now listening on :');
	_.forEach(utils.get_local_ips(), function(ip) {
		logger.log('  http://' + ip + ':' + config.listening_port);
	});
	logger.log('(Ctrl+C to stop)');
});

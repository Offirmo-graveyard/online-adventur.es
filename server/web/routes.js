'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var router = new express.Router();
var utils = require('./utils');
var config = require('./config');

var app_router = require('./app-router');

module.exports = router;



/////// attach all apps ///////

// http://stackoverflow.com/a/24594123/587407
function getDirectories(srcpath) {
	srcpath = path.resolve(srcpath);
	return fs.readdirSync(srcpath).filter(function(file) {
		return fs.statSync(path.join(srcpath, file)).isDirectory();
	});
}
var APPS_DIR = path.join(__dirname, '../../client/apps');
var APPS = getDirectories(APPS_DIR);

APPS.forEach(function(app_radix) {
	var app_router_options = {};

	try {
		var stats = fs.lstatSync(path.join(APPS_DIR, app_radix, 'view.dust'));
		// Is it a directory?
		if (stats.isFile()) {
			app_router_options.custom_template =
				'../../apps/' + app_radix + '/view'; // REM : path relative to template root
		}
	}
	catch (e) {}

	if(app_radix === 'index') {
		app_router_options.custom_route = '/';
		app_router_options.template_data = {
			apps: APPS
		};
	}
	else if(app_radix === 'helloworld') {
		app_router_options.template_data = {
			title: 'Express',
			num      : 42000,
			completed: 0.9,
			price    : 100.95,
			date: new Date()
		};
	}

	//console.log('Installing app "' + app_radix +'"', app_router_options);
	router.use('/', app_router(app_radix, app_router_options));
});


/////// special ///////

/*
 router.get('/incubator/node_and_common/webworker_helper.js', function (req, res) {
 res.sendfile(path.join(__dirname, '../../../incubator/node_and_common/webworker_helper/webworker_helper.js'));
 });
*/


router.get('/locale_test', function(req, res) {
	res.header('Content-Type', 'text/plain');
	res.send(
		'You asked for: ' + req.headers['accept-language'] + '\n' +
		'We support: ' + config.supported_locales + '\n' +
		'Our default is: ' + config.supported_locales[0] + '\n' +
		'The best match is: ' + req.locale + '\n' +
		'Choice reason: ' + req.locale_choice + '\n'
	);
});

// XXX TOREMOVE SECU
router.get('/config', function(req, res) {
	res.header('Content-Type', 'application/json');
	res.send(config);
});


/////// ERROR ///////

// 'catch all' = default / 404 for a webapp
// https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
// http://briantford.com/blog/angular-express
// Several cases :
// - a 404
//   - manual, visible (user mistyped a page url, old address...)
//   - internal (API, auto fetch of rsrc, non page-rsrc...)
// - a correct page, but unknown from the server since will be resolved client-side by ui-router
router.get('*', function (req, res) {
	console.error('fallback "catch all" route triggered for url "' + req.url + '"');

	// so what ?
	if (utils.is_internal_request(req)) {
		// Will not be seen by the user.
		// Respond the best we can.
		res.status(404); // anyway
		if (req.accepts('json'))
			return res.send({ error: 'Not found (as json)' });
		else
			return res.type('txt').send('Not found (as text)');
	}

	// ok, most likely a user browsing.
	// is it a full page or just an asset ?
	// (we don't want to costly render a template just for a missing favicon)
	if (req.url.slice(-4).indexOf('.') !== -1) {
		// there is a . (dot) in the last 4 chars,
		// most likely an file extension
		// so it must be an asset since our clean page urls don't have extensions.
		res.status(404); // anyway
		return res.send('404'); // short answer
	}

	// OK, must be a client-side state/page
	var client_side_routing = false; // TODO some day maybe maybe not
	if (client_side_routing) {
		// answer with index, client-side will handle the rest (including true 404)
		console.log('defaulting to webapp root for url "' + req.url + '"');
		res.render('app', { tpl: 'app', title: 'Express', lang: req.locale });
		//res.sendFile('index.html', {root: './public'});
	}
	else {
		console.error('404 page for :', req.url);
		return res.render('404', { tpl: '404', url: req.url, lang: req.locale });
		// if rendering fail, will go to error handler.
	}
});

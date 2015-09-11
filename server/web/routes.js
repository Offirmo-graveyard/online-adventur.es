'use strict';

var path = require('path');

var express = require('express');
var router = express.Router();
var utils = require('./utils');
var config = require('./config');

var app_router = require('./app_router');

module.exports = router;

/*
router.get('/incubator/node_and_common/webworker_helper.js', function (req, res) {
	res.sendfile(path.join(__dirname, '../../../incubator/node_and_common/webworker_helper/webworker_helper.js'));
});*/

// help require-css
router.get('/css.js', function (req, res) {
	res.sendFile(path.join(__dirname, '../../bower_components/require-css/css.min.js'));
});

router.use('/', app_router('index', {
	custom_route: '/',
	custom_template: '../../apps/index/view', // REM : path relative to template root
	template_data: {
		apps: ['index', 'helloworld', 'appcache', 'famous-base', 'jeudunombre', 'boringrpg']
	}
}));
router.use('/', app_router('helloworld', {
	custom_template: '../../apps/helloworld/view', // REM : path relative to template root
	template_data: {
		title: 'Express',
		num      : 42000,
		completed: 0.9,
		price    : 100.95,
		date: new Date()
	}
}));
router.use('/', app_router('appcache'));
router.use('/', app_router('famous-base', {
	custom_template: '../../apps/famous-base/view', // REM : path relative to template root
}));
router.use('/', app_router('jeudunombre', {
	custom_template: '../../apps/famous-base/view', // REM : path relative to template root
}));
router.use('/', app_router('boringrpg', {
	custom_template: '../../apps/famous-base/view', // REM : path relative to template root
}));
//router.use('/', app_router('ror'));

// TODO
router.get('/page1', function (req, res) {
	res.render('page1', {
		tpl: 'page1',
		title: 'Express',
		lang: req.locale,
		intl: {'locales': req.locale}
	});
});

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
	if(utils.is_internal_request(req)) {
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
	if(req.url.slice(-4).indexOf('.') !== -1) {
		// there is a . (dot) in the last 4 chars,
		// most likely an file extension
		// so it must be an asset since our clean page urls don't have extensions.
		res.status(404); // anyway
		return res.send('404'); // short answer
	}

	// OK, must be a client-side state/page
	var client_side_routing = false;
	if(client_side_routing) {

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

/**
 * Routes for testing error handling.
 */
'use strict';

var _ = require('lodash');
var express = require('express');

var router = module.exports = new express.Router();

router.get('/', function (req, res) {
	res.send(
		'meta routes :<br />' +
		'/no-error<br />' +
		'/logger<br />' +
		'/runtime-direct-error<br />' +
		'/runtime-next-error<br />' +
		'/sync-error<br />' +
		'/async-error<br />' +
		'/timeout<br />' +
		'/timeout/:durationInSec<br />'
	);
});

router.get('/no-error', function (req, res) {
	res.send('correct !');
});

router.get('/logger', function (req, res) {
	// TODO test your logger here

	res.send('done.');
});

router.get('/runtime-direct-error', function (req, res) {
	// bad
	res.status(500).send('something blew up ! (handled manually, generic error middleware not used)');
});

router.get('/runtime-next-error', function (req, res, next) {
	next(new Error('A test exception passed to next()  !'));
});

router.get('/sync-error', function () {
	throw new Error('A test exception thrown synchronously !');
});

router.get('/async-error', function () {
	setTimeout(function() {
		throw new Error('A test exception thrown asynchronously !');
	}, 0);
});

router.get('/timeout', function () {
	// do nothing and let a timeout happen (hopefully)...
});

router.get('/timeout/:durationInSec', function (req, res) {
	var timeout = Number(req.params.durationInSec);
	if (_.isNaN(timeout)) {
		var err = new Error('You must provide a number in second !');
		err.status = 500;
		throw err;
	}
	else {
		setTimeout(function() {
			res.send('I waited ' + req.params.durationInSec + ' second(s).');
		}, timeout * 1000);
	}
});

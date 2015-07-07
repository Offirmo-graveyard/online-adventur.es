'use strict';


var express = require('express');
var router = express.Router();


module.exports = router;


router.get('/runtime_error', function (req, res) {
	// bad
	res.send(500, 'something blew up ! (handled from the middleware, error handlers not used)');
});

router.get('/sync_error', function (req, res) {
	throw new Error('An exception thrown synchronously !');
});

router.get('/async_error', function (req, res) {
	setTimeout(function() {
		throw new Error('An exception thrown asynchronously !');
	}, 0);
});

router.get('/timeout', function (req, res) {
	// do nothing and let a timeout happen (hopefully)...
});
router.get('/timeout/:duration_in_sec', function (req, res) {
	var timeout = Number(req.params.duration_in_sec);
	if(_.isNaN(timeout)) {
		var err = new Error('You must provide a number in second !');
		err.status = 500;
		throw err;
	}
	else {
		setTimeout(function() {
			res.send(200, 'I waited ' + req.params.duration_in_sec + ' second(s).');
		}, timeout*1000);
	}
});


router.get('/toto/', function (req, res) {
	res.send('correct /toto/ !');
});

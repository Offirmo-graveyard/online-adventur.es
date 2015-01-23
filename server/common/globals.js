/**
 * setup some global stuff
 */
'use strict';


if (!process.env.MANDRILL_API_KEY) {
	console.error('Please set a mandrill API key : export MANDRILL_API_KEY="..."');
	process.exit(1);
}

var cluster = require('cluster');

var _ = require('lodash');
var when_node = require('when/node');
var mandrill = when_node.lift(require('node-mandrill')(process.env.MANDRILL_API_KEY));
var config = require('./config');
var env = process.env.NODE_ENV || 'development';

///////////////////// Activate features /////////////////////
if (env === 'development') {
	// activate long stack traces
	require('trace');

	// Exclude node internal calls from the stack traces
	require('clarify');
}



///////////////////// Setup traces /////////////////////
module.exports = function setup(logger) {
	var start_subject = cluster.isWorker ?
	'worker ' + cluster.worker.id + ' started' :
	'standalone started';
	var start_msg = 'Just to let you know.';

	mandrill('/messages/send', {
		message: {
			to: [
				{email: config.admin_email, name: 'online-adventur.es admin'}
			],
			from_email: config.agent_email,
			subject: start_subject,
			text: start_msg
		}
	}, function (error, responses) {
		//uh oh, there was an error
		if (error) {
			logger.error("XXX mandrill error : " + JSON.stringify(error));
		}
		else {
			if (!_.isArray(responses))
				responses = [ responses ];

			_.forEach(responses, function (response) {
				if (response.status === 'invalid') {
					logger.error("XXX mandrill ERROR : ", response);
				}
				else {
					//everything's good, lets see what mandrill said
					logger.log("mandrill SUCCESS", response);
				}
			});
		}
	});


	///////////////////// Basic, very important traces /////////////////////

	process.on('exit', function (code) {
		logger.log('* process.exit detected, about to exit with code :', code);
	});

	if (cluster.worker) cluster.worker.on('exit', function (code, signal) {
		if (signal)
			logger.log('* cluster.worker.exit : I, worker am killed by signal :', signal);
		else if (code)
			logger.log('* cluster.worker.exit : I, worker am exited with error code :', code);
		else
			logger.log('* cluster.worker.exit : I, worker exits.');
	});

	if (cluster.worker) cluster.worker.on('disconnect', function () {
		logger.log('* cluster.worker.disconnect event seen.');
	});

	process.on('uncaughtException', function (err) {
		logger.error('X uncaught exception !', err, err.stack);
	});

	// trace received signals
	// (TODO)




	// make forky log
	// https://github.com/brianc/node-forky/blob/master/examples/master.js
	var forky = require('forky');
	forky.log = function () {
		logger.log.apply(console, arguments);
	};

};

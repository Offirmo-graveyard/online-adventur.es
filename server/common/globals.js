/**
 * setup some global stuff
 */
'use strict';

if(! process.env.MANDRILL_API_KEY) {
	console.error('Please set a mandrill API key : export MANDRILL_API_KEY="..."');
	process.exit(1);
}
console.log('mandrill ', process.env.MANDRILL_API_KEY);

var cluster = require('cluster');

var _ = require('lodash');
var when_node = require('when/node');
var mandrill = when_node.lift(require('node-mandrill')(process.env.MANDRILL_API_KEY));
var config = require('./config');
var env = process.env.NODE_ENV || 'development';


var start_subject = cluster.isWorker ?
	'worker ' + cluster.worker.id + ' started' :
	'standalone started';
var start_msg = 'Just to let you know.';

mandrill('/messages/send', {
	message: {
		to: [{email: config.admin_email, name: 'online-adventur.es admin'}],
		from_email: config.agent_email,
		subject: start_subject,
		text: start_msg
	}
}, function(error, responses)
{
	//uh oh, there was an error
	if (error) {
		console.error( "XXX mandrill error : " + JSON.stringify(error) );
	}
	else {
		if(!_.isArray(responses))
			responses = [ responses ];

		_.forEach(responses, function(response) {
			if (response.status === 'invalid') {
				console.error( "XXX mandrill ERROR : ", response );
			}
			else {
				//everything's good, lets see what mandrill said
				console.log("mandrill SUCCESS", response);
			}
		});
	}
});




///////////////////// Basic, very important traces /////////////////////

process.on('exit', function(code) {
	console.log('* process.exit detected, about to exit with code :', code);
});

if(cluster.worker) cluster.worker.on('exit', function(code, signal) {
	if( signal )
		console.log('* cluster.worker.exit : I, worker am killed by signal :', signal);
	else if( code )
		console.log('* cluster.worker.exit : I, worker am exited with error code :', code);
	else
		console.log('* cluster.worker.exit : I, worker exits.');
});

if(cluster.worker) cluster.worker.on('disconnect', function() {
	console.log('* cluster.worker.disconnect event seen.');
});

process.on('uncaughtException', function(err) {
	console.error('X uncaught exception !', err, err.stack);
});

// trace received signals
// (TODO)


///////////////////// Activate features /////////////////////

// make console calls display their originating pid
//require('../../../incubator/node_and_common/assuming_console').install();
console.log('Hello world from web server !');

if(env === 'development') {
	// activate long stack traces
	require('trace');

	// Exclude node internal calls from the stack traces
	require('clarify');
}



// make forky log
// https://github.com/brianc/node-forky/blob/master/examples/master.js
var forky = require('forky');
forky.log = function() { console.log.apply(console, arguments); };



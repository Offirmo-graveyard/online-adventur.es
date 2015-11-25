'use strict';

var simplyconfig = require('simplyconfig');

// https://github.com/motdotla/dotenv
simplyconfig.dotenv.load({silent: true});

var config = simplyconfig.create()

	// parent
	.add('../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'})

	// env vars
	.add({
		listening_port: '%PORT%',
	});

module.exports = config.get(); // endpoint config : exports the raw data

//config.explain();
//console.log('Final config', config.get());

'use strict';

var simplyconfig = require('simplyconfig');

// https://github.com/motdotla/dotenv
//simplyconfig.dotenv.config({silent: true});
//simplyconfig.dotenv.load();


var config = simplyconfig.create()

	// parent
	.add('../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'})

	// env vars
	.add('../../../environmentalist.json');

module.exports = config.get(); // endpoint config : exports the raw data

//config.explain();
//console.log('Final config', config.get());

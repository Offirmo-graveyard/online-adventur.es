'use strict';

var easyconf = require('../../../common/incubator/easyconf');

var config = easyconf.create()

	// parent
	.add('../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'})

	// env vars
	.add('../../../environmentalist.json');

module.exports = config.get(); // endpoint config : exports the raw data

//config.explain();
//console.log('Final config', config.get());

'use strict';

var easyconfig = require('../../../common/incubator/easyconf');

var config = easyconfig.create()

	// parent
	.add('../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'});

module.exports = config.get();

//console.log('config', config.get());

'use strict';

var easyconfig = require('../../../common/incubator/easyconf');

var config = easyconfig.create()

	// parent
	.add('../../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'})

	// env vars
	.add('../../../environmentalist.json');

module.exports = config.get();

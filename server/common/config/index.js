'use strict';

var simplyconfig = require('simplyconfig');

var config = simplyconfig.create()

	// parent
	.add('../../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'});

module.exports = config; // exports simplyconfig since we're an intermediate config

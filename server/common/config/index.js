'use strict';

var easyconf = require('../../../common/incubator/easyconf');

var config = easyconf.create()

	// parent
	.add('../../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'});

module.exports = config; // exports easyconf

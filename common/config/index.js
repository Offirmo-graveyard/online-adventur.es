'use strict';

var simplyconfig = require('simplyconfig');

var config = simplyconfig
	.create()
	// us
	.add('./config.js');

module.exports = config; // exports simplyconfig since we're an intermediate config

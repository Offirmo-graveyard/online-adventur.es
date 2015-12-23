'use strict';

var simplyconfig = require('simplyconfig');

var config = simplyconfig
	.create()
	.add('./config.js');

module.exports = config; // exports simplyconfig since we're an intermediate config

'use strict';

var easyconf = require('../incubator/easyconf');

var config = easyconf.create()
	// us
	.add('./config.js');

module.exports = config; // exports easyconf since we're an intermediate config

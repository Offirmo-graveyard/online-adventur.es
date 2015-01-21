/** one day, I'll use a nice node config module ;)
 */
'use strict';

var _ = require('lodash');

var parent_config = require('../../../common/config');

var defaults = {
	agent_email: 'offirmo.net+onlineadventures-server@gmail.com',
	env: 'development',
	kill_timeout_s: 30,  //< max time we give ourselves to shutdown
};

var from_env = {
	env: process.env.NODE_ENV,
};

// TODO require environment-specific config
var env_specific = {};

module.exports = _.merge({}, parent_config, defaults, from_env, env_specific);

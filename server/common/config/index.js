/** one day, I'll use a nice node config module ;)
 */
'use strict';

var _ = require('lodash');

////////////////////////////////////
var parent_config = require('../../../common/config');

////////////////////////////////////
var default_config = require('./defaults');

////////////////////////////////////
var env_vars_config = require('./env');

////////////////////////////////////
var env_specific_config = {};
try {
	env_specific_config = require('./' + (env_vars_config.env || default_config.env));
}
catch(err) {
	// no file, nevermind, swallow the error.
}

// priority matters
module.exports = _.merge({}, parent_config, default_config, env_vars_config, env_specific_config);

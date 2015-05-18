/** one day, I'll use a nice node config module ;)
 */
'use strict';

var _ = require('lodash');

var parent_config = require('../../common/config');

var defaults = {
	listening_port: 3000,
	livereload_port: 35730, //< note : official default is 35729
	supported_locales: [ 'en', 'fr' ]
};

var en_messages = require('../../../client/i18n/en');

defaults.messages = _.zipObject(
	defaults.supported_locales,
	defaults.supported_locales.map(function(locale) {
		return _.defaults(require('../../../client/i18n/' + locale), en_messages);
	})
);

var from_env = {
	listening_port: process.env.PORT,
};

// TODO require environment-specific config
var env_specific = {};

module.exports = _.merge({}, parent_config, defaults, from_env, env_specific);

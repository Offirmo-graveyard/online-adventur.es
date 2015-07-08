/** one day, I'll use a nice node config module ;)
 */
'use strict';

var _ = require('lodash');
var path = require('path');

var parent_config = require('../../common/config');

var defaults = {
	canonical_url: 'http://www.online-adventur.es', // without trailing /, important for concat
	listening_port: 7000,
	supported_locales: [ 'en', 'fr' ],
	// https://www.npmjs.org/package/express-livereload
	livereload: {
		enabled: true,
		watched_dir: process.cwd() + '/client', // optim
		port: 35730, //< note : official default is 35729
		watched_extensions: [ 'dust', 'html', 'css', 'js', 'png', 'gif', 'jpg' ],
		debug: true // ?
	},

	// https://github.com/devoidfury/express-debug
	express_debug_enabled: false,

	dust_views_dir: 'client/common/views',
	favicons_dir: path.join(__dirname, '../../../client/common/root-expected-files')
};

var from_env = {
	listening_port: process.env.PORT,
};

// TODO require environment-specific config
var env_specific = {};

module.exports = _.merge({}, parent_config, defaults, from_env, env_specific);

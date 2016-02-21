'use strict';

// since it's safer to access dev from prod than prod from dev,
// defaults config targets dev and config.production.js specializes it to prod

var path = require('path');

module.exports = {
	canonical_url: 'http://www.online-adventur.es', // without trailing /, important for concat
	listening_port: 7000,
	supported_locales: [ 'en', 'fr' ],

	// https://www.npmjs.org/package/express-livereload
	livereload: {
		enabled: true,
		watched_dir: path.join(process.cwd(), '/client'), // optim
		port: 35730, //< note : official default is 35729
		watched_extensions: [ 'dust', 'html', 'css', 'js', 'png', 'gif', 'jpg' ],
		debug: true // ?
	},
	
	analytics: {
		enabled: false
	},

	// https://github.com/devoidfury/express-debug
	express_debug_enabled: false,

	dust_views_dir: 'client/common/views',
	favicons_dir: path.join(__dirname, '../../../client/common/root-expected-files'),

	primus: {
		transformer: 'engine.io'
	},
};

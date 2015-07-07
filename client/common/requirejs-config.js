/** require.js config
 *
 * Note : for the optimizer to work correctly :
 *  - no "code"
 *  - no extra stuff
 */

console.log('Loading require js config…');

requirejs.config({

	// base URL from which component files will be searched
	// NOTE 1 : non-rsrc url below may not be affected by baseUrl
	// NOTE 2 : relative baseUrl base refers to *the calling html* !
	// NOTE 3 : "self" stuff is for handling web workers
	//baseUrl: (self ? self.requirejs_baseurl : undefined) || '../..',
	baseUrl: '../..',

	// http://requirejs.org/docs/api.html#config-enforceDefine
	enforceDefine: false,

	// require.js extensions (plugins)
	map: {
		'*': {
			// an extension to be able to load any kind of text
			//'text': 'requirejs-text',
			// an extension to be able to load css with require.js
			//'css':  'requirejs-css',
			// an extension to be able to load less stylesheets with require.js
			'less': 'bower_components/require-less/less',
			// an extension to be able to load dust.js templates easily
			'rdust': 'bower_components/require-dust/rdust',
			// an extension to be able to wait for the DOM to be ready
			'domReady': 'bower_components/requirejs-domready/domReady',
			// an extension to lazy load angular components
			'ngload': 'bower_components/angularAMD/ngload',
			// transparently replace underscore with lodash
			'underscore' : 'lodash'
		}
	},

	/////////////////////
	// multi-files modules
	packages: [
		// require.js extensions (plugin) to be able to load css with require.js
		{
			name : 'css',
			location: 'bower_components/require-css/',
			main: 'css.js'
		},
		{
			name : 'carnet',
			location: 'common/incubator/carnet'
		},
		{
			name : 'when',
			location: 'bower_components/when',
			main: 'when.js'
		},
		{
			name : 'when',
			location: 'bower_components/when',
			main: 'when.js'
		},
	],

	/////////////////////
	paths: {

		/////// our apps, as modules
		'app-appcache'             : 'client/apps/appcache/index',

		/////// shim plugins
		'angular'                  : 'bower_components/angular/angular',
		'angular-bootstrap'        : 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
		'angular-strap'            : 'bower_components/angular-strap/dist/angular-strap.tpl',
		'angular-strap-base'       : 'bower_components/angular-strap/dist/angular-strap',
		'angular-ui-router'        : 'bower_components/angular-ui-router/release/angular-ui-router',
		'angular-ui-router-extras' : 'bower_components/ui-router-extras/release/ct-ui-router-extras',
		'angularAMD'               : 'bower_components/angularAMD/angularAMD',
		'appcache-nanny'           : 'bower_components/appcache-nanny/appcache-nanny',
		// dust-full : this plugin MUST be aliased 'dust' for rdust to work properly, see 'dust' below
		'bootstrap'                : 'bower_components/bootstrap-css/js/bootstrap',
		'bootstrap-with-cyborg-theme': 'bower_components/bootstrap-css/js/bootstrap',
		'dust'                     : 'bower_components/dustjs-linkedin/dist/dust-full',
		'dust-helpers'             : 'bower_components/dustjs-linkedin-helpers/dist/dust-helpers',
		'eventemitter2'            : 'bower_components/eventemitter2/lib/eventemitter2',
		'extended-exceptions'      : 'bower_components/extended-exceptions.js/extended_exceptions',
		'famous'                   : 'bower_components/famous/dist/famous',
		'famous-angular'           : 'bower_components/famous-angular/dist/famous-angular',
		'famous-global'            : 'bower_components/famous/dist/famous-global',
		'intl-format-cache'        : 'bower_components/intl-format-cache/index',
		'intl-messageformat'       : 'bower_components/intl-messageformat/dist/intl-messageformat-with-locales',
		'intl-relativeformat'      : 'bower_components/intl-relativeformat/dist/intl-relativeformat-with-locales',
		'javascript-state-machine' : 'bower_components/javascript-state-machine/state-machine',
		'jquery'                   : 'bower_components/jquery/dist/jquery',
		'lodash'                   : 'bower_components/lodash/lodash',
		'messenger'                : 'bower_components/messenger/build/js/messenger',
		'messenger-theme-future'   : 'bower_components/messenger/build/js/messenger-theme-future',
		'moment'                   : 'bower_components/momentjs/moment',
		'offirmo-app-bootstrap'    : 'client/common/incubator/offirmo-app-bootstrap',
		'onepage-scroll'           : 'bower_components/onepage-scroll/jquery.onepage-scroll',
		'rdust'                    : 'bower_components/require-dust/rdust',
		'screenfull'               : 'bower_components/screenfull/dist/screenfull',
		'spin'                     : 'bower_components/spin.js/spin',
		// require.js extensions (plugin) to be able to load any kind of text with require.js
		'text'                     : 'bower_components/requirejs-text/text',
		//'underscore'  -> replaced by lodash, see "map" section above.
	},


	/////////////////////
	shim: {
		/////// require.js extensions
		'ngload': ['angularAMD'],
		'rdust' : {
			deps: [ 'dust-helpers' ]
		},

		/////// AMD plugins

		/////// shim plugins
		'angular': {
			deps: [ 'jquery' ], // angular has its own jQlite, but will use main jQuery if already available
			exports: 'angular'
		},
		'angular-bootstrap': {
			deps: [
				'angular',
				// angular-bootstrap replaces bootstrap js, it only needs bootstrap css
				//'bootstrap', No !
				'css!bower_components/bootstrap-css/css/bootstrap'
			]
		},
		// 2 stage due to double file :
		'angular-strap': {
			deps: [ 'angular-strap-base' ]
		},
		'angular-strap-base': {
			deps: [
				'angular',
				// angular-strap replaces bootstrap js, it only needs bootstrap css
				'css!bower_components/bootstrap-css/css/bootstrap'
			]
		},
		'angular-ui-router': {
			deps: [ 'angular' ]
		},
		'angular-ui-router-extras': {
			deps: [ 'angular-ui-router' ]
		},
		'angularAMD': {
			deps: [ 'angular' ]
		},
		'bootstrap': {
			deps: [
				// bootstrap js needs jQuery http://getbootstrap.com/getting-started/#whats-included
				'jquery',
				'css!bower_components/bootstrap-css/css/bootstrap'
			]
		},
		'bootstrap-with-cyborg-theme': {
			deps: [
				// bootstrap js needs jQuery http://getbootstrap.com/getting-started/#whats-included
				'jquery',
				'css!other_components/bootswatch/cyborg/cyborg-bootstrap.min'
			]
		},
		'dust': {
			// no deps
			exports: 'dust'
		},
		'dust-helpers': {
			deps: [ 'dust' ],
			exports: 'dust'
		},
		'famous': {
			deps: [
				'famous-global',
				'css!bower_components/famous/dist/famous'
			]
		},
		'famous-angular': {
			deps: [
				'famous-global',
				'angular',
				'css!bower_components/famous-angular/dist/famous-angular'
			],
			init: function (famous) {
				// famous-angular needs famous as a global var...
				window.famous = famous;
			}
		},
		'famous-global': {
			//exports: 'famous'
		},
		'javascript-state-machine' : {
			// no deps
			exports: 'StateMachine'
		},
		'jquery.poptrox': {
			deps: [ 'jquery' ]
		},
		'lodash': {
			exports: '_'
		},
		'messenger': {
			deps: [
				'jquery',
				'css!bower_components/messenger/build/css/messenger'
			]
		},
		'messenger-theme-future': {
			deps: [
				'messenger',
				'css!bower_components/messenger/build/css/messenger-theme-future'
			],
			exports: 'Messenger'
		},
		'screenfull': {
			exports: 'screenfull'
		},
		'spin': {
			exports: 'Spinner'
		}
	},

	/////////////////////
	// config: {},

	/////////////////////
	//deps: []
});

console.log('require js config parsed.');
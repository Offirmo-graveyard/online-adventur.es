/* Require.js definitions
 */
'use strict';

console.log('Starting require js config…');

requirejs.config({

	// base URL from which component files will be searched
	// NOTE 1 : non-rsrc url below may not be affected by baseUrl
	// NOTE 2 : relative baseUrl base refers to *the calling html* !
	baseUrl: (self ? self.requirejs_baseurl : undefined) || '.',

	// http://requirejs.org/docs/api.html#config-enforceDefine
	enforceDefine: false,

	// require.js extensions (plugins)
	map: {
		'*': {
			// an extension to be able to load any kind of text
			'text': 'bower_components/requirejs-text/text',
			// an extension to be able to load css with require.js
			'css':  'bower_components/require-css/css',
			// an extension to be able to load less stylesheets with require.js
			'less': 'bower_components/require-less/less',
			// an extension to be able to load dust.js templates easily
			'rdust': 'bower_components/require-dust/rdust',
			//'rdust': 'other_components/require-dust/require-dust',
			// an extension to be able to wait for the DOM to be ready
			'domReady': 'bower_components/requirejs-domready/domReady',
			// an extension to lazy load angular components
			'ngload': 'bower_components/angularAMD/ngload',
			// transparently replace undercore with lodash
			'underscore' : 'lodash',
		}
	},

	/////////////////////
	packages: [
		{
			name : 'carnet',
			location: 'incubator/carnet'
		},
		{
			name : 'when',
			location: 'bower_components/when',
			main: 'when.js'
		}
	],

	/////////////////////
	paths: {
		// AMD plugins (dirs or direct)
		//'base-objects'             : '../incubator/base-objects.js', // dir
		//'extended-exceptions'      : '../incubator/extended-exceptions.js/extended_exceptions', // direct
		'famous.angular'           : 'bower_components/famous-angular/dist/famous-angular',
		//'jquery'                   : 'bower_components/jquery/dist/jquery',
		'webworker_helper'         : '../incubator/node_and_common/webworker_helper/webworker_helper', // direct
		// shim plugins
		'angular'                  : 'bower_components/angular/angular',
		'angular-bootstrap'        : 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
		'angular-strap'            : 'bower_components/angular-strap/dist/angular-strap.tpl',
		'angular-strap-base'       : 'bower_components/angular-strap/dist/angular-strap',
		'angular-ui-router'        : 'bower_components/angular-ui-router/release/angular-ui-router',
		'angular-ui-router-extras' : 'bower_components/ui-router-extras/release/ct-ui-router-extras',
		'angularAMD'               : 'bower_components/angularAMD/angularAMD',
		//'bootstrap'                : 'bower_components/bootstrap-css/js/bootstrap',
		// dust-full : this plugin should be aliased 'dust' for rdust to work properly
		'dust'                     : 'bower_components/dustjs-linkedin/dist/dust-full',
		'dust-helpers'             : 'bower_components/dustjs-linkedin-helpers/dist/dust-helpers',
		'eventemitter2'            : 'bower_components/eventemitter2/lib/eventemitter2',
		'javascript-state-machine' : 'bower_components/javascript-state-machine/state-machine',
		'lodash'                   : 'bower_components/lodash/lodash',
		'moment'                   : 'bower_components/momentjs/moment',
		'onepage-scroll'           : 'bower_components/onepage-scroll/jquery.onepage-scroll',
		'rdust'                    : 'bower_components/require-dust/rdust',
		'spin'                     : 'bower_components/spin.js/spin',
		//'underscore'  -> replaced by lodash, see above
	},


	/////////////////////
	shim: {
		'angular': {
			//deps: [ 'jquery' ], // angular has its own jQlite, but will use main jQuery if already available
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
		// 2 stage due to double file
		'angular-strap': {
			deps: [ 'angular-strap-base' ]
		},
		'angular-strap-base': {
			deps: [
				'angular',
				// angular-strap replaces bootstrap js, it only needs bootstrap css
				'css!bower_components/bootstrap-css/css/bootstrap',
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
		/*'bootstrap': {
			// bootstrap js needs jQuery http://getbootstrap.com/getting-started/#whats-included
			deps: [ 'jquery',
			        'css!bower_components/bootstrap-css/css/bootstrap' ]
		},*/
		'dust' : {
			// no deps
			exports: 'dust'
		},
		'dust-helpers' : {
			deps: [ 'dust' ],
			exports: 'dust'
		},
		'famous.angular': {
			deps: [
				'css!bower_components/famous-angular/dist/famous-angular'
			]
		},
		'fullpage' : {
			deps: [
				'jquery',
				'css!other_components/fullpage/jquery.fullPage'
			]
		},
		'javascript-state-machine' : {
			// no deps
			exports: 'StateMachine'
		},
		'ngload': ['angularAMD'],
		'rdust' : {
			deps: [ 'dust-helpers' ]
		},
		'spin' : {
			exports: 'Spinner'
		},
		'lodash': {
			exports: '_'
		}
	},

	/////////////////////
	config: {
		'toto': {
			size: 'large'
		}
	},

	/////////////////////
	//deps: ['app']
});

console.log('require.js config done.');

if(typeof window !== "undefined") { // not available in a web worker for ex.
	// Start the main app logic.

	// not optimal to wait for the full DOM but good for sharing this file amongst sandbox files
	console.log('Waiting for DOM before starting app…');
	requirejs(['domReady!'],
	function () {
		console.log('DOM ready : starting application logic…');
		window.main();
	});
}

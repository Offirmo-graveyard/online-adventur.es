// http://requirejs.org/docs/optimization.html
// https://github.com/jrburke/r.js/blob/master/build/example.build.js

({
	baseUrl: '../../..',
	mainConfigFile: '../../common/requirejs-config.js',
	name: 'app-boringrpg',
	locale: 'en',
	preserveLicenseComments: false,
	out: '../../apps-minified/boringrpg/all_js.concat+min.js'
})

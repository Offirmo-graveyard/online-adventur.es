define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/meta/layout/layout.html',
	'css!client/apps/boringrpg/ng/directives/meta/layout/layout.css',
	'boringrpg/ng/directives/meta/header/header',
	'boringrpg/ng/directives/meta/content/content',
	'boringrpg/ng/directives/meta/footer/footer',
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('metaLayout', function () {
		return {
			template: tpl
		};
	});
});

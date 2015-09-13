define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/app/layout/layout.html',
	'css!client/apps/boringrpg/ng/directives/app/layout/layout.css',
	'client/apps/boringrpg/ng/directives/app/header/header',
	'client/apps/boringrpg/ng/directives/app/content/content',
	'client/apps/boringrpg/ng/directives/app/footer/footer',
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('appLayout', function () {
		return {
			template: tpl
		};
	});
});
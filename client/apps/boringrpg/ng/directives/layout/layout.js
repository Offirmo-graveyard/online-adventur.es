define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/layout/layout.html',
	//'css!client/apps/boringrpg/ng/directives/layout/layout.css',
	'client/apps/boringrpg/ng/directives/app/layout/layout',
	//'client/apps/boringrpg/ng/directives/meta/layout/layout'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('layout', function () {
		return {
			template: tpl
		};
	});
});

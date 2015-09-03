define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/meta/content/content.html',
	'css!client/apps/boringrpg/ng/directives/meta/content/content.css'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('metaContent', function () {
		return {
			template: tpl
		};
	});
});

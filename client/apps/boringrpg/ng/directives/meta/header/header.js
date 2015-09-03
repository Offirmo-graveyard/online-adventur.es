define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/meta/header/header.html',
	'css!client/apps/boringrpg/ng/directives/meta/header/header.css'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('metaHeader', function () {
		return {
			template: tpl
		};
	});
});

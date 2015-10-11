define([
	'offirmo-app-bootstrap',
	'lodash',
	'text!client/apps/boringrpg/ng/directives/meta/footer/footer.html',
	//'css!client/apps/boringrpg/ng/directives/meta/footer/footer.css'
],
function(offirmo_app, _, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('metaFooter', [function () {
		return {
			scope: {},
			template: tpl
		};
	}]);
});

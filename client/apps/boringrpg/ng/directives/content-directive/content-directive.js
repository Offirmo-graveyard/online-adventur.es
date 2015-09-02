/** Root directive referenced by the generic single page webapp dust layout
 */
define([
	'offirmo-app-bootstrap',
	'text!client/apps/boringrpg/ng/directives/content-directive/content-directive.html',
	'client/apps/boringrpg/ng/directives/layout/layout',
],
function(offirmo_app, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('contentDirective', function () {
		return {
			template: tpl
		};
	});
});

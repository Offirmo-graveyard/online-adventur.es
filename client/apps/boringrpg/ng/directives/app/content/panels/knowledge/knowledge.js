define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/app/content/panels/knowledge/knowledge.html',
	'css!client/apps/boringrpg/ng/directives/app/content/panels/knowledge/knowledge.css'
],
function(offirmo_app, _, Rx, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module.directive('appContentPanelKnowledge', [
		'$q',
		'$famous',
		function ($q, $famous) {
			return {
				scope: {},
				template: tpl,
				controller: ['$scope', function($scope) {
				}],
				link: function postLink($scope) {
				}
			};
		}
	]);
});

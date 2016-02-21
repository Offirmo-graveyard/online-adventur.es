define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/app/content/panels/achievements/achievements.html',
	'css!client/apps/boringrpg/ng/directives/app/content/panels/achievements/achievements.css'
],
function(offirmo_app, _, Rx, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module.directive('appContentPanelAchievements', [
		'$q',
		'$famous',
		function ($q, $famous) {
			return {
				scope: {},
				template: tpl,
				controller: ['$scope', function($scope) {
					$scope.debug = {id: 'directive/appContentPanelAchievements'};
				}],
				link: function postLink($scope) {
				}
			};
		}
	]);
});

define([
	'offirmo-app-bootstrap',
	'lodash',
		'boringrpg/lib/static-data/view/view',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/app/content/panels/knowledge/knowledge.html',
	'css!client/apps/boringrpg/ng/directives/app/content/panels/knowledge/knowledge.css'
],
function(offirmo_app, _, view_static_data, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module.directive('appContentPanelKnowledge', [
		'$q',
		'$famous',
		function ($q, $famous) {
			return {
				scope: {},
				template: tpl,
				controller: ['$scope', function($scope) {
					$scope.debug = {id: 'directive/appContentPanelKnowledge'};
					var EventHandler = $famous['famous/core/EventHandler'];
					var MouseSync    = $famous['famous/inputs/MouseSync'];

					$scope.VIEW_CONSTS = view_static_data.layout.panels.inventory;

					$scope.scrollEventHandler = new EventHandler();
					$scope.scrollSurfacesEventHandler = new EventHandler();

					// http://stackoverflow.com/questions/24229238/how-can-i-scroll-a-scrollview-using-a-mouse-drag-with-famo-us
					$scope.scrollSurfacesEventHandler.pipe($scope.scrollEventHandler); // direct for taps
					var scrollMouseSync = new MouseSync({direction:0});
					$scope.scrollSurfacesEventHandler.pipe(scrollMouseSync); // to this one for clicks
					scrollMouseSync.pipe($scope.scrollEventHandler); // then to sw

					$scope.skills = [
						{
							id: 'TODO'
						},
						{
							id: 'TODO'
						},
						{
							id: 'TODO'
						}
					];
				}],
				link: function postLink($scope) {
					var layout_cursor = state_tree.select('view', 'layout', 'panels', 'knowledge');

					function on_layout_update() {
						$scope.layout = layout_cursor.get();

						$scope.$evalAsync(function () {
							setTimeout(function () {
								var temp1 = $('.famous-surface.knowledge-panel-knowledge-entry').first();
								var temp2 = temp1.parent().parent().parent();
								temp2.addClass('knowledge-panel-book');
							}, 100);
						});
					}

					on_layout_update();
					layout_cursor.on('update', on_layout_update);
				}
			};
		}
	]);
});

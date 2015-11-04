define([
	'offirmo-app-bootstrap',
	'lodash',
	'boringrpg/lib/static-data/view/view',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/model',
	'boringrpg/lib/weapon-generator',
	'text!client/apps/boringrpg/ng/directives/app/content/panels/inventory/inventory.html',
	'css!client/apps/boringrpg/ng/directives/app/content/panels/inventory/inventory.css'
],
function(offirmo_app, _, view_static_data, state_tree, model, weapon_generator, tpl) {
	'use strict';

	offirmo_app.global_ng_module.directive('appContentPanelInventory', [
		'$q',
		'$famous',
		function ($q, $famous) {
			return {
				scope: {},
				template: tpl,
				controller: ['$scope', function($scope) {
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

					var maxSurfs = 30;
					$scope.items = [];
					for(var i=0; i < maxSurfs; i++) {
						var weapon = weapon_generator.generate();
						$scope.items.push({
							content: 'view #' + (i + 1),
							weapon: weapon_generator.generate()
						});
					}
				}],
				link: function postLink($scope) {
					var layout_cursor = state_tree.select('view', 'layout', 'panels', 'inventory');

					function on_layout_update() {
						$scope.layout = layout_cursor.get();

						$scope.$evalAsync(function () {
							setTimeout(function () {
								var temp1 = $('.famous-surface.inventory-panel-inventory-entry').first();
								var temp2 = temp1.parent().parent().parent();
								temp2.addClass('inventory-panel-inventory');
								console.warn('invent style', temp1, temp2);
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

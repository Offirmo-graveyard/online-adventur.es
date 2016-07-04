define([
	'offirmo-app-bootstrap',
	'lodash',
	'boringrpg/lib/static-data/view/view',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/model',
	'boringrpg/lib/models/weapon',
	'text!client/apps/boringrpg/ng/directives/app/content/panels/inventory/inventory.html',
	'css!client/apps/boringrpg/ng/directives/app/content/panels/inventory/inventory.css'
],
function(offirmo_app, _, view_static_data, state_tree, model, Weapon, tpl) {
	'use strict';

	offirmo_app.global_ng_module.directive('appContentPanelInventory', [
		'$q',
		'$famous',
		function ($q, $famous) {
			return {
				scope: {},
				template: tpl,
				controller: ['$scope', function($scope) {
					$scope.debug = {id: 'directive/appContentPanelInventory'};
					var EventHandler = $famous['famous/core/EventHandler'];
					var MouseSync    = $famous['famous/inputs/MouseSync'];

					$scope.VIEW_CONSTS = view_static_data.layout.panels.inventory;

					$scope.scrollEventHandler = new EventHandler();
					$scope.scrollSurfacesEventHandler = new EventHandler();
					$scope.selected_index = 0;
					$scope.selected_details = {
						stars: [],
						dots: []
					};

					// http://stackoverflow.com/questions/24229238/how-can-i-scroll-a-scrollview-using-a-mouse-drag-with-famo-us
					$scope.scrollSurfacesEventHandler.pipe($scope.scrollEventHandler); // direct for taps
					var scrollMouseSync = new MouseSync({direction:0});
					$scope.scrollSurfacesEventHandler.pipe(scrollMouseSync); // to this one for clicks
					scrollMouseSync.pipe($scope.scrollEventHandler); // then to sw

					var inventory_cursor = state_tree.select('model', 'saga', 'inventory');

					function update_inventory() {
						$scope.$evalAsync(function () {
							$scope.inventory = inventory_cursor.get() || [];
							//console.log('* inventory updated :', $scope.inventory);
							if ($scope.layout) // reduce clip_size if small inventory, to avoid a famous scrollview bug
								$scope.clip_size = Math.min(
									$scope.layout.scrollview_size[1],
									$scope.inventory.length * 24
								);
							$scope.selected_index = 0;
							update_selected_item();
						});
					}

					function update_selected_item() {
						var item = $scope.selected_item = $scope.inventory.length ? $scope.inventory[$scope.selected_index] : null;
						console.log(item);
						if (!item) return;

						$scope.selected_details.stars =
							_.map(qualityToStars(item.quality.id), function(t) { return 'icomoon-star-' + t});
						$scope.selected_details.dots =
							_.map(Array(10), function(t, n) { return n >= item.enhancement_level ? 'icomoon-radio-unchecked' : 'icomoon-radio-checked' });
console.log($scope.selected_details.dots)
					}

					function qualityToStars(quality) {
						switch (quality) {
							case 'quality_uncommon':
								return ['full', 'empty', 'empty', 'empty'];
							case 'quality_rare':
								return ['full', 'full', 'empty', 'empty'];
							case 'quality_epic':
								return ['full', 'full', 'full', 'empty'];
							case 'quality_legendary':
								return ['full', 'full', 'full', 'full'];
							case 'quality_common':
							default:
								return ['half', 'empty', 'empty', 'empty'];
						}
					}

					inventory_cursor.on('update', update_inventory);
					update_inventory(); // init

					$scope.on_inventory_entry_click = function(index, $event, origin) {
						//console.log(index, $event, origin);
						$scope.selected_index = index;
						update_selected_item();
					};

				}],

				link: function postLink($scope) {
					var layout_cursor = state_tree.select('view', 'layout', 'panels', 'inventory');

					var inventory_element_styled = false;

					function style_famous_inventory_element() {
						if (inventory_element_styled) return;

						try {
							var inventory_elements = $('.famous-surface.inventory-panel-inventory-entry');
							if (!inventory_elements.length) {
								// retry later
								setTimeout(style_famous_inventory_element, 100);
								return;
							}

							var temp1 = $('.famous-surface.inventory-panel-inventory-entry').first();
							var temp2 = temp1.parent().parent().parent();
							inventory_element_styled = true;
							$scope.$evalAsync(function () {
								temp2.addClass('inventory-panel-inventory');
							});
						}
						catch(err) {
							console.error('err while styling inventory', err);
							// retry later
							setTimeout(style_famous_inventory_element, 100);
						}
					}

					function on_layout_update() {
						$scope.layout = layout_cursor.get();
						$scope.clip_size = Math.min(
							$scope.layout.scrollview_size[1],
							$scope.inventory ? $scope.inventory.length * 24 : 0
						);

						setTimeout(style_famous_inventory_element, 100);
					}

					on_layout_update();
					layout_cursor.on('update', on_layout_update);
				}
			};
		}
	]);
});

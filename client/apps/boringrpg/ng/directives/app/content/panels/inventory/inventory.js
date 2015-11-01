define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'boringrpg/lib/state-tree',
	'boringrpg/lib/model',
	'boringrpg/lib/weapon-generator',
	'text!client/apps/boringrpg/ng/directives/app/content/panels/inventory/inventory.html',
	'css!client/apps/boringrpg/ng/directives/app/content/panels/inventory/inventory.css'
],
function(offirmo_app, _, Rx, state_tree, model, weapon_generator, tpl) {
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

					$scope.scrollEventHandler = new EventHandler();
					$scope.scrollSurfacesEventHandler = new EventHandler();

					// http://stackoverflow.com/questions/24229238/how-can-i-scroll-a-scrollview-using-a-mouse-drag-with-famo-us
					$scope.scrollSurfacesEventHandler.pipe($scope.scrollEventHandler); // direct for taps
					var scrollMouseSync = new MouseSync({direction:0});
					$scope.scrollSurfacesEventHandler.pipe(scrollMouseSync); // to this one for clicks
					scrollMouseSync.pipe($scope.scrollEventHandler); // then to sw

					var maxSurfs = 30;
					$scope.surfs = [];
					for(var i=0; i < maxSurfs; i++) {
						var weapon = weapon_generator.generate();
						$scope.surfs.push({
							content: 'view #' + (i + 1),
							weapon: weapon_generator.generate()
						});
					}
				}],
				link: function postLink($scope, $element) {
					setTimeout(function () {
						// size our scrollview
						var temp = $('.famous-surface.inventory-panel-inventory-entry').first().parent().parent().parent();
						temp.addClass('inventory-panel-inventory');
						/*
						temp.css('overflow', 'hidden');
						temp.css('width', '100%');
						temp.css('height', '200');*/
					}, 100);
				}
			};
		}
	]);
});

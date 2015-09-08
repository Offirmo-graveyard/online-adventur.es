define([
	'offirmo-app-bootstrap',
	'lodash',
	'screenfull',
	'text!client/apps/boringrpg/ng/directives/meta/content/content.html',
	'css!client/apps/boringrpg/ng/directives/meta/content/content.css'
],
function(offirmo_app, _, screenfull, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('metaContent', ['stateTree', function (state_tree) {
		return {
			template: tpl,
			controller: ['$scope', function($scope) {

				var view_cursor = state_tree.select('view');
				var fullscreen_cursor = view_cursor.select('fullscreen');

				$scope.items = [
					{
						icon: 'icomoon-enlarge',
						label: 'Full screen',
						update: function() {
							if (fullscreen_cursor.get()) {
								$scope.items[0].icon = 'icomoon-shrink';
								$scope.items[0].label = 'Full screen : ON';
							}
							else {
								$scope.items[0].icon = 'icomoon-enlarge';
								$scope.items[0].label = 'Full screen : OFF';
							}
						},
						on_click: function() {
							screenfull.toggle();
						}
					},
					{
						icon: 'icomoon-volume-mute2',
						label: 'Volume',
					},
					{
						icon: 'icomoon-star-full',
						label: 'Rate app',
					},
					{
						icon: 'icomoon-qrcode',
						label: 'Share',
					},
					{
						icon: 'icomoon-envelop',
						label: 'Contact us',
					},
					{
						icon: 'icomoon-facebook2',
						label: 'facebook',
					},
					{
						icon: 'icomoon-twitter2',
						label: 'twitter',
					},
					{
						icon: 'icomoon-github',
						label: 'fork on Github',
					},
				];
				$scope.items[0].update();

				fullscreen_cursor.on('update', function(e) {
					$scope.items[0].update();
					$scope.$digest();
				});

			}]
		};
	}]);
});

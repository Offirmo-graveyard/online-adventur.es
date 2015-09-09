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
						icon: 'icomoon-icon_4780_mod',
						label: 'Full screen',
						update: function() {
							if (fullscreen_cursor.get()) {
								$scope.items[0].icon = 'icomoon-icon_4780';
								$scope.items[0].label = 'Full screen : ON';
							}
							else {
								$scope.items[0].icon = 'icomoon-icon_4780_mod';
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
						icon: 'icomoon-music',
						label: 'Music',
					},
					{
						icon: 'icomoon-equalizer2',
						label: 'Language : en',
					},
					{
						icon: 'icomoon-spinner4',
						label: 'Statistics',
					},
					{
						icon: 'icomoon-death-note',
						label: 'Tutorial',
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
						label: 'Fork on Github',
						link: 'https://github.com/Offirmo/online-adventur.es'
					},
					{
						icon: 'icomoon-floppy-disk',
						label: 'Save',
					},
					{
						icon: 'icomoon-box-add',
						label: 'Check updates',
					},
					{
						icon: 'icomoon-aid-kit',
						label: 'Report bugs',
					},
					{
						icon: 'icomoon-spinner11',
						label: 'Refresh',
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

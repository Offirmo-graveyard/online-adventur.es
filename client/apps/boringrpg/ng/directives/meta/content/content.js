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

				var version_cursor = state_tree.select('version');
				var view_cursor = state_tree.select('view');
				var fullscreen_cursor = view_cursor.select('fullscreen');

				function angular_debounce(fn) {
					return _.debounce(function () {
						$scope.$evalAsync(fn);
					}, 200, true);
				}

				$scope.version = version_cursor.get();
				$scope.items = [
					{
						icon: 'icomoon-enter-fullscreen',
						label: 'Full screen',
						update: function() {
							if (fullscreen_cursor.get()) {
								$scope.items[0].icon = 'icomoon-enter-fullscreen';
								$scope.items[0].value = 'ON';
							}
							else {
								$scope.items[0].icon = 'icomoon-exit-fullscreen';
								$scope.items[0].value = 'OFF';
							}
						},
						on_click: angular_debounce(function() {
							screenfull.toggle();
						})
					},
					{
						icon: 'icomoon-volume-mute2',
						label: 'Volume',
						value: 'OFF'
					},
					{
						icon: 'icomoon-music',
						label: 'Music',
						value: 'OFF'
					},
					{
						icon: 'icomoon-language-choice',
						label: 'Language',
						value: 'en'
					},
					{
						icon: 'icomoon-stats-dots',
						label: 'Statistics',
					},
					{
						icon: 'icomoon-book',
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
						on_click: angular_debounce(function() {
							window.open('https://github.com/Offirmo/online-adventur.es','_blank');
						})
					},
					{
						icon: 'icomoon-floppy-disk',
						label: 'Save',
					},
					{
						icon: 'icomoon-cloud-download',
						label: 'Update',
					},
					{
						icon: 'icomoon-aid-kit',
						label: 'Report bugs',
						on_click: angular_debounce(function() {
							window.open('https://github.com/Offirmo/online-adventur.es/issues','_blank');
						})
					},
					{
						icon: 'icomoon-spinner11',
						label: 'Refresh',
						on_click: angular_debounce(function() {
							// http://stackoverflow.com/a/20741110/587407
							window.location.reload(true);
						})
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

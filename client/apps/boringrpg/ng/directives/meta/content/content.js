define([
	'offirmo-app-bootstrap',
	'lodash',
	'screenfull',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/meta/content/content.html',
	'boringrpg/ng/services/angular-debounce',
	'css!client/apps/boringrpg/ng/directives/meta/content/content.css',
],
function(offirmo_app, _, screenfull, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('metaContent', ['angularDebounce', function (angular_debounce) {
		return {
			template: tpl,
			controller: ['$scope', function($scope) {

				var version_cursor = state_tree.select('version');
				var view_cursor = state_tree.select('view');
				var fullscreen_cursor = view_cursor.select('fullscreen');

				/*function angular_debounce(fn) {
					return _.debounce(function () {
						$scope.$evalAsync(fn);
					}, 200, true);
				}*/

				$scope.version = version_cursor.get();
				$scope.items = [
					{
						icon: 'icomoon-enter-fullscreen',
						label: 'Full screen',
						update: function() {
							if (fullscreen_cursor.get()) {
								$scope.items[0].icon = 'icomoon-exit-fullscreen';
								$scope.items[0].value = 'ON';
							}
							else {
								$scope.items[0].icon = 'icomoon-enter-fullscreen';
								$scope.items[0].value = 'OFF';
							}
						},
						// we can't use angular debounce since screenfull request must be tied to a user action
						on_click: _.debounce(function() {
							screenfull.toggle();
							// trigger a $digest for angular to repaint
							$scope.$evalAsync();
						}, 200, true)
					},
					{
						icon: 'icomoon-volume-mute2',
						label: 'Volume',
						value: 'OFF',
						disabled: true
					},
					{
						icon: 'icomoon-music',
						label: 'Music',
						value: 'OFF',
						disabled: true
					},
					{
						icon: 'icomoon-language-choice',
						label: 'Language',
						value: 'en',
						disabled: true
					},
					{
						icon: 'icomoon-book',
						label: 'Tutorial',
						disabled: true
					},
					{
						icon: 'icomoon-stats-dots',
						label: 'Statistics',
						disabled: true
					},
					{
						icon: 'icomoon-star-full',
						label: 'Rate app',
						disabled: true
					},
					{
						icon: 'icomoon-qrcode',
						label: 'Share',
						disabled: true
					},
					{
						icon: 'icomoon-envelop',
						label: 'Contact us',
						disabled: true
					},
					{
						icon: 'icomoon-facebook2',
						label: 'facebook',
						disabled: true
					},
					{
						icon: 'icomoon-twitter2',
						label: 'twitter',
						disabled: true
					},
					{
						icon: 'icomoon-github',
						label: 'Fork on Github',
						on_click: _.debounce(function() {
							window.open('https://github.com/Offirmo/online-adventur.es','_blank');
						}, 200, true)
					},
					{
						icon: 'icomoon-floppy-disk',
						label: 'Save',
						disabled: true
					},
					{
						icon: 'icomoon-cloud-download',
						label: 'Update',
						disabled: true
					},
					{
						icon: 'icomoon-aid-kit',
						label: 'Report bugs',
						on_click: _.debounce(function() {
							window.open('https://github.com/Offirmo/online-adventur.es/issues','_blank');
						}, 200, true)
					},
					{
						icon: 'icomoon-spinner11',
						label: 'Refresh',
						on_click: _.debounce(function() {
							// http://stackoverflow.com/a/20741110/587407
							window.location.reload(true);
						}, 200, true)
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

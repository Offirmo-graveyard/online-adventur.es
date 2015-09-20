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

				var layout_state_cursor = view_cursor.select('layout', 'state');

				$scope.version = version_cursor.get();

				var root_items = [
					{
						icon: 'icomoon-volume-mute2',
						label: 'meta_volume',
						value: 'meta_volume_off',
						disabled: true
					},
					{
						icon: 'icomoon-music',
						label: 'meta_music',
						value: 'meta_music_off',
						disabled: true
					},
					{
						icon: 'icomoon-language-choice',
						label: 'meta_locale',
						value: 'locale_name',
						on_click: _.debounce(function() {
							cycle_locale();
						}, 200, true)
					},
					{
						icon: 'icomoon-book',
						label: 'meta_tutorial',
						disabled: true
					},
					{
						icon: 'icomoon-stats-dots',
						label: 'meta_statistics',
						disabled: true
					},
					{
						icon: 'icomoon-star-full',
						label: 'meta_rate_app',
						disabled: true
					},
					{
						icon: 'icomoon-qrcode',
						label: 'meta_share',
						disabled: true
					},
					{
						icon: 'icomoon-envelop',
						label: 'meta_contact_us',
						disabled: true
					},
					{
						icon: 'icomoon-facebook2',
						label: 'meta_facebook',
						disabled: true
					},
					{
						icon: 'icomoon-twitter2',
						label: 'meta_twitter',
						disabled: true
					},
					{
						icon: 'icomoon-github',
						label: 'meta_fork',
						on_click: _.debounce(function() {
							window.open('https://github.com/Offirmo/online-adventur.es','_blank');
						}, 200, true)
					},
					{
						icon: 'icomoon-floppy-disk',
						label: 'meta_save',
						disabled: true
					},
					{
						icon: 'icomoon-cloud-download',
						label: 'meta_update',
						disabled: true
					},
					{
						icon: 'icomoon-wrench',
						label: 'meta_advanced',
						on_click: _.debounce(function() {
							$scope.$evalAsync(function () {
								$scope.items = dev_items;
							});
						}, 200, true)
					},
				];

				var fullscreen_item = {
					icon: 'icomoon-enter-fullscreen',
					label: 'meta_fullscreen',
					update: function() {
						if (fullscreen_cursor.get()) {
							fullscreen_item.icon = 'icomoon-exit-fullscreen';
							fullscreen_item.value = 'meta_fullscreen_on';
						}
						else {
							fullscreen_item.icon = 'icomoon-enter-fullscreen';
							fullscreen_item.value = 'meta_fullscreen_off';
						}
					},
					// we can't use angular debounce since screenfull request must be tied to a user action
					on_click: _.debounce(function() {
						screenfull.toggle();
						// trigger a $digest for angular to repaint
						$scope.$evalAsync();
					}, 200, true)
				};

				var dev_items = [
					{
						icon: 'icomoon-undo2',
						label: 'back',
						on_click: _.debounce(function() {
							$scope.$evalAsync(function () {
								$scope.items = root_items;
							});
						}, 200, true)
					},
					fullscreen_item,
					{
						icon: 'icomoon-spinner11',
						label: 'meta_refresh',
						on_click: _.debounce(function() {
							// http://stackoverflow.com/a/20741110/587407
							window.location.reload(true);
						}, 200, true)
					},
					{
						icon: 'icomoon-aid-kit',
						label: 'meta_report_bugs',
						on_click: _.debounce(function() {
							window.open('https://github.com/Offirmo/online-adventur.es/issues','_blank');
						}, 200, true)
					},
					{
						icon: 'icomoon-fire',
						label: 'meta_reset',
						on_click: _.debounce(function() {
							window.localStorage.clear();
							window.location.reload(true);
					}, 200, true)
					},
					{
						icon: 'icomoon-terminal',
						label: 'meta_test_error',
						on_click: _.debounce(function() {
							window.onerror = window.offirmo_loader.display_unhandled_error;
							throw new Error('Test of unhandled browser error !');
						}, 200, true)
					},
				];
				fullscreen_item.update();

				$scope.items = root_items;
				layout_state_cursor.on('update', function () {
					$scope.items = root_items;
				});

				fullscreen_cursor.on('update', function(e) {
					fullscreen_item.update();
					$scope.$digest();
				});

				var existing_locales
				function cycle_locale() {
					var current_locale = view_cursor.get('locale');
					console.log('cycle_locale', current_locale);
					// easy cycling : we have only 2 ;-)
					if (current_locale === 'fr') {
						view_cursor.set('locale', 'en');
					}
					else  {
						view_cursor.set('locale', 'fr');
					}
				}
			}]
		};
	}]);
});

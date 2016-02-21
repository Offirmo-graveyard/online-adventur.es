define([
	'offirmo-app-bootstrap',
	'lodash',
	'screenfull',
	'appcache-nanny',
	'boringrpg/lib/state-tree',
	'text!client/apps/boringrpg/ng/directives/meta/content/content.html',
	'css!client/apps/boringrpg/ng/directives/meta/content/content.css',
],
function(offirmo_app, _, screenfull, AppCacheNanny, state_tree, tpl) {
	'use strict';

	offirmo_app.global_ng_module
	.directive('metaContent', [function () {
		return {
			scope: {},
			template: tpl,
			controller: ['$scope', function($scope) {
				$scope.debug = {id: 'directive/metaContent'};

				var version_cursor = state_tree.select('version');
				var pending_update_cursor = state_tree.select('update_pending');
				var view_cursor = state_tree.select('view');
				var layout_state_cursor = view_cursor.select('layout', 'state');
				var fullscreen_cursor = view_cursor.select('fullscreen');

				$scope.version = version_cursor.get();

				var update_item = {
					icon: 'icomoon-cloud-download',
					label: 'meta_update',
					disabled: ! pending_update_cursor.get(),
					on_click: _.debounce(function() {
						window.offirmo_loader.change_stage(3);
						// wait a little for rsrc to load (if not already there, hard to know...)
						setTimeout(function () {
							window.location.reload(true);
						}, 2000);
					}, 200, true)
				};

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
						disabled: true,
						on_click: _.debounce(function() {
							// TODOOO
							ga('send', 'social', {
								socialNetwork: 'facebook',
								socialAction: 'visit',
								socialTarget: 'http://foo.com'
							});
						}, 200, true)
					},
					{
						icon: 'icomoon-twitter2',
						label: 'meta_twitter',
						disabled: true,
						on_click: _.debounce(function() {
							// TODOOO
							ga('send', 'social', {
								socialNetwork: 'twitter',
								socialAction: 'visit',
								socialTarget: 'http://foo.com'
							});
						}, 200, true)
					},
					{
						icon: 'icomoon-floppy-disk',
						label: 'meta_save',
						disabled: true
					},
					update_item,
					{
						icon: 'icomoon-wrench',
						label: 'meta_advanced',
						on_click: _.debounce(function() {
							$scope.$evalAsync(function () {
								$scope.items = dev_items;
							});
							ga('send', {
								hitType: 'event',
								eventCategory: 'UX',
								eventAction: 'pageview',
								eventValue: '/meta/dev',
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
							ga('send', {
								hitType: 'event',
								eventCategory: 'UX',
								eventAction: 'pageview',
								eventValue: '/meta/root',
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
							setTimeout(function() {
								throw new Error('Another test of unhandled error !');
							}, 50);
							throw new Error('Test of unhandled browser error !');
						}, 200, true)
					},
					{
						icon: 'icomoon-github',
						label: 'meta_fork',
						on_click: _.debounce(function() {
							var target = 'https://github.com/Offirmo/online-adventur.es';
							window.open(target,'_blank');
							ga('send', 'social', {
								socialNetwork: 'github',
								socialAction: 'visit',
								socialTarget: target
							});
						}, 200, true)
					},
				];

				/////// init ///////
				$scope.items = root_items;

				layout_state_cursor.on('update', function () {
					$scope.items = root_items;
					if (! window.offirmo_loader.update_pending) {
						//console.log('checking for update...', window.applicationCache.status, AppCacheNanny.update());
						AppCacheNanny.update(); // check update
						setTimeout(sync_appcache_handlers, 200);
						setTimeout(sync_appcache_handlers, 500);
						setTimeout(sync_appcache_handlers, 1000);
					}
					else {
						sync_appcache_handlers ();
					}
				});

				fullscreen_cursor.on('update', function(e) {
					fullscreen_item.update();
					$scope.$evalAsync();
				});
				fullscreen_item.update();

				pending_update_cursor.on('update', function(e) {
					update_item.disabled = ! pending_update_cursor.get();
					$scope.$evalAsync();
				});

				function sync_appcache_handlers () {
					// appcache nanny handlers and the early handlers may fight
					if (window.offirmo_loader.update_pending && ! pending_update_cursor.get()) {
						// fix it
						pending_update_cursor.set(true);
					}
				}

				function cycle_locale() {
					var current_locale = view_cursor.get('locale');
					//console.log('cycle_locale', current_locale);
					// easy cycling : we have only 2 ;-)
					if (current_locale === 'fr') {
						view_cursor.set('requested_locale', 'en');
					}
					else  {
						view_cursor.set('requested_locale', 'fr');
					}
				}
			}]
		};
	}]);
});

define([
	'offirmo-app-bootstrap',
	'lodash',
	'offirmo-formatjs/lib/singleton-icu-data-container',
	'offirmo-formatjs/lib/format-icu-message',
	'offirmo-formatjs/lib/format-key',
	],
function(offirmo_app, _, i18n_data, format_icu_message, format_key) {
	'use strict';
	var unique_i18n_content_id = 0;

	offirmo_app.global_ng_module
	.directive('i18nContent', ['$parse', '$q', function ($parse, $q) {
		return {
			restrict: 'A',
			template: '<span>[xxx i18n-content on scope #{{$id}}]</span>',
			//scope: {},
			controller: ['$scope', function($scope) {
			}],
			link: function postLink($scope, $element, attrs, controller) {
				var i18n_content_id = unique_i18n_content_id++;
				var directive_id = i18n_content_id + '$' + $scope.$id;
				var intl;
				var resolved_content;

				// debugging
				var debug = {
					prefix: '[i18n|',
					key: '???',
					suffix: '|' + directive_id + ']',
				};
				function update_with_best_available_data_so_far() {
					debug.id = debug.prefix + debug.key + debug.suffix;
					resolved_content = debug.id; // so far : only a debug message
				}
				update_with_best_available_data_so_far();

				var early_key = attrs.i18nContent;
				var early_key_direct_message = attrs.key; // "direct" since messages are usually passed indirectly via "key"

				// early error
				if (! early_key && ! early_key_direct_message)
					console.error(id + ' error : missing key or direct message !');
				else {
					debug.key = (early_key_direct_message || early_key);
					update_with_best_available_data_so_far();
				}

				// should be set at start, can't change
				var is_content_dynamic = (typeof attrs.i18nWatch !== 'undefined');

				$element.html(resolved_content); // temporarily, waiting for intl data

				// REM on_locale_change will conveniently fire the callback at install if local is already available.
				i18n_data.on_locale_change(cache_current_intl);
				$scope.$on('$destroy', function () {
					i18n_data.off_locale_change(cache_current_intl);
				});
				function cache_current_intl(new_intl) {
					intl = new_intl;
					update_element(intl);
				}

				////////////
				function update_element(intl) {
					//console.log(debug.id + ' updating...');

					// try to resolve stuff
					resolution : {
						// may have changed
						var explicit_locale = attrs.locale;
						var key = attrs.i18nContent;
						var direct_message = attrs.message;

						var locale = explicit_locale || intl.locale;
						if (! locale) {
							console.error(id + ' error : couldn’t determine locale !');
							// non blocking, underlying lib will handle this case
						}
						debug.prefix = '[i18n|' + (locale ? (locale + '|') : '');
						update_with_best_available_data_so_far();

						if (! key && ! direct_message) {
							console.error(id + ' error : missing key or direct message !');
							break resolution; // can't do anything
						}
						if (key && direct_message) {
							console.error(id + ' error : competing key and direct message !');
							// non blocking, we'll use the message first
						}
						debug.key = (direct_message || key);
						update_with_best_available_data_so_far();

						var values = attrs.i18nValues ? $parse(attrs.i18nValues)($scope) : $scope;
						var custom_formats = intl.formats;

						if (direct_message) {
							resolved_content = format_icu_message(direct_message, values, intl, custom_formats, directive_id);
						}
						else {
							resolved_content = format_key(key, values, intl, custom_formats, directive_id);
						}
					}

					$element.html(resolved_content);
				}

				if (is_content_dynamic) {
					$scope.$watch(function() {
						//console.log(id + ' watch !');
						if (intl)
							update_element(intl);
					});
					/*attrs.$observe('i18nValues', function (new_values) {
						console.info('observed i18nValues change', new_values);
					});*/
				}
			}
		};
	}]);
});

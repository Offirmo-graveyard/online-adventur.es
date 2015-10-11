define([
	'offirmo-app-bootstrap',
	'lodash',
	'intl-messageformat',
	'offirmo-formatjs/lib/singleton-icu-data-container',
	],
function(offirmo_app, _, IntlMessageFormat, i18n_data) {
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

				var intl;

				var prefix = '[i18n|';
				var message = '?';
				var suffix = '|' + i18n_content_id + '$' + $scope.$id + ']';

				var id = prefix + message + suffix;
				//console.log(id + ' i18n link', $scope, $element, attrs);

				var key = attrs.i18nContent;
				var explicit_locale = attrs.locale;
				var direct_message = attrs.message; // "direct" since messages are usually passed indirectly via "key"

				// early error
				if (! key && ! direct_message)
					console.error(id + ' error : missing key or direct message !');
				else {
					message = (key || direct_message);
					id = prefix + message + suffix; // update
				}

				var is_content_dynamic = (typeof attrs.i18nWatch !== 'undefined');
				//console.log('is_content_dynamic', is_content_dynamic);

				$element.html(prefix + message + suffix); // temporarily, waiting for intl data

				function cache_current_intl(new_intl) {
					intl = new_intl;
					update_element(intl);
				}
				// REM on_locale_change will conveniently fire the callback at install if local is already available.
				i18n_data.on_locale_change(cache_current_intl);
				$scope.$on('$destroy', function () {
					i18n_data.off_locale_change(cache_current_intl);
				});

				function update_element(intl) {
					//console.log(id + ' updating...');
					var resolved_content = prefix + message + suffix;

					// try to resolve stuff
					resolution : {

						// may have changed
						prefix = '[i18n|';
						key = attrs.i18nContent;
						explicit_locale = attrs.locale;
						direct_message = attrs.message;

						if (! key && ! direct_message) {
							console.error(id + ' error : missing key or direct message !');
							break resolution;
						}
						message = (key || direct_message);
						id = resolved_content = prefix + message + suffix;

						if (key && direct_message) {
							console.error(id + ' error : competing key and direct message !');
							break resolution;
						}

						var locale = explicit_locale || intl.locale;
						if (! locale) {
							console.error(id + ' error : couldn’t determine locale !');
							break resolution;
						}

						prefix = prefix + locale + '|';
						resolved_content = prefix + message + suffix;

						if (key && ! intl.messages) {
							console.error(id + ' error : couldn’t resolve key due to missing intl.messages !');
							break resolution;
						}

						if (key && ! intl.messages[key]) {
							console.error(id + ' error : couldn’t resolve key "' + key + '" in intl.messages !');
							break resolution;
						}

						message = direct_message || intl.messages[key];
						resolved_content = prefix + message + suffix;

						var custom_formats = intl.formats;

						var values = attrs.i18nValues ? $parse(attrs.i18nValues)($scope) : $scope;

						var debug = {
							locale: locale,
							message: message,
							custom_formats: custom_formats,
							values: values
						};

						//console.log(id + ' starting compile :', debug);

						var message_format;
						try {
							message_format =  new IntlMessageFormat(message, locale, custom_formats);
						}
						catch(err) {
							console.error(id + ' error : unable to parse message format !', err, debug);
							break resolution;
						}

						try {
							resolved_content = message_format.format(values);
						}
						catch(err) {
							console.error(id + ' error : unable to compile message !', err, debug);
							break resolution;
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
					attrs.$observe('i18nValues', function (new_values) {
						console.info('observed i18nValues change', new_values);
					});
				}
			}
		};
	}]);
});

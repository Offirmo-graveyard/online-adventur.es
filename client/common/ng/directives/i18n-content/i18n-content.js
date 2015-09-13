define([
	'offirmo-app-bootstrap',
	'lodash',
	'intl-messageformat'
	],
function(offirmo_app, _, IntlMessageFormat) {
	'use strict';
	var unique_i18n_content_id = 0;

	console.log('directive i18nContent declaration');
	offirmo_app.global_ng_module
	.directive('i18nContent', ['$q', 'i18nData', function ($q, i18n_data) {
		return {
			restrict: 'A',
			template: '<span>[xxx i18n-content on scope #{{$id}}]</span>',
			//scope: {},
			controller: ['$scope', function($scope) {
			}],
			link: function postLink($scope, $element, attrs, controller) {
				var i18n_content_id = unique_i18n_content_id++;

				var prefix = '[i18n|';
				var message = '?';
				var suffix = '|' + i18n_content_id + '$' + $scope.$id + ']';

				var id = prefix + message + suffix;
				var resolved_content = prefix + message + suffix;
				//console.log(id + ' i18n link', $scope, $element, attrs);

				var key = attrs.i18nContent;
				var explicit_locale = attrs.locale;
				var direct_message = attrs.message; // "direct" since messages
				                                    // are usually passed indirectly via "key"

				if (! key && ! direct_message)
					console.error(id + ' error : missing key or direct message !');
				else {
					message = (key || direct_message);
					id = resolved_content = prefix + message + suffix;
				}

				$element.html(resolved_content); // temporarily

				/*i18n_data.get_intl()
					.then(update_element)
					.catch(function(err) {
						console.error(id + ' error !', err);
					});*/
				i18n_data.on_locale_change(update_element);

				function update_element(intl) {
					console.log(id + ' updating...');

					// try to resolve stuff
					resolution : {

						if (! key && ! direct_message) {
							console.error(id + ' error : missing key or direct message !');
							break resolution;
						}

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

						var data = $scope; // TODO add more options

						var debug = {
							locale: locale,
							message: message,
							custom_formats: custom_formats,
							data: data
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
							resolved_content = message_format.format(data);
						}
						catch(err) {
							console.error(id + ' error : unable to compile message !', err, debug);
							break resolution;
						}
					}

					$element.html(resolved_content);
				}
			}
		};
	}]);
});

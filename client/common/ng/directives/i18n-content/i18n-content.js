define([
	'offirmo-app-bootstrap',
	'lodash',
	'intl-messageformat'
	],
function(offirmo_app, _, IntlMessageFormat) {
	'use strict';

	console.log('directive i18nContent declaration');
	offirmo_app.global_ng_module
	.directive('i18nContent', ['$q', 'i18nData', function ($q, i18nData) {
		return {
			restrict: 'A',
			template: '<span>Hello</span>',
			controller: ['$scope', function($scope) {
				//console.log('i18nContent ctrl');

				//$scope.

			}],
			link: function postLink($scope, $element, attrs, controller) {

				var id = '[i18n-content #' + $scope.$id + ']';
				//console.log(id + ' i18n link', $scope, $element, attrs);

				var key = attrs.i18nContent;
				var explicit_locale = attrs.locale;
				var direct_message = attrs.message; // "direct" since messages
				                                    // are usually passed indirectly via "key"

				if (! key && ! direct_message) {
					console.error(id + ' error : missing key or direct message !');
				}

				i18nData.get_intl()
				.then(function(intl) {
					//console.log(id + ' got intl object !');

					// try to resolve stuff
					var content = '[i18n error]';
					resolution : {

						if (! key && ! direct_message) {
							console.error(id + ' error : missing key or direct message !');
							break resolution;
						}
						content = '[' + (key || direct_message) + ']';

						if (key && direct_message) {
							console.error(id + ' error : competing key and direct message !');
							break resolution;
						}

						var locale = explicit_locale || intl.locale;
						if (! locale) {
							console.error(id + ' error : couldn’t determine locale !');
							break resolution;
						}
						content = '[' + (key || direct_message) + ']';

						if (key && ! intl.messages) {
							console.error(id + ' error : couldn’t resolve key due to missing intl.messages !');
							break resolution;

						}

						if (key && ! intl.messages[key]) {
							console.error(id + ' error : couldn’t resolve key "' + key + '" !');
							break resolution;

						}
						var message = direct_message || intl.messages[key];
						content = '[' + message + ']';

						var custom_formats = intl.custom;

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
							content = message_format.format(data);
						}
						catch(err) {
							console.error(id + ' error : unable to compile message !', err, debug);
							break resolution;
						}
					};

					$element.html(content);
				})
				.catch(function(err) {
					console.error(id + ' error !', err);
				});

				/*var locale = scope.intl.locale;
				var messages = scope.intl.messages;
				var data = scope;
				var custom_formats = scope.intl.custom;

				var msg = messages[key];

				var text;
				if(_.isUndefined(msg))
					text = '[' + key + ']';
				else {
					var mf =  new IntlMessageFormat(msg, locale, custom_formats);
					text = mf.format(data);
				}

				element.html(text);*/
			}
		};
	}]);
});

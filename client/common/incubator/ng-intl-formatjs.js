define(
[
	'angular',
	'lodash',
	'intl-messageformat'
],
function(angular, _, IntlMessageFormat) {
	'use strict';

	var intl_mod = angular.module('intl.formatjs', []);

	intl_mod.directive('ngIntl', ['$locale', function ($locale) {
		var ng_id = 'intl.formatjs:ngIntl directive';
		console.log('Hello from ' + ng_id, arguments);

		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				//console.log('link', scope, element, attr);

				var locale = $locale.id;
				var key = attr.ngIntl;
				var messages = scope.intl.messages;
				var data = scope;
				var custom_formats = scope.intl.custom;

				if(!_.isString(locale) || _.isEmpty(locale)) throw new Error(ng_id + ' : invalid locale ! (' + locale + ')');
				if(!_.isString(key) || _.isEmpty(key)) throw new Error(ng_id + ' : invalid message key ! (' + key + ')');
				if(!_.isObject(messages)) throw new Error(ng_id + ' : invalid localized messages !');

				var msg = messages[key];
				var text;
				if(_.isUndefined(msg)) {
					text = '[' + key + ']';
					console.warning(ng_id + ' : no message found for given key ! (' + key + ')');
				}
				else {
					var mf =  new IntlMessageFormat(msg, locale, custom_formats);
					text = mf.format(data);
				}

				element.html(text);
			}
		};
	}]);

});

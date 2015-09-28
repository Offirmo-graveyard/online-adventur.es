define(
[
	'angular',
	'lodash',
	'intl-messageformat'
],
function(angular, _, IntlMessageFormat) {
	'use strict';

	function createFormatCache() {

	}

	function getMsgFormat(message, locale, custom_formats) {
		var message_format;

		try {
			message_format =  new IntlMessageFormat(message, locale, custom_formats);
		}
		catch(err) {
			console.error(id + ' error : unable to parse message format !', err, debug);
		}

		return message_format;
	}


	return {
		libs: {
			IntlMessageFormat: IntlMessageFormat
		}
	};
});

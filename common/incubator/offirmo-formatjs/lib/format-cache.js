// if node.js : use amdefine
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'lodash',
	'intl-messageformat'
],
function(_, IntlMessageFormat) {
	'use strict';

	function createFormatCache() {
		// TODO one day
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

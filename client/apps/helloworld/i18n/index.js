define([
	'lodash',
	'client/apps/helloworld/i18n/en',
	'client/apps/helloworld/i18n/fr'
], function(
	_,
	en,
   fr
) {
	'use strict';

	return {
		en: en,
		fr: _.defaults(fr, en)
	};
});

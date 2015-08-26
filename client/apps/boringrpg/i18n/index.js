define([
	'lodash',
	'client/apps/boringrpg/i18n/en',
	'client/apps/boringrpg/i18n/fr'
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

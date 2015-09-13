/* will detect best locale, set it in global state, and react to state change and load localisations
 */
define([
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'jquery',
	'boringrpg/lib/state-tree',
	'i18n!client/apps/boringrpg/i18n/nls/messages',
],
function(offirmo_app, _, Rx, $, state_tree, i18n_messages) {
	'use strict';

	offirmo_app.global_ng_module
	.service('localeDetector', ['$document', 'i18nData', function ($document, i18n_data) {
		console.log('installing localeDetector...');

		var view_cursor = state_tree.select('view');
		var locale_cursor = view_cursor.select('locale');

		/////// Reactive update ///////
		locale_cursor.on('update', function () {
			var locale = locale_cursor.get();
			console.log('updating localization for : ', locale);
			if (locale === i18n_messages.locale) {
				// cool, already have it
				i18n_data.set_intl(i18n_messages.locale, i18n_messages, i18n_messages.custom_formats);
			}
			else {
				// must load it asynchronously
				// TODO
				console.error('TODO load localization');
			}
		});

		/////// Initial detection ///////
		var user_explicitely_selected_locale; // TODO
		var requirejs_selected_locale = i18n_messages.locale; // supposedly intelligently computed by requirejs
		var document_lang = $document[0].documentElement.lang; // supposedly intelligently set by the server
		var navigator_language = navigator.language || navigator.browserLanguage;

		var final_locale =
			user_explicitely_selected_locale ||
			requirejs_selected_locale ||
			document_lang ||
			navigator_language;

		console.log('localeDetector detected "' + final_locale + '"' +
			' (usr:' + user_explicitely_selected_locale +
			', doc:' + document_lang +
			', req:' + requirejs_selected_locale +
			', nav:' + navigator_language +
			')'
		);
		view_cursor.set('locale', final_locale);


	}]);
});

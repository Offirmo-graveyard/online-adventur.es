/* will detect best locale, set it in global state, and react to state change and load localisations
 */
define([
	'require',
	'offirmo-app-bootstrap',
	'lodash',
	'rx',
	'jquery',
	'boringrpg/lib/state-tree',
	'i18n!client/apps/boringrpg/i18n/nls/messages',
	'client/apps/boringrpg/i18n/nls/en/messages'
],
function(require, offirmo_app, _, Rx, $, state_tree, i18n_messages, en_i18n_messages) {
	'use strict';

	var USER_EXPLICITELY_SELECTED_LOCALE_STORAGE_KEY = "offirmo.online-adventures.user_explicitely_selected_locale";

	offirmo_app.global_ng_module
	.service('localeDetector', ['$document', 'i18nData', function ($document, i18n_data) {
		console.log('installing localeDetector...');

		var REFERENCE_I18N_KEYS = _.keys(en_i18n_messages);
		var view_cursor = state_tree.select('view');
		var requested_locale_cursor = view_cursor.select('requested_locale');

		/////// Initial detection ///////
		var user_explicitely_selected_locale = window.localStorage.getItem(USER_EXPLICITELY_SELECTED_LOCALE_STORAGE_KEY);
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
		requested_locale_cursor.set(final_locale);

		/////// Reactive update ///////
		requested_locale_cursor.on('update', function () {
			var requested_locale = requested_locale_cursor.get();
			console.log('updating localization for : ', requested_locale);
			if (requested_locale === i18n_messages.locale) {
				// cool, already have it
				init_intl_from_i18n_messages(i18n_messages);
			}
			else if (requested_locale === 'en') {
				// cool, already have it
				init_intl_from_i18n_messages(en_i18n_messages);
			}
			else {
				// must load it asynchronously
				require(['client/apps/boringrpg/i18n/nls/' + requested_locale + '/messages'], function(i18n_messages) {
					init_intl_from_i18n_messages(i18n_messages);
				});
			}
		});

		function init_intl_from_i18n_messages(i18n_messages) {
			// perform checks
			var checks_ok = false; // so far
			var target_locale = requested_locale_cursor.get();
			checking: {
				if (! _.isObject(i18n_messages)) {
					console.error('i18n messages for "' + target_locale + '" are not an object !');
					break checking;
				}
				if (i18n_messages.locale !== target_locale) {
					console.error('i18n messages for "' + target_locale + '" is not reporting the same locale : "' + i18n_messages.locale + '" !');
					break checking;
				}
				if (target_locale !== 'en') {
					var KEYS = _.keys(i18n_messages);
					var mismatched_keys = _.xor(REFERENCE_I18N_KEYS, KEYS);
					if (mismatched_keys.length) {
						mismatched_keys.forEach(function(key) {
							if (en_i18n_messages.hasOwnProperty(key)) {
								console.error('Locale messages for "' + target_locale + '" is missing the "' + key + '" key !');
								// fill hole with english
								i18n_messages[key] = en_i18n_messages[key];
							}
							else {
								console.error('Locale messages for "' + target_locale + '" has an extra key "' + key + '" !');
							}
						});
					}
				}
				checks_ok = true;
			}
			if (! checks_ok) {
				console.error('Couldn’t load i18n for "' + locale_cursor.get() + '"');
			}
			else {
				i18n_data.set_intl(i18n_messages.locale, i18n_messages, i18n_messages.custom_formats);
				view_cursor.set('locale', i18n_messages.locale);
				window.localStorage.setItem(USER_EXPLICITELY_SELECTED_LOCALE_STORAGE_KEY, i18n_messages.locale);
			}
		}
	}]);
});

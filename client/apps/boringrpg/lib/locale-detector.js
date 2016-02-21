/* will detect best locale, set it in global state, and react to state change and load localisations
 */
define([
	'require',
	'lodash',
	'rx',
	'jquery',
	'offirmo-formatjs/lib/singleton-icu-data-container',
	'offirmo-formatjs/lib/typeset',
	'offirmo-formatjs/lib/typeset-icu-message',
	'boringrpg/lib/state-tree',
	'i18n!client/apps/boringrpg/i18n/nls/messages',
	'client/apps/boringrpg/i18n/nls/en/messages',
	'boringrpg/lib/static-data/view/view',
],
function(require, _, Rx, $, i18n_data, typeset_lib, icu_message_typeset, state_tree, autoselected_requirejs_i18n_bundle, en_requirejs_i18n_bundle, view_static_data) {
	'use strict';

	//console.log('installing localeDetector...');

	var REFERENCE_I18N_KEYS = _.keys(en_requirejs_i18n_bundle);
	var view_cursor = state_tree.select('view');
	var requested_locale_cursor = view_cursor.select('requested_locale');

	/////// Initial detection ///////
	var user_explicitly_selected_locale = window.localStorage.getItem(view_static_data.local_storage_keys.user_explicitly_selected_locale);
	var requirejs_selected_locale = autoselected_requirejs_i18n_bundle.locale; // supposedly intelligently computed by requirejs
	var document_lang = document.documentElement.lang; // supposedly intelligently set by the server
	var navigator_language = navigator.language || navigator.browserLanguage;

	var final_locale =
		user_explicitly_selected_locale ||
		requirejs_selected_locale ||
		document_lang ||
		navigator_language;

	console.info('* localeDetector : detected locale "' + final_locale + '" as best candidate' +
		' (usr:' + user_explicitly_selected_locale +
		', doc:' + document_lang +
		', req:' + requirejs_selected_locale +
		', nav:' + navigator_language +
		')'
	);
	requested_locale_cursor.set(final_locale);

	/////// Reactive update ///////
	requested_locale_cursor.on('update', function () {
		var requested_locale = requested_locale_cursor.get();
		//console.log('* locale detector : Trying to update localization for : ' + requested_locale + '…');

		if (requested_locale === autoselected_requirejs_i18n_bundle.locale) {
			// cool, already have it
			init_intl_from_i18n_messages(autoselected_requirejs_i18n_bundle);
		}
		else if (requested_locale === 'en') {
			// cool, already have it
			init_intl_from_i18n_messages(en_requirejs_i18n_bundle);
		}
		else {
			// must load it asynchronously
			require(['client/apps/boringrpg/i18n/nls/' + requested_locale + '/messages'], function(i18n_messages) {
				init_intl_from_i18n_messages(i18n_messages);
			});
		}
	});

	function init_intl_from_i18n_messages(i18n_messages) {
		var checks_ok = check_and_autorepair_bundle(i18n_messages, requested_locale_cursor.get());
		if (! checks_ok) {
			console.error('Couldn’t load i18n for "' + locale_cursor.get() + '"');
			// no locale change
		}
		else {
			var improved_messages = auto_improve_messages(i18n_messages);
			i18n_data.set_icu_data(i18n_messages.locale, improved_messages, i18n_messages.custom_formats);
			view_cursor.set('locale', i18n_messages.locale);
			window.localStorage.setItem(view_static_data.local_storage_keys.user_explicitly_selected_locale, i18n_messages.locale);
			//console.info('locale has been switched to', i18n_messages.locale);
			ga('set', 'language', i18n_messages.locale);
		}
	}

	/** check and attempt auto-repair of messages. Returns false if messages are too wrong to repair.
	 *
	 * Useful for developers :
	 * - it would be too cumbersome to require all translation keys during dev
	 * - it's hard to spot a missing key without help
	 */
	function check_and_autorepair_bundle(i18n_messages, target_locale) {
		var checks_ok = false; // so far
		var target_locale = requested_locale_cursor.get();
		checking: {
			if (! _.isObject(i18n_messages)) {
				console.error('i18n messages for "' + target_locale + '" are not an object !');
				break checking;
			}
			if (i18n_messages.locale !== target_locale) {
				console.error('i18n messages for "' + target_locale + '"' +
					' is not reporting the same locale : "' + i18n_messages.locale + '" !');
				break checking;
			}
			if (target_locale !== 'en') {
				var KEYS = _.keys(i18n_messages);
				var mismatched_keys = _.xor(REFERENCE_I18N_KEYS, KEYS);
				mismatched_keys.forEach(function(key) {
					if (en_requirejs_i18n_bundle.hasOwnProperty(key)) {
						console.error('Locale messages for "' + target_locale + '" is missing the "' + key + '" key !');
						// fill hole with english
						i18n_messages[key] = en_requirejs_i18n_bundle[key];
					}
					else {
						console.warn('Locale messages for "' + target_locale + '" has an extra key "' + key + '" !');
						// extra, no need to fix
					}
				});
			}
			checks_ok = true;
		}
		return checks_ok;
	}

	/** auto-improve messages : apply common typographical and typeset rules
	 *
	 * Rationale : helps maintainers
	 */
	function auto_improve_messages(i18n_messages) {

		var rule_set;
		switch(i18n_messages.locale) {
			case 'fr':
				rule_set = typeset_lib.rule_sets.fr;
				break;
			case 'en':
				rule_set = typeset_lib.rule_sets.en;
				break;
			default:
				rule_set = typeset_lib.rule_sets.generic;
				break;
		}

		var typeset_function = _.partialRight(typeset_lib.typeset, rule_set);

		var messages = {};
		_.forOwn(i18n_messages, function(value, key) {
			if(_.isString(value)) {
				value = icu_message_typeset(value, typeset_function);
			}
			else if (_.isFunction(value)) {
				// OK, as an extension we allow this for handling complex cases
			}
			else {
				// It's ok, user may want to put locale-dependent config in i18n messages.
				// But we skip it since we're only concerned about messages here.
				return;
			}

			messages[key] = value;
		});

		return messages;
	}

});

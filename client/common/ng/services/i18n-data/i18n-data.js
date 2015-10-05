define([
	'offirmo-app-bootstrap',
	'lodash'
	],
function(offirmo_app, _) {
	'use strict';

	// https://github.com/yahoo/intl-locales-supported/blob/master/index.js
	// Copyright 2015, Yahoo Inc.
	function areIntlLocalesSupported(locales) {
		if (typeof Intl === 'undefined') {
			return false;
		}

		if (!locales) {
			throw new Error('locales must be supplied.');
		}

		if (!Array.isArray(locales)) {
			locales = [locales];
		}

		var intlConstructors = [
			Intl.Collator,
			Intl.DateTimeFormat,
			Intl.NumberFormat
		].filter(function (intlConstructor) {
				return intlConstructor;
			});

		if (intlConstructors.length === 0) {
			return false;
		}

		return intlConstructors.every(function (intlConstructor) {
			var supportedLocales = intlConstructor.supportedLocalesOf(locales);
			return supportedLocales.length === locales.length;
		});
	}
	var supported = areIntlLocalesSupported(['en', 'fr']);
	if (! supported) {
		console.error('Intl doesn’t support usual locales !');
	}

	function base_typeset(text) {
		// TODO use typeset lib !

		text = text.replace(/'/g, '’');
		text = text.replace(/ \?/g, '&nbsp;?');
		text = text.replace(/ !/g, '&nbsp;!');
		text = text.replace(/ :/g, '&nbsp;:');
		text = text.replace(/ ;/g, '&nbsp;;');
		text = text.replace(/ »/g, '&nbsp;»');
		text = text.replace(/« /g, '«&nbsp;');
		text = text.replace(/\.\.\./g, '…');
		text = text.replace(/(\d+) /, '$1&nbsp;');

		return text;
	}

	function typeset(text) {
		text = text || '';
		var result = '';

		var imbricatedCurly = 0;
		var currentPos = 0;

		function onNewOpeningCurly(nextOpeningCurly) {
			var extra_content = text.slice(currentPos, nextOpeningCurly + 1);
			if(imbricatedCurly === 0)
				extra_content = base_typeset(extra_content);
			result = result + extra_content;
			currentPos = nextOpeningCurly + 1;
			imbricatedCurly++;
		}
		function onNewClosingCurly(nextOpeningCurly) {
			result = result + text.slice(currentPos, nextClosingCurly + 1);
			currentPos = nextClosingCurly + 1;
			imbricatedCurly--;
		}

		var safety = 0;
		while(currentPos < text.length) {
			if((safety++) > 100) throw new Error('loop !');
			var nextOpeningCurly = text.indexOf('{', currentPos);
			if(imbricatedCurly === 0) {
				if (nextOpeningCurly >= 0) {
					onNewOpeningCurly(nextOpeningCurly);
				}
				else {
					result = result + base_typeset(text.slice(currentPos));
					currentPos = text.length;
				}
			}
			else {
				var nextClosingCurly = text.indexOf('}', currentPos);
				if (nextOpeningCurly >= 0 && nextClosingCurly >=0) {
					if(nextOpeningCurly < nextClosingCurly)
						onNewOpeningCurly(nextOpeningCurly);
					else
						onNewClosingCurly(nextClosingCurly);
				}
				else if (nextClosingCurly >= 0) {
					onNewClosingCurly(nextClosingCurly);
				}
				else {
					result = result + text.slice(currentPos);
					currentPos = text.length;
				}
			}
		}

		return result;
	}


	offirmo_app.global_ng_module
	.service('i18nData', ['$q', function ($q) {
		var init_done = false;
		var init_deferred = $q.defer();
		var locale_listeners = [];

		var intl = undefined;

		return {

			// setter
			set_intl: function (locale, messages, custom_formats) {
				_.forOwn(messages, function(value, key) {

					if(! _.isString(value)) {
						// it's ok, user may want to put locale-dependent config in i18n messages
						return;
					}

					messages[key] = typeset(value);
				});
				intl = {
					locale: locale,
					messages: messages,
					formats: custom_formats || {}
				};
				if (! init_done) {
					init_done = true;
					init_deferred.resolve(intl);
				}
				_.forEach(locale_listeners, function(listener) {
					listener(intl);
				})
			},

			// getters
			get_intl: function () {
				return init_deferred.promise;
			},
			/*get_locale: function () {
				return intl.locale;
			},*/
			/*get_messages: function () {
				//return init_deferred.promise.then(function() {
					return intl.messages;
				//});
			},*/

			// listen for changes (listener called at init if a lang is avail)
			on_locale_change: function(listener_to_add) {
				if (_.includes(locale_listeners, listener_to_add))
					throw new Error('i18n-data trying to attach a locale change listener which is already present !');

				locale_listeners.push(listener_to_add);

				if (intl) {
					// call it immediately
					listener_to_add(intl);
				}
			},
			off_locale_change: function(listener_to_remove) {
				if (! _.includes(locale_listeners, listener_to_remove))
					throw new Error('i18n-data trying to remove a locale change listener which is not present !');

				locale_listeners = _.reject(locale_listeners, function (listener) {
					return (listener === listener_to_remove);
				});
			}
		}
	}]);
});

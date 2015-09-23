define([
	'offirmo-app-bootstrap',
	'lodash'
	],
function(offirmo_app, _) {
	'use strict';

	function base_typeset(text) {
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
			result = result + base_typeset(text.slice(currentPos, nextOpeningCurly));
			currentPos = nextOpeningCurly;
			imbricatedCurly++;
		}
		function onNewClosingCurly(nextOpeningCurly) {
			result = result + text.slice(currentPos, nextClosingCurly);
			currentPos = nextClosingCurly;
			imbricatedCurly--;
		}

		while(currentPos < text.length) {
			if(imbricatedCurly === 0) {
				var nextOpeningCurly = text.indexOf('{', currentPos);
				if (nextOpeningCurly >= 0) {
					onNewOpeningCurly(nextOpeningCurly);
				}
				else {
					result = result + base_typeset(text.slice(currentPos));
					currentPos = text.length;
				}
			}
			else {
				var nextOpeningCurly = text.indexOf('{', currentPos);
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

	var tests = [
		{
			data: '',
			expected: ''
		},
		{
			data: 'a',
			expected: 'a'
		},
		{
			data: '{',
			expected: '{'
		},
		{
			data: '}',
			expected: '}'
		},
		{
			data: 'foo',
			expected: 'foo'
		},
		{
			data: '...',
			expected: '…'
		},
		{
			data: 'foo...bar......',
			expected: 'foo…bar……'
		},
		{
			data: '...{...',
			expected: '…{...'
		},
		{
			data: '...{...}',
			expected: '…{...}'
		},
		{
			data: '...{...}...',
			expected: '…{...}…'
		},
		{
			data: '...}...',
			expected: '…}…'
		},
		{
			data: '{...}',
			expected: '{...}'
		},
		{
			data: '{...}...',
			expected: '{...}…'
		},
		{
			data: '{{...}...}',
			expected: '{{...}...}'
		},
		{
			data: '...{...}...{...}...',
			expected: '…{...}…{...}…'
		},
	];
	tests.forEach(function(test) {
		var actual = typeset(test.data);
		if (actual !== test.expected) {
			debugger;
			typeset(test.data);
			throw new Error('For "' + test.data + '", expected "' + test.expected + '", got "' + actual + '" !');
		}
	});

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

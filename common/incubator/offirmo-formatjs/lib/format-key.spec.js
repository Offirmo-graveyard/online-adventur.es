'use strict';

var path = require('path');
var _ = require('lodash');
var lib = require('./format-key');


describe('format-key', function () {
	var values = {
		name: 'M. World',
		now: 1234567890,
		numCats: 5,
		percentBlackCats: 0.234,
		weapon_key: 'weapon_sword',
		weapon_qualif_1_key: 'weaponqualif1_sinister',
		weapon_qualif_2_key: 'weaponqualif2_apprentice',
	};

	var intl_fr = {
		locale: 'fr',
		messages: {
			foo: 'foo',
			hello: 'Bonjour {name} !',
			now: 'Il est {now, time, long} et tout va bien.',
			cats: 'J’ai {numCats, number} chats. Environ {percentBlackCats, number, percent} d’entre eux sont noirs.',
			weapon_sword: 'épée',
			weaponqualif1_sinister: 'sinistre',
			weaponqualif2_apprentice: 'd’apprenti',
			fn: function build_weapon_name(values, intl, libs, debug_id) {
				var parts = libs.format_multiple([
					values.weapon_key,
					values.weapon_qualif_1_key,
					values.weapon_qualif_2_key,
				]);

				return parts.join(' ');
			},
			broken_fn: function build_weapon_name(values, intl, libs) {
				// returns nothing !
			},
		}
	};

	var intl_en = {
		locale: 'en',
		messages: {
			foo: 'foo',
			hello: 'Hello {name}!',
			now: 'It’s {now, time, long} and all is well.',
			cats: 'I have {numCats, number} cats. Almost {percentBlackCats, number, percent} of them are black.',
			weapon_sword: 'sword',
			weaponqualif1_sinister: 'sinister',
			weaponqualif2_apprentice: 'apprentice’s',
			fn: function build_weapon_name(values, intl, libs, debug_id) {
				var parts = libs.format_multiple([
					values.weapon_qualif_2_key,
					values.weapon_qualif_1_key,
					values.weapon_key,
				])
				.map(libs._s.capitalize);

				return parts.join(' ');
			},
			broken_fn: function build_weapon_name(values, intl, libs) {
				// returns nothing !
			},
		}
	};

	var expected_fr = {
		foo: 'foo',
		hello: 'Bonjour M. World !',
		now: 'Il est 6:56:07 et tout va bien.',
		cats: 'J’ai 5 chats. Environ 23\u00A0% d’entre eux sont noirs.',
		fn: 'épée sinistre d’apprenti',
		broken_fn: '[i18n|fr|?!?|test fr]'
	};

	var expected_en = {
		foo: 'foo',
		hello: 'Hello M. World!',
		now: 'It’s 6:56:07 AM  and all is well.',
		cats: 'I have 5 cats. Almost 23% of them are black.',
		fn: 'Apprentice’s Sinister Sword',
		broken_fn: '[i18n|en|?!?|test en]'
	};

	it('should expose a function', function () {
		expect(lib.format).to.be.a('function');
	});

	describe.only('format()', function () {

		context('when passed correct parameters', function () {
			it('should format correctly for fr', function () {
				_.forEach(expected_fr, function (value, key) {
					var res = lib.format(key, values, intl_fr, 'test fr');
					expect(res, 'test ' + key + '@fr').to.equal(value);
				});
			});

			it('should format correctly for en', function () {
				_.forEach(expected_en, function (value, key) {
					var res = lib.format(key, values, intl_en, 'test en');
					expect(res, 'test ' + key + '@en').to.equal(value);
				});
			});
		});

		context('when passed incorrect parameters', function () {

		});

	});

	describe('format_multiple()', function () {

		context('when passed correct parameters', function () {

			it('should format correctly for fr', function () {
				var res = lib.format_multiple(
					['weapon_sword', 'weaponqualif1_sinister', 'weaponqualif2_apprentice'],
					values, intl_fr, 'test fr'
				);

				expect(res).to.deep.equal(['épée', 'sinistre', 'd’apprenti']);
			});

			it('should format correctly for en', function () {
				var res = lib.format_multiple(
					['weapon_sword', 'weaponqualif1_sinister', 'weaponqualif2_apprentice'],
					values, intl_en, 'test en'
				);

				expect(res).to.deep.equal(['sword', 'sinister', 'apprentice’s']);
			});
		});

		context('when passed incorrect parameters', function () {

		});

	});

});

if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'boringrpg/lib/static-data/model/db'
], function(chai, mocha, OUT) {
	'use strict';

	var expect = chai.expect;

	describe('Static DB', function() {
		_.forEach({
			AdventureArchetype: {
				id: 'stare_cup',
				msg_id: 'clickmsg_stare_cup',
				pre: {
					good_click: true
				},
				post: {
					gains: {
						level: 0,
						health: 0,
						mana: 2,
						strength: 0,
						agility: 0,
						vitality: 0,
						wisdom: 0,
						luck: 0,
						coins: 0,
						tokens: 0,
						weapon: false,
						armor: false,
						weapon_improvement: false,
						armor_improvement: false
					}
				}
			}
		}, function (sample, model) {
			it('should load and expose "' + model + '"', function () {
				expect(OUT).to.have.property(model);
				expect(OUT[model]).to.have.property('all');
				expect(OUT[model].all).to.have.length.above(1);
				expect(OUT[model]).to.have.property('by_id');
				var temp = OUT[model].by_id[sample.id];
				expect(OUT[model].by_id[sample.id], 'sample').to.deep.equal(sample);
			});
		});
	});
});

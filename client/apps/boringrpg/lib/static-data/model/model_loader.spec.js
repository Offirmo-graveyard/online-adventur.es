if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'chai',
	'mocha',
	'boringrpg/lib/static-data/model/model_loader'
], function(chai, mocha, FUT) {
	'use strict';

	var expect = chai.expect;

	describe('Static Model Loader', function() {
		var TestModel, raw_data;

		beforeEach(function () {
			sinon.spy(console, 'error');
		});
		afterEach(function () {
			console.error.restore();
		});

		beforeEach(function() {
			// constructor
			TestModel = function TestModel(data) {
				data = data || {};
				if (! data.limit) throw 'Invalid TestModel !';
				_.defaults(this, data);
			};
			TestModel.create = function(data) {
				return new TestModel(data);
			};
		});

		context('on basic data without i18n', function () {
			var data;
			beforeEach(function() {
				raw_data = {
					foo: {
						limit: 33
					},
					bar: {
						limit: 42
					},
					baz: {
						// invalid : no "limit"
					},
					_commented: {
						limit: -1
					}
				};

				data = FUT(TestModel, raw_data);
			});

			it('should return an array of instances', function () {
				expect(data.all).to.have.length(2);
				expect(data.all[0], '0').to.be.an.instanceOf(TestModel);
				expect(data.all[0], '0').to.deep.equal({
					id: 'foo',
					limit: 33
				});
				expect(data.all[1], '1').to.be.an.instanceOf(TestModel);
				expect(data.all[1], '1').to.deep.equal({
					id: 'bar',
					limit: 42
				});
			});

			it('should return a hash by id', function () {
				expect(data).to.have.property('by_id');
				expect(data.by_id).to.deep.equal({
					foo: {
						id: 'foo',
						limit: 33
					},
					bar: {
						id: 'bar',
						limit: 42
					}
				});
			});

			it('should filter out commented entries', function () {
				expect(data.all).to.have.length(2);
				expect(data.by_id).to.not.have.property('_commented');
			});

			it('should filter out invalid entries', function () {
				expect(console.error).to.have.been.calledWith('Static data model "baz" was rejected at instantiation !');
			});
		});

		context('on data with i18n informations', function () {
			var data;

			beforeEach(function() {
				raw_data = {
					foo: {
						limit: 33
					},
					bar: {
						limit: 42
					},
					baz: {
						limit: 99
					},
					_commented: {
						limit: -1
					}
				};

				data = FUT(TestModel, raw_data, {
					msg_radix: 'testmsg_',
					i18n_messages: {
						testmsg_foo: 'Fou',
						// no entry for bar !
						testmsg_baz: 'Base',
						// an extra entry
						testmsg_gloups: 'Gnokman'
					}
				});
			});

			it('should return an array of instances, enriched with i18n info', function () {
				expect(data.all[0], '0').to.deep.equal({
					id: 'foo',
					limit: 33,
					msg_id: 'testmsg_foo'
				});
				expect(data.all[1], '1').to.deep.equal({
					id: 'baz',
					limit: 99,
					msg_id: 'testmsg_baz'
				});
			});

			it('should validate i18n messages against available messages', function () {
				expect(data.all).to.have.length(2); // and not 3
				expect(data.all[0].id, '0').to.not.equal('bar');
				expect(data.all[1].id, '1').to.not.equal('bar');
				expect(console.error).to.have.been
					.calledWith('Static data declare model "testmsg_bar" which has no i18n entry !');
				expect(console.error).to.have.been
					.calledWith('i18n messages reference model "testmsg_gloups" which is not declared in static data !');
			});
		});

	});
});

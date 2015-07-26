var path = require('path');
var easyconf = require('./easyconf');

describe('easyconf', function () {

	describe('creation', function () {

	});

	describe('read', function () {

		describe('get()', function () {

			describe('with no key', function () {

				it('should work on an empty config', function () {
					var config = easyconf.create();

					expect(config.get()).to.deep.equal({});
				});

				it('should return the whole aggregated config', function () {
					var config = easyconf.create()
						.add({
							foo: 42
						});

					//console.log(config._aggregated);
					expect(config.get()).to.deep.equal({
						foo: 42
					});
				});

			});

			describe('with a simple key', function () {

				it('should work on an empty config', function () {
					var config = easyconf.create();

					expect(config.get('foo')).to.be.undefined;
				});

				it('should correctly access an initialized entry', function () {
					var config = easyconf.create()
						.add({
							foo: 42
						});

					//console.log(config._aggregated);
					expect(config.get('foo')).to.equal(42);
				});

				it('should correctly access an uninitialized entry', function () {
					var config = easyconf.create()
						.add({
							foo: 42
						});

					expect(config.get('bar')).to.be.undefined;
				});

			});

			describe('with a deep key', function () {

				it('should work on an empty config', function () {
					var config = easyconf.create();

					expect(config.get('foo:bar:baz')).to.be.undefined;
				});

				it('should correctly access an initialized entry', function () {
					var config = easyconf.create()
						.add({
							foo: {
								bar: {
									baz: 33
								}
							}
						});

					expect(config.get('foo:bar:baz')).to.equal(33);
				});

				it('should correctly access an uninitialized entry', function () {
					var config = easyconf.create()
						.add({
							foo: {}
						});

					expect(config.get('foo:bar:baz')).to.be.undefined;
				});

			});

		});

	});

	describe('write', function () {

		describe('add()', function () {

			describe('with objects', function () {

				it('should accept an object', function () {
					var test_data = {
						foo: {
							bar: 42
						}
					};
					var config = easyconf
						.create()
						.add(test_data);

					expect(config.get()).to.deep.equal(test_data);

					expect(config.get('foo')).to.deep.equal(test_data.foo);
					expect(config.get('foo')).to.not.equal(test_data.foo); // not the same object, was copied
				});

				it('should accept another instance of easyconfig', function () {
					var test_data = {
						foo: {
							bar: 42
						}
					};

					var config_parent = easyconf
						.create()
						.add(test_data);

					var config_child = easyconf
						.create()
						.add(config_parent);

					expect(config_child.get()).to.deep.equal(test_data);
				});

				it('should import stores 1 by 1 when accepting another instance of easyconfig', function () {
					var test_data = {
						foo: {
							bar: 42
						}
					};
					var test_data2 = {
						foo: {
							bar: 33
						}
					};

					var config_parent = easyconf
						.create()
						.add(test_data)
						.add('../tests/fixtures/case01_oldschool/config.json');

					var config_child = easyconf
						.create()
						.add(config_parent)
						.add(test_data2);

					expect(config_child.get()).to.deep.equal({
						foo: {
							bar: 33
						},
						"defaultUrl": {
							"port": 9101,
							"protocol": "http",
							"hostname": "localhost"
						}
					});

					// inspect internals
					expect(config_child._stores).to.have.length(3);
					expect(config_child._stores[0]).to.deep.equal(config_parent._stores[0]);
					expect(config_child._stores[1]).to.deep.equal(config_parent._stores[1]);
				});
			});

			describe('with files', function () {

				describe('with config as .json', function () {

					it('should be able to load it with full path', function () {
						var config = easyconf
							.create()
							.add(path.join(
								__dirname,
								'../tests/fixtures/case01_oldschool/config.json'
							));

						expect(config.get()).to.deep.equal({
							"defaultUrl": {
								"port": 9101,
								"protocol": "http",
								"hostname": "localhost"
							}
						});
					});

					it('should be able to load it with relative path', function () {
						var config = easyconf
							.create()
							.add('../tests/fixtures/case01_oldschool/config.json');

						expect(config.get()).to.deep.equal({
							"defaultUrl": {
								"port": 9101,
								"protocol": "http",
								"hostname": "localhost"
							}
						});
					});

					it('should be able to load it with a env+local pattern - case 1 "production"', function () {
						var config = easyconf
							.create()
							.add({
								env: 'production'
							})
							.add('../tests/fixtures/case01_oldschool/config.json', {pattern: 'env+local'});

						expect(config.get()).to.deep.equal({
							env: 'production',
							"defaultUrl": {
								"port": 9101,
								"protocol": "https",
								"hostname": "acme.eu"
							}
						});
					});

					it('should be able to load it with a env+local pattern - case 2 "development"', function () {
						var config = easyconf
							.create()
							.add({
								env: 'development'
							})
							.add('../tests/fixtures/case01_oldschool/config.json', {pattern: 'env+local'});

						expect(config.get()).to.deep.equal({
							env: 'development',
							"defaultUrl": {
								"port": 8101,
								"protocol": "http",
								"hostname": "192.168.3.1"
							}
						});
					});
				});

				describe('with config as a node module', function () {
					it('should be able to load it with full path', function () {
						var config = easyconf
							.create()
							.add(path.join(
								__dirname,
								'../tests/fixtures/case02_js_node/config.js'
							));

						expect(config.get()).to.deep.equal({
							"defaultUrl": {
								"port": 9101,
								"protocol": "http",
								"hostname": "localhost"
							}
						});
					});

					it('should be able to load it with relative path', function () {
						var config = easyconf
							.create()
							.add('../tests/fixtures/case02_js_node/config.js');

						expect(config.get()).to.deep.equal({
							"defaultUrl": {
								"port": 9101,
								"protocol": "http",
								"hostname": "localhost"
							}
						});
					});

					it.skip('should recognize an exported easyconf and add it as such', function () {
						// TODO
					});
				});

				describe('with config as an AMD module', function () {
					it('should be able to load it with full path', function () {
						var config = easyconf
							.create()
							.add(path.join(
								__dirname,
								'../tests/fixtures/case03_js_amd/config.js'
							));

						expect(config.get()).to.deep.equal({
							"defaultUrl": {
								"port": 9101,
								"protocol": "http",
								"hostname": "localhost"
							}
						});
					});

					it('should be able to load it with relative path', function () {
						var config = easyconf
							.create()
							.add('../tests/fixtures/case03_js_amd/config.js');

						expect(config.get()).to.deep.equal({
							"defaultUrl": {
								"port": 9101,
								"protocol": "http",
								"hostname": "localhost"
							}
						});
					});
				});

				describe('with environmentalist spec file', function () {
					it('should be able to load it with full path', function () {
						var config = easyconf
							.create()
							.add(path.join(
								__dirname,
								'../tests/fixtures/environmentalist_ok/environmentalist.json'
							));

						expect(config.get()).to.deep.equal({
							FOO_API_KEY: '27A13', //< NOTE : should have been set as an env var before calling ths test file ! (see npm test)
							NODE_ENV: 'development',
							env: 'development' // alias of NODE_ENV
						});
					});

					it('should be able to load it with relative path', function () {
						var config = easyconf
							.create()
							.add('../tests/fixtures/environmentalist_ok/environmentalist.json');

						expect(config.get()).to.deep.equal({
							FOO_API_KEY: '27A13', //< NOTE : should have been set as an env var before calling ths test file ! (see npm test)
							NODE_ENV: 'development',
							env: 'development' // alias of NODE_ENV
						});
					});

					it('should report missing env vars and throw', function () {
						function test_expression () {
							var config = easyconf
								.create()
								.add('../tests/fixtures/environmentalist_nok/environmentalist.json');
						}

						expect(test_expression).to.throw('easyconf : Missing required env vars !');
					});

					it('should report missing env vars but not throw if asked not to', function () {
						function test_expression () {
							var config = easyconf
								.create()
								.add('../tests/fixtures/environmentalist_nok/environmentalist.json', {nothrow: true});
						}

						expect(test_expression).to.not.throw;
					});

				});
			});

		});
	});

});
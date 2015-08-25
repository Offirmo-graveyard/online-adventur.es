var path = require('path');
var Store = require('./store');

describe('easyconf store', function () {

	var nominal_cases = [

		// direct object
		{
			title: 'an object',
			source: {
				foo: {
					bar: 42
				}
			},
			options: undefined,
			expected_data: {
				foo: {
					bar: 42
				}
			},
			expected_description: 'direct data'
		},

		// json file
		{
			title: 'a .json file referenced by absolute path',
			source: path.join(__dirname, '../tests/fixtures/case01_oldschool/config.json'),
			options: undefined,
			expected_data: {
				"defaultUrl": {
					"port": 9101,
					"protocol": "http",
					"hostname": "localhost"
				}
			},
			expected_description: 'direct file'
		},
		{
			title: 'a .json file referenced by relative path',
			source: '../tests/fixtures/case01_oldschool/config.json',
			options: undefined,
			expected_data: {
				"defaultUrl": {
					"port": 9101,
					"protocol": "http",
					"hostname": "localhost"
				}
			},
			expected_description: 'direct file'
		},

		// config as a node module
		{
			title: 'a node module referenced by absolute path',
			source: path.join(__dirname, '../tests/fixtures/case02_js_node/config.js'),
			options: undefined,
			expected_data: {
				"defaultUrl": {
					"port": 9101,
					"protocol": "http",
					"hostname": "localhost"
				}
			},
			expected_description: 'direct file'
		},
		{
			title: 'a node module referenced by relative path',
			source: '../tests/fixtures/case02_js_node/config.js',
			options: undefined,
			expected_data: {
				"defaultUrl": {
					"port": 9101,
					"protocol": "http",
					"hostname": "localhost"
				}
			},
			expected_description: 'direct file'
		},

		// config as a AMD module
		{
			title: 'an AMD module referenced by absolute path',
			source: path.join(__dirname, '../tests/fixtures/case03_js_amd/config.js'),
			options: undefined,
			expected_data: {
				"defaultUrl": {
					"port": 9101,
					"protocol": "http",
					"hostname": "localhost"
				}
			},
			expected_description: 'direct file'
		},
		{
			title: 'an AMD module referenced by relative path',
			source: '../tests/fixtures/case03_js_amd/config.js',
			options: undefined,
			expected_data: {
				"defaultUrl": {
					"port": 9101,
					"protocol": "http",
					"hostname": "localhost"
				}
			},
			expected_description: 'direct file'
		},

		// environmentalist spec file
		{
			title: 'an environmentalist spec file referenced by absolute path',
			source: path.join(__dirname, '../tests/fixtures/environmentalist_ok/environmentalist.json'),
			options: undefined,
			expected_data: {
				FOO_API_KEY: '27A13', //< NOTE : should have been set as an env var before calling ths test file ! (see npm test)
				NODE_ENV: undefined,
				env: undefined // alias of NODE_ENV
			},
			expected_description: 'environmentalist spec and corresponding env vars'
		},
		{
			title: 'an environmentalist spec file referenced by relative path',
			source: '../tests/fixtures/environmentalist_ok/environmentalist.json',
			options: undefined,
			expected_data: {
				FOO_API_KEY: '27A13', //< NOTE : should have been set as an env var before calling ths test file ! (see npm test)
				NODE_ENV: undefined,
				env: undefined // alias of NODE_ENV
			},
			expected_description: 'environmentalist spec and corresponding env vars'
		},
	];

	nominal_cases.forEach(function(testcase) {

		describe('with ' + testcase.title, function () {
			it('should handle it', function () {
				var store = new Store(testcase.source, testcase.options);

				expect(store.data, 'data').to.deep.equal(testcase.expected_data);
				expect(store.description, 'description').to.deep.equal(testcase.expected_description);
			});

			it('should be clonable', function () {
				var parent_store = new Store(testcase.source, testcase.options);
				var store = new Store(parent_store);

				expect(store.data).to.deep.equal(testcase.expected_data);
				expect(store.description).to.deep.equal(testcase.expected_description);
			});
		});

	});


	describe('with environmentalist spec file', function () {

		it('should report missing env vars and throw', function () {
			function test_expression () {
				var store = new Store('../tests/fixtures/environmentalist_nok/environmentalist.json');
			}

			expect(test_expression).to.throw('easyconf store : Missing required env vars !');
		});

		/*it('should report missing env vars but not throw if asked not to', function () {
			function test_expression () {
				var store = new Store(
					'../tests/fixtures/environmentalist_nok/environmentalist.json',
					{ nothrow: true }
				);
			}

			expect(test_expression).to.not.throw;
		});*/

	});

/*

	describe('with files', function () {

		describe('with config as .json', function () {

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


*/

});

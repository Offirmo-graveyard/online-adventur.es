Hierarchical configuration with files, environment variables, command-line arguments. Competitor to [nconf](https://github.com/indexzero/nconf)

Example
=======
Using easyconfig is, as you can guess, easy. Just add key/values,
and each one takes precedence over the previous one (deep extend).

```javascript
var easyconf = require('easyconf');

var config =
	easyconf.create()
	.add({
		env: 'defaults',
		database: {
			host: 'localhost',
			port: 1234
		}
	})
	.add({
		env: 'prod',
		database: {
			host: 'database.foo.io',
		}
	});
	
console.log(config.get()); ->>
	{
		env: 'prod',
		database: {
			host: 'database.foo.io',
			port: 1234
		}
	}
```

Of course there is syntactic sugar 
Real story
- duplicate
- comments
- nconf not clear
- allow relative file (avoid path manipulations)


1. allow to use .js for storing data (allows comments and linting)
2. keep config simple
3. extend / default
4. no surprise
5. auto-extend env vars


var easyconf = require('easyconf');

var config = easyconf.create()

	// parent
	.add('../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'})

	// env vars
	.add('../../../environmentalist.json')

	// args
	.add('../../../environmentalist.json');


module.exports = config.get(); // endpoint config : exports the raw data


create_config().extending(require(…)).with(…)


'use strict';

// TODO

priority
fallbacks

inherits
env
locale
local




default to development

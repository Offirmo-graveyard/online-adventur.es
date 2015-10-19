Hierarchical configuration for modern node.js apps. Load from files, environment variables, command-line arguments. Replacement to [nconf](https://github.com/indexzero/nconf)

Use case
========

1. (node do it automatically)
2. `easyconf.dotenv.load()` (easyconf.dotenv being equal to `require('dotenv');`, see [motdotla/dotenv](https://github.com/motdotla/dotenv))
3. easyconf does it in 2 ways :
  * automatically by replacing %MY_ENV_VAR% by its value in config keys. Can be disabled.
  * semi-automatically by turning NODE_8
4. XXX easyconf
5. XXX easyconf
6. `require('config');`


Usage
=======
Using easyconfig is, as you can guess, easy. Just add key/values,
and each one takes precedence over the previous one (deep extend).

```javascript
var easyconf = require('easyconf');

var config = easyconf
	.create()
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

Of course there is syntactic sugar for files :

```javascript
var easyconf = require('easyconf');

var config = easyconf
	.create()
	.add({
		...
	})
	.add('../config/config.json')
	.add('../config/config.production.json');
```


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

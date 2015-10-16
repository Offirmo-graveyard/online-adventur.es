Easy config.

Real story
- duplicate
- comments
- nconf not clear
- allow relative file (avoid path manipulations)


1. use .js for storing data (comments, linting)
2. keep config simple
3. extend / default
4. no surprise
5. auto-extend env vars


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

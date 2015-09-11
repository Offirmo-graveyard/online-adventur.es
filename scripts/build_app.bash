#! /bin/bash
set -e

echo "* starting app building process for $1..."

## require.js optimizer
./node_modules/.bin/r.js -o client/apps/$1/requirejs-build-config.js paths.requireLib=bower_components/requirejs/require include=requireLib

## fix badly working require-css require plugin
## https://github.com/guybedford/require-css/issues/189#issuecomment-139615291
sed -i 's/"css!/"bower_components\/require-css\/css!/g' client/apps/$1/all_js.concat+min.js

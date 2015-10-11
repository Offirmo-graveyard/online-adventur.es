#! /bin/bash

## http://stackoverflow.com/a/19622569/587407
set -e
trap 'exit' ERR

echo "* starting app building process for app $1... [$0]"

## require.js optimizer
./node_modules/.bin/r.js -o client/apps/$1/requirejs-build-config.js paths.requireLib=bower_components/requirejs/require include=requireLib

## fix badly working require-css require plugin
## https://github.com/guybedford/require-css/issues/189#issuecomment-139615291
#sed -i 's/"css!/"bower_components\/require-css\/css!/g' client/apps/$1/all_js.concat+min.js
sed -i 's/"css!/"bower_components\/require-css\/css!/g' client/apps-minified/$1/all_js.concat+min.js

#! /bin/bash
set -e

echo "* Updating versions... [$0]"

PACKAGE_VERSION=$(cat package.json \
  | grep \"version\" \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

echo "* current version is '${PACKAGE_VERSION}'"

## debug command :
## cat client/common/views/splash/elements.dust | grep version | sed ...
sed -i "s/\(<span class=\"version\">v\)[0-9\.]*\(<\/span>\)/\1${PACKAGE_VERSION}\2/" client/common/views/splash/elements.dust
## debug command :
## cat client/common/requirejs-config.js | grep version | sed ...
sed -i "s/\(version\: 'v\)[0-9\.]*\(',\)/\1${PACKAGE_VERSION}\2/" client/common/requirejs-config.js


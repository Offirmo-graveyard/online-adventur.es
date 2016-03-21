#! /bin/bash

## http://stackoverflow.com/a/19622569/587407
trap 'exit' ERR

echo "* Updating versions... [$0]"

PACKAGE_VERSION=$(cat package.json \
  | grep \"version\" \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

echo "* current version is '${PACKAGE_VERSION}'"

## debug command :
## cat client/common/views/splash/elements.dust | grep version | sed ...
echo "* updating loader template..."
sed -i "s/\(<span class=\"version\">v\)[0-9\.]*\(<\/span>\)/\1${PACKAGE_VERSION}\2/" client/common/views/splash/elements.dust

## debug command :
## cat client/common/requirejs-config.js | grep version | sed ...
echo "* updating require.js config..."
sed -i "s/\(version\: 'v\)[0-9\.]*\(',\)/\1${PACKAGE_VERSION}\2/" client/common/config/config.js

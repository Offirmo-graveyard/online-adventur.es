#! /bin/bash
set -e

echo "* Updating manifest version for app $1... [$0]"

PACKAGE_VERSION=$(cat package.json \
  | grep \"version\" \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

echo "* current version is '${PACKAGE_VERSION}'"

## debug command :
## cat client/apps/jeudunombre/manifest.appcache | grep version | sed "s/\()[0-9\.]*/"
sed -i "s/\(#version \)[0-9\.]*/\1${PACKAGE_VERSION}/" client/apps/$1/manifest.appcache

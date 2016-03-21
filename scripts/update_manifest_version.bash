#! /bin/bash

## http://stackoverflow.com/a/19622569/587407
trap 'exit' ERR

echo "* Updating manifest version for app $1... [$0]"

PACKAGE_VERSION=$(cat package.json \
  | grep \"version\" \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

## debug command :
## cat client/apps/jeudunombre/manifest.appcache | grep version | sed "s/\()[0-9\.]*/"
sed -i "s/\(#version \)[0-9\.]*/\1${PACKAGE_VERSION}/" client/apps/$1/manifest.appcache

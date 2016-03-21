#! /bin/bash

## This script bump a new version of the full online adventures app :
## - update versions in several files
## - minification (of important apps only)

## http://stackoverflow.com/a/19622569/587407
trap 'exit' ERR

echo "* Starting pre-update checks... [$0]"

if [[ -n $(git status --porcelain) ]]; then
    echo -en "\n\nXXX PLEASE COMMIT YOUR CHANGES FIRST !!!\n\n"
    git status
    echo -en "\n\n"
    #exit 1
fi

./scripts/update_common_versions.bash

./scripts/build_app.bash boringrpg
./scripts/update_manifest_version.bash boringrpg

./scripts/build_app.bash jeudunombre
./scripts/update_manifest_version.bash jeudunombre

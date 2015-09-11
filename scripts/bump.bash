#! /bin/bash
set -e

echo "* Starting pre-update checks... [$0]"

if [[ -n $(git status --porcelain) ]]; then
    echo -en "\n\nXXX PLEASE COMMIT YOUR CHANGES FIRST !!!\n\n"
    git status
    echo -en "\n\n"
    exit 1
fi

./scripts/update_versions.bash

./scripts/build_app.bash boringrpg
./scripts/build_app.bash jeudunombre

exit 0

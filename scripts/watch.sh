#!/bin/bash

# CWD=$(dirname "$0")
# scriptText="Watching webpack build..."

# if [ "$1" = "prod" ]
# then
#     bash $CWD/echo-step.sh "$scriptText" prod
#     NODE_ENV=prod node_modules/.bin/webpack --progress --watch
# else
    # bash $CWD/echo-step.sh "$scriptText" dev
    NODE_ENV=dev node_modules/.bin/webpack -d --progress --watch
# fi

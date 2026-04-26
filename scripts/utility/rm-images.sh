#!/usr/bin/env sh

set -eu

images="$(docker images -aq)"

if [ -z "$images" ]; then
  echo "No Docker images found."
  exit 0
fi

docker rmi -f $images

#!/usr/bin/env sh

set -eu

containers="$(docker ps -aq)"

if [ -z "$containers" ]; then
  echo "No Docker containers found."
  exit 0
fi

docker rm -f $containers

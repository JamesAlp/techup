#!/usr/bin/env sh

set -eu

containers="$(docker ps -aq)"

if [ -n "$containers" ]; then
  docker rm -f $containers
else
  echo "No Docker containers found."
fi

volumes="$(docker volume ls -q)"

if [ -n "$volumes" ]; then
  docker volume rm $volumes
else
  echo "No Docker volumes found."
fi

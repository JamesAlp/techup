#!/usr/bin/env sh

set -eu

volumes="$(docker volume ls -q)"

if [ -z "$volumes" ]; then
  echo "No Docker volumes found."
  exit 0
fi

docker volume rm $volumes

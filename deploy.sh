#!/bin/bash
git pull
docker compose down --rmi all --remove-orphans
docker compose up -d
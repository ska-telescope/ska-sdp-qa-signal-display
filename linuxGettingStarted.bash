#!/bin/bash

set -x

docker-compose up -d --build --remove-orphans
docker-compose ps

## install the dependencies
npm install

## Linux/MAC
#Todo: some work to verify port not in use, alternately run a command that can give us a port thats available
export NODE_ENV=development && export PORT=3000 # UI port no
export REACT_APP_API=http://localhost:8002      # QA data API
export REACT_APP_WS=ws://localhost:8002/ws      # QA data API websocket

## run the app in development mode.
npm start &



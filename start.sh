#!/bin/bash

npm install

export NODE_ENV=development && export PORT=3000 # UI port no
export REACT_APP_API=http://localhost:8002      # QA data API
export REACT_APP_WS=ws://localhost:8002/ws      # QA data API websocket

npm start &



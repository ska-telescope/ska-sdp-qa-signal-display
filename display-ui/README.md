# About

- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Using react material dashboard style

# Development

## Run locally without container

Install the dependencies.

```bash
npm install
```

Run the app in development mode.

```bash
export NODE_ENV=development && export PORT=3000 # Any port no. should work
export REACT_APP_API=http://localhost:8002      # For display API
export REACT_APP_WS=ws://localhost:8002/ws      # For display API websocket

npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run locally without container

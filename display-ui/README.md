# Display UI

Here, we will describe how to develop and debug this code.

# Development & Debugging

The docker container's working/source directory `/usr/src/display-ui` is mapped/mounted to the host's `./display-ui` folder. Open the local `./display-ui` folder in VSCode.

Before starting the container comment the production build commands and uncomment the local startup commands in the `Dockerfile` (see below). **TODO** this step need to be refactored and automated.

```bash
## production build and start
# RUN npm run build
# RUN npm install -g serve
# CMD ["serve", "-s", "build", "-l", "3000"]

## start development server without building
RUN npm install -g create-react-app
CMD ["npm", "start"]
```

During development and debugging, the `react-scripts` will automatically reload the changes. Open [http://localhost:3000](http://localhost:3000) to view the UI in the browser, and use a Chrome debugger to debug.

> Note: follow the instructions below to develop and debug in the host machine.

Required

- Node.js 14+

```bash
## install the dependencies.
npm install

## setup environement variables
export NODE_ENV=development && export PORT=3000 # Any port no. should work
export REACT_APP_API=http://localhost:8002      # For display API
export REACT_APP_WS=ws://localhost:8002/ws      # For display API websocket

# run the app in development mode.
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the UI in a browser.

# References

- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Using react material dashboard style

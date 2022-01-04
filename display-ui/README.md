# QA Display UI

Here, we will describe how to develop and debug this code.

## Development & Debugging

The docker container's working/source directory `/usr/src/display-ui` is mapped/mounted to the host's `./display-ui` folder. Open the local `./display-ui` folder in VSCode.

During development and debugging, the `react-scripts` will automatically reload the changes. Open [http://localhost:3000](http://localhost:3000) to view the UI in the browser, and use a Chrome debugger to debug.

### Additional Instructions

Follow the instructions below to start the React app in your host machine.

```bash
## required Node.js 14+

## install the dependencies
npm install

## setup environement variables
export NODE_ENV=development && export PORT=3000 # UI port no
export REACT_APP_API=http://localhost:8002      # QA data API
export REACT_APP_WS=ws://localhost:8002/ws      # QA data API websocket

## run the app in development mode.
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the UI in a browser.

## Production Deployment

In production, before starting the container set environment variable in the `docker-compose-sig.yml` file.

```bash
- REACT_APP_ENV=production
```

> **TODO**
>
> - The source code was developed as a proof of concept. Therefore,the code may require improvement for production release.
> - Use advances build tool system for production.
> - This step need to be refactored and automated.

# References / Notes

- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Using react material dashboard style

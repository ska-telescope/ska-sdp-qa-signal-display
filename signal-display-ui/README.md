# signal-display-ui

## Requirements
- React
- npm

## Setting up

Install the dependencies:

```
npm install
```

## Running the Project in Development

The configuration variables (below) should be defined in `.env`. An example development configuration:

```bash
REACT_APP_WS_URL=ws://localhost:8002
```
> All variable name should be prefixed with `REACT_APP_`

Start the UI server:

``` 
npm start

# to access form local network use --host 0.0.0.0 
```

Open the browser in `localhost:3000` and you must see a chart being updated every second.

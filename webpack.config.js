const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const deps = require('./package.json').dependencies;

module.exports = () => { 
  return {
  // mode: This is set by usin '--mode development'.  'production' is the default.
  entry: "./src/index.tsx",

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },
  devServer: {
    port: 3333,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss|\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        type: "javascript/esm",
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
              '@babel/preset-env',
              ["@babel/preset-react", {
                "runtime": "automatic"
              }]],
              plugins: ['@babel/plugin-syntax-top-level-await'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                  "noEmit": false
              }
            }
          }
        ]
      },
      { 
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader" }
    ]
  },


  devtool: "source-map",

  plugins: [
    new ModuleFederationPlugin({
      name: 'qaMetrics',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './qaMetrics': './src/App/App.tsx'
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps['react']
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-dom']
        },
        'react-helmet': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-helmet']
        }
        ,
        'prop-types': {
          eager: true,
          singleton: true,
          requiredVersion: deps['prop-types']
        },
        '@emotion/react': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@emotion/react']
        },
        '@emotion/cache': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@emotion/cache']
        },
        '@mui/material': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@mui/material']
        },
        '@ska-telescope/ska-javascript-components': {
          requiredVersion: 'auto',
          eager: true
        },
        '@emotion/styled': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@emotion/styled']
        },
        'd3': {
          eager: true,
          singleton: true,
          requiredVersion: deps['d3']
        }
      }
    }),
    new HtmlWebPackPlugin({
      inject: true,
      template: './public/index.html'
    }),
    new webpack.EnvironmentPlugin({
      REACT_APP_WS_API: 'ws://localhost:8002/consumer',
      REACT_APP_MESSAGE_TYPE: 'json',
      REACT_APP_SWITCH_D3_IMAGE_CREATION_ON_OFF: 'off',
      REACT_APP_DATA_API_URL: 'http://localhost:8002',
      REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS: 10,
      SKIP_PREFLIGHT_CHECK: true
    }),
    new webpack.DefinePlugin({
      process: {env: {}}
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
              from: 'public',
              globOptions: {
                dot: true,
                gitignore: true,
                ignore: ["**/*.html"],
              },
            }
        ]
    })
  ]
};};

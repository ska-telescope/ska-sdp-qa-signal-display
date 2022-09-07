const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  entry: "./src/index.tsx",
  mode: "none",
  output: {
    publicPath: 'http://localhost:3000/'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },

  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  experiments: {
    topLevelAwait: true
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
            loader: 'ts-loader'
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    })
  ]
};

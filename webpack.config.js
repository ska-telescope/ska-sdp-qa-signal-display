const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const deps = require('./package.json').dependencies;

module.exports = () => {
  return {
    mode: 'development',
    entry: "./src/index.tsx",

    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@utils': path.resolve(__dirname, 'src/utils')
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
       ".js": [".js", ".ts"],
       ".cjs": [".cjs", ".cts"],
       ".mjs": [".mjs", ".mts"]
      }
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
          test: /\.m?js|\.jsx/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },

    devtool: 'source-map',

    plugins: [
      new ModuleFederationPlugin({
        name: 'signalMetrics',
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          './signalMetrics': './src/components/Container/Container.tsx'
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
          // i18n
          i18next: {
            eager: true,
            singleton: true,
            requiredVersion: deps.i18next
          },
          'react-i18next': {
            eager: true,
            singleton: true,
            requiredVersion: deps['react-i18next']
          },
          'i18next-browser-languagedetector': {
            eager: true,
            singleton: true,
            requiredVersion: deps['i18next-browser-languagedetector']
          },
          'i18next-http-backend': {
            eager: true,
            singleton: true,
            requiredVersion: deps['i18next-http-backend']
          },
          // Material-UI
          '@mui/material': { eager: true, singleton: true,  requiredVersion: deps['@mui/material'] },
          '@mui/icons-material': { eager: true, singleton: true, requiredVersion: deps['@mui/icons-material'] },
          // Redux
          'react-redux': { singleton: true, requiredVersion: deps['react-redux'], eager: true },
          'redux': { singleton: true, requiredVersion: deps['redux'], eager: true },
          '@reduxjs/toolkit': { singleton: true, requiredVersion: deps['@reduxjs/toolkit'], eager: true },
          // SKAO components
          '@ska-telescope/ska-gui-components': {
            requiredVersion: deps['@ska-telescope/ska-gui-components'],
            eager: true
          },
          '@ska-telescope/ska-gui-local-storage': {
            requiredVersion: deps['@ska-telescope/ska-gui-local-storage'],
            eager: true
          },
          // mixture
          'react-plotly.js': { singleton: true, requiredVersion: deps['react-plotly.js'], eager: true },
          '@emotion/react': { singleton: true, requiredVersion: deps['@emotion/react'], eager: true },
          '@emotion/styled': { singleton: true, requiredVersion: deps['@emotion/styled'], eager: true },
          '@msgpack/msgpack': { singleton: true, requiredVersion: deps['@msgpack/msgpack'], eager: true },
          // MS Entra components
          '@azure/msal-browser': {
            requiredVersion: deps['@azure/msal-browser'],
            singleton: true,
            eager: true
          },
          '@azure/msal-react': {
            requiredVersion: deps['@azure/msal-react'],
            singleton: true,
            eager: true
          },
          moment: {
            eager: true,
            singleton: true,
            requiredVersion: deps.moment
          }
        }
      }),
      new HtmlWebPackPlugin({
        template: './public/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: 'dist',
            globOptions: {
              dot: true,
              gitignore: true,
              ignore: ['**/*.html'],
            },
          },
        ],
      }),
      new Dotenv({
        path: '.env',
      }),
    ]
  };
};

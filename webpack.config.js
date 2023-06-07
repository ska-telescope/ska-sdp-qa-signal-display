const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

module.exports = () => {
  return {
    entry: './src/index.tsx',
    output: {},

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },

    resolve: {
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
        name: 'reactSkeleton',
        filename: 'remoteEntry.js',
        remotes: {
          counterStore: 'counterStore@http://localhost:8094/remoteEntry.js'
        },
        exposes: {
          './signalMetrics': './src/Components/Container/Container.tsx'
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
          // mixture
          'react-plotly.js': { singleton: true, requiredVersion: deps['react-plotly.js'], eager: true },
          '@emotion/react': { singleton: true, requiredVersion: deps['@emotion/react'], eager: true },
          '@emotion/styled': { singleton: true, requiredVersion: deps['@emotion/styled'], eager: true },
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
      new webpack.EnvironmentPlugin({
        REACT_APP_WS_API: 'ws://localhost:8002/consumer',
        REACT_APP_MESSAGE_TYPE: 'json',
        REACT_APP_DATA_API_URL: 'http://localhost:8002',
        REACT_APP_WORKFLOW_INTERVAL_SECONDS: 60,
        REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS: 10,
        REACT_APP_DASHBOARD_URL_SUBDIRECTORY: '',
        REACT_USE_LOCAL_DATA: false,  // Ensure set to false for production
        SKIP_PREFLIGHT_CHECK: true
      })
    ]
  };
};

const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

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
        test: /\.s[ac]ss|\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
              '@babel/preset-env',
              '@babel/preset-react'],
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
      name: 'skeleton',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
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
      'process.env.REACT_APP_WS_API': JSON.stringify(process.env.REACT_APP_WS_API),
      'process.env.REACT_APP_MESSAGE_TYPE': JSON.stringify(process.env.REACT_APP_MESSAGE_TYPE),
      'process.env.REACT_APP_SWITCH_D3_IMAGE_CREATION_ON_OFF': JSON.stringify(process.env.REACT_APP_SWITCH_D3_IMAGE_CREATION_ON_OFF),
      'process.env.REACT_APP_DATA_API_URL': JSON.stringify(process.env.REACT_APP_DATA_API_URL),
      'process.env.REACT_APP_WORKFLOW_INTERVAL_SECONDS': JSON.stringify(process.env.REACT_APP_WORKFLOW_INTERVAL_SECONDS),
      'process.env.REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS': JSON.stringify(process.env.REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS)
    })
  ]
};

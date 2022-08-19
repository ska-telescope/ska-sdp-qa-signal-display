const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

module.exports = {
  entry: "./src/pages/_app.tsx",
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
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      { 
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader" }
    ]
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },

  devtool: "source-map",

  plugins: [
    new ModuleFederationPlugin({
      name: 'skeleton',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './_app.tsx': './src/pages/_app.tsx'
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
        moment: {
          eager: true,
          singleton: true,
          requiredVersion: deps.moment
        }
      }
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html'
    })
  ]
};

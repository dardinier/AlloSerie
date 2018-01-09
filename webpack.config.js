const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS  = {
    app: path.join(__dirname, 'src/app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        app: path.join(PATHS.app, '/index.jsx')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|server)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [[
                'env',
                {
                  "targets": {
                    "chrome": 52
                  }
                }
              ], "react"]
            }
          }
        }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname)+'/index.ejs'
        })
    ]
}

if (process.env.NODE_ENV == 'dev') {
    module.exports = merge(common, {
        entry: [
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            PATHS.app
        ],
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        devtool: "eval-source-map",
        devServer: {
          contentBase: PATHS.build,
          compress: true,
          port: 9000
        }
    });
}

if (process.env.NODE_ENV == 'production') {
    module.exports = merge(common, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,
                },
                compress: {
                    // Ignore warning messages are they are pretty useless
                    warnings: false
                }
            })
        ],
        devtool: "source-map"
    });
}

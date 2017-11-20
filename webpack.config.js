const webpack = require('webpack')
const { resolve } = require('path')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { getIfUtils, removeEmpty } = require('webpack-config-utils')

const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV)

const extractCSS = new ExtractTextPlugin({
  filename: ifProduction('styles/style.css?v=[hash]', 'styles/style.css'),
  disable: false,
  allChunks: false
});
const extractVendorCSS = new ExtractTextPlugin({
  filename: ifProduction('styles/vendor.style.css?v=[hash]', 'styles/vendor.style.css'),
  disable: false,
  allChunks: true
});
const extractSCSS = new ExtractTextPlugin({
  filename: ifProduction('styles/bundle.css?v=[hash]', 'styles/bundle.css'),
  disable: false,
  allChunks: true
});

//* maybe CDN, localhost, or just absolute address in your repo, just make sure the browser can access it.
const antdIconUrl = '/assets/antd-fonts/iconfont';

//* don't forget the "" in the  '@icon-url'
const antdTheme = ifProduction({
  '@icon-url': `"${antdIconUrl}"`
}, {});

const baseConfig = {
  devtool: ifProduction('source-map', 'eval'),
  output: {
    path: resolve('build'),
    chunkFilename: ifProduction('scripts/[name]-[chunkhash].js', 'scripts/[name].js'),
    publicPath: '/'
  },
  resolve: {
    modules: [
      resolve('src'),
      resolve('public'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, 'src/'),
      Models: resolve(__dirname, 'src/redux/models'),
      Components: resolve(__dirname, 'src/components'),
      Containers: resolve(__dirname, 'src/containers'),
      Pages: resolve(__dirname, 'src/pages'),
      Utils: resolve(__dirname, 'src/utils'),
      Config: resolve(__dirname, 'src/config'),
      Assets: resolve(__dirname, 'src/assets'),
      Mixins: resolve(__dirname, 'src/mixins')
    }
  },
  stats: {
    colors: true,
    reasons: true,
    chucks: false
  },
  module: {
    rules: [
      {
        test: /node_modules[\\/]vis[\\/].*\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: extractSCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.less$/,
        loader: extractSCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: { modifyVars: antdTheme }
            }
          ]
        })
      },
      // 非 css module 模式的css文件
      {
        test: /\.css$/,
        include: [
          /node_modules/,
          resolve(__dirname, 'src/assets/css')
        ],
        exclude: /node_modules[\\/]vis[\\/].*\.css/,
        loader: extractVendorCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      // css module 模式的css文件
      {
        test: /\.css$/,
        include: /src/,
        exclude: [
          resolve(__dirname, 'src/assets/css')
        ],
        loader: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        // include: /public\/fonts/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(ico|png|jpg|svg|gif)$/,
        // include: /public\/img/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'img/[name].[ext]?v=[hash:base64:5]'
        }
      }
    ]
  },
  plugins: removeEmpty([
    ifNotProduction(new Visualizer()),
    new LodashModuleReplacementPlugin({
      collections: true,
      shorthands: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new FaviconsWebpackPlugin({
      logo: '../src/assets/img/favicon.ico',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new webpack.ExtendedAPIPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') }
    }),
    ifProduction(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
    ),
    ifProduction(
      new CopyWebpackPlugin([
        { from: './assets/antd-fonts/*', to: resolve(__dirname, './build') }
      ], {})
    ),
    extractVendorCSS,
    extractSCSS,
    extractCSS
  ])
}
const clientConfig = Object.assign({}, baseConfig, {
  context: resolve('src'),
  entry: {
    entry: './index.js',
    react: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-router-redux',
      'redux-actions',
      'redux-immutable',
      'redux-thunk'
    ],
    lib: [
      'lodash',
      'axios',
      'moment',
      'immutable'
    ]
  },
  output: Object.assign({}, baseConfig.output, {
    filename: ifProduction('scripts/[name]-[hash].js', 'scripts/[name].js')
  }),
  plugins: baseConfig.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      names: ['lib', 'react'],
      filename: ifProduction('scripts/[name]-[hash].js', 'scripts/[name].js')
    }),
    new CleanWebpackPlugin(['build'], {
      root: resolve('./'),
      verbose: true,
      compress: { warnings: false },
      output: { comments: false }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'index.html',
      minify: {
        collapseWhitespace: true
      },
      title: '万威士电控',
      appMountId: 'root',
      mobile: true
    })
  ]),
  devServer: {
    contentBase: './src',
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})

module.exports = clientConfig

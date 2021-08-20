/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {dependencies, federatedModuleName} = require("./package.json");
delete dependencies.serve; // Needed for nodeshift bug
const webpack = require('webpack');
const ChunkMapper = require('@redhat-cloud-services/frontend-components-config/chunk-mapper');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isPatternflyStyles = (stylesheet) => stylesheet.includes('@patternfly/react-styles/css/') || stylesheet.includes('@patternfly/react-core/');

module.exports = (env, argv) => {
  const isProduction = argv && argv.mode === 'production';
  return {
    entry: {
      app: path.resolve(__dirname, 'src/bootstrap', 'index.tsx')
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts|jsx)?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              }
            }
          ]
        },
        {
          test: /\.css|s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          include: (stylesheet => !isPatternflyStyles(stylesheet)),
          sideEffects: true,
        },
        {
          test: /\.css$/,
          include: isPatternflyStyles,
          use: ['null-loader'],
          sideEffects: true,
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              limit: 5000,
              name: isProduction ? '[contenthash:8].[ext]' : '[name].[ext]',
            }
          }
        },
        {
          test: /\.(svg|jpg|jpeg|png|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5000,
                name: isProduction ? '[contenthash:8].[ext]' : '[name].[ext]',
              }
            }
          ]
        }        
      ]
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: "auto"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/bootstrap', 'index.html')
      }),
      new Dotenv({
        systemvars: true,
        silent: true
      }),
      new CopyPlugin({
        patterns: [
          {from: './src/images', to: 'images'},
        ]
      }),     
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[contenthash:8].css'
      }),
      new ChunkMapper({
        modules: [
          federatedModuleName
        ]
      }),
      new webpack.container.ModuleFederationPlugin({
        name: federatedModuleName,
        filename: `${federatedModuleName}${isProduction ? '.[chunkhash:8]' : ''}.js`,
        exposes: {
            './KafkaMainView':'./src/modules/Topics/pages/MainView/MainViewFederated',
            './TopicDetails':'./src/modules/Topics/pages/TopicDetail/TopicDetailFederated',
            './CreateTopic': './src/modules/Topics/pages/CreateTopic/CreateTopicFederated',
            './UpdateTopic':'./src/modules/Topics/pages/UpdateTopic/UpdateTopicFederated',
          }, 
        shared: {
          ...dependencies,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
          "@bf2/ui-shared": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["@bf2/ui-shared"]
          },
          "react-router-dom": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react-router-dom"],
          },
        },
      })
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, './tsconfig.json')
        })
      ],
      symlinks: false,
      cacheWithContext: false
    },
  }
};
import path from 'path';
import webpack, { Configuration } from 'webpack';
import { config } from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { mode } from './webpack.server.config';

config();

export const clientConfig: Configuration = {
  // @ts-ignore
  mode: mode,
  devtool: 'inline-source-map',
  entry: {
    index: './src/client/index.tsx',
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/public/index.html',
      inject: true,
      scriptLoading: 'defer',
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.pcss'],
        },
      },
      {
        test: /\.pcss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname),
              },
            },
          },
        ],
      },
    ],
  },
};

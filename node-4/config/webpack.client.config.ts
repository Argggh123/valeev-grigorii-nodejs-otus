import path from 'path';
import webpack, { Configuration } from 'webpack';
import { config } from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

config();

export const clientConfig: Configuration = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: 'inline-source-map',
  entry: {
    index: './src/client/index.tsx',
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: process.env.NODE_ENV === 'development' ? '[name].js' : '[name].[hash].js',
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

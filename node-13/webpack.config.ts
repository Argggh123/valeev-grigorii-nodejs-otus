import { resolve } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

export const config: Configuration = {
  mode: 'development',
  entry: {
    app: './src/client/index.ts',
  },
  devtool: 'inline-source-map',
  // @ts-ignore
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'client', 'public', 'index.html'),
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};

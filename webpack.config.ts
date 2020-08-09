import { resolve } from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// eslint-disable-next-line no-underscore-dangle
const __DEV__ = process.env.NODE_ENV === 'development';

const config: webpack.Configuration & { devServer: WebpackDevServerConfiguration } = {
  mode: __DEV__ ? 'development' : 'production',
  devtool: __DEV__ ? 'inline-source-map' : 'hidden-source-map',
  entry: './src/entry.ts',
  output: {
    filename: 'entry.js',
    path: resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    devtoolNamespace: '',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.build.json',
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json',
          transpileOnly: __DEV__,
        },
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      exclude: [/node_modules/],
      test: /\.ts($|\?)/i,
    }),
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    compress: true,
    open: true,
  },
};

// eslint-disable-next-line import/no-default-export
export default config;

import * as path from 'node:path'
import type { Configuration } from 'webpack'
import HooksLifecyclePlugin from '@lbd/webpack-adv/plugins/hooks-lifecycle-plugin'
import HooksPractisePlugin from '@lbd/webpack-adv/plugins/hooks-practise-plugin'
import DeleteDirPlugin from '@lbd/webpack-adv/plugins/delete-dir'

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ts-[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.[t]sx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.[jt]sx?$/,
        use: path.resolve(__dirname, 'loaders/custom-loader.ts'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HooksLifecyclePlugin(),
    new HooksPractisePlugin(),
    new DeleteDirPlugin({
      dir: path.resolve(__dirname, 'dist'),
    }),
  ],
}

export default config

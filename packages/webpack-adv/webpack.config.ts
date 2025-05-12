import * as path from 'node:path'
import type { Configuration } from 'webpack'
import HooksLifecyclePlugin from '@lbd/webpack-adv/plugins/hooks-lifecycle-plugin'
import HooksPractisePlugin from '@lbd/webpack-adv/plugins/hooks-practise-plugin'

const config: Configuration = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ts-[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: path.resolve(__dirname, 'loaders/custom-loader.ts'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HooksLifecyclePlugin(), new HooksPractisePlugin()],
}

export default config

import type { Configuration } from 'webpack'

import MyPlugin from './plugins/my-first-plugin'

const config: Configuration = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'ts-[name].[chunkhash].js',
  },
  plugins: [new MyPlugin()],
}

export default config

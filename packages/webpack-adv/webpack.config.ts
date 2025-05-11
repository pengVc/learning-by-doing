import type { Configuration } from 'webpack'
import HooksLifecyclePlugin from '@lbd/webpack-adv/plugins/hooks-lifecycle-plugin'


const config: Configuration = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'ts-[name].[chunkhash].js',
  },
  plugins: [new HooksLifecyclePlugin()],
}

export default config

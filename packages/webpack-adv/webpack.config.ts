import type { Configuration } from 'webpack'
import HooksLifecyclePlugin from '@lbd/webpack-adv/plugins/hooks-lifecycle-plugin'
import HooksPractisePlugin from '@lbd/webpack-adv/plugins/hooks-practise-plugin'


const config: Configuration = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'ts-[name].[chunkhash].js',
  },
  plugins: [new HooksLifecyclePlugin(), new HooksPractisePlugin()],
}

export default config

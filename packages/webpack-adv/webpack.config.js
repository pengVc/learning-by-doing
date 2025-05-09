const config = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'js-[name].[chunkhash].js',
  },
}

module.exports = config

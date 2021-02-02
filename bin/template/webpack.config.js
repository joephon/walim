module.exports.webpackConfig = () => `
const { merge } = require('webpack-merge');
const common = require('./webpack.common')
const prod = require('./webpack.prod')
const dev = require('./webpack.dev')

module.exports = env => {
  console.log('env:', env)
  return merge(common, env.NODE_ENV === 'production' ? prod : dev)
}
`
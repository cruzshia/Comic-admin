const path = require('path')
const srcDir = path.resolve(__dirname, '../src')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]]
      }
    })
    config.resolve.extensions.push('.ts', '.tsx')
    config.resolve = {
      ...config.resolve,
      alias: {
        '@src': srcDir
      }
    }
    return config
  }
}

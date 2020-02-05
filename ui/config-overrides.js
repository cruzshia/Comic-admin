const path = require('path')
const srcDir = path.resolve(__dirname, 'src')

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@src': srcDir
    }
  }

  return config
}

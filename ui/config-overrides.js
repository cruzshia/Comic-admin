const path = require('path')
const srcDir = path.resolve(__dirname, 'src')

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@src': srcDir
    }
  }

  if (config.mode === 'production') {
    config.module.rules.forEach(rule => {
      if (!rule.oneOf) return
      rule.oneOf.find(loaderModule => {
        if (
          loaderModule.loader &&
          loaderModule.loader.indexOf('babel-loader') > -1 &&
          '.tsx'.match(loaderModule.test)
        ) {
          loaderModule.options.plugins.push([
            'react-remove-properties',
            {
              properties: ['data-testid']
            }
          ])
          return true
        }
        return false
      })
    })
  }

  return config
}

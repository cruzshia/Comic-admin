const path = require('path')
const srcDir = path.resolve(__dirname, '../src')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    {
      name: '@storybook/preset-create-react-app',
      options: {
        tsDocgenLoaderOptions: {
          savePropValueAsString: false
        }
      }
    }
  ],
  webpackFinal: async config => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@src': srcDir
      }
    }
    return config
  }
}

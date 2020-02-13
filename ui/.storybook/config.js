import React from 'react'
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { HashRouter as Router } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import ja from '@src/translation/ja.json'
import './custom.css'

addDecorator(withInfo)
addDecorator(storyFn => (
  <Router>
    <IntlProvider locale='ja' messages={ja}>
      {storyFn()}
    </IntlProvider>
  </Router>
))

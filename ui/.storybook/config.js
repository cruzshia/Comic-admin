import React from 'react'
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
import { HashRouter as Router } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import ja from '@src/translation/ja.json'
import { GlobalStyle } from '@src/common/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import './custom.css'
import { theme } from '@src/containers/Layout/Layout'
import { ThemeProvider } from '@material-ui/core'

addDecorator(withInfo)
addDecorator(withKnobs)
addDecorator(storyFn => (
  <Router>
    <IntlProvider locale='ja' messages={ja}>
      <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
      <CssBaseline />
      <GlobalStyle />
      {storyFn()}
    </IntlProvider>
  </Router>
))

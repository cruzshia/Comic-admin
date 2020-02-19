import React, { ReactComponentElement } from 'react'

import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import configureStore from '@src/store/configureStore'
import ja from '@src/translation/ja.json'

const store = configureStore()

export const withAllProvider = (component: ReactComponentElement<any>) => {
  return (
    <Provider store={store}>
      <Router>
        <IntlProvider locale='en' messages={ja}>
          {component}
        </IntlProvider>
      </Router>
    </Provider>
  )
}

export { store }

import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import CssBaseline from '@material-ui/core/CssBaseline'
import { routePath } from './common/appConfig'
import { GlobalStyle } from './common/styles'
import configureStore from './store/configureStore'
import AuthRoute from './components/AuthRoute'
import Layout from './containers/Layout'
import Home from './containers/Home'
import Login from './containers/Login'
import Comics from './containers/Comics'
import Application from './containers/Application'

import ja from './translation/ja.json'

const store = configureStore()
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <IntlProvider locale='ja' messages={ja}>
          <div className='App'>
            <Layout>
              <CssBaseline />
              <GlobalStyle />
              <Switch>
                <AuthRoute exact path={routePath.root} component={Home} />
                <AuthRoute exact path={routePath.login} guestOnly component={Login} />
                <AuthRoute
                  path={`${routePath.comics.base}/:subPage(list|categories|contents|authors|comments)`}
                  component={Comics}
                />
                <AuthRoute
                  path={`${routePath.application.base}/:subPage(list|app_screen|advertisement|announcement|coin_product|push_notification|questionnaire|customer_service|campaign)`}
                  component={Application}
                />
                <Route render={() => 'page not found..'} />
              </Switch>
            </Layout>
          </div>
        </IntlProvider>
      </Router>
    </Provider>
  )
}

export default App

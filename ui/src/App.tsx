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
import User from './containers/User'

import ja from './translation/ja.json'

const store = configureStore()
const App: React.FC = () => {
  // Project version injected at jenkins build time
  console.info('version: ', process.env.REACT_APP_MY_VERSION!)

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
                  path={`${routePath.comics.base}/:subPage(${routePath.comics.subPages})`}
                  component={Comics}
                />
                <AuthRoute
                  path={`${routePath.application.base}/:subPage(${routePath.application.subPages})`}
                  component={Application}
                />
                <AuthRoute path={`${routePath.user.base}/:subPage(${routePath.user.subPages})`} component={User} />
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

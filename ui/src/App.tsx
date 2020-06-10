import React from 'react'
import { HashRouter as Router, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { routePath } from './common/appConfig'
import { GlobalStyle, theme } from './common/styles'
import configureStore from './store/configureStore'
import ScrollTop from './components/scroll/ScrollTop'
import AuthRoute from './components/AuthRoute'
import GlobalDialog from './components/GlobalDialog'
import Layout from './containers/Layout'
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
          <ThemeProvider theme={theme}>
            <div className='App'>
              <ScrollTop />
              <Layout>
                <CssBaseline />
                <GlobalStyle />
                <GlobalDialog />
                <Switch>
                  <AuthRoute exact path={routePath.login} guestOnly component={Login} />
                  <AuthRoute path={routePath.comics.base} component={Comics} />
                  <AuthRoute path={routePath.application.base} component={Application} />
                  <AuthRoute path={routePath.user.base} component={User} />
                  <Redirect to={routePath.comics.work} />
                </Switch>
              </Layout>
            </div>
          </ThemeProvider>
        </IntlProvider>
      </Router>
    </Provider>
  )
}

export default App

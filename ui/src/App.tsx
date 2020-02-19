import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import CssBaseline from '@material-ui/core/CssBaseline'
import { routePath } from './common/appConfig'
import configureStore from './store/configureStore'
import AuthRoute from './components/AuthRoute'
import Layout from './containers/Layout'
import Home from './containers/Home'
import Login from './containers/Login'

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
              <Switch>
                <AuthRoute exact path={routePath.root} component={Home} />
                <AuthRoute exact path={routePath.login} guestOnly component={Login} />
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

import { createStore, applyMiddleware, Middleware, compose } from 'redux'
import rootReducer, { storePreloadState } from '../reducers'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '../epics'
import { isDev } from '../common/appConfig'

const bindMiddleware = (middleware: Middleware[]) => {
  if (isDev) {
    const logger: any = createLogger({ diff: true, collapsed: true })
    let composeEnhancers = compose
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    }
    return composeEnhancers(applyMiddleware(...middleware, logger))
  }
  return applyMiddleware(...middleware)
}

export default function configureStore(initialState = storePreloadState) {
  const epicMiddleware = createEpicMiddleware()

  const store = createStore(rootReducer, initialState, bindMiddleware([epicMiddleware]))
  epicMiddleware.run(rootEpic)

  return store
}

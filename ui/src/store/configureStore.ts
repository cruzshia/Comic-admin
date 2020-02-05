import { createStore, applyMiddleware, Middleware, compose } from 'redux'
import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '../epics'
import { isDev } from '../common/appConfig'

const middleware: Middleware[] = []
const logger: any = createLogger({ collapsed: true })

isDev && middleware.push(logger)

const bindMiddleware = (middleware: any) => {
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

export default function configureStore(initialState = {}) {
  const epicMiddleware = createEpicMiddleware()

  const store = createStore(rootReducer, initialState, bindMiddleware([epicMiddleware]))

  epicMiddleware.run(rootEpic)
  return store
}

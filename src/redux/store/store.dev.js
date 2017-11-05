import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from 'immutable'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from '../models/'
import DevTools from '../../entry/DevTools'

const initialState = Immutable.Map();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../models/', () => {
      const nextRootReducer = require('../models/').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore

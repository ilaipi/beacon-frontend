import { createStore, applyMiddleware } from 'redux'
import Immutable from 'immutable'
import thunk from 'redux-thunk'

import rootReducer from '../models/'

const initialState = Immutable.Map();

const configureStore = () => createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
)

export default configureStore

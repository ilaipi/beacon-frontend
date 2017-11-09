import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr'

import Auth from './auth/';
import Customer from './customer/';
import Burnintests from './burnintest/';
import Burninbeats from './burninbeat/';

const RootReducer = combineReducers({
  Auth,
  Customer,
  Burnintests,
  Burninbeats,
  routerReducer,
  toastr: toastrReducer,
})
export default RootReducer

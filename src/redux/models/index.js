import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr'

import Auth from './auth/';
import Customer from './customer/';
import Burnintests from './burnintest/';

const RootReducer = combineReducers({
  Auth,
  Customer,
  Burnintests,
  routerReducer,
  toastr: toastrReducer,
})
export default RootReducer

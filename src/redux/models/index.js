import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr'

import Auth from './auth/';
import Customer from './customer/';

const RootReducer = combineReducers({
  Auth,
  Customer,
  routerReducer,
  toastr: toastrReducer,
})
export default RootReducer

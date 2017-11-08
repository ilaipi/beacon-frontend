import { combineReducers } from 'redux-immutable'

import Customers from './list';
import Customer from './current';

const RootReducer = combineReducers({
  list: Customers,
  current: Customer
});

export default RootReducer;

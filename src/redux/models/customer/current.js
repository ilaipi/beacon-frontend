import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import {
  CUSTOMER_GET_REQUESTED,
  CUSTOMER_GET_SUCCEEDED,
  CUSTOMER_GET_FAILED
} from './const';

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
  error: false
})

export default handleActions({
  [CUSTOMER_GET_REQUESTED] (state) {
    return state.set('error', false).set('loading', true).set('isLogin', false);
  },
  [CUSTOMER_GET_SUCCEEDED] (state, action) {
    return state.set('loading', false)
      .set('data', Immutable.fromJS(action.payload));
  },
  [CUSTOMER_GET_FAILED] (state, action) {
    const error = action.payload.response.data.message || '未知错误'
    return state.set('loading', false).set('error', error);
  }
}, initialState)

import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,

  LOGOUT_SUCCEEDED
} from './const';

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
  error: false,
  isLogin: false
})

export default handleActions({
  [LOGIN_REQUESTED] (state) {
    return state.set('error', false).set('loading', true).set('isLogin', false);
  },
  [LOGIN_SUCCEEDED] (state, action) {
    return state.set('loading', false).set('isLogin', true)
      .update('data', v => v.merge(Immutable.fromJS(action.payload)));
  },
  [LOGIN_FAILED] (state, action) {
    const error = action.payload.response.data.message || '未知错误'
    return state.set('loading', false).set('error', error);
  },
  [LOGOUT_SUCCEEDED] (state) {
    return state.set('isLogin', false).set('loading', false);
  }
}, initialState)

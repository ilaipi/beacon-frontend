import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import {
  BURNINBEATS_REQUESTED,
  BURNINBEATS_SUCCEEDED,
  BURNINBEATS_FAILED
} from './const';

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
  error: false
})

export default handleActions({
  [BURNINBEATS_REQUESTED] (state) {
    return state.set('error', false).set('loading', true);
  },
  [BURNINBEATS_SUCCEEDED] (state, action) {
    return state.set('loading', false)
      .set('data', Immutable.fromJS(action.payload));
  },
  [BURNINBEATS_FAILED] (state, action) {
    const error = action.payload.response.data.message || '未知错误'
    return state.set('loading', false).set('error', error);
  }
}, initialState)

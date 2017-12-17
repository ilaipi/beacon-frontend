import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import {
  BURNINTESTS_REQUESTED,
  BURNINTESTS_SUCCEEDED,
  BURNINTESTS_FAILED
} from './const';

const initialState = Immutable.fromJS({
  data: {},
  loading: false,
  error: false
})

export default handleActions({
  [BURNINTESTS_REQUESTED] (state) {
    return state.set('error', false).set('loading', true);
  },
  [BURNINTESTS_SUCCEEDED] (state, action) {
    return state.set('loading', false)
      .set('data', Immutable.fromJS(action.payload));
  },
  [BURNINTESTS_FAILED] (state, action) {
    const error = action.payload.response.data.message || '未知错误'
    return state.set('loading', false).set('error', error);
  }
}, initialState)

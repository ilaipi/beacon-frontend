import { createAction } from 'redux-actions'
import axios from 'axios'
import {
  SET_DATE_RANGE,

  BURNINTESTS_REQUESTED,
  BURNINTESTS_SUCCEEDED,
  BURNINTESTS_FAILED
} from './const'

const burnintestsRequested = createAction(BURNINTESTS_REQUESTED)
const burnintestsSucceeded = createAction(BURNINTESTS_SUCCEEDED)
const burnintestsFailed = createAction(BURNINTESTS_FAILED)
export const loadBurnintests = params => (dispatch) => {
  dispatch(burnintestsRequested())
  return axios.get('/api/burnintests', { params })
  .then(res => (dispatch(burnintestsSucceeded(res.data))))
  .catch(err => (dispatch(burnintestsFailed(err.response.data.message))))
}

export const setDateRange = createAction(SET_DATE_RANGE);

import { createAction } from 'redux-actions'
import axios from 'axios'
import {
  BURNINTESTS_REQUESTED,
  BURNINTESTS_SUCCEEDED,
  BURNINTESTS_FAILED
} from './const'

const burnintestsRequested = createAction(BURNINTESTS_REQUESTED)
const burnintestsSucceeded = createAction(BURNINTESTS_SUCCEEDED)
const burnintestsFailed = createAction(BURNINTESTS_FAILED)
export const loadBurnintests = () => (dispatch) => {
  dispatch(burnintestsRequested())
  return axios.get('/api/burnintests')
  .then(res => (dispatch(burnintestsSucceeded(res.data))))
  .catch(err => (dispatch(burnintestsFailed(err.response.data.message))))
}

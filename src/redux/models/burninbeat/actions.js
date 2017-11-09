import { createAction } from 'redux-actions'
import axios from 'axios'
import {
  BURNINBEATS_REQUESTED,
  BURNINBEATS_SUCCEEDED,
  BURNINBEATS_FAILED
} from './const'

const burninbeatsRequested = createAction(BURNINBEATS_REQUESTED)
const burninbeatsSucceeded = createAction(BURNINBEATS_SUCCEEDED)
const burninbeatsFailed = createAction(BURNINBEATS_FAILED)
export const loadBurninbeats = burnintest => (dispatch) => {
  dispatch(burninbeatsRequested())
  return axios.get(`/api/burninbeats/${burnintest}`)
  .then(res => (dispatch(burninbeatsSucceeded(res.data))))
  .catch(err => (dispatch(burninbeatsFailed(err.response.data.message))))
}

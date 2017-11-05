import { createAction } from 'redux-actions'
import axios from 'axios'
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED
} from './const'

const loginRequested = createAction(LOGIN_REQUESTED)
const loginSucceeded = createAction(LOGIN_SUCCEEDED)
const loginFailed = createAction(LOGIN_FAILED)
export const login = (username, password) => (dispatch) => {
  dispatch(loginRequested())
  return axios.post('/api/auth/login', { username, password })
  .then(res => (dispatch(loginSucceeded(res.data))))
  .catch(err => (dispatch(loginFailed(err.response.data.message))))
}

export const logout = () => () => (
  axios.get('/api/auth/logout')
)

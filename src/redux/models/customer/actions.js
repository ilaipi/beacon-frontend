import { createAction } from 'redux-actions'
import axios from 'axios'
import {
  CUSTOMERS_REQUESTED,
  CUSTOMERS_SUCCEEDED,
  CUSTOMERS_FAILED,

  CUSTOMER_SAVE_REQUESTED,
  CUSTOMER_SAVE_SUCCEEDED,
  CUSTOMER_SAVE_FAILED
} from './const'

const customersRequested = createAction(CUSTOMERS_REQUESTED)
const customersSucceeded = createAction(CUSTOMERS_SUCCEEDED)
const customersFailed = createAction(CUSTOMERS_FAILED)
export const loadCustomers = () => (dispatch) => {
  dispatch(customersRequested())
  return axios.get('/api/customers')
  .then(res => (dispatch(customersSucceeded(res.data))))
  .catch(err => (dispatch(customersFailed(err.response.data.message))))
}

const customerSaveRequested = createAction(CUSTOMER_SAVE_REQUESTED)
const customerSaveSucceeded = createAction(CUSTOMER_SAVE_SUCCEEDED)
const customerSaveFailed = createAction(CUSTOMER_SAVE_FAILED)
export const saveCustomer = customer => (dispatch) => {
  dispatch(customerSaveRequested())
  return axios.post('/api/customer', customer)
  .then(res => (dispatch(customerSaveSucceeded(res.data))))
  .catch(err => (dispatch(customerSaveFailed(err.response.data.message))))
}

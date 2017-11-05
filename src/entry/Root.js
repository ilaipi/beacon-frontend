import React, { Component } from 'react'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import history from 'Utils/history'
/* 引入样式 */
import 'Assets/css/simple-line-icons.css';
import 'Assets/css/font-awesome.css';
import 'Assets/css/common.css'
import configureStore from './../redux/store/';
import ReduxToastr from './ReduxToastr';
import routes from '../routes'

const store = configureStore()
const historyWithStore = syncHistoryWithStore(history, store, {
  selectLocationState (state) {
    return state.get('routerReducer');
  }
})
export default class Root extends Component {
  render () {
    const { DevTools } = this.props
    return (
      <Provider store={store}>
        <div>
          <ReduxToastr />
          <Router history={historyWithStore} routes={routes} />
          { DevTools && <DevTools />}
        </div>
      </Provider>
    );
  }
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCookie } from 'Utils/Cookie';
import history from 'Utils/history';
import { COOKIE_KEY, AUTH_INFO_KEY } from 'Config/session';
import * as authActionCreator from 'Models/auth/actions';
import LoginView from 'Pages/Login';

const storage = window.localStorage;

@connect(
  state => ({
    auth: state.get('Auth').toJS()
  }),
  dispatch => ({
    auth: bindActionCreators(authActionCreator, dispatch),
  })
)
export default class Login extends Component {
  login = (username, password) => {
    const { auth } = this.props;
    auth.login(
      username,
      password
    )
    .then(({ error }) => {
      if (!error) {
        const { auth: { data } } = this.props;
        const { id } = data
        storage.setItem(AUTH_INFO_KEY, JSON.stringify(data));
        setCookie(COOKIE_KEY, id, (1 / 48));
        history.push('/patients');
      }
    });
  }
  render () {
    const { data: { username } = {}, loading, error } = this.props.auth
    return (
      <LoginView
        login={this.login}
        username={username}
        loading={loading}
        error={error}
      />
    )
  }
}

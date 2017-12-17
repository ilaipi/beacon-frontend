import React, { Component } from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Icon,
  Dropdown,
  Menu
} from 'antd'
/* eslint-disable import/extensions */
import { deleteCookie } from 'Utils/Cookie';
import redirectToLogin from 'Utils/RedirectToLogin'
import { COOKIE_KEY, AUTH_INFO_KEY } from 'Config/session';
import * as authActionCreators from 'Models/auth/actions';
/* eslint-enable import/extensions */

const logo = require('./../../assets/img/wanweishi.png');

const storage = window.localStorage;
const { Item: MenuItem, Divider: MenuDivider } = Menu

@connect(
  state => ({
    auth: state.get('Auth')
  }),
  dispatch => ({
    authAction: bindActionCreators(authActionCreators, dispatch)
  })
)
class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  logout = () => {
    const { logout } = this.props.authAction;
    logout()
    .then(() => {
      deleteCookie(COOKIE_KEY);
      storage.removeItem(AUTH_INFO_KEY);
      redirectToLogin()
    });
  }
  render() {
    const { sidebarOpen, toggleSidebar } = this.props
    const user = JSON.parse(storage.getItem(AUTH_INFO_KEY));
    const menu = (
      <Menu>
        <MenuItem>
          <Link to="/passwd">修改密码</Link>
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <span onClick={this.logout}>退出登录</span>
        </MenuItem>
      </Menu>
    )
    return (
      <header style={{ lineHeight: '50px', fontSize: 14, background: '#36a9e1' }}>
        <a
          style={{
            display: 'inline-block',
            paddingLeft: 20,
            fontSize: 22,
            width: '200px',
            height: '53px',
            backgroundColor: 'white'
          }}
        >
          <img
            style={{
              height: '53px',
            }}
            src={logo}
            alt="compony logo"
          />
        </a>
        <Icon
          style={{ color: 'white', fontSize: 16, marginLeft: '10px', top: '-20px', position: 'relative' }}
          type={sidebarOpen ? 'menu-unfold' : 'menu-fold'}
          onClick={toggleSidebar}
        />
        <div
          style={{ float: 'right', marginRight: 15 }}
        >
          <Dropdown overlay={menu} placement="bottomLeft">
            <span style={{ color: 'white' }}>
              <Icon type="user" />{user && user.name}<Icon type="down" />
            </span>
          </Dropdown>
        </div>
      </header>
    )
  }
}

export default Header;


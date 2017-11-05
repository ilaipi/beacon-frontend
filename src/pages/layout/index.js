import React, { Component } from 'react';
import { checkLogin } from 'Utils/Auth'
import redirectToLogin from 'Utils/RedirectToLogin';
import Layout from 'Components/Layout';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const checkAuth = () => {
  if (!checkLogin()) {
    redirectToLogin()
  }
}
const sidebarStyle = { background: 'rgb(64,64,64)' }
class PageLayout extends Component {
  componentWillMount() {
    checkAuth()
  }
  render() {
    const Content = () => this.props.children
    return (
      <Layout
        Header={Header}
        Sidebar={Sidebar}
        sidebarStyle={sidebarStyle}
        Content={Content}
        Footer={Footer}
      />
    );
  }
}
export default PageLayout;

/**
 * 页面布局模板组件
 */
import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

const headerDefStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  padding: 0,
  background: 'white',
  height: 50
};
const centerDefStyle = {
  position: 'absolute',
  top: 50,
  bottom: 50,
  left: 0,
  right: 0
};
const contentDefStyle = {
  margin: '24px 16px',
  padding: 24,
  background: '#fff',
  overflow: 'scroll'
};
const footerDefStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 0,
  height: 50
};
class LayoutTpl extends Component {
  constructor (props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  state = {
    collapsed: false,
  };
  toggleSidebar = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }));
  }
  render() {
    const { collapsed } = this.state;
    const {
      headerStyle = {}, Header: PageHeader,
      sidebarStyle = {}, Sidebar: PageSidebar,
      contentStyle = {}, Content: PageContent,
      footerStyle = {}, Footer: PageFooter
    } = this.props;
    return (
      <Layout>
        <Header
          style={{ ...headerDefStyle, ...headerStyle }}
        >
          <PageHeader sidebarOpen={collapsed} toggleSidebar={this.toggleSidebar} />
        </Header>
        <Layout style={{ ...centerDefStyle }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{ ...sidebarStyle }}
          >
            <PageSidebar collapsed={this.state.collapsed} />
          </Sider>
          <Content style={{ ...contentDefStyle, ...contentStyle }}>
            <PageContent />
          </Content>
        </Layout>
        <Footer style={{ ...footerDefStyle, footerStyle }}>
          <PageFooter />
        </Footer>
      </Layout>
    );
  }
}

export default LayoutTpl;

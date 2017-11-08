import React from 'react';
import {
  Icon
} from 'antd'
import LinkMenu from 'Components/LinkMenu';

const Title = ({ type, title, collapsed }) => (
  <span>
    <Icon style={collapsed ? { fontSize: 16 } : {}} type={type} />
    {collapsed || title}
  </span>
)
const getLinks = collapsed => ([
  { key: 'customers', pathname: '/customers', title: <Title type="team" title="客户管理" collapsed={collapsed} /> },
  { key: 'burnintest', pathname: '/burnintest', title: <Title type="calendar" title="老化记录" collapsed={collapsed} /> }
])
const Sidebar = (props) => {
  const links = getLinks(props.collapsed)
  return <LinkMenu links={links} />
}
export default Sidebar;


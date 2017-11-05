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
  {
    key: 'dashboard', pathname: '/dashboard', title: <Title type="line-chart" title="工作台" collapsed={collapsed} /> },
  { key: 'patients', pathname: '/patients', title: <Title type="team" title="患者库" collapsed={collapsed} /> },
  { key: 'scheduleCalendar', pathname: '/scheduleCalendar', title: <Title type="calendar" title="随访管理" collapsed={collapsed} /> },
  {
    type: 'menu',
    key: 'todos',
    title: <Title type="appstore-o" title="待办事项" collapsed={collapsed} />,
    links: [
      { key: 'todos/wechat', pathname: '/todos/wechat', title: <Title type="shake" title="微信提醒" collapsed={collapsed} /> },
      { key: 'todos/sms', pathname: '/todos/sms', title: <Title type="message" title="短信提醒" collapsed={collapsed} /> },
      { key: 'todos/extra', pathname: '/todos/extra', title: <Title type="desktop" title="额外访视" collapsed={collapsed} /> }
    ]
  },
  { key: 'wechat', pathname: '/wechat', title: <Title type="message" title="消息管理" collapsed={collapsed} /> }
])
const Sidebar = (props) => {
  const links = getLinks(props.collapsed)
  return <LinkMenu links={links} />
}
export default Sidebar;


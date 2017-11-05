import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {
  Menu,
} from 'antd'

const { SubMenu, Item } = Menu
/* menu 默认的 props */
const menuDefProps = {
  mode: 'inline',
  theme: 'dark'
};
/* 链接的默认样式 */
const linkDefStyle = { fontSize: 14 }

const pushLinks = (all, list, key) => {
  list.forEach((item) => {
    if (item.type === 'menu') {
      pushLinks(all, item.links, item.key)
    } else {
      all.push({ subKey: key, ...item })
    }
  })
}
const getAllLinks = (links) => {
  const allLinks = []
  pushLinks(allLinks, links, null)
  return allLinks
}
const getCurrentKey = (links) => {
  const allLinks = getAllLinks(links)
  const path = window.location.pathname
  const { subKey, key } = allLinks.filter(({ pathname }) => path === pathname)[0] || {}
  return {
    subKey,
    key
  }
}
class LinkMenu extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.initCurrentKey = this.initCurrentKey.bind(this)
    this.getSubMenu = this.getSubMenu.bind(this)
    this.getItem = this.getItem.bind(this)
  }
  state = {
    subKey: '',
    key: ''
  }
  componentWillMount () {
    this.initCurrentKey()
  }
  getItem = ({ key, pathname, title, itemProps }) => {
    const { linkStyle } = this.props
    return (
      <Item key={key} {...itemProps}>
        <Link
          style={{ ...linkDefStyle, ...linkStyle }}
          to={pathname}
        >
          {title}
        </Link>
      </Item>
    )
  }
  getSubMenu = ({ key, title, links }) => {
    const self = this
    return (
      <SubMenu
        key={key}
        title={<span style={linkDefStyle}>{title}</span>}
      >
        {
          links.map(link => self.getItem(link))
        }
      </SubMenu>
    )
  }
  initCurrentKey = () => {
    const { links } = this.props
    const { key, subKey } = getCurrentKey(links)
    this.setState({
      key,
      subKey
    })
  }
  handleClick = (e) => {
    this.setState({
      key: e.key
    });
  }
  render () {
    const self = this
    const {
      links,
      menuProps
    } = this.props
    const { subKey, key } = this.state
    return (
      <Menu
        {...menuDefProps}
        {...menuProps}
        defaultOpenKeys={[subKey]}
        selectedKeys={[key]}
        onClick={this.handleClick}
      >
        {
          links.map(item => (
            (item.type === 'menu') ? self.getSubMenu(item) : self.getItem(item)
          ))
        }
      </Menu>
    )
  }
}
/* eslint-disable react/forbid-prop-types */
LinkMenu.propTypes = {
  links: PropTypes.array,
  menuProps: PropTypes.object,
  linkStyle: PropTypes.object
}
/* eslint-enable react/forbid-prop-types */
LinkMenu.defaultProps = {
  links: [],
  menuProps: {},
  linkStyle: {}
}
export default LinkMenu

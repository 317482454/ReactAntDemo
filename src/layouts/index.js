import React, {Component} from 'react';
import {Layout, Menu, Icon, Dropdown, Badge, Avatar, LocaleProvider} from 'antd';

import styles from './index.less';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import menuList from './menu.js';
import router from 'umi/router';
// import Link from 'umi/link';
const {Header, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuList: menuList,
      defaultSelectedKeys: [this.props.location.pathname]
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  //渲染子菜单
  formSubmenusChild(obj) {
    let cHtml = '';
    let childArray = obj.list;
    if ("undefined" !== typeof(childArray) && childArray.length > 0) {
      cHtml = childArray.map((item, i) => {
        return this.formSubmenusChild(item);
      });
      return <SubMenu key={obj.key} title={obj.name}>{cHtml}</SubMenu>
    }
    else {
      return <Menu.Item onClick={this.menusHref.bind(this)} key={obj.key}>{obj.name}</Menu.Item>
    }
  }

  menusHref(e) {
    router.push(e.key);
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span>修改密码</span>
        </Menu.Item>
        <Menu.Item>
          <span>安全退出</span>
        </Menu.Item>
      </Menu>
    );
    let menuList = this.state.menuList.map((obj, i) => {
      if ("undefined" !== typeof(obj.list) && obj.list.length > 0) {
        return this.formSubmenusChild(obj);
      } else {
        return <Menu.Item key={obj.key}>{obj.name}</Menu.Item>
      }
    });
    console.log(menuList);
    return (
      <LocaleProvider locale={zhCN}>
        <Layout style={{minHeight: '100vh'}}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={styles.logo}/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.defaultSelectedKeys}>
              {menuList}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{background: '#fff', padding: 0, 'textAlign': 'center'}}>
              <Icon style={{float: 'left', 'lineHeight': '64px'}}
                    className={styles["trigger"]}
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
              />
              <Dropdown overlay={menu}>
                <span className={styles.divHover}>
                  <Avatar
                    size="small"
                    src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                    alt="avatar"
                  />
                  <span style={{marginLeft: '10px'}}>admin</span>
                </span>
              </Dropdown>
              <div className={styles.divHover}>
                <Badge style={{'marginTop': '-6px'}} count={51}>
                  <Icon style={{fontSize: '14px', 'paddingRight': '4px'}} type="bell"/>
                </Badge>
              </div>
            </Header>
            <Content style={{margin: '24px 16px', background: '#fff', minHeight: 280}}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}

import React, { useCallback } from 'react';
import {BackTop, ConfigProvider, Layout, Menu} from 'antd';
import { Link } from 'umi';
import menus from './menu';
import styles from './index.less';

const { Header, Content, Footer, Sider } = Layout;

const Components  = ({children}) => {
  const renderMenus = () => {
    let menuItems = [];
    menus.forEach((item) => {
      menuItems.push(<Menu.Item key={item.key}>
        <Link to={item.url}>
        {item.name}
        </Link>
        </Menu.Item>)
    })
    return menuItems;
  }
  return (
    <Layout className={`${styles['coms-layout-bg']} ${styles['coms-contains']}`}>
      <Sider className={styles['coms-layout-bg']}>
        <Menu mode="inline" defaultSelectedKeys={['field']} className={styles['coms-layout-menu']}>
          { renderMenus() }
        </Menu>
      </Sider>
      <Content className={`${styles['coms-layout-bg']} ${styles['coms-layout-content']}`}>
        {children}
      </Content>
    </Layout>
  )

}

export default Components;

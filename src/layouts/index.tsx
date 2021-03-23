import React, {memo, useCallback, useEffect, useState} from 'react'
import {Link, withRouter} from 'umi'
import {BackTop, ConfigProvider, Layout, Menu} from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {RouteData} from 'umi/router'
import {useDispatch, useSelector} from 'react-redux'
import {If, Choose, Otherwise, When} from 'jsx-control-statements';
import { Helmet } from 'react-helmet';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import styles from './index.less'
import '../themes/index.less'

moment.locale('zh-cn');
const { Header, Content, Footer } = Layout
const { SubMenu } = Menu;

interface IProps {
  location: RouteData
  children: React.ReactNode;
}

const year = moment().get('year')

const BasicLayout = memo(({ location, children }: IProps) => {
  const global: any = useSelector(((state: any) => state.global))
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)

  const toggleMenuVisible = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  return (
    <>
    {/*<Helmet>
      <title>GluttonDD</title>
    </Helmet>*/}
    <div>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['index']}>
            <Menu.Item key="index"><Link to={'/'}>首页</Link></Menu.Item>
            <Menu.Item key="components"><Link to={'/components'}>组件库</Link></Menu.Item>
            <Menu.Item key="more"><Link to={'/maliang'}>马良</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Content>
              <ConfigProvider locale={zhCN}>
                {children}
              </ConfigProvider>
            </Content>
            <BackTop visibilityHeight={100} />
          </Layout>
        </Content>
      </Layout>
    </div>
    </>
  )
})

export default withRouter(BasicLayout)


import React from 'react'
import {connect, DispatchProp, useDispatch, useSelector} from 'dva'
import {Button, Form, Input, Layout, Row} from 'antd'
import {
  UserOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import styles from './index.less'
import {FormComponentProps} from 'antd/lib/form'
import {DvaLoadingState} from 'dva-loading'
import {RouteData} from "umi/router";

interface IProps extends DispatchProp, FormComponentProps {
  loading: DvaLoadingState
  location: RouteData
}


const LoginPage = (props: IProps) => {
  const dispatch = useDispatch()
  const finishHandle = (values) => {
    console.log('333333', values);
  }
  const finishFailedHandle = (e) => {

  }
  return (
    <div className={styles.login}>
      <div className={styles.loginArea}>
        <div className={styles.formArea}>
          <Form
            name="login"
            className={styles.form}
            initialValues={{ remember: true }}
            onFinish={finishHandle}
            onFinishFailed={finishFailedHandle}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                addonBefore={<UserOutlined />}
                placeholder="用户名"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{required: true, message: '密码不能为空'},
              ]}
            >
              <Input
                addonBefore={<UnlockOutlined />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Row className={styles.btnWrap}>
                <Button className={styles.loginBtn} type="primary" htmlType="submit">
                  登录
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={styles.footer}>由GluttonDD提供技术支持</div>
    </div>
  )
}
export default LoginPage

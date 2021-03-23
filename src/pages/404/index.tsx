import React from 'react'
import { history } from 'umi';
import { Button, Empty } from 'antd'
import notFountPng from '../../assets/images/common/404.png'
import styles from './index.less'

const ErrorPage = () => {
  const handleClick = () => {
    history.push('/dashboard')
  }

  return (
    <Empty
      className={styles.emptyPage}
      image={notFountPng}
      description="很抱歉，您访问的页面不存在！"
    >
      <Button className={styles.btn} type="primary" onClick={handleClick}>返回首页</Button>
    </Empty>
  )
}

export default ErrorPage

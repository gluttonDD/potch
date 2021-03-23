import React from 'react'
import { Button, Empty } from 'antd'
import styles from './index.less'
import router from 'umi/router'

const PendingPage = () => {
  const handleClick = () => {
    router.replace('/dashboard')
  }

  return (
    <Empty
      className={styles.emptyPage}
      description="很抱歉，您没有权限访问！"
    >
      <Button className={styles.btn} type="primary" onClick={handleClick}>返回首页</Button>
    </Empty>
  )
}

export default PendingPage

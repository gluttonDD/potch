import React, {useEffect} from 'react'
import { Button, message } from 'antd';
import ModalWrapper from '../src'

export default () => {

  const onBizOk = async() => {
    return new Promise((resolve, reject) => {
      message.error('抱歉！');
      return reject();
    })
  }
  return (
    <div>
      <ModalWrapper
        title={'弹窗实例'}
        content={(props) => (<Button { ...props }>弹窗测试实例</Button>)}
        onBizOk={onBizOk}
      >
        <div>弹窗实例测试</div>
      </ModalWrapper>
    </div>
  )
}

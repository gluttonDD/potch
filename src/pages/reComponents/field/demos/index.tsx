import React, { useState } from 'react';
import { Form, Radio, Row, Col, Button } from 'antd';
import Field from '../src';
import styles from './index.less';

const formItemLayout = {
  labelCol: { span: 3, offset: 12 },
  wrapperCol: { span: 3, offset: 12 }
}
export default() => {
  const [mode, setMode] = useState('edit');
  const onChange = (e) => {
    const value = e.target.value;
    setMode(value);
  }
  const onFinish = values => {
    debugger
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
    <Radio.Group onChange={onChange} value={mode} className={styles.setMode}>
      <Radio value="read">只读</Radio>
      <Radio value="edit">编辑</Radio>
    </Radio.Group>
    <Form
      labelAlign="right"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        username: 'DD',
        sex: '0',
      }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="username"
            label="输入框"
            rules={[{ required: true, message: '请输入!' }]}
          >
            <Field valueType="text" mode={mode} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="sex"
            label="单选"
            rules={[{ required: true, message: '请选择!' }]}
          >
            <Field
              valueType="select"
              mode={mode}
              options={[{ key: '0', text: '男'}, { key: '1', text: '女' }]}
              fieldNames={{ value: 'key', label: 'text' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="birthday"
            label="日期"
            rules={[{ required: true, message: '请选择!' }]}
          >
            <Field valueType="date" mode={mode} picker="year" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="hobby"
            label="多选"
            rules={[{ required: true, message: '请选择!' }]}
          >
            <Field
              valueType="multiSelect"
              mode={mode}
              options={[{ key: '0', text: '玩游戏'}, { key: '1', text: '打篮球' }, { key: '2', text: '看书' }]}
              fieldNames={{ value: 'key', label: 'text' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="range"
            label="时间区间"
            rules={[{ required: true, message: '请选择时间区间!' }]}
          >
            <Field
              valueType="dateRange"
              mode={mode}
              showTime
              format={'YYYY-MM-DD HH:mm'}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="introduce"
            label="文本框"
            rules={[{ required: true, message: '请输入!' }]}
          >
            <Field valueType="textArea" mode={mode} />
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit">提交</Button>
    </Form>
    </>
  )
}

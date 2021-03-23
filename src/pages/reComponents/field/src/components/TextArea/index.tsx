import React from 'react';
import { Input } from 'antd';
import { FieldProps } from '../../index';
import { MODE } from '../../config';

const { TextArea } = Input;


const Area = (props: FieldProps) => {
  const { value, mode, render, formItemProps } = props;
  if (mode === MODE.READ) {
    const dom = <>{value}</>;
    if (render) {
      return render(value, {...formItemProps, mode}, dom)
    }
    return dom;
  }
  if (mode === MODE.EDIT) {
    const dom = <TextArea defaultValue={value} {...formItemProps} />
    if (render) {
      return render(value, {...formItemProps, mode}, dom)
    }
    return dom;
  }
  return null;
}

export default Area;

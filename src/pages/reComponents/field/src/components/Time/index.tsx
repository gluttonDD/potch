import React from 'react';
import { TimePicker  } from 'antd';
import moment from 'moment';
import { FieldProps } from '../../index';
import { MODE, PICKER_FORMAT_MAP } from '../../config';


const Date = (props: FieldProps) => {
  const { value, mode, render, formItemProps } = props;
  const { className, style, ...restProps } = formItemProps;
  if (mode === MODE.READ) {
    const dom = <>{value}</>;
    if (render) {
      return render(value, {...formItemProps, mode}, dom)
    }
    return dom;
  }
  if (mode === MODE.EDIT) {
    const _value = value ? moment(value) : undefined;
    const dom = (
      <TimePicker
        defaultValue={_value}
        className={className}
        style={style}
        {...restProps}
      />
    )
    if (render) {
      return render(value, {...formItemProps, mode}, dom)
    }
    return dom;
  }
  return null;
}

export default Date;

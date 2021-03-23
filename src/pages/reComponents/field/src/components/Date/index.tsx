import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { FieldProps } from '../../index';
import { MODE, PICKER_FORMAT_MAP } from '../../config';


const Date = (props: FieldProps) => {
  const { value, mode, render, formItemProps } = props;
  const { format, className, style, picker, showTime, ...restProps } = formItemProps;
  let _picker = 'date';
  let _format = format || (showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
  if (picker) {
    _picker = picker;
    _format = format || (showTime ? 'YYYY-MM-DD HH:mm:ss' : PICKER_FORMAT_MAP[picker]);
  }
  if (mode === MODE.READ) {
    const _value = value ? moment(value).format(_format) : undefined;
    const dom = <>{_value}</>;
    if (render) {
      return render(value, {...formItemProps, mode}, dom)
    }
    return dom;
  }
  if (mode === MODE.EDIT) {
    const _value = value ? moment(value) : undefined;
    const dom = (
      <DatePicker
        defaultValue={_value}
        format={_format}
        picker={_picker}
        showTime={showTime}
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

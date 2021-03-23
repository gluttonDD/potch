import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { FieldProps } from '../../index';
import { MODE, PICKER_FORMAT_MAP } from '../../config';

const { RangePicker } = DatePicker;


const Date = (props: FieldProps) => {
  const { value, mode, render, formItemProps } = props;
  const { format, className, style, picker, showTime, ...restProps } = formItemProps;
  const [startTime, endTime] = Array.isArray(value) ? value : [];
  let _picker = 'date';
  let _format = format || (showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
  if (picker) {
    _picker = picker;
    _format = format || (showTime ? 'YYYY-MM-DD HH:mm:ss' : PICKER_FORMAT_MAP[picker]);
  }
  if (mode === MODE.READ) {
    const startText = startTime ? moment(startTime).format(_format) : '-';
    const endText = endTime ? moment(endTime).format(_format) : '-';
    const _value = (startTime || endTime) ? `${startText} ~ ${endText}` : undefined;
    const dom = <span className={className} style={style}>{_value}</span>;
    if (render) {
      return render(value, {...formItemProps, mode}, dom)
    }
    return dom;
  }
  if (mode === MODE.EDIT) {
    const _value = startTime || endTime ? [moment(startTime), moment(endTime)] : [];
    const dom = (
      <RangePicker
        defaultValue={_value}
        picker={_picker}
        format={_format}
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

import React from 'react';
import { Select } from 'antd';
import { FieldProps } from '../../index';
import { MODE } from '../../config';

/**
 * 根据value值获取对应的label
 * @param {string | number} value
 * @param {Object[]} options
 * @param {{label: string; value: string}} fieldNames
 * @returns {string | number}
 */
const getLabelFromOptions = (
  value: string[] | number[],
  options: object[],
  fieldNames: { label: string, value: string } = { label: 'label', value: 'value'},
  ) => {
  if (Array.isArray(options)) {
    let _value = [];
    options?.forEach((item) => {
      if (Array.isArray(value)) {
        value?.forEach((v) => {
          if (item[fieldNames.value].toString() === v.toString()) {
            _value.push(item[fieldNames.label])
          }
        })
      } else if (item[fieldNames.value] === value) {
        _value = item[fieldNames.label];
      }
    })
    return _value;
  }
  return value;
}

/**
 * 根据提供的fieldNames，将options转换成Select需要的数据
 * @param {Object[]} options
 * @param {{label: string; value: string}} fieldNames
 * @returns {Object[]}
 */
const formatOptions = (
  options: object[],
  fieldNames: { label: string, value: string } = { label: 'label', value: 'value'},
): object[] => {
  let _options = [];
  if (!Array.isArray(options) || options.length === 0) {
    return _options;
  }
  if (Array.isArray(options) && options.length > 0 && fieldNames) {
    _options = options.map((item) => {
      return {...item, label: item[fieldNames.label], value: item[fieldNames.value]}
    })
    return _options;
  }
  return options;
}
const MultiSelectField = (props: FieldProps) => {
  const { value, mode, render, formItemProps } = props;
  const { options = [], fieldNames, ...restProps } = formItemProps;
  const _options = fieldNames ? formatOptions(options, fieldNames) : options;
  if (mode === MODE.READ) {
    const textArr = getLabelFromOptions(value, options, fieldNames);
    const text = Array.isArray(textArr) ? textArr.join(';') : textArr;
    const dom = <>{text}</>;
    if (render) {
      return render(value, {...formItemProps, mode}, dom)
    }
    return dom;
  }
  if (mode === MODE.EDIT) {
    const dom = <Select mode="multiple" placeholder="请选择" defaultValue={value} options={_options} {...restProps} />
    if (render) {
      return render(value, {...formItemProps, mode}, dom)
    }
    return dom;
  }
  return null;
}

export default MultiSelectField;

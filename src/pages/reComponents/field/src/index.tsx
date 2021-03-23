import React, { useState, useEffect } from 'react';
import { Moment } from 'moment';
import { VALUE_TYPE_MAP } from './config';
import TextField from './components/Text';
import DateField from './components/Date';
import SelectField from './components/Select';
import MultiSelectField from './components/MultiSelect';
import DateRangeField from './components/DateRange';
import TextAreaField from './components/TextArea';

type FieldValueType = string | number | Moment | Moment[] | null;
type FieldType = string;
type FieldModeType = 'read' | 'edit';
type FieldRenderFC = {
  render?: (bProps: BaseFieldProps) => React.ReactNodes,
}

type BaseFieldProps = {
  value: FieldValueType,
  valueType: FieldType,
}
type RenderFieldProps = {
  mode: FieldModeType,
  fieldNames?: { label: string, value: string },  // options字段中label和value对应的key
  [key: string]: any,
};
export type FieldProps = BaseFieldProps & RenderFieldProps & FieldRenderFC;

const renderFieldItem = (
  value: FieldValueType,
  valueType: FieldType,
  renderProps: RenderFieldProps & FieldRenderFC
): React.ReactNode => {
  if (valueType === VALUE_TYPE_MAP.TEXT) {
    return <TextField value={value as string} {...renderProps} />
  }
  if (valueType === VALUE_TYPE_MAP.TEXTAREA) {
    return <TextAreaField value={value as string} {...renderProps} />
  }
  if (valueType === VALUE_TYPE_MAP.DATE) {
    return <DateField value={value as string} {...renderProps} />
  }
  if (valueType === VALUE_TYPE_MAP.SELECT) {
    return <SelectField value={value as string} {...renderProps} />
  }
  if (valueType === VALUE_TYPE_MAP.MULTISELECT) {
    return <MultiSelectField value={value as string[]} {...renderProps} />
  }
  if (valueType === VALUE_TYPE_MAP.DATERANGE) {
    return <DateRangeField value={value as string[]} {...renderProps} />
  }
  return <TextField value={value as string} {...renderProps} />
}
const Field = ({
  value,
  valueType="text",
  render,
  mode="read",
  ...rest}) => {
  return (
    <>
    {
      renderFieldItem(value, valueType, {
        mode,
        render,
        formItemProps: {
          ...rest,
        }
      })
    }
    </>
  )
}

export default Field;

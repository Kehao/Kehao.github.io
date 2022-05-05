import React, { useCallback } from 'react';
import { DatePicker } from 'antd';
import { RecordAny } from '@b1/utils';
import './style/index.less';

const { RangePicker } = DatePicker;

const IRangePicker = ({ onChange, ...rangePickerProps }: RecordAny): React.ReactElement => {
  const iRangeTemp = [];
  const onOpenChange = useCallback(isOpen => {
    if (!isOpen) {
      onChange(iRangeTemp);
    }
  }, []);
  const onPickerChange = useCallback((_v, value) => {
    iRangeTemp[0] = value && value[0];
    iRangeTemp[1] = value && value[1];
  }, []);
  return <RangePicker onOpenChange={onOpenChange} onChange={onPickerChange} {...rangePickerProps} />;
};
export default IRangePicker;

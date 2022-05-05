---
title: IRangePicker
nav:
  path: /components
group:
  title: 标准化组件
  path: /components/standard
---

## IRangePicker 组件示例

```js
// Usage
// 在V3中 RangePicker的onChange事件总是在浮窗收起时出发. https://codesandbox.io/s/eager-grothendieck-6zb9t?file=/index.js
// 在V4中 RangePicker的onChange事件在用户每次点击浮窗日期时都会触发. https://codesandbox.io/s/fanweixuanzeqi-antd4150-forked-x2fro?file=/index.js
// 所以从V3升级到V4后, 部分依赖onChange的场景交互无法与原来保持一致, 并且因为onChange事件在onOpenChange触发前先触发. 也比较难以监听onOpenChange的改变来实现类似V3的交互.
// 本组件主要是为了屏蔽这种差异.
// 见 https://github.com/ant-design/ant-design/issues/30082

import { IRangePicker } from '@b1/components';
const onChange = useCallback(value => {
  console.log(value);
});
// ['2021-01', '2021-06']
// ['2022-03-03 17:40:23', '2022-03-03 21:04:04']
<IRangePicker showTime onChange={onChange} />;
```

```jsx
import React, { useCallback, useState, useEffect } from 'react';
import { IRangePicker } from '@b1/components';
import { MONTH_FORMAT } from '@b1/utils';
import moment from 'moment';
const defaultDate = {
  endDate: moment(new Date())
    .subtract(1, 'months')
    .format(MONTH_FORMAT),
  startDate: moment(new Date())
    .subtract(12, 'months')
    .format(MONTH_FORMAT)
};

export default () => {
  const [txt, setTxt] = useState('');
  const onChange = useCallback(value => {
    setTxt(JSON.stringify(value));
  });
  const { startDate, endDate } = defaultDate;
  return (
    <div style={{ width: 600 }}>
      <div>显示结果: {txt}</div>
      <div style={{ marginTop: 12 }}>
        <IRangePicker
          picker="month"
          defaultValue={[moment(startDate, MONTH_FORMAT), moment(endDate, MONTH_FORMAT)]}
          onChange={onChange}
          allowClear={true}
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <IRangePicker showTime onChange={onChange} />
      </div>
    </div>
  );
};
```

## Props 配置说明

同 https://ant.design/components/date-picker-cn/

---
nav:
  title: 'hooks'
  path: /hooks
group:
  path: /
---

# Debounce

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { Debounce } from '@b1/hooks';

const Demo = () => {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div style={{ margin: 10 }}>{count}</div>
      <div>
        <Button onClick={Debounce(add, 1000, true)}>add</Button>
      </div>
    </>
  );
};

export default Demo;
```

### 参数列表

| 参数      |                       说明 |   类型   | 默认值 |
| --------- | -------------------------: | :------: | :----: |
| function  |             需要防抖的函数 | Function |   /    |
| delay     |                 防抖的时间 |  Number  |   /    |
| immediate | 第一次是否需要立即触发事件 | Boolean  |  true  |

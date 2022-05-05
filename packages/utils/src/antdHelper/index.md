---
nav:
  title: antdHelper
  path: /utils
group:
  title: antdHelper
  path: /utils/antdHelper
---

# antd 辅助工具

## renderOptions

```js
// Usage
import { renderOptions } from '@b1/utils';
const list1 = [
  { code: 'jack', name: 'Jack'},
  { code: 'lucy', name: 'Lucy'},
  { code: 'tom', name: 'Tom'},
]
const list2 = [
  { value: 'jack', key: 'Jack'},
  { value: 'lucy', key: 'Lucy'},
  { value: 'tom', key: 'Tom'},
]
<div style={{ marginBottom: 12 }}>
  <Select defaultValue={'jack'}>
    { renderOptions(list1) }
  </Select>
</div>
<div style={{ marginBottom: 12 }}>
  <Select defaultValue={'jack'}>
    { renderOptions(list2, 'value', 'key') }
  </Select>
</div>
```

```jsx
import React, { useCallback } from 'react';
import { renderOptions } from '@b1/utils';
import { Select } from 'antd';
const { Option } = Select;
const list1 = [
  { code: 'jack', name: 'Jack' },
  { code: 'lucy', name: 'Lucy' },
  { code: 'tom', name: 'Tom' }
];
const list2 = [
  { value: 'jack', key: 'Jack' },
  { value: 'lucy', key: 'Lucy' },
  { value: 'tom', key: 'Tom' }
];
export default () => {
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Select defaultValue={'jack'}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Select defaultValue={'jack'}>{renderOptions(list1)}</Select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Select defaultValue={'jack'}>{renderOptions(list2, 'value', 'key')}</Select>
      </div>
    </div>
  );
};
```

### api

| 属性项 | 说明                | type                                 | 可选 | required | default |
| :----- | :------------------ | :----------------------------------- | :--- | :------- | :------ |
| list   | Select 的键值对     | { code: RawValue; name: RawValue }[] | -    | true     | -       |
| value  | Select value 的名字 | RawValue                             | -    | false    | -       |
| label  | Select label 的名字 | RawValue                             | -    | false    | -       |

## renderRowOpts

```jsx
import React, { useCallback, useState, useEffect } from 'react';
import { ITable } from '@b1/components';
import { renderRowOpts } from '@b1/utils';
import { Button } from 'antd';
const dataSource = [
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号' },
  { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园2号' },
  { key: '3', name: '胡彦鬼', age: 48, address: '西湖区湖底公园3号' },
  { key: '4', name: '胡彦贵', age: 78, address: '西湖区湖底公园4号' }
];
const opts = {
  show: record => console.log('show'),
  edit: record => console.log('edit'),
  del: record => console.log('del')
};
const conds = {
  show: record => {
    return record.name !== '胡彦贵';
  },
  del: record => {
    return record.name === '胡彦斌';
  }
};
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '住址', dataIndex: 'address', key: 'address' },
  {
    title: '操作',
    width: 150,
    fixed: 'right',
    render: row => renderRowOpts(row, opts, conds)
  }
];

export default () => {
  return <div style={{ width: '100%' }}>{<ITable dataSource={dataSource} columns={columns} />}</div>;
};
```

### api

| 属性项  | 说明                       | type                            | 可选 | required | default |
| :------ | :------------------------- | :------------------------------ | :--- | :------- | :------ |
| rowOrId | table record 或者 recordId | {}                              | -    | true     | -       |
| opts    | 点击图标时的回调           | { del: fn, edit: fn, show: fn } | -    | true     | -       |
| conds   | 显示该图标的条件判断       | { del: fn, edit: fn, show: fn } | -    | false    | -       |

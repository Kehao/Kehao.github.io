---
title: ITable
nav:
  path: /components
group:
  title: 标准化组件
  path: /components/standard
---

## ITable 组件示例

```js
// Usage
import { ITable } from '@b1/components';
```

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

export default () => {
  return <div style={{ width: '100%' }}>{<ITable dataSource={dataSource} columns={columns} />}</div>;
};
```

## Props 配置说明

同 https://ant.design/components/table-cn/

## 自定义 配置说明

| 参数   | 说明         | 类型    | 是否必填 | 可选值 | 默认值 |
| ------ | ------------ | ------- | -------- | ------ | ------ |
| hasNum | 是否显示序号 | boolean | 否       | -      | true   |

## TODO

1. 数据搜索句柄.
2. 转为虚拟表格.

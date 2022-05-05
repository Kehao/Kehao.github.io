---
title: ISmallTable
nav:
  path: /components
group:
  title: 标准化组件
  path: /components/standard
---

## ISmallTable 组件示例

```js
// Usage
import { ISmallTable } from '@b1/components';
```

```jsx
import React, { useCallback, useState, useEffect } from 'react';
import { ISmallTable } from '@b1/components';
import { Button } from 'antd';
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
    songs: ['song1', 'song2'],
    urls: [
      'http://172.17.91.17:8088/file/download?fileIdentity=9c8a6bd92784472c9cccace2a7855c55&name=1.png',
      'http://172.17.91.17:8088/file/download?fileIdentity=45e844e04dcd467a8f84b5c958bd41f5&name=3.jpg'
    ]
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
    urls: ['http://172.17.91.17:8088/file/download?fileIdentity=45e844e04dcd467a8f84b5c958bd41f5&name=3.jpg']
  }
];

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '住址', dataIndex: 'address', key: 'address' }
];

export default () => {
  return (
    <div style={{ width: '100%' }}>
      {
        <ISmallTable
          rowExpandAtts={[
            {
              attr: 'urls',
              format: url => ({ name: url, url: url }),
              columns: [{ title: '地址', width: 200, dataIndex: 'url' }],
              downloadIndex: 'url'
            },
            {
              attr: 'songs',
              format: (song, record) => ({ name: song, no: record.name }),
              columns: [
                { title: '歌曲名字', width: 200, dataIndex: 'name' },
                { title: 'no', width: 200, dataIndex: 'no' }
              ]
            }
          ]}
          dataSource={dataSource}
          columns={columns}
        />
      }
      {
        <ISmallTable
          rowExpandAtts={[
            {
              attr: 'urls1',
              format: url => ({ name: url, url: url }),
              columns: [{ title: '地址', width: 200, dataIndex: 'url' }],
              downloadIndex: 'url'
            },
            {
              attr: 'songs1',
              format: (song, record) => ({ name: song, no: record.name }),
              columns: [
                { title: '歌曲名字', width: 200, dataIndex: 'name' },
                { title: 'no', width: 200, dataIndex: 'no' }
              ]
            }
          ]}
          dataSource={dataSource}
          columns={columns}
        />
      }
      <ISmallTable dataSource={dataSource} columns={columns} />
    </div>
  );
};
```

## Props 配置说明

同 https://ant.design/components/table-cn/

## 自定义 配置说明

### ISmallTable

| 参数          | 说明                           | 类型          | 是否必填 | 可选值 | 默认值 |
| ------------- | ------------------------------ | ------------- | -------- | ------ | ------ |
| rowExpandAtts | 显示 Record 中某个属性的数组值 | RowExpandAtts | 否       | -      | -      |

### rowExpandAtts

| 参数          | 说明                                                         | 类型     | 是否必填 | 可选值 | 默认值 |
| ------------- | ------------------------------------------------------------ | -------- | -------- | ------ | ------ |
| attr          | 属性的名字(Record 中的 dataIndex)                            | string   | 是       | -      | -      |
| format        | 对每一个属性的值进行 format 返回, 相当于 Table 的 dataSource | function | 是       | -      | -      |
| columns       | 子 table 的 columns 值，相当于 Table 的 columns              | {}       | 是       | -      | -      |
| downloadIndex | 当一个属性的值需要下载时, 这个属性在 format 中的 dataIndex   | string   | 否       | -      | -      |

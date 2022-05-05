---
title: SortDrag
nav:
  title: '通用组件'
  path: /components
group:
  path: /components/others
---

## SortDrag 组件示例

```jsx
import React from 'react';
import { SortDrag } from '@b1/components';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceList: [
        { key: '1', title: '11111', name: 'one' },
        { key: '2', title: '22222', name: 'two' },
        { key: '4', title: '44444', name: 'four' },
        { key: '3', title: '33333', name: 'three' }
      ]
    };
  }

  render() {
    return (
      <div style={{ width: 600 }}>
        <div style={{ width: 300 }}>
          <h3>展示数据</h3>
          {this.state.dataSourceList.map((item, index) => {
            return <li key={index}>{JSON.stringify(item)}</li>;
          })}
        </div>
        <div style={{ marginTop: 20 }}>
          <SortDrag
            dataList={this.state.dataSourceList}
            sortCallback={newList => this.setState({ dataSourceList: newList })}
            isNo={true}
            titleName={'name'}
          />
        </div>
      </div>
    );
  }
}
```

### Props 配置说明

| 参数         | 说明             | 类型                          | 是否必填 | 可选值   | 默认值 |
| ------------ | ---------------- | ----------------------------- | -------- | -------- | ------ |
| dataList     | 需排序对象数组   | object[]                      | 是       | 详细说明 | -      |
| sortCallback | 排序后回调函数   | function(newDataList) => void | 是       | -        | -      |
| isNo         | 是否需要序号     | bool                          | 否       | -        | false  |
| titleName    | 名称所显示的键名 | string                        | 否       | -        | title  |
| wrapStyles   | 序号样式         | object                        | 否       | -        | -      |
| ulStyles     | 序列样式         | object                        | 否       | -        | -      |

### dataList 详细说明

| 参数  | 说明     | 类型   | 是否必填 | 可选值 | 默认值 |
| ----- | -------- | ------ | -------- | ------ | ------ |
| key   | 唯一标识 | string | 是       | -      | -      |
| title | 显示名字 | string | 否       | -      | -      |
| \*\*  | 自定义   | string | 否       | -      | -      |

#### 开发者：lxl

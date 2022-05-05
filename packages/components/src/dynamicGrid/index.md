---
nav:
  title: 通用组件
  path: /components
group:
  path: /components/others
---

## DynamicGrid

```jsx
import React from 'react';
import { DynamicGrid } from '@b1/components';
// 听力筛查
const props = {
  data: [
    {
      rowStart: 1,
      render: [
        {
          col: 7,
          content: <b>1行7列</b>
        }
      ]
    },
    {
      rowStart: 2,
      row: 2,
      render: [
        {
          content: <span>2行1列</span>
        },
        {
          col: 2,
          content: <span>2行2列</span>
        },
        {
          col: 2,
          content: <span>2行2列</span>
        },
        {
          col: 2,
          mode: 'vertical',
          content: [<span>1行2列</span>, [<span>1行1列</span>, <span>1行1列</span>]]
        }
      ]
    }
  ],
  col: 'repeat(7, 1fr)',
  row: 'repeat(3, 40px)',
  style: { width: '100%' }
};

export default () => <DynamicGrid {...props} />;
```

## API

| 属性项 | 说明                             | type   | 可选 | required | default |
| :----- | :------------------------------- | :----- | :--- | :------- | :------ |
| data   | 数据源                           | array  | []   | -        | true    | - |
| row    | 同 grid 中 grid-row-start        | string | -    | true     | -       |
| col    | 同 grid 中 grid-template-columns | string | -    | false    | -       |
| style  | 容器的样式                       | string | -    | false    | -       |

### data

| 属性项   | 说明                       | type   | 可选 | required | default |
| :------- | :------------------------- | :----- | :--- | :------- | :------ |
| rowStart | grid 横向网格线, 从 1 开始 | number | -    | true     | -       |
| content  | 网格中的内容               | any    | -    | false    | -       |
| render   | 单行中每列的内容           | array  | -    | true     | -       |
| col      | 所占列的数量               | number | -    | false    | 1       |

### mode

此属性有 horizontal 和 vertical 两种 value, 是一种混合布局, horizontal 是横向布局, vertical 是纵向布局, 有一点需要注意:
假如是横向布局 content 一维数组的长度应等于 col 的数值, 且一维数组中的数组类型的长度等于 row 的数值, 是纵向布局的话 content 一维数据长度等于 row 的数值, 一维数组中不是数组类型
的独占一行或者一列, 为数组类型的平均去对应相应的网格, 所以需要严格对应数组长度与 col/row 之间的关系

### 特别提醒

此组件完全遵照 grid 布局, 从左往右，从上至下的顺序, data 数组中每个对象均是代表一行, 需要开发者计算一下元素与网格之间的对应关系

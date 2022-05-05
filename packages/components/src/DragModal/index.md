---
nav:
  title: '通用组件'
  path: /components
group:
  path: /components/others
---

## DragModal

```jsx
import React, { useState } from 'react';
import { DragModal } from '@b1/components';
import { Button } from 'antd';

const Demo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currPos, setCurrPos] = useState([300, 200]);
  const [wrapStyles, setWrapStyles] = useState({ width: 600, height: 400 });

  const showModal = e => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={showModal}>Open Modal</Button>
      <DragModal visible={isModalVisible} currPos={currPos} onCancel={handleClose} wrapStyles={wrapStyles}>
        <div>
          <br />
          这里是内容
          <br />
          <Button onClick={handleOk}>确定</Button>
        </div>
      </DragModal>
    </>
  );
};

export default Demo;
```

### API 配置说明

| 属性项      | 说明                   | 类型    | 是否必填 | 可选值 | 默认值      |
| ----------- | ---------------------- | ------- | -------- | ------ | ----------- |
| visible     | 对话框是否可见         | boolean | 否       | -      | false       |
| currPos     | 对话框相对于窗口的位置 | Array   | 否       | -      | [left, top] |
| title       | 标题                   | string  | 否       | -      | '标题'      |
| wrapStyles  | 对话框样式             | object  | 否       | -      | -           |
| titleStyles | 标题样式               | object  | 否       | -      | -           |

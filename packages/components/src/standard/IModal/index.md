---
title: IModal
nav:
  path: /components
group:
  title: 标准化组件
  path: /components/standard
---

## Modal 组件示例

```jsx
import React, { useCallback, useState, useEffect } from 'react';
import { IModal } from '@b1/components';
import { Button } from 'antd';

export default () => {
  const [isShow, setIsShow] = useState(false);
  const onClick = useCallback(_ => setIsShow(true));
  const onClose = useCallback(_ => setIsShow(false));
  return (
    <div style={{ width: 600 }}>
      <Button type="primary" onClick={onClick}>
        打开 Modal
      </Button>
      {(isShow && (
        <IModal title={'标题'} visible={true} onCancel={onClose}>
          Modal内容
        </IModal>
      )) ||
        ''}
    </div>
  );
};
```

## Props 配置说明

同 https://ant.design/components/modal-cn/

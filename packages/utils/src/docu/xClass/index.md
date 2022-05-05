---
title: xClass
nav:
  path: /utils
group:
  title: docu
  path: /utils/docu
---

# css 类操作

```js
// Usage
import { docu } from '@b1/utils';
docu.hasClass(el, 'test1');
docu.addClass(el, 'test1');
docu.addClass(el, ['test1', 'test2']);
docu.removeClass(el, 'test1');
docu.removeClass(el, ['test1', 'test2']);
```

```less
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
.fontSize {
  font-size: 18px;
}
```

```jsx
import { docu } from '@b1/utils';
import React, { useCallback, useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import './md.less';
export default () => {
  const [classNames, setClassNames] = useState('');
  const [has, setHas] = useState({ red: null, bold: null });
  const getClassNames = () => document.querySelector('#testClass').className;
  useEffect(() => {
    setClassNames(getClassNames());
  }, []);

  const onHasClass = useCallback(testClass => {
    const el = document.querySelector('#testClass');
    const has = docu.hasClass(el, testClass);
    setHas({
      [testClass]: has
    });
  });
  const onRemoveClass = useCallback(testClass => {
    const el = document.querySelector('#testClass');
    docu.removeClass(el, testClass);
    setClassNames(getClassNames());
  });
  const onAddClass = useCallback(testClass => {
    const el = document.querySelector('#testClass');
    docu.addClass(el, testClass);
    setClassNames(getClassNames());
  });
  return (
    <Row>
      <Col span={24}>
        <div id={'testClass'} className={'red bold fontSize'}>
          测试div
        </div>
      </Col>
      <Col span={24}>
        <div>classNames: {classNames}</div>
      </Col>
      <Col span={8}>
        <Button type="primary" htmlType="button" onClick={() => onHasClass('red')}>
          hasClass(element, 'red')
        </Button>
        {(has.red === true && <span>是</span>) || ''}
        {(has.red === false && <span>否</span>) || ''}
      </Col>
      <Col span={8}>
        <Button type="primary" htmlType="button" onClick={() => onRemoveClass('red')}>
          removeClass(element, 'red')
        </Button>
      </Col>
      <Col span={8}>
        <Button type="primary" htmlType="button" onClick={() => onAddClass('red')}>
          addClass(element, 'red')
        </Button>
      </Col>

      <Col span={8}>
        <Button type="primary" htmlType="button" onClick={() => onHasClass('bold')}>
          hasClass(element, 'bold')
        </Button>
        {(has.bold === true && <span>是</span>) || ''}
        {(has.bold === false && <span>否</span>) || ''}
      </Col>
      <Col span={8}>
        <Button type="primary" htmlType="button" onClick={() => onRemoveClass(['red', 'bold'])}>
          removeClass(element, ['red', 'bold'])
        </Button>
      </Col>
      <Col span={8}>
        <Button type="primary" htmlType="button" onClick={() => onAddClass(['bold', 'red'])}>
          addClass(element, ['bold', 'red'])
        </Button>
      </Col>
    </Row>
  );
};
```

## hasClass(element, className)

| 参数项    | 说明      | type        | 可选 | required | default |
| :-------- | :-------- | :---------- | :--- | :------- | :------ |
| element   | HTML 元素 | HTMLElement | -    | true     | -       |
| className | 类名      | string      | -    | true     | -       |

## removeClass(element, classNames)

## addClass(element, classNames)

| 参数项     | 说明      | type               | 可选 | required | default |
| :--------- | :-------- | :----------------- | :--- | :------- | :------ |
| element    | HTML 元素 | HTMLElement        | -    | true     | -       |
| classNames | 类名      | string or string[] | -    | true     | -       |

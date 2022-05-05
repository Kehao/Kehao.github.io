---
title: getRect
nav:
  path: /utils
group:
  title: docu
  path: /utils/docu
---

# getRect

```js
// Usage
import { docu } from '@b1/utils';
docu.getRect(document.querySelector('#testElement'));
```

```jsx
import { docu } from '@b1/utils';
import React, { useState, useEffect } from 'react';

const style = {
  width: '10%',
  height: '100px',
  background: '#eee'
};
export default () => {
  const [result, setResult] = useState('');
  useEffect(() => {
    setResult(docu.getRect(document.querySelector('#testElement')));
  }, []);
  return (
    <div>
      <div id={'testElement'} style={style} />
      <div>{JSON.stringify(result)}</div>
    </div>
  );
};
```

## getRect(element)

| 参数项  | 说明      | type        | 可选 | required | default |
| :------ | :-------- | :---------- | :--- | :------- | :------ |
| element | HTML 元素 | HTMLElement | -    | true     | -       |

---
nav:
  title: uri
  path: /utils
group:
  title: uri
  path: /utils/uri
---

# uri 辅助工具

```js
// Usage:
import { getParams, urlEncode } from '@b1/utils';
console.log(getParams('http://localhost:8000/utils/uri/uri?a=b1&c=22'));
// {a: 'b1', c: '22'}
console.log(getParams());
console.log(getParams(location));

console.log(urlEncode({ a: 1, b: 2 }));
// ?a=1&b=2
console.log(urlEncode({ a: '?%123', b: '123$' }));
// ?a=%3F%25123&b=123%24
```

## getParams 获取 url 参数

| 属性项        | 说明                   | type                      | 可选 | required | default  |
| :------------ | :--------------------- | :------------------------ | :--- | :------- | :------- |
| locationOrUrl | 需要解析的对象或字符串 | Location/string/undefined | -    | false    | location |

## urlEncode 把对象转化为 url 字符串

| 属性项        | 说明               | type      | 可选 | required | default |
| :------------ | :----------------- | :-------- | :--- | :------- | :------ |
| locationOrUrl | 需要转化的参数对象 | RecordAny | -    | true     | -       |

---
title: deepClone
nav:
  path: /utils
group:
  title: common
  path: /utils/common
---

# deepClone 函数

```js
// Usage
import { deepClone } from '@b1/utils';

const data = {
  name: 'Jack',
  age: 22,
  friends: ['Tina', 'Tom', 'Bob'],
  grade: {
    math: 'A',
    english: 'B'
  }
};

const clonedData = deepClone(data);

console.log(clonedData === data); // false
console.log(clonedData.name === data.name); // true
console.log(clonedData.friends === data.friends); // false
console.log(clonedData.grade === data.grade); // false
console.log(clonedData.grade.math === data.grade.math); // true
```

```jsx
// Usage
import { deepClone } from '@b1/utils';

const data = {
  name: 'Jack',
  age: 22,
  friends: ['Tina', 'Tom', 'Bob'],
  grade: {
    math: 'A',
    english: 'B'
  }
};

const clonedData = deepClone(data);

console.log(clonedData === data); // false
console.log(clonedData.name === data.name); // true
console.log(clonedData.friends === data.friends); // false
console.log(clonedData.grade === data.grade); // false
console.log(clonedData.grade.math === data.grade.math); // true
```

支持以下数据的深克隆：

String
Boolean
Number
BigInt
Date
Regexp
Symbol
Error
Object
List
Map
Set
null
undefined
NaN

注意：WeakMap 和 WeakSet 因为不支持遍历，所以无法作深克隆，将会返回原值。

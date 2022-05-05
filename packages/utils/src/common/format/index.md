---
title: format
nav:
  path: /utils
group:
  title: common
  path: /utils/common
---

# format 格式化

```js
// Usage
import { formatFloat, formatText, formatPercent } from '@b1/utils';
import React, { useState, useEffect } from 'react';
const test1 = 1;
const test2 = 1.1;
const test3 = '1';
// formatFloat:
console.log(formatFloat(test1), formatFloat(test2), formatFloat(test3));
// 1.000 1.100 1.000
console.log(formatFloat(test1, 2), formatFloat(test2, 2), formatFloat(test3, 2));
// 1.00 1.10 1.00
console.log(formatFloat(test1, 2, true), formatFloat(test2, 2, true), formatFloat(test3, 2));
// 100.00 110.00 1.00

// formatPercent:
console.log(formatPercent(test1), formatPercent(test2), formatPercent(test3));
// 1.000% 1.100% 1.000%
console.log(formatPercent(test1, 2), formatPercent(test2, 2), formatPercent(test3, 2));
// 1.00% 1.10% 1.00%
console.log(formatPercent('45%', 2));
// 45.00%

// formatText:
console.log(formatText('测试测试测试'));
// 测试测试...
console.log(formatText('测试测试测试', 2));
// 测试...
console.log(formatText('测试测试测试', 10));
// 测试测试测试
```

## formatFloat

| 参数项    | 说明             | type             | 可选 | required | default |
| :-------- | :--------------- | :--------------- | :--- | :------- | :------ |
| value     | 需要 format 的值 | string or number | -    | true     | -       |
| len       | 保留几位小数     | number           | -    | false    | 3       |
| isPercent | 是否 \* 100      | bool             | -    | false    | false   |

## formatPercent

| 参数项  | 说明             | type             | 可选 | required | default |
| :------ | :--------------- | :--------------- | :--- | :------- | :------ |
| percent | 需要 format 的值 | string or number | -    | true     | -       |
| len     | 保留几位小数     | number           | -    | false    | 3       |

## formatText

| 参数项 | 说明                 | type   | 可选 | required | default |
| :----- | :------------------- | :----- | :--- | :------- | :------ |
| str    | 需要 format 的字符串 | string | -    | true     | -       |
| len    | 保留几位字符         | number | -    | false    | 4       |

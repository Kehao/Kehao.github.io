---
nav:
  title: Typer类型判断
  path: /utils
group:
  title: Typer类型判断
  path: /utils/Typer
---

# Typer

```js
// Usage
import { Typer } from '@b1/utils';

Typer.isNumber(123); // true
Typer.isSymbol(Symbol('1')); // true
Typer.isMap(new Map()); // true
Typer.isMap({}); // false
Typer.isObject({}); // true

Typer.isEmail('jack@gmail.com'); // true
Typer.isUrl('https://www.baidu.com'); // true

Typer.create('exprData', data => {
  // 例：expr1:65,50-80
  return /^[\w-]+:\d+(\.\d+)?,\d+(\.\d+)?-\d+(\.\d+)?/.test(data);
});
Typer.is('nova:12,10-20', 'exprData'); // true
Typer.is('nova,12,10-20', 'exprData'); // false
Typer.is('nova:12,10-20', 'qweasd'); // false，type 不存在时也返回 false
```

## get

获取数据的类型

| 参数 |       说明       |
| :--: | :--------------: |
| data | 要获取类型的数据 |

| 返回值类型 |                        说明                        |
| :--------: | :------------------------------------------------: |
|   string   | 表示参数 data 的数据类型，如：'number', 'array' 等 |

例：

```js
const a = 'a string';
const obj = {};

Typer.get(a); // 'string'
Typer.get(obj); // 'object'
```

## isXxx

is 开头的方法，用于检查数据类型。包括基础类型和扩展类型

基础类型方法：isNumOrNumStr，isNumber，isBigInt，isString，isBoolean，isArray，isArguments，isObject，isMap，isWeakMap，isSet，isWeakSet，isDate，isRegExp，isSymbol，isFunction，isError

扩展类型方法：isPhoneNumber，isEmail，isUrl，isChinese

| 参数 |       说明       |
| :--: | :--------------: |
| data | 要获取类型的数据 |

| 返回值类型 |              说明              |
| :--------: | :----------------------------: |
|  boolean   | 表示参数 data 是否为相应的类型 |

例：

```js
const a = 'a string';
const obj = {};
const url = 'https://www.baidu.com';

Typer.isString(a); // true
Typer.isMap(obj); // false
Typer.isUrl(url); // true
```

## create

创建一种自定义类型，并提供类型判断函数

|   参数   |                            说明                             |
| :------: | :---------------------------------------------------------: |
| typeName |                      自定义类型的名称                       |
| validFn  | 类型检测方法，是一个接收 data 参数，返回 boolean 变量的函数 |

例：

```js
Typer.create('password', data => {
  return /\w{6,18}/.test(data);
});

Typer.is('123456', 'password'); // true
Typer.is('admin', 'password'); // false
```

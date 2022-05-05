---
title: 快速开始
order: 1
nav:
  order: 1
  title: Msgs
  path: /msgs
group:
  path: /
---

[![npm](https://img.shields.io/npm/dw/@b1/msgs?label=%E4%B8%8B%E8%BD%BD%E9%87%8F)](https://npmjs.com/package/@b1/msgs)
&nbsp;
[![npm](https://img.shields.io/npm/dm/@b1/msgs?label=%E4%B8%8B%E8%BD%BD%E9%87%8F)](https://npmjs.com/package/@b1/msgs)
&nbsp;
[![npm (scoped)](https://img.shields.io/npm/v/@b1/msgs)](https://npmjs.com/package/@b1/msgs)
&nbsp;
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@b1/msgs)](https://npmjs.com/package/@b1/msgs)
&nbsp;
[![NPM](https://img.shields.io/npm/l/@b1/msgs)](https://npmjs.com/package/@b1/msgs)
&nbsp;
[![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@b1/msgs)](https://npmjs.com/package/@b1/msgs)

### 依赖安装

```bash
$ npm i @b1/msgs
```

```js
// Usage
import { login, updatePassword, v } from '@b1/msgs';
console.log(login.ok, updatePassword.fail, v.password_1);
// 登录成功! 密码修改失败! 密码8-16位，必须包括字母和数字!

export const login: Record<string, string> = {
  ok: '登录成功!',
  fail: '登录失败了!',
  fail_1: '用户名或密码错误!',
  fail_2: '当前密码安全性较低, 请修改密码后重新登录!'
};
export const updatePassword: Record<string, string> = {
  ok: '密码修改成功, 请重新登录系统!',
  ok_1: '密码修改成功!',
  fail: '密码修改失败!'
};
// validation
export const v: Record<string, string> = {
  password_1: '密码8-16位，必须包括字母和数字!',
  password_2: '两次输入的密码不一致',
  password_3: '新密码不能与旧密码相同',
  password_4: '密码不能为空!',
  password_5: '请再次输入新密码!'
};
```

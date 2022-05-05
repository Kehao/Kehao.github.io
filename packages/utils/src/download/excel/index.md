---
title: 'excel'
nav:
  path: /utils
group:
  title: download
  path: /utils/download
---

# excel 下载

```js
// Usage
import { download } from '@b1/utils';
const downloadUrl = 'http://172.17.91.17:8088/excelImport/downloadExcelTemplate';
const params = {
  type: 'personnelInfo',
  filename: '个人信息上传模板',
  filetype: 'xls',
  userToken:
    '6578706972654461746534333230306e6f77446174653136343536383030313938353572616e646f6d353737367573657249646266336239623665663035663463393861653832393436336539303933333737'
};
download.excel(downloadUrl, params);
```

```jsx
import React, { useCallback } from 'react';
import { download } from '@b1/utils';
import { Button } from 'antd';
const downloadUrl = 'http://172.17.91.17:8088/excelImport/downloadExcelTemplate';
const params = {
  type: 'personnelInfo',
  filename: '个人信息上传模板',
  filetype: 'xls',
  userToken:
    '6578706972654461746534333230306e6f77446174653136343536383030313938353572616e646f6d353737367573657249646266336239623665663035663463393861653832393436336539303933333737'
};
export default () => {
  const onClick = useCallback(() => {
    download.excel(downloadUrl, params);
  });
  return (
    <Button type="primary" htmlType="button" onClick={onClick}>
      下载excel(.xls)
    </Button>
  );
};
```

## download.xlsx

| 属性项    | 说明                    | type   | 可选            | required | default |
| :-------- | :---------------------- | :----- | :-------------- | :------- | :------ |
| filename  | 文件名                  | string | -               | true     | -       |
| filetype  | 扩展名                  | string | ['xls', 'xlsx'] | false    | 'xlsx'  |
| userToken | 用户 user_token         | string | -               | false    | -       |
| 其它      | 会被拼接到 get 请求后面 | {}     | -               | false    | -       |

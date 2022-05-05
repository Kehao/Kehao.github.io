---
title: PasswordModal
nav:
  title: 通用组件
  path: /components
group:
  path: /components/others
---

# PasswordModal 修改密码弹出框

```jsx
import React, { useCallback, useState, useEffect } from 'react';
import { PasswordModal } from '@b1/components';
import { Button, message } from 'antd';
export default () => {
  const [isShow, setIsShow] = useState(false);
  const onClick = useCallback(_ => setIsShow(true));
  const onClose = useCallback(_ => setIsShow(false));
  // 真实的account，如:
  const account = 'admin';
  // 真实的keyPairPromise, 如:
  // const getKeyPair = account => {
  //   return dispatch({
  //     type: 'login/getModifyPasswordKeyPair',
  //     payload: { account },
  //   });
  // };
  const keyPairPromise = account => {
    return new Promise((resolve, reject) => {
      resolve({
        code: 1,
        data:
          'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCW4WQf2eDIawNx7QgHbvgmcz6V0GgDYf0qGOEk0msrpIqE+okDTz2ndrOtGziz5pVoLYmGwdDwzqCWRehZfItaDg2qhB7G8WBVcPoL1hiR0gavkT2g4G8A62vlB2iU706EVwrFs7U+WhK7OHFFgwcmGmNeEPyIws8nlhjvK90P7QIDAQAB'
      });
    });
  };
  // 真实的modifyPasswordPromise, 如:
  // const modifyPasswordPromise = (publicKey, values) => {
  //   return dispatch({
  //     type: 'login/modifyPassword',
  //     payload: {
  //       account,
  //       oldPassword: PasswordModal.encryptHandle(publicKey, values.oldPassword),
  //       newPassword: PasswordModal.encryptHandle(publicKey, values.newPassword),
  //     },
  //   });
  // };
  const modifyPasswordPromise = (publicKey, values) => {
    return new Promise((resolve, reject) => {
      resolve({ code: 1, success: true });
    });
  };
  // 真实的onSubmit, 如:
  const onSubmit = useCallback(values => {
    keyPairPromise(account).then(resp1 => {
      if (resp1.code === 1 && resp1.data) {
        modifyPasswordPromise(resp1.data, values).then(resp2 => {
          if (resp2.code === 1 && resp2.success === true) {
            setIsShow(false);
            message.success('密码修改成功!');
          } else {
            message.error('密码修改失败!');
          }
        });
      }
    });
  });
  return (
    <div style={{ width: 600 }}>
      <Button type="primary" onClick={onClick}>
        修改密码
      </Button>
      {(isShow && <PasswordModal onSubmit={onSubmit} onClose={() => setIsShow(false)} />) || ''}
    </div>
  );
};
```

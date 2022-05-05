---
title: jsEncrypt
nav:
  path: /utils
group:
  title: common
  path: /utils/common
---

# jsEncrypt rsa 加密

```jsx
// Usage
import { strEncrypt, strDecrypt } from '@b1/utils';
import React, { useState } from 'react';
import { Button, Input } from 'antd';
const { TextArea } = Input;
export default () => {
  const [value, setValue] = useState('123456');
  const [valueNext, setvalueNext] = useState('');
  // rsa公钥
  const [publicKey, setPublicKey] = useState(
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1QQRl0HlrVv6kGqhgonD6A9SU6ZJpnEN+Q0blT/ue6Ndt97WRfxtSAs0QoquTreaDtfC4RRX4o+CU6BTuHLUm+eSvxZS9TzbwoYZq7ObbQAZAY+SYDgAA5PHf1wNN20dGMFFgVS/y0ZWvv1UNa2laEz0I8Vmr5ZlzIn88GkmSiQIDAQAB'
  );
  // rsa私钥
  const [privateKey, setPrivateKey] = useState(
    'MIICXAIBAAKBgQC1QQRl0HlrVv6kGqhgonD6A9SU6ZJpnEN+Q0blT/ue6Ndt97WRfxtSAs0QoquTreaDtfC4RRX4o+CU6BTuHLUm+eSvxZS9TzbwoYZq7ObbQAZAY+SYDgAA5PHf1wNN20dGMFFgVS/y0ZWvv1UNa2laEz0I8Vmr5ZlzIn88GkmSiQIDAQABAoGBAKYDKP4AFlXkVlMEP5hS8FtuSrUhwgKNJ5xsDnFV8sc3yKlmKp1a6DETc7N66t/Wdb3JVPPSAy+7GaYJc7IsBRZgVqhrjiYiTO3ZvJv3nwAT5snCoZrDqlFzNhR8zvUiyAfGD1pExBKLZKNH826dpfoKD2fYlBVOjz6i6dTKBvCJAkEA/GtL6q1JgGhGLOUenFveqOHJKUydBAk/3jLZksQqIaVxoB+jRQNOZjeSO9er0fxgI2kh0NnfXEvH+v326WxjBwJBALfTRar040v71GJq1m8eFxADIiPDNh5JD2yb71FtYzH9J5/d8SUHI/CUFoROOhxr3DpagmrnTn28H0088vubKe8CQDKMOhOwx/tS5lqvN0YQj7I6JNKEaR0ZzRRuEmv1pIpAW1S5gTScyOJnVn1tXxcZ9xagQwlT2ArfkhiNKxjrf5kCQAwBSDN5+r4jnCMxRv/Kv0bUbY5YWVhw/QjixiZTNn81QTk3jWAVr0su4KmTUkg44xEMiCfjI0Ui3Ah3SocUAxECQAmHCjy8WPjhJN8y0MXSX05OyPTtysrdFzm1pwZNm/tWnhW7GvYQpvE/iAcNrNNb5k17fCImJLH5gbdvJJmCWRk='
  );
  const [encryptValue, setEncryptValue] = useState('');
  const [decryptValue, setDecryptValue] = useState('');
  const encryptClick = () => {
    setEncryptValue(strEncrypt(value, publicKey));
  };
  const decryptClick = () => {
    setDecryptValue(strDecrypt(valueNext, privateKey));
  };
  return (
    <div style={{ width: 800 }}>
      加密值：
      <Input style={{ width: 800 }} value={value} onChange={e => setValue(e.target.value)} />
      <br />
      公钥：
      <TextArea rows={4} style={{ width: 800 }} value={publicKey} onChange={e => setPublicKey(e.target.value)} />
      <Button type="primary" onClick={() => encryptClick()}>
        RSA加密
      </Button>
      <div style={{ width: 600, wordBreak: 'break-word' }}>加密后的值: {encryptValue}</div>
      <br />
      解密值：
      <TextArea rows={4} style={{ width: 800 }} value={valueNext} onChange={e => setvalueNext(e.target.value)} />
      私钥：
      <TextArea rows={4} style={{ width: 800 }} value={privateKey} onChange={e => setPrivateKey(e.target.value)} />
      <Button type="primary" onClick={() => decryptClick()}>
        RSA解密
      </Button>
      <div style={{ width: 600 }}>解密后的值: {decryptValue}</div>
    </div>
  );
};
```

## strEncrypt

| 参数项    | 说明         | type             | 可选 | required | default |
| :-------- | :----------- | :--------------- | :--- | :------- | :------ |
| value     | 需要加密的值 | string or number | -    | true     | -       |
| publicKey | rsa 加密公钥 | string           | -    | true     | -       |

## strDecrypt

| 参数项     | 说明         | type             | 可选 | required | default |
| :--------- | :----------- | :--------------- | :--- | :------- | :------ |
| value      | 需要解密的值 | string or number | -    | true     | -       |
| privateKey | rsa 加密私钥 | string           | -    | true     | -       |

###### 注意 ，采用默认格式 BEGIN PUBLIC KEY 与 BEGIN PRIVATE KEY

---
title: UnifiedLogin
nav:
  title: '通用组件'
  path: /components
group:
  path: /components/others
---

## UnifiedLogin 组件示例

```jsx
import React from 'react';
import { Input } from 'antd';
import { UserOutlined, LockOutlined, TabletOutlined, SmileOutlined } from '@ant-design/icons';
import { UnifiedLogin } from '@b1/components';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueList: {},
      dataSourceList: [
        {
          key: 'account',
          title: '账号',
          type: 'account',
          className: 'accountClass',
          icon: <UserOutlined className="site-form-item-icon" />,
          attribute: { placeholder: '请输入账号' },
          onChange: value => {
            console.log('account onChange callBack', value);
          },
          callBack: () => {
            console.log('account callBack');
          }
        },
        {
          key: 'password',
          title: '密码',
          type: 'password',
          className: 'passwordClass',
          icon: <LockOutlined className="site-form-item-icon" />,
          attribute: { placeholder: '请输入密码' }
        },
        {
          key: 'mobile',
          title: '手机',
          type: 'mobile',
          className: 'mobileClass',
          icon: <TabletOutlined className="site-form-item-icon" />,
          attribute: { placeholder: '请输入手机号码' }
        },
        {
          key: 'captcha',
          title: '验证码',
          type: 'captcha',
          className: 'captchaClass',
          icon: <SmileOutlined className="site-form-item-icon" />,
          attribute: { placeholder: '请输入验证码', maxLength: 4 },
          callBack: value => {
            console.log('captcha callBack', value);
          }
          // captchaDom: '1234'
        },
        {
          key: 'code',
          title: '验证码',
          type: 'code',
          className: 'codeClass',
          icon: <SmileOutlined className="site-form-item-icon" />,
          attribute: { placeholder: '请输入验证码' },
          onClick: () => {
            console.log(6666);
          }
        },
        {
          title: '其他',
          type: 'otherType',
          className: 'otherTypeClass',
          content: <Input />
        }
      ]
    };
  }
  loginFunction = value => {
    console.log('loginFunction', value);
  };
  loginButtonData = {
    buttonLabel: '统一登录',
    successFunction: this.loginFunction
  };
  // 校验统一在点击登录按钮是校验，如果有需要可以每一栏callback中校验并保存错误状态，在此回调
  loginFilter = value => {
    console.log('loginFilter', value);
    return { code: 'success', info: '' };
    // return {code: 'failed', info: '账号错误'}
  };
  render() {
    return (
      <div style={{ width: 400 }}>
        <UnifiedLogin
          value={this.state.valueList}
          dataSource={this.state.dataSourceList}
          loginButton={this.loginButtonData}
          // loginFilter={this.loginFilter}
        />
      </div>
    );
  }
}
```

### Props 配置说明

| 参数        | 说明             | 类型                             | 是否必填 | 可选值   | 默认值                      |
| ----------- | ---------------- | -------------------------------- | -------- | -------- | --------------------------- |
| value       | 登录表单内部元素 | object                           | 否       | 详细说明 | -                           |
| dataSource  | 登录表单数据源   | object[]                         | 是       | 详细说明 | -                           |
| loginButton | 登录按钮配置     | object                           | 是       | 详细说明 | -                           |
| loginFilter | 登录校验         | function(values) => {code, info} | 否       | -        | {code: 'success', info: ''} |

### Props.value 详细说明

| 参数     | 说明           | 类型   | 是否必填 | 可选值 | 默认值 |
| -------- | -------------- | ------ | -------- | ------ | ------ |
| account  | 账号           | string | 否       | -      | -      |
| captcha  | 验证码         | string | 否       | -      | -      |
| code     | 手机验证码     | string | 否       | -      | -      |
| mobile   | 手机号         | string | 否       | -      | -      |
| password | 密码           | string | 否       | -      | -      |
| \*\*     | 自定义栏目键名 | string | 否       | -      | -      |

### Props.dataSource 详细说明

| 参数       | 说明             | 类型               | 是否必填 | 可选值                                       | 默认值 |
| ---------- | ---------------- | ------------------ | -------- | -------------------------------------------- | ------ |
| key        | 唯一标识         | string             | 是       | -                                            | -      |
| title      | 栏目 title       | string             | 是       | -                                            | -      |
| type       | 栏目类型         | string             | 是       | account / password / mobile / captcha / code | -      |
| icon       | 图标             | component          | 否       | -                                            | -      |
| className  | class 名         | string             | 否       | -                                            | -      |
| captchaDom | 验证码自定义内容 | component / string | 否       | -                                            | -      |
| onChange   | change 事件      | function(values)   | 否       | -                                            | -      |
| callBack   | blur 事件        | function(values)   | 否       | -                                            | -      |
| content    | 自定义栏内容     | component          | 否       | -                                            | -      |

### Props.loginButton 详细说明

| 参数            | 说明         | 类型             | 是否必填 | 可选值 | 默认值 |
| --------------- | ------------ | ---------------- | -------- | ------ | ------ |
| buttonLabel     | 登录显示名称 | string           | 否       | -      | 登录   |
| successFunction | 登录方法     | function(values) | 是       | -      | -      |
| buttonStyle     | 登录按钮样式 | object           | 否       | -      | -      |

/* eslint-disable */
export interface loginValue {
  [keyName: string]: any;
}
export interface loginButton {
  buttonStyle?: any;
  buttonLabel: string;
  successFunction: Function;
}
export interface LoginItem {
  key: string; // 唯一标识
  title: string; // 栏目title
  type: 'account' | 'password' | 'mobile' | 'captcha' | 'code'; // 暂时只支持：账号、密码、手机号、手机验证码、验证码
  icon?: any; // 图标
  className?: string;
  captchaDom?: any; // 验证码自定义内容
  onChange?: (v: string) => void; // change回调
  callBack?: (v: string) => void; // blur回调
  content?: any; // 自定义内容
}
export interface LoginProps {
  value: loginValue; // 值
  dataSource: LoginItem[]; // 数据源
  loginButton: loginButton; // 登录按钮
  loginFilter?: (v: loginValue) => void; // 监听函数
}

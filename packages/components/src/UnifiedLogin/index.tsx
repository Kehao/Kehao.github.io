/* eslint-disable */
import React, { useState, useCallback, FC } from 'react';
import { Input, Form, Button } from 'antd';
import { LoginProps } from './interface';
import Captcha from 'react-captcha-code';
import './style/index.less';

const FormItem = Form.Item;

// 深拷贝处理 深层递归
const deepCopy = (source: any) => {
  const result: any = Array.isArray(source) ? [] : {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      result[key] = typeof source[key] === 'object' && source[key] !== null ? deepCopy(source[key]) : source[key];
    }
  }
  return result;
};

const UnifiedLogin: React.FC<LoginProps> = ({ value, dataSource, loginButton, loginFilter }) => {
  const [captchaValue, setCaptchaValue] = useState<string>(''); // 内部验证码的值
  const [errorMessage, setErrorMessage] = useState<string>(''); // 内部错误信息提示
  const [loginValue, setLoginValue] = useState<any>(value); // 内部登录值

  const msgRef = React.useRef<any>(null);
  const captchaRef = React.useRef<HTMLCanvasElement>();
  let disabledCount: boolean = false;
  let currentTime: number = 59;
  let interval: any = '';
  // 发送短信倒计时，防抖
  const countDown = (clickEvent: Function) => {
    if (!disabledCount) {
      disabledCount = true;
      msgRef.current.innerHTML = '59s';
      clickEvent();
      interval = setInterval(() => {
        // eslint-disable-next-line no-plusplus
        currentTime--;
        let time = `${currentTime}s`;
        if (currentTime === 0) {
          clearInterval(interval);
          time = '重新发送';
          msgRef.current.innerHTML = time;
          currentTime = 59;
          disabledCount = false;
        }
        msgRef.current.innerHTML = time;
      }, 1000);
    }
  };
  // 验证码生成
  const handleClick = useCallback(captcha => {
    setCaptchaValue(captcha);
  }, []);
  // 处理值
  const handleValue = (e: any, type: string, changeFun: FC) => {
    const newValue = e.target.value.trim(); // 区空格
    changeFun && changeFun(newValue); // 回调函数
    const loginTempValue = deepCopy(loginValue);
    loginTempValue[type] = newValue;
    setLoginValue(loginTempValue);
  };
  const formItemsObj = (data: any, valueObject: any) => {
    const keyDownFunction = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onFinish();
      }
    };
    return (
      data.length &&
      data.map((item: any) => {
        if (item.type === 'account') {
          return (
            <FormItem key={item.type} className={item.className}>
              <Input
                prefix={item.icon}
                initialvalue={valueObject.account}
                onBlur={item.callBack}
                onKeyDown={keyDownFunction}
                onChange={(e: any) => handleValue(e, item.type, item.onChange)}
                {...item.attribute}
              />
            </FormItem>
          );
        }
        if (item.type === 'password') {
          return (
            <FormItem key={item.type} className={item.className}>
              <Input
                prefix={item.icon}
                type="password"
                initialvalue={valueObject.password}
                onBlur={item.callBack}
                onKeyDown={keyDownFunction}
                onChange={(e: any) => handleValue(e, item.type, item.onChange)}
                {...item.attribute}
              />
            </FormItem>
          );
        }
        if (item.type === 'mobile') {
          return (
            <FormItem key={item.type} className={item.className}>
              <Input
                prefix={item.icon}
                initialvalue={valueObject.mobile}
                onBlur={item.callBack}
                onKeyDown={keyDownFunction}
                onChange={(e: any) => handleValue(e, item.type, item.onChange)}
                {...item.attribute}
              />
            </FormItem>
          );
        }
        if (item.type === 'captcha') {
          const handleRef = (ref: any) => {
            captchaRef.current = ref.current;
          };
          const blurHandle = (e: any) => {
            e.stopPropagation();
            if (!item.captchaDom) {
              item.callBack(captchaValue);
            } else {
              item.callBack(item.captchaDom);
            }
          };
          return (
            <FormItem key={item.type} className={item.className}>
              <div>
                <div style={{ width: '60%', float: 'left' }}>
                  <Input
                    prefix={item.icon}
                    initialvalue={valueObject.captcha}
                    onBlur={blurHandle}
                    onKeyDown={keyDownFunction}
                    onChange={(e: any) => handleValue(e, item.type, item.onChange)}
                    {...item.attribute}
                  />
                </div>
                <div style={{ width: '36%', float: 'left', marginLeft: '4%' }}>
                  <div
                    style={{
                      height: 32,
                      lineHeight: '32px',
                      textAlign: 'center'
                    }}
                  >
                    {item.captchaDom ? (
                      <span style={{ fontFamily: 'initial' }}>{item.captchaDom || ''}</span>
                    ) : (
                      <Captcha onRef={handleRef} charNum={4} onChange={handleClick} height={32} bgColor={'#feffe7'} />
                    )}
                  </div>
                </div>
              </div>
            </FormItem>
          );
        }
        if (item.type === 'code') {
          const changeType = () => {
            countDown(item.onClick);
          };
          return (
            <FormItem key={item.type} className={item.className}>
              <div>
                <div style={{ width: '60%', display: 'inline-block' }}>
                  <Input
                    prefix={item.icon}
                    initialvalue={valueObject.code}
                    onBlur={item.callBack}
                    onKeyDown={keyDownFunction}
                    onChange={(e: any) => handleValue(e, item.type, item.onChange)}
                    {...item.attribute}
                  />
                </div>
                <div
                  style={{
                    width: '36%',
                    display: 'inline-block',
                    marginLeft: '4%'
                  }}
                >
                  <Button className="getCodeButton" onClick={changeType}>
                    <span ref={msgRef}>获取验证码</span>
                  </Button>
                </div>
              </div>
            </FormItem>
          );
        }
        return (
          <FormItem key={item.type} className={item.className}>
            {item.content}
          </FormItem>
        );
      })
    );
  };
  // 因不使用form默认name属性，故values字段无效
  const onFinish = () => {
    let loginFilterStatus: any = { code: 'success', info: '' };
    for (const data in dataSource) {
      if (
        (!loginValue.hasOwnProperty(dataSource[data].type) || loginValue[dataSource[data].type] === '') &&
        !dataSource[data].content
      ) {
        loginFilterStatus = {
          code: 'failed',
          info: `请输入${dataSource[data].title}`
        };
        break;
      } else {
        loginFilterStatus = { code: 'success', info: '' };
      }
    }
    if (loginFilterStatus.code === 'success') {
      setErrorMessage('');
      // 无错的情况单独处理验证码
      dataSource.forEach((item: any) => {
        // 默认情况就验证
        if (!item.captchaDom && item.type === 'captcha' && captchaValue !== loginValue.captcha) {
          loginFilterStatus = { code: 'failed', info: '验证码错误' };
          captchaRef.current && captchaRef.current.click(); // 主动调用click，用于更换验证码， 防止current不存在
        }
      });
    }
    if (loginFilterStatus.code === 'success' && loginFilter) {
      loginFilterStatus = loginFilter(loginValue);
    }
    // 默认先清空错误信息
    if (loginFilterStatus.code === 'success') {
      loginButton.successFunction && loginButton.successFunction(loginValue);
    } else {
      setErrorMessage(loginFilterStatus.info);
    }
  };
  return (
    <Form name="loginForm" className="loginForm" onFinish={onFinish}>
      {formItemsObj(dataSource, value)}
      <div style={{ color: '#F04F43', marginBottom: 8, height: 24 }}>{errorMessage}</div>
      <FormItem>
        <Button type="primary" htmlType="submit" className="loginFormButton" style={loginButton.buttonStyle}>
          {loginButton.buttonLabel || '登录'}
        </Button>
      </FormItem>
    </Form>
  );
};
export default UnifiedLogin;

import React, { useState, useRef, useEffect } from 'react';
import { Button, Spin, message } from 'antd';
import { SecurityProps } from './interface';
import { ArrowRightOutlined, ReloadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './style/index.less';

const STATUS_LOADING = 0; // 还没有图片
const STATUS_READY = 1; // 图片渲染完成,可以开始滑动
// const STATUS_MATCH = 2 // 图片位置匹配成功
const STATUS_ERROR = 3; // 图片位置匹配失败
const imageWidth = 296;
const imageHeight = 153;
const fragmentSize = 53;
let failCount = 0;
let publicKey = '';
// 图片失效定时器 1分钟
let originTime = 59;
// eslint-disable-next-line no-underscore-dangle
let interval_: any = '';
let currentTime = originTime;

// async getImagePolicy 返回格式： { code , data: { cutoutImage, publicKey, shadeImage, y }
// async imageCheck 返回格式： true | false，xy轴坐标正确就返回true，错误则false
const ImageSecurity: React.FC<SecurityProps> = ({
  visible,
  closed,
  positionStyle,
  getImagePolicy,
  imageCheck,
  layerStyle,
  timeClock
}) => {
  const [currX, setCurrX] = useState<number>(5);
  const [startX, setStartX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [status, setStatus] = useState<any>(STATUS_LOADING);
  const [isMovable, setIsMovable] = useState<boolean>(false);
  const [cutoutImage, setCutoutImage] = useState<string>('');
  const [shadeImage, setShadeImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showMask, setShowMask] = useState<string>('none'); // 重试蒙层
  const [maskOpacity, setMaskOpacity] = useState<number>(0); // 重试蒙层
  const [showMaskError, setShowMaskError] = useState<string>('none'); // 错误提示蒙层
  const [maskOpacityError, setMaskOpacityError] = useState<number>(0); // 错误提示蒙层
  const [verifyShow, setVerifyShow] = useState<string>('none');
  const [verifyOpacity, setVerifyOpacity] = useState<number>(0);
  const validRef = useRef<HTMLDivElement>();

  const getVerification = () => {
    // 获取验证图片及坐标
    setLoading(true);
    // 参数 手机号码
    getImagePolicy().then((res: any) => {
      const { code, data } = res;
      if (code === 1) {
        // 加载成功
        publicKey = data.publicKey;
        setLoading(false);
        setCutoutImage(data.cutoutImage);
        setShadeImage(data.shadeImage);
        setOffsetY(data.y);
        setStatus(STATUS_READY);
        // 图片失效倒计时,倒计时不存在则不设置
        if (timeClock && timeClock % 1 === 0) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          countDown();
        }
      } else {
        // 加载失败
        setShowMask('block');
        setStatus(STATUS_ERROR);
        setMaskOpacity(1);
        setLoading(false);
        setCutoutImage('');
        setShadeImage('');
      }
    });
  };

  useEffect(() => {
    // 判断是否是整型, 且大于0
    if (visible && timeClock && timeClock % 1 === 0 && timeClock > 0) {
      originTime = timeClock;
      currentTime = originTime;
    }
  }, [visible, timeClock]);

  useEffect(() => {
    if (visible) {
      getVerification();
      setVerifyShow('block');
      setTimeout(() => {
        setVerifyOpacity(1);
      }, 0);
    } else {
      setVerifyOpacity(0);
      setTimeout(() => {
        setVerifyShow('none');
      }, 300);
    }
  }, [visible]);
  // 自定义message，使用后还原默认
  const messageTips = async (content: string, type: string) => {
    await new Promise<void>(resolve => {
      message.config({
        rtl: true,
        top: 88,
        duration: 2,
        getContainer: () => validRef.current
      });
      resolve();
    });
    if (type === 'error') {
      await message.error(content);
    } else if (type === 'warn') {
      await message.warn(content);
    } else if (type === 'success') {
      await message.success(content);
    } else {
      await message.info(content);
    }
    await new Promise<void>(resolve => {
      message.destroy();
      message.config({
        rtl: true,
        top: 24,
        duration: 3,
        getContainer: () => document.body
      });
      resolve();
    });
  };
  // 定时器设置,验证码失效
  const countDown = () => {
    clearInterval(interval_);
    interval_ = setInterval(() => {
      // eslint-disable-next-line no-plusplus
      currentTime--;
      if (currentTime === 0) {
        clearInterval(interval_);
        // 时间到重新获取验证码
        if (visible) {
          getVerification();
        }
        currentTime = originTime;
      }
    }, 1000);
  };
  const onRetry = () => {
    failCount = 0;
    setMaskOpacity(0);
    setTimeout(() => {
      setShowMask('none');
      getVerification();
    }, 300);
  };
  const onReload = () => {
    setStatus(STATUS_LOADING);
    getVerification();
  };
  const onMoving = (e: any) => {
    if (status !== STATUS_READY || !isMovable) {
      return;
    }
    let newCurrX = e.clientX - startX;
    const minX = 0;
    const maxX = imageWidth - fragmentSize;
    if (newCurrX < minX) {
      newCurrX = 0;
    } else {
      newCurrX = newCurrX > maxX ? maxX : newCurrX;
    }
    setCurrX(newCurrX);
  };
  const onClosed = async () => {
    await new Promise<void>(resolve => {
      // 取消计时器
      clearInterval(interval_);
      closed();
      // 关闭弹窗
      resolve();
    });
  };
  const onMoveEnd = () => {
    if (status !== STATUS_READY || !isMovable) {
      return;
    }
    setIsMovable(false);
    setStatus(STATUS_LOADING);
    // 校验
    imageCheck({ x: String(currX), y: String(offsetY), publicKey }).then(async (res: boolean) => {
      if (res) {
        // 位置正确的情况,验证回调
        failCount = 0;
        await messageTips('验证成功', 'success');
        // 首先关闭弹窗
        await onClosed();
        await new Promise<void>(resolve => {
          setTimeout(() => {
            setCurrX(0);
          }, 1000);
          resolve();
        });
      } else {
        // 位置错误的情况
        setCurrX(0);
        failCount += 1;
        if (failCount === 5) {
          setShowMask('block');
          setTimeout(() => {
            setMaskOpacity(1);
          }, 0);
          await new Promise<void>(resolve => {
            clearInterval(interval_); // 停止计时
            resolve();
          });
          return await messageTips('操作过于频繁，请点击重试按钮', 'warn');
        }
        setShowMaskError('block');
        setMaskOpacityError(1);
        await messageTips('验证失败，请重试', 'error');
        setShowMaskError('none');
        setMaskOpacityError(0);
        await new Promise<void>(resolve => {
          getVerification();
          resolve();
        });
      }
      // 默认返回
      return 'success';
    });
  };
  const onMoveStart = (e: any) => {
    if (status !== STATUS_READY) {
      return;
    }
    setStartX(e.clientX);
    setIsMovable(true);
  };
  // @ts-ignore
  return (
    <div
      style={{
        display: verifyShow,
        opacity: verifyOpacity,
        transition: 'opacity .3s',
        position: 'absolute',
        zIndex: '99',
        boxShadow: '0px 4px 21px 0px rgba(0, 0, 0, 0.3)',
        ...positionStyle
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 335,
          height: 500,
          marginTop: -100,
          ...layerStyle
        }}
      />
      <div
        className="errorLayer"
        style={{
          transition: 'all .3s',
          display: showMaskError,
          opacity: maskOpacityError
        }}
      />
      <div
        className="warnLayer"
        style={{
          transition: 'all .3s',
          display: showMask,
          opacity: maskOpacity
        }}
      >
        <Button
          onClick={onRetry}
          type="primary"
          icon={<ReloadOutlined />}
          style={{ width: 84, left: 126, marginTop: 100 }}
        >
          重试
        </Button>
      </div>
      <div ref={validRef} className="imageCode" onMouseMove={onMoving} onMouseLeave={onMoveEnd} onMouseUp={onMoveEnd}>
        <div className="reloadContainer" onClick={onReload}>
          <ReloadOutlined style={{ marginRight: '4px', fontSize: '14px', color: '#000' }} />
          换一张
        </div>
        <div
          style={{
            position: 'absolute',
            top: '4px',
            right: '6px',
            cursor: 'pointer'
          }}
          onClick={onClosed}
        >
          <CloseCircleOutlined style={{ fontSize: '14px', color: '#666666' }} />
        </div>
        <Spin spinning={loading}>
          <div
            className="imageContainer"
            style={{
              width: imageWidth,
              height: imageHeight,
              backgroundImage: `url(data:image/jpeg;base64,${shadeImage})`
            }}
          >
            <img
              alt={'imgCanvas'}
              className="imgCanvas"
              draggable="false"
              style={{ left: `${currX}px`, top: `${offsetY}px` }}
              src={`data:image/jpeg;base64,${cutoutImage}`}
            />
          </div>
        </Spin>
        <div className="sliderWrpper">
          <div className="sliderBar">按住滑块，拖动完成拼图</div>
          <div className="sliderButton" onMouseDown={onMoveStart} style={{ left: `${currX - 5}px` }}>
            <ArrowRightOutlined style={{ color: '#fff', fontSize: '20px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageSecurity;

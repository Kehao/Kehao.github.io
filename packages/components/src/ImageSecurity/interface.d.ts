/* eslint-disable @typescript-eslint/ban-types */
export interface SecurityProps {
  visible: boolean;
  closed: () => void;
  positionStyle?: any; // 弹窗位置样式
  layerStyle?: any; // 弹窗遮罩蒙层样式
  getImagePolicy: Function; // 获取滑块图片信息
  imageCheck: Function; // 校验滑块位置是否正确
  timeClock?: number;
}

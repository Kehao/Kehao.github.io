import React from 'react';
import { Modal, ModalProps } from 'antd';
import { MODAL_WIDTH } from '../constants';
import './style/index.less';

interface IModalInterface extends React.FC<ModalProps> {
  comfirm: typeof Modal.confirm;
}
const IModal: IModalInterface = (modalProps: ModalProps): React.ReactElement<any, any> => {
  return (
    <Modal
      {...modalProps}
      wrapClassName={(modalProps.wrapClassName && `${modalProps.wrapClassName} IModal`) || 'IModal'}
      width={modalProps.width || MODAL_WIDTH}
      okText={'确定'}
      cancelText={'取消'}
    />
  );
};
IModal.comfirm = Modal.confirm;
export default IModal;

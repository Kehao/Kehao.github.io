import React, { useCallback } from 'react';
import { Alert, Button, Form, Row, Col, Input } from 'antd';
import { IModal } from '../index';
import { REG, strEncrypt } from '@b1/utils';
import { SaveOutlined } from '@ant-design/icons';
import './index.less';

interface PasswordModalProps {
  onSubmit: (values: Record<any, any>) => void;
  onClose: () => void;
  loading?: boolean;
  tip?: string;
}
interface PasswordModalInterface extends React.FC<PasswordModalProps> {
  encryptHandle: (key: string, value: string) => string | false;
}

const { Item } = Form;
const formLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
const PasswordModal: PasswordModalInterface = ({ tip, onSubmit, onClose, loading = false }) => {
  const [form] = Form.useForm();

  const onPasswordSubmit = useCallback(() => {
    form.validateFields().then(values => {
      onSubmit(values);
    });
  }, []);
  return (
    <div>
      <IModal
        title={'修改密码'}
        wrapClassName={'passwordModal'}
        width={400}
        style={{ top: 245 }}
        maskClosable={false}
        visible={true}
        onCancel={() => {
          onClose();
        }}
        footer={
          <div className={'passwordFooter'}>
            <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={onPasswordSubmit}>
              确定
            </Button>
          </div>
        }
        destroyOnClose={true}
      >
        <Form form={form}>
          <Row>
            {tip && (
              <Col span={24} style={{ textAlign: 'center' }}>
                <Alert message={tip} type="error" />
              </Col>
            )}
            <Col span={22} style={{ marginTop: '10px' }}>
              <Item
                {...formLayout}
                label="旧密码"
                name="oldPassword"
                rules={[{ required: true, message: '请输入旧密码!' }]}
                hasFeedback
              >
                <Input.Password allowClear />
              </Item>
            </Col>
            <Col span={22}>
              <Item
                {...formLayout}
                label="新密码"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: '新密码8-16位，必须包括字母和数字!'
                  },
                  {
                    pattern: REG.password,
                    message: '新密码8-16位，必须包括字母和数字!'
                  }
                ]}
                hasFeedback
              >
                <Input.Password allowClear />
              </Item>
            </Col>
            <Col span={22} style={{ marginBottom: 10 }}>
              <Item
                {...formLayout}
                hasFeedback
                label="再次输入"
                name="confirm"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: '请再次输入新密码!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('密码不一致!'));
                    }
                  })
                ]}
              >
                <Input.Password allowClear />
              </Item>
            </Col>
          </Row>
        </Form>
      </IModal>
    </div>
  );
};

PasswordModal.encryptHandle = (key, value) => strEncrypt(value, key);

export default PasswordModal;

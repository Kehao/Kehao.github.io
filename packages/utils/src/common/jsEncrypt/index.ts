import JsEncrypt from 'jsencrypt';

type RawType = string | number;
/**
 * 加密方法
 * @param value
 * @param publicKey
 * @constructor
 */
const strEncrypt = (value: RawType, publicKey: string) => {
  const rsaUtil = new JsEncrypt();
  // 设置加密因子
  rsaUtil.setPublicKey(`-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`);
  // 返回加密后的结果
  return rsaUtil.encrypt(value.toString());
};
/**
 * 解密方法
 * @param value
 * @param privateKey
 * @constructor
 */
const strDecrypt = (value: RawType, privateKey: string) => {
  const rsaUtil = new JsEncrypt();
  // 设置解密因子
  rsaUtil.setPrivateKey(`-----BEGIN PRIVATE KEY-----${privateKey}-----END PRIVATE KEY-----`);
  // 返回解密后的结果
  return rsaUtil.decrypt(value.toString());
};

export { strEncrypt, strDecrypt };

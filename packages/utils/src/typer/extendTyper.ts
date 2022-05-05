import BaseTyper from './baseTyper';

const ExtendTyper = {
  ...BaseTyper,

  isPhoneNumber(data: any) {
    if (this.isString(data)) {
      return /^1\d{10}$/.test(data);
    }
    return false;
  },

  isEmail(data: any) {
    if (this.isString(data)) {
      // eslint-disable-next-line no-useless-escape
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]+)$/.test(data);
    }
    return false;
  },

  isUrl(data: any) {
    if (this.isString(data)) {
      // 因为后面使用 new RegExp('...') 的方式来实例化正则，所以正则内容中的转义符（即反斜杠 \）需要另外在加一个反斜杠 \
      // 例：正则字面量中的 /\w/，使用 new 来实例化则需写成 new RegExp('\\w')，其生成的正则与前面的字面量相同，为 /\w/
      const protocol = '^(http(s)?://)?';
      const domain = '[\\w-]+(\\.[\\w-]+)+';
      const ip = '((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})(\\.((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})){3}';
      const port = '(:[0-9]{1,5})?';
      const path = '((\\/[\\w-]+)*(\\/)?)?';
      const queryItem = '[\\w-]+=[\\w\\/\\+\\.@:%~-]+';
      const query = `(\\?(${queryItem}(&${queryItem})*)?)?`;
      const hash = '(#[\\w\\/\\+\\.@:%~?&=-]*)?$';

      const regexp = new RegExp(`${protocol}((${domain})|(${ip}))${port}${path}${query}${hash}`);
      return regexp.test(data);
    }
    return false;
  },

  isChinese(data: any) {
    if (this.isString(data)) {
      return /^[\u4e00-\u9fa5]+$/.test(data);
    }
    return false;
  }
};

export default ExtendTyper;

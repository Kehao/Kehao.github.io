import ExtendTyper from './extendTyper';

const customTypeMap = new Map();

const Typer = {
  ...ExtendTyper,

  create(typeName: string, validFn: { (data: any): boolean }) {
    if (!this.isString(typeName)) {
      throw new Error('TypeName 必须是字符串');
    }
    if (!this.isFunction(validFn)) {
      throw new Error('ValidFn 必须是函数');
    }
    if (customTypeMap.has(typeName)) {
      // eslint-disable-next-line no-console
      console.warn(`新增类型(${typeName})已存在，其类型判断函数已被覆盖`);
    }
    customTypeMap.set(typeName, validFn);
    // let key = typeName.replace(/^\S/, s => s.toUpperCase());
    // key = `is${key}`;
    // this[key] = validFn;
    // customTypeMap.set(typeName, key);
  },

  is(data: any, typeName: string) {
    if (customTypeMap.has(typeName)) {
      const validFn = customTypeMap.get(typeName);
      return validFn ? validFn(data) : false;
    }
    return false;
  },

  check(data: any, rule: any) {
    if (this.isObject(rule)) {
      throw new Error('rule 必须为对象');
    }
    //
  }
};

export default Typer;

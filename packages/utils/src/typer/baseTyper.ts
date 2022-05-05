function getType(data: any) {
  return Object.prototype.toString
    .call(data)
    .match(/\[object (.*?)\]/)[1]
    .toLowerCase();
}

const BaseTyper = {
  get(data: any): string {
    return getType(data);
  },

  isNumOrNumStr(num: any): boolean {
    if (typeof num === 'number') {
      return !Number.isNaN(num);
    }
    if (typeof num === 'string' && num !== '') {
      return !Number.isNaN(Number(num));
    }
    return false;
  },

  isNumber(num: any): boolean {
    return typeof num === 'number' && !Number.isNaN(num);
  },

  isBigInt(bigint: any): boolean {
    return getType(bigint) === 'bigint';
  },

  isString(str: any): boolean {
    return typeof str === 'string';
  },

  isBoolean(bool: any): boolean {
    return typeof bool === 'boolean';
  },

  isArray(arr: any): boolean {
    return Array.isArray(arr);
  },

  isArguments(args: any): boolean {
    return getType(args) === 'arguments';
  },

  isObject(obj: any): boolean {
    return getType(obj) === 'object';
  },

  isMap(obj: any): boolean {
    return getType(obj) === 'map';
  },

  isWeakMap(obj: any): boolean {
    return getType(obj) === 'weakmap';
  },

  isSet(obj: any): boolean {
    return getType(obj) === 'set';
  },

  isWeakSet(obj: any): boolean {
    return getType(obj) === 'weakset';
  },

  isDate(obj: any): boolean {
    return getType(obj) === 'date';
  },

  isRegExp(obj: any): boolean {
    return getType(obj) === 'regexp';
  },

  isSymbol(obj: any): boolean {
    return getType(obj) === 'symbol';
  },

  isFunction(fn: any): boolean {
    return getType(fn) === 'function';
  },

  isError(err: any): boolean {
    return getType(err) === 'error';
  },

  isNull(data: any): boolean {
    return getType(data) === 'null';
  },

  isUndefined(data: any): boolean {
    return getType(data) === 'undefined';
  },

  isNaN(data: any): boolean {
    return Number.isNaN(data);
  }
};

export default BaseTyper;

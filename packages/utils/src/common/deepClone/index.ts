import Typer from '../../typer';

/**
 * @desc 数据深拷贝
 * @param data {any} 需要深拷贝的数据
 * @return newData {any} 深拷贝后的数据
 * @author Veta
 */

type IObject = Record<string, any>;

interface IArguments {
  [index: number]: any;
  length: number;
}

type IIterableData = IObject | any[] | IArguments | Map<any, any> | WeakMap<any, any> | Set<any> | WeakSet<any>;

function isIterable(type: string): boolean {
  return ['object', 'array', 'arguments', 'map', 'weakmap', 'set', 'weakset'].includes(type);
}

function cloneIterableData<T>(data: T, type: string, cacheMap: WeakMap<any, any>): T {
  if (cacheMap.get(data)) {
    return cacheMap.get(data);
  }

  let clonedData = null;

  switch (type) {
    case 'object':
      clonedData = {};
      Object.entries(data).forEach((i: any[]) => {
        const [key, val] = i;
        clonedData[key] = deepClone(val, cacheMap);
      });
      Object.getOwnPropertySymbols(data).forEach((s: symbol) => {
        clonedData[s] = deepClone(data[s], cacheMap);
      });
      break;

    case 'array':
      clonedData = ((data as unknown) as any[]).map((i: any) => {
        return deepClone(i, cacheMap);
      });
      break;

    case 'arguments':
      clonedData = deepClone(Array.prototype.slice.call(data));
      break;

    case 'map':
      // case 'weakmap': // weakmap 不支持遍历
      clonedData = new Map();
      ((data as unknown) as Map<any, any>).forEach((val: any, key: any) => {
        clonedData.set(key, deepClone(val, cacheMap));
      });
      break;

    case 'set':
      // case 'weakset': // weakset 不支持遍历
      clonedData = new Set();
      ((data as unknown) as Set<any>).forEach((val: any) => {
        clonedData.add(deepClone(val, cacheMap));
      });
      break;
    default:
      return data;
  }

  cacheMap.set(data, clonedData);

  return clonedData;
}

interface IConstructor {
  new (data: any, param?: any): any;
}

interface IRegExp {
  source: string;
  lastIndex: number;
  toString: () => string;
}

function cloneUniterableData<T>(data: T, type: string): T {
  if (data === null || data === undefined) {
    return data;
  }

  const { constructor } = data;

  switch (type) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'bigint':
    case 'null':
    case 'undefined':
      return data;
    case 'date':
    case 'error':
      return new (constructor as IConstructor)(data);
    case 'regexp': {
      const reFlags = /\w*$/;
      const regexp = (data as unknown) as IRegExp;
      const result = new (constructor as IConstructor)(regexp.source, reFlags.exec(regexp.toString()));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    case 'symbol':
      return Object(data);
    default:
      return data;
  }
}

export default function deepClone(data: any, cacheMap = new WeakMap()) {
  const dataType = Typer.get(data);

  if (isIterable(dataType)) {
    return cloneIterableData<IIterableData>(data, dataType, cacheMap);
  }
  return cloneUniterableData(data, dataType);
}

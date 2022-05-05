import deepClone from './deepClone';
import uniqueId from 'lodash.uniqueid';

export * from './format';
export * from './jsEncrypt';
export const generatorId = (prefix: string = 'uuid'): string => uniqueId(prefix);

export { deepClone };

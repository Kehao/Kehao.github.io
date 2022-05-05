import deepClone from '../index';

it('test common data deepClone', () => {
  const commonDataList = [
    { key: 'str', value: 'hello', result: true },
    { key: 'num', value: 123, result: true },
    { key: 'bool', value: true, result: true },
    { key: 'bigint', value: BigInt(1), result: true },
    { key: 'symbol', value: Symbol('1'), result: false },
    { key: 'date', value: new Date(), result: false },
    { key: 'regexp', value: new RegExp('^[0-9]+$'), result: false },
    { key: 'error', value: new Error('I am a error'), result: false },
    { key: 'null', value: null, result: true },
    { key: 'undefined', value: undefined, result: true },
    { key: 'NaN', value: NaN, result: false }
  ];
  commonDataList.forEach(data => {
    const clonedData = deepClone(data.value);
    if (data.result) {
      expect(clonedData).toBe(data.value);
    } else {
      expect(clonedData === data.value).toBe(false);
    }
  });
});

it('test iterable data deepClone', () => {
  const obj = {
    name: 'jack',
    age: '11'
  };
  const clonedObj = deepClone(obj);
  expect(clonedObj).not.toBe(obj);
  expect(clonedObj.name).toBe(obj.name);

  const list = [1, 2, 3];
  const clonedList = deepClone(list);
  expect(clonedList).not.toBe(list);
  expect(clonedList[0]).toBe(list[0]);

  const map = new Map();
  map.set('key1', 'val1');
  const clonedMap = deepClone(map);
  expect(clonedMap).not.toBe(map);
  expect(clonedMap.get('key1')).toBe(map.get('key1'));

  const set = new Set();
  set.add('val1');
  const clonedSet = deepClone(set);
  expect(clonedSet).not.toBe(set);
  expect(clonedSet.has('val1')).toBe(true);

  // WeakMap 和 WeakSet 不可遍历，无法进行深拷贝，所以返回原值
  const weakmap = new WeakMap();
  const mapObjKey = {};
  weakmap.set(mapObjKey, 'val1');
  const clonedWeakMap = deepClone(weakmap);
  expect(clonedWeakMap).toBe(weakmap);
  // expect(clonedWeakMap.get(mapObjKey)).toBe(weakmap.get(mapObjKey));

  const weakset = new WeakSet();
  const setObjVal = {};
  weakset.add(setObjVal);
  const clonedWeakSet = deepClone(weakset);
  expect(clonedWeakSet).toBe(weakset);
  // expect(clonedWeakSet.has(setObjVal)).toBe(weakset.has(setObjVal));
});

it('test deep data deepClone', () => {
  const symbolKey = Symbol('key');
  function createBaseObj() {
    return {
      str: 'string',
      regexp: new RegExp('\\w'),
      [symbolKey]: 'a symbol string',
      list: [],
      obj: {},
      map: new Map(),
      set: new Set()
    };
  }

  function createBaseList() {
    return ['string', 123, new RegExp('\\w'), symbolKey, [1, 2, 3], {}, new Map(), new Set()];
  }

  function createBaseMap() {
    const baseMap = new Map();
    baseMap.set('str', 'string');
    baseMap.set('symbol', Symbol('val'));
    baseMap.set('obj', {});
    baseMap.set('list', []);
    baseMap.set('map', new Map());
    baseMap.set('set', new Set());
    return baseMap;
  }

  function createBaseSet() {
    const baseSet = new Set();
    baseSet.add('string');
    baseSet.add(Symbol('val'));
    baseSet.add({});
    baseSet.add([]);
    baseSet.add(new Map());
    baseSet.add(new Set());
    return baseSet;
  }

  const data = {
    str: 'string',
    num: 123,
    regexp: new RegExp('\\w'),
    symbol: Symbol(1),
    obj: createBaseObj(),
    list: createBaseList(),
    map: createBaseMap(),
    set: createBaseSet(),
    [symbolKey]: 'a symbol string'
  };
  const clonedData = deepClone(data);

  expect(clonedData).not.toBe(data);
  expect(clonedData.str).toBe(data.str);
  expect(clonedData.regexp).not.toBe(data.regexp);
  expect(clonedData.symbol).not.toBe(data.symbol);

  expect(clonedData.obj).not.toBe(data.obj);
  expect(clonedData.obj.str).toBe(data.obj.str);
  expect(clonedData.obj.regexp).not.toBe(data.obj.regexp);
  expect(clonedData.obj[symbolKey]).toBe(data.obj[symbolKey]);
  expect(clonedData.obj.obj).not.toBe(data.obj.obj);
  expect(clonedData.obj.list).not.toBe(data.obj.list);
  expect(clonedData.obj.map).not.toBe(data.obj.map);
  expect(clonedData.obj.set).not.toBe(data.obj.set);

  expect(clonedData.list).not.toBe(data.list);
  data.list.forEach((item: any, index: number) => {
    if (index <= 1) {
      expect(clonedData.list[index]).toBe(item);
    } else {
      expect(clonedData.list[index]).not.toBe(item);
    }
  });

  expect(clonedData.map).not.toBe(data.map);
  expect(clonedData.map.get('str')).toBe(data.map.get('str'));
  expect(clonedData.map.get('symbol')).not.toBe(data.map.get('symbol'));
  expect(clonedData.map.get('obj')).not.toBe(data.map.get('obj'));
  expect(clonedData.map.get('list')).not.toBe(data.map.get('list'));
  expect(clonedData.map.get('map')).not.toBe(data.map.get('map'));
  expect(clonedData.map.get('set')).not.toBe(data.map.get('set'));

  expect(clonedData.set).not.toBe(data.set);
  data.set.forEach((val: any) => {
    if (typeof val === 'string') {
      expect(clonedData.set.has(val)).toBe(true);
    } else {
      expect(clonedData.set.has(val)).toBe(false);
    }
  });

  expect(clonedData[symbolKey]).toBe(data[symbolKey]);

  // TODO: 循环引用的测试
});

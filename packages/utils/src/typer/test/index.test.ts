import Typer from '../index';

it('test base type validation', () => {
  const typeDataList = (() => {
    return [
      { type: 'string', validFn: 'isString', value: 'a string' },
      { type: 'number', validFn: 'isNumber', value: 123 },
      { type: 'boolean', validFn: 'isBoolean', value: true },
      { type: 'object', validFn: 'isObject', value: { name: 'Veta' } },
      { type: 'array', validFn: 'isArray', value: [1, 2, 3] },
      { type: 'arguments', validFn: 'isArguments', value: arguments },
      { type: 'date', validFn: 'isDate', value: new Date() },
      { type: 'error', validFn: 'isError', value: new Error() },
      { type: 'regexp', validFn: 'isRegExp', value: /\w/ },
      { type: 'map', validFn: 'isMap', value: new Map() },
      { type: 'weakmap', validFn: 'isWeakMap', value: new WeakMap() },
      { type: 'set', validFn: 'isSet', value: new Set() },
      { type: 'weakset', validFn: 'isWeakSet', value: new WeakSet() },
      { type: 'bigint', validFn: 'isBigInt', value: BigInt(1) },
      { type: 'symbol', validFn: 'isSymbol', value: Symbol('test') },
      {
        type: 'function',
        validFn: 'isFunction',
        value: () => {
          // eslint-disable-next-line no-console
          console.log('test function');
        }
      }
    ];
  })(1);

  const validFnList = typeDataList.map(i => i.validFn);

  validFnList.forEach((validFn: string) => {
    if (Typer[validFn]) {
      typeDataList.forEach((testData: any) => {
        const validResult = Typer[validFn](testData.value);
        expect(validResult).toBe(testData.validFn === validFn);
      });
    }
  });
  expect(Typer.isNumOrNumStr('123')).toBe(true);
  expect(Typer.isNumOrNumStr(123)).toBe(true);
  expect(Typer.isNumOrNumStr('123.456')).toBe(true);
  expect(Typer.isNumOrNumStr('123w')).toBe(false);
  expect(Typer.isNumOrNumStr(true)).toBe(false);
  expect(Typer.isNumOrNumStr({})).toBe(false);
});

it('test extend type validation', () => {
  const testConfig = [
    {
      validFn: 'isPhone',
      testList: [
        { value: '13257781305', result: true },
        { value: '1325778130', result: false },
        { value: '132577813051', result: false },
        { value: '13257781305w', result: false },
        { value: 132577813051, result: false }
      ]
    },
    {
      validFn: 'isEmail',
      testList: [
        { value: 'jack@gmail.com', result: true },
        { value: 'jack@163.com.cn', result: true },
        { value: 'jack.tom@gmail.com', result: true },
        { value: 'jack-tom@gmail.com', result: true },
        { value: 'jack_tom@gmail.com', result: true },
        { value: '_jack.tom@gmail.com', result: true },
        { value: '-jack.tom@gmail.com', result: true },
        { value: 'jack.gmail.com', result: false },
        { value: 'jack@gmailcom', result: false },
        { value: 'jack@gmail.com.1', result: false }
      ]
    },
    {
      validFn: 'isUrl',
      testList: [
        { value: 'http://www.baidu.com', result: true },
        { value: 'https://www.baidu.com', result: true },
        { value: 'www.baidu.com', result: true },
        { value: 'www.baidu.com:123', result: true },
        { value: 'www.baidu.com:123456', result: false },
        { value: 'www.baidu.com/', result: true },
        { value: 'www.baidu.com/qwe/123/_q/-a', result: true },
        { value: 'www.baidu.com/qwe?_a=1&-b=2', result: true },
        { value: 'www.baidu.com/qwe?', result: true },
        { value: 'www.baidu.com/qwe?a=1&b=2#asd', result: true },
        { value: 'www.baidu.com/qwe?a=1&b=2#asd#zxc', result: false },
        { value: 'www.baidu.com/qwe#asd', result: true },
        { value: 'www.baidu.com/#asd', result: true },
        { value: 'www.baidu.com#asd', result: true }
      ]
    },
    {
      validFn: 'isChinese',
      testList: [
        { value: '你', result: true },
        { value: '你好', result: true },
        { value: '你hao', result: false },
        { value: '你好233', result: false },
        { value: '你好！', result: false }
      ]
    }
  ];

  testConfig.forEach((config: any) => {
    if (Typer[config.validFn]) {
      config.testList.forEach((test: any) => {
        const testResult = Typer[config.validFn](test.value);
        expect(testResult).toBe(test.result);
      });
    }
  });
});

it('test custom type validation', () => {
  Typer.create('exprData', data => {
    // 例：expr1,65,50-80
    return /^[\w-]+,\d+(\.\d+)?,\d+(\.\d+)?-\d+(\.\d+)?/.test(data);
  });
  expect(Typer.is('nova,12,10-20', 'exprData')).toBe(true);
  expect(Typer.is('no_va,12,10-20', 'exprData')).toBe(true);
  expect(Typer.is('nova-12,10-20', 'exprData')).toBe(false);
  expect(Typer.is('nova,12,10~20', 'exprData')).toBe(false);
});

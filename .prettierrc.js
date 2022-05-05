module.exports = {
  // 使用单引号代替双引号
  singleQuote: true,
  // 在对象或数组最后一个元素后面是否加逗号
  trailingComma: 'none',
  // 超过最大值换行
  printWidth: 120,
  // 句尾添加分号
  semi: true,
  // 缩进字节数
  tabWidth: 2,
  //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  arrowParens: 'avoid',
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  // 在jsx中把'>' 是否单独放一行
  jsxBracketSameLine: false,
  // 在jsx中使用单引号代替双引号
  jsxSingleQuote: false,
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' }
    }
  ]
};

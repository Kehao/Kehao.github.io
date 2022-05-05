module.exports = {
  types: [
    { value: 'feat', name: 'feat：增加了新功能' },
    { value: 'fix', name: 'fix：修复bug' },
    { value: 'style', name: 'style：与代码逻辑无关的改动，例如删除空格、改变缩进、增删分号等' },
    { value: 'perf', name: 'perf：优化相关，比如提升性能、体验' },
    { value: 'docs', name: 'docs：只改动了文档相关的内容' },
    { value: 'refactor', name: 'refactor：代码重构，与bug修复和新功能无关' },
    { value: 'test', name: 'test：测试用例，包括单元测试、集成测试等' },
    { value: 'revert', name: 'revert：版本回滚' },
    { value: 'chore', name: 'chore：构建过程或辅助工具的变动及其它改动' }
  ],

  messages: {
    type: '请选择 Commit 类型:',
    scope: '此更改的涉及的模块是:',
    customScope: '此更改的范围是:',
    subject: '说明:\n',
    // body: '长说明，使用 "|" 换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联gitlab issue号，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },
  skipQuestions: ['body'],
  // 从功能上，自行定义项目模块, 基本上是系统的菜单
  scopes: ['@b1/components', '@b1/utils', '@b1/msgs', '@b1/hooks', 'UI组件库'],
  // typePrefix: '[',
  // typeSuffix: ']',
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  subjectLimit: 100
};

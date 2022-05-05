export default {
  // @b1/utils 被其他包依赖。需要优先编译。
  // (pkgs 数组为当前子包的文件夹名称: https://github.com/umijs/father/blob/master/packages/father-build/src/build.ts#L214)
  pkgs: ['utils', 'components', 'hooks', 'msgs'],
  cjs: { type: 'babel', lazy: true },
  esm: {
    type: 'babel',
    importLibToEs: true
  },
  extraBabelPlugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ],
    // antd支持
    [
      'import',
      {
        libraryName: 'antd',
        // "libraryDirectory": "es",
        style: true
      }
    ]
  ]
};

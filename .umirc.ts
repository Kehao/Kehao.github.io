import { defineConfig } from 'dumi';
import ESLintPlugin from 'eslint-webpack-plugin';
import { resolve } from 'path';

const config = defineConfig({
  // publicPath: 'https://kehao.github.io/react-ui/',
  title: '前端公共资源',
  favicon: 'http://biosan-saas.oss-cn-beijing.aliyuncs.com/FD/common/logo.png',
  logo: 'http://biosan-saas.oss-cn-beijing.aliyuncs.com/FD/common/logo.png',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  mode: 'site',
  alias: {
    '@b1/components': resolve(__dirname, './packages/components/src'),
    '@b1/hooks': resolve(__dirname, './packages/hooks/src'),
    '@b1/utils': resolve(__dirname, './packages/utils/src'),
    '@b1/msgs': resolve(__dirname, './packages/msgs/src')
  },
  navs: [
    {
      title: '指南',
      path: '/guide'
    },
    {
      title: '组件',
      path: '/components'
    },
    {
      title: 'Utils',
      path: '/utils'
    },
    {
      title: 'Hooks',
      path: '/hooks'
    },
    {
      title: 'Msgs',
      path: '/msgs'
    }
  ],
  resolve: {
    includes: ['docs', 'packages/hooks/src', 'packages/components/src', 'packages/utils/src', 'packages/msgs/src']
  },
  extraBabelPresets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry', // 配合browserslist
        // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
        // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
        corejs: {
          version: 3, // 使用core-js@3
          proposals: true
        },
        loose: true,
        debug: false
      }
    ]
  ],
  extraBabelPlugins: [
    // antd支持
    [
      'import',
      {
        libraryName: 'antd',
        style: true
      }
    ]
  ],
  chainWebpack: config => {
    config.plugin('eslint-webpack-plugin').use(
      new ESLintPlugin({
        // fix: true,
        extensions: ['ts', 'tsx', 'js', 'jsx', '.d.ts']
      })
    );
  }
  // more config: https://d.umijs.org/config
});

export default config;

---
order: 2
toc: menu
group:
  title: '快速上手'
  path: /guide
---

## 项目内容

1. React + ts 组件库
2. 自定义 Hooks 函数库
3. 工具函数
4. 通用项目规范用语

## 快速开始

初次使用时，运行命令

```bash
$ npm run init
```

依赖下载

```bash
$ npm i
```

开发环境

```bash
$ npm start
```

文档打包

```bash
$ npm run build
```

项目发布

```bash
npm run publish
```

生成 changelog

```
npm run changelog
```

## lerna 的使用

详情查阅：[官方文档](https://github.com/lerna/lerna)

下面列出常用命令：

1. 安装依赖

```bash
# 将antd安装到component模块
npx  lerna add antd --scope=@b1/components
# 将 babel-core 安装到所有模块
lerna add babel-core
```

2. 卸载依赖

```bash
# 在components中执行，卸载antd依赖
npx lerna exec --scope=@b1/components npm uninstall antd
```

## 注意事项

1. `cssModule` 不要开启。因为`biosan-front`基于`antd`，为了和`antd`不冲突，故关闭`cssModule`（影响 build 性能）
2. 样式文件，必须在当前文件下的 `style`文件夹中新建`index.less`。因为按需加载（`.umirc.ts`）中配置了：

```js
  customStyleName: (name) => {
    return `./style/index.less`; // 注意：这里 ./ 不可省略
  },
```

3. 开发组件使用`ts`。所以最好将接口放在以`d.ts`结尾的文件中，这样打包出来快速的浏览当前组件的声明变量

## 为什么用 lerna 管理

关联性强的多包互相依赖的项目，适合 lerna 管理。

1. 能够解决一些包升级而导致多包之间依赖版本改变的复杂问题
2. 能够解决多个管理项目出现问题，难以定位的窘境
3. 避免分包时，公共依赖重复引入打包（如 react, moment）

## TODO

1. 单元测试

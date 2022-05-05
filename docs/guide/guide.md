---
order: 1
group:
  title: ''
  path: /guide
---

# 规范须知

## 开发指南

本项目组件库开发分为 3 个模块：

1. React + ts 组件库
2. 自定义 Hooks 函数库
3. 工具函数
4. 通用项目规范用语

###### 注：开发文件夹均在 packages 路径下

#### React+ts 组件库

组件库开发流程包括（此顺序不代表开发步骤）：

1. components/src/index.ts export 添加
2. React+ts 组件开发
   > - 第三方包引用可在 components/package.json 中添加
   > - 组件开发注意 TS 规范
   > - 项目细节参考：《项目内容》
3. index.md 应用实例 + API 文档说明
4. 最后完成开发，在 md 文件末尾添加自己花名 Thanks♪(･ω･)ﾉ

#### Hooks 函数库 与 工具函数开发

开发流程类似组件库开发，分别在 hooks 路径与 utils 路径

#### 开发，代码提交，打包，部署，发布

1. 建立自己分支 v1.0.0-dev-开发者-组件名
2. 在自己分支开发完成后，需请求 Merge。具体参考：《版本管理》
3. 发送 v1.0.0-dev 代码合并 Merge 请求，等待合并
4. 合并成功后，在http://172.17.90.96:8020页面，确认无误
5. 等待发布

#### 其他说明

组件库地址：http://172.17.90.96:8020 <br>
自动部署已完成，代码推至或合并至 v1.0.0-dev 即可触发自动部署 <br>
部署进度可在 gitlab 查看：https://git.biosan.cn/T0/FD/biosanfront/-/pipelines <br>

## 对接指南

依懒安装，在项目中直接引用即可。

- 组件库引用：npm i @b1/components
- Hooks 函数库引用：npm i @b1/hooks
- 工具函数库引用：npm i @b1/utils
- 通用项目规范用语：npm i @b1/msgs

---
order: 3
group:
  title: ''
  path: /guide
---

# 版本管理

## commit 和 changelog 管理

使用 git cz 来提交你的代码

## gitlab flow

### 分支命名约定 <br/>

> 1. v1.0.0-dev 开发分支 <br/>
> 2. v1.0.0-dev-mt-fix-guide 从开发分支切出的特性分支，开发分支-你的名字简拼-功能概括 <br/>
> 3. v1.0.0-master 需要 push 的 master 分支 <br/>

### 请求合并 <br/>

> 1. 不使用直接 merge <br/>
> 2. v1.0.0-dev-mt-fix-guide 需要合并到 v1.0.0-dev 分支自测时，使用 gitlab merge request 功能合并，**指定 assignee 作为 code reviewer**，提交合并前先 merge v1.0.0-dev 上的最新改动以减少冲突 <br/>

## 相关资料

- [Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)

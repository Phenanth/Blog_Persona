# persona

> A personal blog and a web app using Vue.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Docs

###  1 引言
#### 1.1 目的
#### 1.2 文档格式
#### 1.3 术语
#### 1.4 参考


###  2 系统概述
#### 2.1 概述
#### 2.2 功能
#### 2.3 运行环境
#### 2.4 假设与依赖


###  3 系统特性
#### 3.1 系统角色
- 管理员
- 游客

####  3.2 文章管理
##### 3.2.1 新建文章
##### 3.2.2 编辑文章
##### 3.2.3 删除文章

####  3.3 标签管理
##### 3.3.1 添加标签
使用者：管理员
目的：为现有的一篇文章添加标签
基本事件流：
1. 管理员进入单个文章标签管理界面，本用例开始
2. 系统显示所有文章标签一览，管理员点击现有标签或输入需要添加标签的文字，为当前文章添加标签
3. 管理员点击保存按钮，系统将标签保存至数据库

> 后面的都按照这个标准写

##### 3.3.2 删除标签

####  3.4 文章浏览
##### 3.4.1 游客浏览文章
[vue-md-loader](https://github.com/wxsms/vue-md-loader)
> 通过vue-md-loader或者是一些vue的md浏览器组件浏览文章内容。
> 因为这个组件不自带样式，可能需要自己写CSS。
> 如果觉得太麻烦的话看看有没有别的一体化的组件，用默认样式就可以。

##### 3.4.2 管理员浏览文章

####  3.5 登录
##### 3.5.1 管理员登陆

####  3.6 其他特性
##### 3.6.1 打赏管理员
##### 3.6.2 自动生成文章大纲
[markdown-toc](https://github.com/jonschlinkert/markdown-toc)
> 通过markdown-toc将md文档生成好的大纲内容动态地替换到文章html中预留的位置

##### 3.5.3 博客标签一览


###  4 非功能性需求
#### 4.1 性能需求
#### 4.2 安全性需求
#### 4.3 用户文档

###  5 外部接口需求
#### 5.1 用户接口
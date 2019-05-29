# Blog-Persona

> A personal blog and a web app using Vue.
> 0523：搭建工程整体框架，引入部分既有模块。

## 起步

### 数据库与文件系统配置
```bash
# 创建文件系统本地路径
mkdir file
```

```bash
# 登入MySQL命令行
mysql -uroot -p

#使用/server/sql下的persona.sql内语句创建数据库，表与用户。
```

### 前端框架启动

``` bash
# 安装依赖项
npm install

# 本地运行前端开发脚手架，默认访问localhost:8081
npm run dev

# 构建服务器发布版
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 服务器启动
```bash
# 进入服务器
cd server

# 服务器默认地址localhost:3000
node server.js
```

## 技术栈

- Vue.JS
- Node.JS
- Vue-Router
- Axios
- MySQL
- md文件系统

> 文章内容的md文件存储在本地的file文件夹内，路径由.gitignore文件屏蔽，不会上传到Github中。

## 开发参考
[Vue.JS](https://cn.vuejs.org/v2/guide/)
[Vue-Router](https://router.vuejs.org/zh/guide/)
[以往工程代码参考](https://github.com/Phenanth/GA-Login)

## 需求规格说明书

###  1 引言

引言部分

#### 1.1 目的

该文档首先给出了整个系统的整体网络结构和功能结构的样貌，并试图从总体架构上给出整个系统的轮廓，然后又对功能需求、性能需求和其他非功能型需求进行了详细的描述。其中对功能需求的描述采用了UML的用例模型方式，在系统角色部分对每一用例绘制了用例图，直观而详细地描述了每一个用例的基本事件流（若有备选事件流则描述，否则则省略）。这些文字和图形都为了本文档能详细精准地描述用户的需求、让用户更加容易地理解这些需求、在进行系统的版本控制各个方面上创造了条件。

该文档详尽地说明了这一软件产品的需求和规格，这些规格说明是进行设计的基础，也是编写测试用例和进行系统测试的主要依据。同时，该文档也是用户确定软件功能需求的主要依据，在与用户进行沟通时能够有效而直观地为用户提供系统功能一览。

#### 1.2 文档格式

本文档按以下要求和约定进行书写：

1. 页面的左边距为2.5cm，右边距为2.0cm，装订线靠左，行距为最小值20磅。
2. 标题最多分三级，分别为黑体小三、黑体四号、黑体小四，标题均加粗。
3. 正文字体为宋体小四号，无特殊情况下，字体颜色均采用黑色。
4. 出现序号的段落不采用自动编号功能而采用人工编号，各级别的序号依次为（1）、1）、a)等，特殊情况另作规定。

> 本文档将在后期迁移为Word形式，届时将以此标准完成文档的书写。

#### 1.3 预期的读者和阅读建议

本文档的主要内容共分4部分：综合描述、系统特性、和非功能性需求和外部接口描述。

综合描述部分主要对系统的整体结构进行了大致的介绍；系统特性部分对系统的功能需求进行了详细描述，是本文的主要部分；非功能性需求部分对非功能需求进行了详细的描述；外部接口需求部分对用户界面、软件接口、硬件接口和通讯接口等进行了描述。

本文档面向的读者对象有以下几种：

1. 项目经理：		项目经理可以根据该文档了解预期产品的功能，并据此进行系统设计、项目管理。
2. 程序设计人员：		基于产品需求进行分析，并设计出系统。其中包括数据库的设计。
3. 程序开发人员：		配合设计人员的产出手册《产品设计报告》，了解并开发系统功能，编写《用户手册》。
4. 程序测试人员：		根据本文档编写测试用例，并对软件产品进行功能性测试和非功能性测试。
5. 销售人员：		根据本文档了解预期产品的功能和性能，方便产品推广工作的预先计划。
6. 用户：			了解预期产品的功能和性能。
7. 其他人员：
	- 部门领导：		提前了解本产品的功能和性能。
	- 公司领导：		同上。

#### 1.4 范围

该产品是由在校学生以自己所学知识与开发经验的基础上进行开发的。

在需求上，充分地考虑了具体用户的实际情况。本产品将主要适用于网络用户对个人博客网站系统的文章管理，主要完成新建文章、编辑文章、删除文章、浏览文章等业务，也可以作为博客网站的一个子模块。

#### 1.5 术语

- md: MarkDown，一种标记语言[维基百科点这里](https://zh.wikipedia.org/zh-hans/Markdown)，[百度百科点这里](https://baike.baidu.com/item/markdown/3245829?fr=aladdin)。对博客文章进行浏览、保存与编辑时将支持本标记语言的语法。
- token: 身份认证临时令牌，在网站管理员登陆后用作身份认证，以支持页面跳转时的导航守卫。

> 本部分存在不完善的可能性：文档后续编写期间，可能会继续添加相关术语。

###  2 系统概述
#### 2.1 概述
博客，仅音译，英文名为Blogger,它的正式名称为网络日记。用户可以在博客系统上发布文章，与互联网上的其他用户进行交流与分享，它代表着新的生活、工作和学习方式。

#### 2.2 功能
个人博客系统功能图如下：
![个人博客系统功能图.png](https://upload-images.jianshu.io/upload_images/4945773-522d6aa8828c0d90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2.3 运行环境
该系统为B/S三层结构，它的运行环境分客户端、应用服务器端和数据库服务器端三部分。
以下是系统的软件环境。
1. 客户端
操作系统：Windows2000 Professional/XP或更新版本。
浏览器：IE6以上，其它常见浏览器如FireFox。
2. 应用服务器端
操作系统：Ubuntu 16.04 LTS或更新版本。
应用服务器：Nginx。
3. 数据库服务器端
操作系统：Windows2000 Server或更新版本。
数据库系统：MySQL。

#### 2.4 假设与依赖
本系统的成功与否，依赖于用户的需求是否能够得到实现。

###  3 系统特性
#### 3.1 系统角色
本系统主要用于学校的以下几类人员：
1. 管理员即已注册用户，可新建，删除或编辑文章，添加标签，删除标签，浏览标签，浏览文章
![管理员用例图](https://upload-images.jianshu.io/upload_images/4945773-2f7803f4dcb38677.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 游客，浏览文章，浏览标签，对文章进行打赏
![游客用例图](https://upload-images.jianshu.io/upload_images/4945773-9fb1691324f773c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

####  3.2 文章管理
##### 3.2.1 新建文章
使用者：管理员

目的：添加一篇新文章

基本事件流
1. 管理员进入博客文章一览界面，本用例开始
2. 系统显示所有已发布文章，管理员点击新建
3. 系统跳转至文章编辑界面，管理员输入文章内容
4. 管理员点击发布按钮，系统将文章保存为md文件，并跳转至文章一览页面，本用例结束

##### 3.2.2 编辑文章
使用者：管理员

目的：对现有的一篇文章进行修改

基本事件流
1. 管理员进入某篇文章的内容页，本用例开始
2. 管理员点击编辑，系统跳转至文章编辑界面
3. 系统通过文件系统获取该文章对应的md文件的内容，并在正文位置显示格式化后的md文字内容
4. 管理员对文章内容进行修改
4. 管理员点击保存按钮，系统将文章保存为md文件，并跳转至文章一览页面，本用例结束

> [MavonEditor](https://github.com/hinesboy/mavonEditor)

##### 3.2.3 删除文章
使用者：管理员

目的：添加一篇新文章

基本事件流
1. 管理员进入博客文章一览界面，本用例开始
2. 系统显示所有已发布文章，管理员点击删除文章，选择需要删除的一篇或多篇文章
3. 管理员点击删除，系统提示管理员进行删除确认操作
4. 管理员确认删除，系统通过文件系统删除相应的md文件，本用例结束

####  3.3 标签管理
##### 3.3.1 添加标签
使用者：管理员

目的：为现有的一篇文章添加标签

基本事件流
1. 管理员进入单个文章标签管理界面，本用例开始
2. 系统显示所有文章标签一览，管理员点击现有标签或输入需要添加标签的文字，为当前文章添加标签
3. 管理员点击保存按钮，系统将标签保存至数据库

##### 3.3.2 删除标签
使用者：管理员

目的：删除一篇文章现有的标签

基本事件流
1. 管理员进入单个文章标签管理界面，本用例开始
2. 系统显示所有文章标签一览，管理员点击删除标签，选择需要删除的一个或多个标签
3. 管理员点击删除，系统提示管理员进行删除确认操作
4. 管理员确认删除，系统将相应标签从数据库删除

####  3.4 文章浏览
##### 3.4.1 游客浏览文章

使用者：游客

目的：浏览一篇现有的文章的内容

基本事件流
1. 游客进入某篇文章的内容页
2. 系统通过文件系统获取该文章对应的md文件的内容，并在正文位置显示格式化后的md文字内容

[vue-md-loader](https://github.com/wxsms/vue-md-loader)

> 通过vue-md-loader或者是一些vue的md浏览器组件浏览文章内容。
> 因为这个组件不自带样式，可能需要自己写CSS。
> 如果觉得太麻烦的话看看有没有别的一体化的组件，用默认样式就可以。

##### 3.4.2 管理员浏览文章
使用者：管理员

目的：浏览一篇现有文章的内容

基本事件流
1. 管理员进入某篇文章的内容页
2. 系统检查本地的管理员token是否有效，有效则进入第三步；否则进入第四步
3. 系统通过文件系统获取该文章对应的md文件的内容，并在正文位置显示格式化后的md文字内容，并在控制栏渲染文章管理相关操作控件
4. 页面提示token失效，并跳转至登录界面

####  3.5 登录
##### 3.5.1 管理员登录
使用者：管理员

目的：登录博客系统

基本事件流
1. 管理员输入系统认证码，前端向服务器发起认证请求
2. 服务器检验认证码的有效性，有效则返回允许登录信息；否则返回登录失败信息
3. 前端根据登录回执信息进行不同的处理，允许登录则跳转页面至首页；登录失败则显示登录失败信息

####  3.6 其他特性
##### 3.6.1 打赏管理员
使用者：游客

目的：打赏网站管理员

基本事件流
1. 系统在文章尾部自动生成不同支付平台的打赏二维码
2. 游客扫描支付平台二维码完成打赏

##### 3.6.2 查看文章大纲
使用者：网站用户

目的：查看一篇文章由标题、子标题组成的大纲链接

基本事件流
1. 网站用户进入一篇文章的内容页面
2. 系统从后端读取到文章文字内容后，通过该文字内容生成大纲链接
3. 在文章页面对应位置渲染大纲链接内容，方便用户在文章内各个子标题之间进行跳转

[markdown-toc](https://github.com/jonschlinkert/markdown-toc)

> 通过markdown-toc将md文档生成好的大纲内容动态地替换到文章html中预留的位置

##### 3.6.3 博客标签一览
使用者：网站用户

目的：查看博客所有文章的所有标签

基本事件流
1. 网站用户进入博客标签一览页面
2. 系统搜索数据库获得所有标签与每个标签出现的次数，传回给前端
3. 前端根据标签出现次数从高到低渲染标签一览页面

###  4 非功能性需求
#### 4.1 性能需求
1. 客户端一般响应时间不超过1秒
2. 支持200名用户并发使用，并保证性能不受影响
3. 系统可以在各种主流浏览器上正常运行，对不同分辨率的显示器具有良好适应性。

#### 4.2 安全性需求
1. 权限控制
根据不同用户角色，设置相应权限，没有权限的用户禁止使用系统。游客只可浏览文章，不可对文章内容进行修改，管理员只可对自己发布的文章进行操作。
2. 重要数据加密
本系统对一些重要的数据按一定的算法进行加密，如用户口令、重要参数等。

#### 4.3 用户文档
同本软件一起发行的用户文档包括：
1. 用户手册：Word格式文件。
2. 在线帮助：HTML Help格式文件，联机式。


###  5 外部接口需求
#### 5.1 用户接口
本系统采用B/S架构，所有界面使用Web风格，访问本系统需要使用PC或移动端的浏览器。

用户界面的具体细节将在概要设计文档中描述。

#### 5.2 硬件接口
服务器端将使用阿里云服务器提供后台服务。

#### 5.3 软件接口
打赏二维码将使用支付宝与微信提供的收款二维码，除此以外无特殊需求。

#### 5.4 通信接口
后台服务器使用Node.JS的服务路由提供服务，前后端使用Axios进行跨域与数据传输。


## 系统WBS
WBS部分，以工作分解结构表的形式对开发工作进行描述

1. 项目范围规划
	1. 确定项目范围：产品的功能点范围
	2. 定义预备资源：查看服务器使用云服务器提供服务的方案是否可行
	3. 获得核心资源：申请网站域名，对云服务器进行初始化配置
	4. 项目范围规划完成
2. 分析/软件需求
	1. 行为需求分析：分析各个用户角色在使用本系统时的行为，并对每种角色绘制用例图
	2. 起草初步的软件规范：制定软件需求规格说明书
	3. 制定初步预算：计算并记录每个月云服务器与域名租用的费用
	4. 工作组共同审阅软件规范/预算：将软件规范与预算给组员过目并商讨是否存在需要改进计划的必要
	5. 根据反馈修改软件规范
	6. 确定交付期限
	7. 分析工作完成
3. 设计
	1. 审阅初步的软件规范：静态审查软件需求规格说明书是否存在修改的必要
	2. 制定功能规范：制定如何实现每个功能的初步方案
	3. 根据功能规范开发原型：获得产品原型，应当包括产品的所有功能的初步框架与原始界面元素分布设计
	4. 审阅功能规范：对原型进行初步审查
	5. 根据反馈修改功能规范
	6. 设计功能完成
4. 开发
	1. 审阅功能规范：静态审查功能规范是否存在修改的必要
	2. 确定程序层次与模块化/分层设计参数：划分网站路由层次，决定网站组成模块与模块间的接口参数标准
	3. 分派任务给开发人员
	4. 编写代码
	5. 开发人员测试：对系统进行测试，记录错误情况并反馈给开发人员
	6. 系统测试与修正的迭代：对系统错误进行修正，同时测试人员对修正后的系统继续测试的迭代过程。
	7. 开发工作完毕

## 进度计划

本部分见Project文件内甘特图。

## 任务分配

本部分见Word文件内表格。

## 工作记录

### 0524 - cwf

#### 今日完成任务
- Article - List部分功能
- 页面跳转关系
- 文章新建与继续编辑的前置工作
	+ 查看文章是否存在
	+ 对新建文章的id生成
	+ 了解组件的参数和方法

#### 遇到的问题

由于md编辑器用的是mavon-editor这个组件，不太清楚编辑器的使用方法，特别是关于md内容如何保存成文字这一类问题。
解决方法：[mavon-editor 存储md文件以及md文件解析成html文件](https://www.cnblogs.com/LULULI/p/10610136.html)

如何将md文件的内容导入到mavon-editor中同样参考该方法，查看源代码发现value就是编辑栏中的内容。
在外部初始化editorText并作为value传入组件内部即可。


### 0527 - cwf
> 主要用了Nodejs的fs模块进行FileSystem模块的设计。

#### 今日完成任务
- Article - Edit的文件读取部分完成
- FileSystem
	+ 后台与文件读取的功能
	+ 前端与文件内容显示有关的功能

由于List中显示每篇文章的部分还没有完整地组件化，组件内部应有的互动还不完全：
- 文章的浏览互动
- 文章的删除互动
但是在List的组件完成后很快就能方便地遍历生成相应的浏览与删除链接（原理和编辑链接的生成一样

### 0528 - cwf

#### 今日完成任务
- Article - Update Article
- FileSystem
	+ 文件储存与更新的功能

### 0529 -cwf

#### 今日完成任务
- List界面、适配
- 编辑器功能点测试与优化

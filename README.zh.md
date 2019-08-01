# blog-site-frontend-side
自己搭的一个博客网站——前端部分（增加版），5.0 版本（[English](https://github.com/MonkingStand/blog-site-frontend-side)）

> 踩坑记录 : **[坑~](https://github.com/MonkingStand/blog-site-frontend-side/blob/master/ISSUE.md)**

> 线上运行版本可访问 : **[stanby.cn](http://www.stanby.cn)**

## 简述
*   使用 **`node@12.6.x`** 和 **`npm@6.9.x`** 的本地开发构建环境
*   使用 **`React@~16.8.0`** 作为 js 框架
*   使用 **`Scss`**(即 **`Sass`**) 样式预处理语法来定制样式
*   使用 **`Bootstrap`** 作为前端 UI 框架
*   基于 **`create-react-app`** 的脚手架，在运行 **`npm run eject`** 之后，对打包的相关配置进行了定制
*   前端静态资源部分将迁移至 **OSS**

## 运行脚本
*   **`npm run start`**
    >   用于本地开发构建，实时监听文件变化并进行增量构建，同时会启动 **`webpack-dev-server`**
*   **`npm run build`**
    >   用于打包构建结果文件，输出目录为 **`${project}/build`**
*   **`npm run pusher-history`**
    >   用于显示所有的前端资源发布历史记录，展示形式如下
    ```javascript
    1.0.0
        1. 2011-11-11 11:11:11

    1.0.1
        1. 2011-11-12 11:11:11
    ```

*   **`npm run pusher-publish`**
    >   用于将本地的前端资源（**build** 下的内容）发布到 **OSS** ，正式发布之前会做一次确认操作

## 技术栈说明
*   **脚手架**
    *   主要是基于 **`create-react-app`** 搭建的脚手架，在此基础之上，运行 **`npm run eject`** 后导出配置，并对配置进行了定制化
*   **js 框架**
    *   将使用 **`React@~16.8.0`** ，使用该版本后的新特性：**`Hook`** 、 **`Effect`** 等等
    *   其他部分包括： **`redux`** 、 **`react-router`** 和上一版本保持一致
*   **UI 框架**
    *   考虑到迁移、重构成本，将继续使用 **`Bootstrap`**

## 其他
*   **更新说明**
    *   整体上来说，前端部分和上一版本差异不大，主要集中在将前端静态资源独立成一个前端应用，另外增加了一个 **`oss-pusher`** 的功能，主要用于将前端静态资源推送至 **OSS** ，会根据版本号来击穿缓存，换言之，页面引用静态资源的路径形式如下

    ```html
    <link rel="stylesheet" href="${ossDomain}/public/${version}/index.css">
    <script src="${ossDomain}/public/${version}/index.js"></script>
    ```
*   **本地开发相关**
    *   由于前后端应用进行了彻底的互相分离，进行本地开发的时候，需要启动一个后端应用，前端请求后端接口的时候，请求地址会以域名 **`//www.stanby.cn`** 开头（免端口号）
    *   本地开发的时候，关于后端如何解决跨域的问题，以及如何做到域名访问，且免端口，在此不再赘述，详细说明放到后端应用的 **`README.md`** 中说明
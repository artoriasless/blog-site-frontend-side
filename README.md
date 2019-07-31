# blog-site-frontend-side
frontend-side of enhanced blog site belongs to me, version 5.0（[中文](https://github.com/MonkingStand/blog-site-frontend-side/blob/master/README.zh.md)）

> issue log : **[ISSUE](https://github.com/MonkingStand/blog-site-frontend-side/blob/master/ISSUE.md)**

> blog site : **[stanby.cn](http://www.stanby.cn)**

## brief
*   it uses **node@12.6.0** and **`npm@6.9.x`** as local development&runtime environment
*   it uses **`React@~16.8.0`** as javascript framework
*   it uses **`Scss`**(**`Sass`**) to customize style
*   it uses **`Bootstrap`** as ui structure
*   the scaffold is based on **`create-react-app`** , customize the bundle configuration after running **`npm run eject`**
*   about front-end resources, all front-end static resources will be migrated into **OSS**

## Available Scripts
*   **`npm run start`**
    >   used for local development, do increment bundle while detect that file(s) changed, and **`webpack-dev-server`** would be activated in the same time, all bundle result would be stored into cache
*   **`npm run build`**
    >   used to bundle and export bundle result into target folder —— **`${project}/build`**
*   **`npm run pusher-history`**
    >   used to show the history of publish, the list would be displayed like the following
    ```javascript
    1.0.0
        1. 2011-11-11 11:11:11

    1.0.1
        1. 2011-11-12 11:11:11
    ```
*   **`npm run pusher-publish`**
    >   used to publish static resources in local(all files in the directory **build**) to *OSS`**

## Tech Stack
*   **Scaffold**
    *   based on **`create-react-app`** , customize the bundle configuration after running **`npm run eject`**
*   **JavaScript Framework**
    *   it uses **`React@~16.8.0`** , and some new features like **Hook** , **`Effect`** and so on also would be imported
*   **UI Framework**
    *   in order to avoid some unnecessary extra work for updateing, it uses **`Bootstrap`** , yes , same with ths previous version(**blog site version 4.0**)

## Addition
*   **Changelog**
    *   actually, there's tiny difference between this version and the previous version
    *   the whole web application has been splited into two parts: **server-side** and **front-end-side**
    *   it adds a new feature **oss-pusher** that is used to publish static resources into **OSS** , and the **server-side** would crash the browser cache by **version** in the import url of resource

    ```html
    <link rel="stylesheet" href="${ossDomain}/public/${version}/index.css">
    <script src="${ossDomain}/public/${version}/index.js"></script>
    ```
*   **Local Development**
    *   due to that the web appliction has been splited into two parts, the **server-side** appliction need to be activated in order to support http interfaces that would be requested by **front-end-side** , and the request url would begin with the domain **`//www.stanby.cn`** (without port)
    *   more detail the solution that resolve the issue about **`cross-origin`** , **`how to request with url begins with domain but no port`** , etc. in local development would be discussed in the **`README.md`** of **server-side** repository
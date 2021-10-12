# VAMS

## 文件结构
```
css/
    fonts/
        (BootStrap 图标库 Web Fonts)
        (Font Awesome Web Fonts)
    (BootStrap V5 Stylesheets)
    (Font Awesome Stylesheets)
js/
    main.js
    components.js
    (BootStrap JavaScript 插件)
    (jQuery 3.3.1)
    (Apache ECharts)
    (Vue 3)
login.html
index.html
```

一般的，html 页面需要包含：

```html
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <navbar></navbar>
        <base-layout title=""></base-layout>
        
        <script src="//code.bdstatic.com/npm/leancloud-storage@4.12.0/dist/av-min.js"></script>
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/bootstrap.bundle.min.js"></script>
        <script src="js/vue.global.prod.js"></script>
        <script src="js/components.js"></script>
        <script src="js/main.js"></script>
        <script>
            if (AV.User.current()) {}
        </script>
    </body>
</html>
```

## LeanCloud
本项目目前使用 LeanCloud 存储数据。LeanCloud 的 `appId`、`appKey` 在 `js/main.js` 内。

### _User 类
* `isAdmin: Boolean` 用户是否是管理员。想简化查询用户角色的产物。为角色 `admin` 新增用户后，需手动将用户的 `isAdmin` 修改为 `true`。
* `currentCampus: Number` 用户所在的校区。与首页显示的校区、新增活动时默认选择的校区有关。

### Activity 类
* `title: String`
* `campus: Number`
* `site: String`
* `participantsLimit: Number`
* `desc: String`
* `time: Array[period: Array[weekday: Number, start: Number, end: Number], ...]`
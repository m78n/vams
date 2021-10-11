使用 LeanCloud 存储数据。LeanCloud 的 `appId`、`appKey` 在 `js/main.js` 内。

# 结构化数据
## _User 类
* `isAdmin: Boolean` 用户是否是管理员。不会查询用户角色的副产物。为角色 `admin` 新增用户后，需手动将用户的 `isAdmin` 修改为 `true`。
* `currentCampus: Number` 用户所在的校区。与首页显示的校区、新增活动时默认选择的校区有关。

## Activity 类
* `title: String`
* `campus: Number`
* `site: String`
* `participantsLimit: Number`
* `desc: String`
* `time: Array[period: Array[weekday: Number, start: Number, end: Number], ...]`

## Navbar 类
* `href: String`
* `title: String`
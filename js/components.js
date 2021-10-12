const navbar = {
    data () {
        return {
            user: AV.User.current(),
            navbarItems: [
                {
                    "title": "首页",
                    "href": "index.html"
                }
            ],
            adminDropdownItems: [
                {
                    "title": "新建活动",
                    "href": "add.html"
                }
            ],
            accountDropdownItems: [
                {
                    "title": "退出账号",
                    "href": "javascript: logout();"
                }
            ],
            href: getHref()
        };
    },
    template: `
        <header>
            <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="index.html">志愿活动管理系统</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                      data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                      aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                        <ul class="navbar-nav" id="navbar-left">
                            <li v-for="item in navbarItems" class="nav-item">
                                <a class="nav-link" :class="[item.href == href ? 'active' : '']"
                                  aria-current="page" :href="item.href">{{item.title}}</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav" id="navbar-right">
                            <li v-if="user" class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown"
                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{user.get("username")}}
                                </a>
                                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbar-dropdown">
                                    <li v-if="user.get('isAdmin')" v-for="item in adminDropdownItems">
                                        <a class="dropdown-item" :class="[item.href == href ? 'active' : '']" :href="item.href">{{item.title}}</a>
                                    </li>
                                    <li v-if="user.get('isAdmin')">
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li v-for="item in accountDropdownItems">
                                        <a class="dropdown-item" :class="[item.href == href ? 'active' : '']" :href="item.href">{{item.title}}</a>
                                    </li>
                                </ul>
                            </li>
                            <a v-else class="btn btn-outline-primary me-2" href="login.html?return=${window.location.href}">登陆</a>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    `
};

const baseLayout = {
    data () {
        return {
            user: AV.User.current(),
            campuses: ["西土城校区", "沙河校区", "宏福校区"]
        };
    },
    props: ["title"],
    template: `
        <main class="flex-shrink-0 mt-5 mb-5" style="padding-top: 60px;">
            <div class="container">
                <h1 v-if="!hideTitle">{{title}}</h1>
                <div id="body-container">
                    <div v-if="user">
                        <slot></slot>
                    </div>
                    <div v-else>
                        <alert-login></alert-login>
                    </div>
                </div>
            </div>
        </main>
    `
};

const alerts = {
    props: ["type", "message"],
    template: `
        <div :class="'alert alert-' + type" role="alert">
            <i class="bi bi-exclamation-circle-fill"></i>&nbsp;
            <span v-html="message"></span>
        </div>
    `
};

const alertLogin = {
    template: `
        <alert type="danger"
          message="请先<a href='login.html?return=${window.location.href}'>登录</a>。"></alert>
    `
};

const alertError = {
    props: ["error"],
    template: `
        <alert type="danger"
          :message="error.rawMessage + ' (Error ' + error.code + ')'"></alert>
    `
};
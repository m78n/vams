const { Query, User } = AV;
AV.init({
    appId: "gtJmljD7lYSo9rNzfuH0vPDS-MdYXbMMI",
    appKey: "Ur1HYhjugdyQSBQPFsoGv4wP"
});

campuses = ["西土城校区", "沙河校区", "宏福校区"];

function getHref() {
    href = window.location.pathname.split("/");
    return href[href.length - 1];
}

$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function logout() {
    AV.User.logOut();
    window.location.reload();
}

function getError(error) {
    Vue.createApp({
        data () {
            return {
                "error": error
            };
        },
        template: `<alert-error :error="error"></alert-error>`
    })
    .component("alert-error", alertError)
    .component("alert", alerts)
    .mount("#body-container");
}

const app = Vue.createApp({})
.component("navbar", navbar)
.component("base-layout", baseLayout)
.component("alert", alerts)
.component("alert-login", alertLogin)
.component("alert-error", alertError)
.mount("body");
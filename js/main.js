const { Query, User } = AV;
AV.init({
    appId: "gtJmljD7lYSo9rNzfuH0vPDS-MdYXbMMI",
    appKey: "Ur1HYhjugdyQSBQPFsoGv4wP"
});

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

const app = Vue.createApp({})
.component("navbar", navbar)
.component("base-layout", baseLayout)
.component("alert", alerts)
.component("alert-login", alertLogin)
.component("alert-error", alertError)
.mount("body");
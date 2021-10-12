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

const app = Vue.createApp({});

function logout() {
    AV.User.logOut();
    window.location.reload();
}

app.component("navbar", navbar);
app.component("base-layout", baseLayout);
app.component("alert", _alert);
app.component("alert-login", alertLogin);
app.component("alert-error", alertError);

app.mount("body");
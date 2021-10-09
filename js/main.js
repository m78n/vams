// Initial Settings
const { Query, User } = AV;
AV.init({
    appId: "gtJmljD7lYSo9rNzfuH0vPDS-MdYXbMMI",
    appKey: "Ur1HYhjugdyQSBQPFsoGv4wP"
});
let query;
let campuses = ["西土城校区", "沙河校区", "宏福校区"];

// Time Processing Functions
let weekday = ["日", "一", "二", "三", "四", "五", "六"];
function m2hhmm(m) {
    let hh = Math.floor(m / 60);
    let mm = m - 60 * hh;
    hh = ("0" + String(hh)).slice(-2);
    mm = ("0" + String(mm)).slice(-2);
    return `${hh}:${mm}`;
}
function time2str(time) {
    let str = new Array;
    time.forEach((item) => {
        let week = new Array;
        item.loop.forEach((item) => {
            week.push(weekday[item]);
        });
        str.push(`每周${week.join("、")} ${m2hhmm(item.start)} - ${m2hhmm(item.end)}`);
    });
    return str.join("</li><li>");
}

// Navbar Items
function generateNavbar() {
    query = new AV.Query("Navbar");
    query.descending("createdAt");
    query.find().then((items) => {
        let html = "";
        items.forEach((item) => {
            href = window.location.pathname.split("/");
            href = href[href.length - 1];
            html += `
                <li class="nav-item">
                    <a class="nav-link${item.get("href") == href ? " active" : ""}" aria-current="page" href="${item.get("href")}">${item.get("title")}</a>
                </li>
            `;
        });
        $("#navbar-left").prepend(html);
    }).catch(function(error) {
        alert(JSON.stringify(error));
    });
    if (AV.User.current()) {
        $("#navbar-right").html(`
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${AV.User.current().get("username")}
                </a>
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbar-dropdown">
                    <li><a class="dropdown-item" href="#" id="user-link-logout">退出账号</a></li>
                </ul>
            </li>
        `);
        $("#user-link-logout").click(function () {
            AV.User.logOut();
            window.location.reload();
        });
    }
}
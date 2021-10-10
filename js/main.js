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
    $("body").prepend(`
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
                        <ul class="navbar-nav" id="navbar-left"></ul>
                        <ul class="navbar-nav" id="navbar-right"></ul>
                    </div> <!-- collapse navbar-collapse -->
                </div> <!-- container-fluid -->
            </nav>
        </header>
    `);
    $("main").css("padding-top", "60px");

    query = new AV.Query("Navbar");
    query.descending("createdAt");
    query.find().then((items) => {
        let html = "";
        items.forEach((item) => {
            href = window.location.pathname.split("/");
            href = href[href.length - 1];
            html += `
                <li class="nav-item">
                    <a class="nav-link${item.get("href") == href ? " active" : ""}"
                      aria-current="page" href="${item.get("href")}">${item.get("title")}</a>
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
                <a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown"
                  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${AV.User.current().get("username")}
                </a>
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbar-dropdown">
                    <li><a class="dropdown-item" href="#" id="user-link-logout">退出账号</a></li>
                </ul>
            </li>
        `);
        if (AV.User.current().get("isAdmin")) {
            $("#navbar-right li ul").prepend(`
                <li><a class="dropdown-item" href="add.html">新增活动</a></li>
            `);
        }
        $("#user-link-logout").click(function () {
            AV.User.logOut();
            window.location.reload();
        });
    }
}

function generateLoginAlert() {
    // Navbar Items
    $("#navbar-right").html(`
        <a class="btn btn-outline-primary me-2" href="login.html">登陆</a>
    `);

    // Page Body
    $("#body-container").append(`
        <div class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-circle-fill"></i>
            请先<a href="login.html">登录</a>。
        </div>
    `);
}

function generateBody(success, failure = generateLoginAlert) {
    if (AV.User.current()) {
        let user = AV.User.current();
        success(user);
    } else {
        failure();
    }
}
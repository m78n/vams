let weekday = ["日", "一", "二", "三", "四", "五", "六"];

function m2hhmm(m) {
    let hh = Math.floor(m / 60);
    let mm = m - 60 * hh;
    hh = ("0" + String(hh)).slice(-2);
    mm = ("0" + String(mm)).slice(-2);
    return `${hh}:${mm}`;
}

function generateTimeChart(id, activity) {
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption({
        title: {
            show: false
        },
        grid: {
            height: 300, 
            top: 40
        },
        xAxis: {
            min: 0,
            max: 1440,
            interval: 360,
            axisLabel: {
                formatter: val => {return m2hhmm(val);}
            },
            position: "top"
        },
        yAxis: {
            data: weekday,
            inverse: true
        },
        tooltip: {
            formatter: function (params) {
                return "星期" + weekday[params.value[0]] + " " + m2hhmm(params.value[1]) + " - " + m2hhmm(params.value[2]);
            }
        },
        series: {
            type: 'custom',
            renderItem: (params, api) => {
                var categoryIndex = api.value(0);
                var start = api.coord([api.value(1), categoryIndex]);
                var end = api.coord([api.value(2), categoryIndex]);
                var height = api.size([0, 1])[1] * 0.6;

                var rectShape = echarts.graphic.clipRectByRect({
                    x: start[0],
                    y: start[1] - height / 2,
                    width: end[0] - start[0],
                    height: height
                }, {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                });

                return rectShape && {
                    type: 'rect',
                    shape: rectShape,
                    style: api.style()
                };
            },
            data: activity.get("time")
        }
    });
}
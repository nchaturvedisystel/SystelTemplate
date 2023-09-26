var Dashboard = new Object();
Dashboard.PartItemList = {};

Dashboard.ActionUser = User.UserId;

//#region Base Page
Dashboard.BasepageOnReady = function () {
    Dashboard.LoadAll();
    //PartMaster.LoadAll();
}
Dashboard.LoadAll = function () {
    ActionUser = User.UserId;
    Ajax.AuthPost("common/DashboardGet", ActionUser, GetDashboardDetail_OnSuccessCallBack, GetDashboardDashboardDetail_OnErrorCallBack);
}
function GetDashboardDetail_OnSuccessCallBack(data) {
    Dashboard.SetHeader(data);
    Dashboard.SetUpcomingWorkList(data);
    Dashboard.SetOnGoingWorkList(data)
    Dashboard.function1(data);
    Dashboard.function2(data);
    Dashboard.BindAllWorkItem(data)
}
function GetDashboardDashboardDetail_OnErrorCallBack(data) {
}

Dashboard.SetHeader = function (data) {
    let data1 = data.dashList
    document.getElementById('averageCompletedTask').innerText = data1[0].averageCompletedTask;
    document.getElementById('currentTask').innerText = data1[0].currentTask;
    document.getElementById('etAforCurrentTask').innerText = data1[0].etAforCurrentTask;
    document.getElementById('taskCompleted').innerText = data1[0].taskCompleted;
    document.getElementById('totalActiveTask').innerText = data1[0].totalActiveTask;
}

Dashboard.SetUpcomingWorkList = function (data) {
    let data1 = data.upcomingWorkList
    for (var i = 0; i < data1.length; i++) {
        var body = document.getElementById("upcomingWorkListBody");
        var RowHtml = ('' + '<li style="padding-left:20px;">' + data1[i].remarks + '</td>')
        body.innerHTML = body.innerHTML + RowHtml;
    }
}

Dashboard.SetOnGoingWorkList = function (data) {
    let data1 = data.ongoingWorkList
    var SrNo = 0;
    for (var i = 0; i < data1.length; i++) {
        var body = document.getElementById("onGoingListBody");
        SrNo += 1;

        // Determine the status based on data1[i].notStarted
        var status = data1[i].notStarted === 0 ? "Not Started" : "Started";

        var RowHtml = (''
            + '                   <tr>'
            + '                       <td>' + SrNo + '</td>'
            + '                       <td style="padding-left:20px;">' + data1[i].workCenterCode + '</td>'
            + '                       <td style="padding-left:20px;">' + data1[i].remarks + '</td>'
            + '                       <td style="padding-left:20px;">' + status + '</td>'
            + '                   </tr>')

        body.innerHTML = body.innerHTML + RowHtml;
    }

}

Dashboard.function1 = function (data) {
    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("wcv_chart");


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout
        }));


        // Data
        var colors = chart.get("colors");
        var chartdata = [];
        for (var i = 0; i < data.timeSpentWorkList.length; i++) {
            var data7 = data.timeSpentWorkList;
            var country = data7[i].workCenterCode;
            var visits = data7[i].completed;
            var columnSettings = { fill: colors.next() };

            // Create an object with extracted values and settings
            var graphItem = {
                country: country,
                visits: visits,
                columnSettings: columnSettings
            };

            // Push the object into the GraphData array
            chartdata.push(graphItem);
        }



        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 10
        })

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "country",
            renderer: xRenderer,
            bullet: function (root, axis, dataItem) {
                return am5xy.AxisBullet.new(root, {
                    location: 0.5,
                    sprite: am5.Picture.new(root, {
                        width: 12,
                        height: 12,
                        centerY: am5.p50,
                        centerX: am5.p50,
                        src: dataItem.dataContext.icon
                    })
                });
            }
        }));

        xRenderer.grid.template.setAll({
            location: 1
        })

        xRenderer.labels.template.setAll({
            paddingTop: 20
        });

        xAxis.data.setAll(chartdata);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "visits",
            categoryXField: "country"
        }));

        series.columns.template.setAll({
            tooltipText: "{categoryX}: {valueY}",
            tooltipY: 0,
            strokeOpacity: 0,
            templateField: "columnSettings"
        });

        series.data.setAll(chartdata);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
        chart.appear(1000, 100);

    }); // end am5.ready()
}

Dashboard.function2 = function (data) {
    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("AverageRoles_chart");
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/radar-chart/
        var chart = root.container.children.push(am5radar.RadarChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            innerRadius: am5.percent(20),
            startAngle: -90,
            endAngle: 180
        }));


        // Data
        var colors = chart.get("colors");
        var progressData = [];
        for (var i = 0; i < data.workProgressList.length; i++) {
            var data7 = data.workProgressList;
            var roleCode = data7[i].workCenterCode;
            var utilized = data7[i].workcenterId;
            var columnSettings = { fill: colors.next() };

            // Create an object with extracted values and settings
            var graphItem = {
                utilized: utilized,
                roleCode: roleCode,
                columnSettings: columnSettings
            };

            // Push the object into the GraphData array
            progressData.push(graphItem);
        }

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
        var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
            behavior: "zoomX"
        }));

        cursor.lineY.set("visible", false);

        // Create axes and their renderers
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
        var xRenderer = am5radar.AxisRendererCircular.new(root, {
            //minGridDistance: 50
        });

        xRenderer.labels.template.setAll({
            radius: 10
        });

        xRenderer.grid.template.setAll({
            forceHidden: true
        });

        var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            renderer: xRenderer,
            min: 0,
            max: 5,
            strictMinMax: true,
            numberFormat: "#'%'",
            tooltip: am5.Tooltip.new(root, {})
        }));


        var yRenderer = am5radar.AxisRendererRadial.new(root, {
            minGridDistance: 10
        });

        yRenderer.labels.template.setAll({
            centerX: am5.p100,
            fontWeight: "500",
            fontSize: 11,
            templateField: "columnSettings"
        });

        yRenderer.grid.template.setAll({
            forceHidden: true
        });

        var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "roleCode",
            renderer: yRenderer
        }));

        yAxis.data.setAll(progressData);


        // Create series
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
        var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            clustered: false,
            valueXField: "utilized",
            categoryYField: "roleCode",
            fill: root.interfaceColors.get("alternativeBackground")
        }));

        series1.columns.template.setAll({
            width: am5.p100,
            fillOpacity: 0.08,
            strokeOpacity: 0,
            cornerRadius: 20,
        });

        series1.data.setAll(progressData);


        var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            clustered: false,
            valueXField: "utilized",
            categoryYField: "roleCode"
        }));

        series2.columns.template.setAll({
            width: am5.p100,
            strokeOpacity: 0,
            tooltipText: "{category}: {valueX}%",
            cornerRadius: 20,
            templateField: "columnSettings"
        });

        series2.data.setAll(progressData);

        // Animate chart and series in
        // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
        series1.appear(1000);
        series2.appear(1000);
        chart.appear(1000, 100);

    }); // end am5.ready()
}


Dashboard.BindAllWorkItem = function () {
    var select = document.getElementById('PartItemIdSelect');
    var data = Dashboard.PartItemList;
    select.innerHTML = "";
    optHtml = '<option value="0" id="RolesSelectOption_0">Select an option</option>'
    select.innerHTML = select.innerHTML + optionHtml
    for (var i = 0; i < data.length; i++) {

        var optionHtml = '<option value="' + data[i].partId + '" id="RolesSelectOption_' + data[i].partId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].partName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
    if (PartItemDetail.PartId == 0) {
        Dashboard.PartItemFetch();
    }
    else {
        document.getElementById('PartItemIdSelect').value = PartItemDetail.PartId;
        Dashboard.PartItemFetch();
    }
}

Dashboard.PartItemFetch = function () {
    let selectedPartItemId = document.getElementById('PartItemIdSelect').value;
}
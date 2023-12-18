var SupportDashBoard = new Object();

SupportDashBoard.AdminOnReady = function () {
    if (document.getElementById("PriorityWisePieChart")) {
        SupportDashBoard.LoadDefaultDates();
        SupportDashBoard.LoadAdminDashboard();
    }
    else {
        setTimeout(function () {
            SupportDashBoard.AdminOnReady();
        }, 1000);
    }   

}
SupportDashBoard.ClientOnReady = function () {
    alert("Client Dashboard");
}
SupportDashBoard.UserOnReady = function () {
    alert("User Dashboard");
}
SupportDashBoard.LoadAdminDashboard = function () {
    var inputParams = {};
    inputParams.startDate = $("#AdminDBStartDate").val();
    inputParams.endDate = $("#AdminDBEndDate").val();
    Ajax.AuthPost("ticket/GetAdminDashboardData", inputParams, LoadAdminDashboard_OnSuccessCallBack, LoadAdminDashboard_OnErrorCallBack);

}
function LoadAdminDashboard_OnSuccessCallBack(data) {
    if (data && data.ticketCount)
        SupportDashBoard.SetTicketsCount(data.ticketCount);

    if (data && data.priorityWiseCount)
        SupportDashBoard.LoadPriorityWise(data.priorityWiseCount);

    if (data && data.categoryWiseCount)
        SupportDashBoard.LoadCategoryWise(data.categoryWiseCount);

    if (data && data.clientWiseCount)
        SupportDashBoard.LoadClientWise(data.clientWiseCount);

    if (data && data.supportUserWiseCount)
        SupportDashBoard.LoadUserWise(data.supportUserWiseCount);
}
function LoadAdminDashboard_OnErrorCallBack(err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
SupportDashBoard.SetTicketsCount = function (data) {
    document.getElementById("TotalTicketsDiv").innerHTML = data.find(o => o.key === 'Total').value;
    document.getElementById("OpenTicketsDiv").innerHTML = data.find(o => o.key === 'Open').value;
    document.getElementById("CloseTicketsDiv").innerHTML = data.find(o => o.key === 'Close').value;
    document.getElementById("InProgressTicketsDiv").innerHTML = data.find(o => o.key === 'InProgress').value;
}
SupportDashBoard.LoadPriorityWise = function (data) {
    data = data.filter(function (el) { return el.key != "Total"; });
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("PriorityWisePieChart", am4charts.PieChart);

        // Add data
        chart.data = data;

        // Set inner radius
        chart.innerRadius = am4core.percent(90);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "key";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 0;
        pieSeries.slices.template.strokeOpacity = 0;
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.colors.list = [
            am4core.color("#F24800"),
            am4core.color("#F89C00")
        ];

        // Add a legend
        chart.legend = new am4charts.Legend();
        chart.legend.maxWidth = 300;
        chart.legend.valueLabels.template.align = "right";
        chart.legend.valueLabels.template.textAlign = "end";
        chart.legend.position = "right";
        let markerTemplate = chart.legend.markers.template;
        markerTemplate.width = 10;
        markerTemplate.height = 10;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

    });
}
SupportDashBoard.LoadCategoryWise = function (data) {
    data = data.filter(function (el) { return el.key != "Total"; });
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("CategoryWisePieChart", am4charts.PieChart);

        // Add data
        chart.data = data;

        // Set inner radius
        chart.innerRadius = am4core.percent(90);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "key";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 0;
        pieSeries.slices.template.strokeOpacity = 0;
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.colors.list = [
            am4core.color("#F24800"),
            am4core.color("#F89C00")
        ];

        // Add a legend
        chart.legend = new am4charts.Legend();
        chart.legend.maxWidth = 300;
        chart.legend.valueLabels.template.align = "right";
        chart.legend.valueLabels.template.textAlign = "end";
        chart.legend.position = "right";
        let markerTemplate = chart.legend.markers.template;
        markerTemplate.width = 10;
        markerTemplate.height = 10;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

    });
}
SupportDashBoard.LoadClientWise = function (data) {

    am5.array.each(am5.registry.rootElements,
        function (root) {
            if (root && root.dom && root.dom.id && root.dom.id == "ClientWiseChart") {
                root.dispose();
            }
        }
    );
    ////// Client wise chart //////
    am5.ready(function () {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("ClientWiseChart");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true,
            paddingLeft: 0,
            paddingRight: 1
        }));

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            minorGridEnabled: true
        });

        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });

        xRenderer.grid.template.setAll({
            location: 1
        })

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "key",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        var yRenderer = am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: yRenderer
        }));

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "totalTickets",
            sequencedInterpolation: true,
            categoryXField: "key",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });


        // Set data
        //var data = data;

        xAxis.data.setAll(data);
        series.data.setAll(data);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);

    }); // end am5.ready()
}
SupportDashBoard.LoadUserWise = function (data) {
    am5.array.each(am5.registry.rootElements,
        function (root) {
            if (root && root.dom && root.dom.id && root.dom.id == "AgentPerformanceChart") {
                root.dispose();
            }
        }
    );
    am5.ready(function () {


        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("AgentPerformanceChart");


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
            paddingLeft: 0,
            layout: root.verticalLayout
        }));

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true
        });
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "key",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(data);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name, fieldName) {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                stacked: true,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "key"
            }));

            series.columns.template.setAll({
                tooltipText: "{name}, {categoryX}: {valueY}",
                tooltipY: am5.percent(10)
            });
            series.data.setAll(data);

            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear();

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: am5.p50,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });

            legend.data.push(series);
        }

        makeSeries("Closed", "closeTickets");
        makeSeries("Open", "openTickets");
        makeSeries("InProgress", "inProgressTickets");
        //makeSeries("Others", "others");


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);

    }); // end am5.ready()
}
SupportDashBoard.LoadDefaultDates = function () {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    //var lastDay = new Date(y, m + 1, 0);

    var day = ("0" + firstDay.getDate()).slice(-2);
    var month = ("0" + (firstDay.getMonth() + 1)).slice(-2);
    var firstDay = firstDay.getFullYear() + "-" + (month) + "-" + (day);
    $("#AdminDBStartDate").val(firstDay);

    day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var today = date.getFullYear() + "-" + (month) + "-" + (day);
    $("#AdminDBEndDate").val(today);
}

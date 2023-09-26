var Admin = new Object();
let ActionUser = User.UserId;
Admin.ActiveRolesList = {}
Admin.ActivePagesList = {}
Admin.PerformanceList = {}
Admin.WorkCenterList = {}
Admin.DashboardList = {}
Admin.PartItemList = {};


//#region Base Page
Admin.BasepageOnReady = function () {
    Admin.LoadAll();
    //PartMaster.LoadAll();
}
Admin.LoadAll = function () {
    Ajax.AuthPost("admin/AdminDashboardGet", ActionUser, GetAdminDashboardDetail_OnSuccessCallBack, GetAdminDashboardDetail_OnErrorCallBack);
}
function GetAdminDashboardDetail_OnSuccessCallBack(data) {
    Admin.SetHeader(data);
    Admin.SetWorkCenterList(data);
    Admin.SetWorkCenterStepList(data);
    Admin.performanceList(data);
    Admin.activePagesList(data);
    Admin.activeRolesList(data);
    Admin.function1(data);
    Admin.function2(data);
    Admin.function3 (data);
    Admin.function4 (data);
}
function GetAdminDashboardDetail_OnErrorCallBack(data) {
}

Admin.SetHeader = function (data) {
    let data1 = data.dashboardList
    document.getElementById('problemReported').innerText = data1[0].problemsReported;
    document.getElementById('resolved').innerText = data1[0].resolved;
    document.getElementById('etaTime').innerText = data1[0].etaTime;
    document.getElementById('activeTravelers').innerText = data1[0].activeTravelers;
    document.getElementById('activeWorkOrders').innerText = data1[0].activeWorkOrders;
    document.getElementById('averageDelay').innerText = data1[0].averageDelay;
}
Admin.SetWorkCenterList = function (data) {
    let data2 = data.workCenterList
    for (var i = 0; i < data2.length; i++) {
        var body = document.getElementById("workCenterBody");
        var RowHtml = (''
            + '                   <tr>'
            + '                       <td style="padding-left:20px;">' + data2[i].workCenterCode + '</td>'
            + '                       <td style="padding-left:20px;">' + data2[i].completed + '</td>'
            + '                   </tr>')

        body.innerHTML = body.innerHTML + RowHtml;
    }
}
Admin.SetWorkCenterStepList = function (data) {
    let data3 = data.workCenterList
    for (var i = 0; i < data3.length; i++) {
        var body = document.getElementById("workCenterStepsBody");
        var RowHtml = (''
            + '                   <tr>'
            + '                       <td style="padding-left:20px;">' + data3[i].workCenterCode + '</td>'
            + '                       <td style="padding-left:20px;">' + data3[i].notStarted + '</td>'
            + '                   </tr>')

        body.innerHTML = body.innerHTML + RowHtml;
    }
}

Admin.performanceList = function (data) {
    let data4 = data.performanceList
    for (var i = 0; i < data4.length; i++) {
        var body = document.getElementById("performanceListBody");
        var RowHtml = (''
            + '                   <tr>'
            + '                       <td style="padding-left:20px;">' + data4[i].firstName + '</td>'
            + '                       <td style="padding-left:20px;">' + data4[i].progressCount + '</td>'
            + '                   </tr>')

        body.innerHTML = body.innerHTML + RowHtml;
    }
}

Admin.activePagesList = function (data) {
    let data5 = data.activePagesList
    for (var i = 0; i < data5.length; i++) {
        var body = document.getElementById("activePagesListBody");
        var RowHtml = (''
            + '                   <tr>'
            + '                       <td style="padding-left:20px;">' + data5[i].pageCode + '</td>'
            + '                       <td style="padding-left:20px;">' + data5[i].totalDuration + '</td>'
            + '                   </tr>')

        body.innerHTML = body.innerHTML + RowHtml;
    }
}

Admin.activeRolesList = function (data) {
    let data6 = data.activeRolesList
    for (var i = 0; i < data6.length; i++) {
        var body = document.getElementById("activeRolesListBody");
        var RowHtml = (''
            + '                   <tr>'
            + '                       <td style="padding-left:20px;">' + data6[i].roleCode + '</td>'
            + '                       <td style="padding-left:20px;">' + data6[i].utilized + '</td>'
            + '                   </tr>')

        body.innerHTML = body.innerHTML + RowHtml;
    }
}
Admin.function1 = function (data) {
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
        var GraphData = [];
        for (var i = 0; i < data.workCenterList.length; i++) {
            var data7 = data.workCenterList;
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
            GraphData.push(graphItem);
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

        xAxis.data.setAll(GraphData);

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

        series.data.setAll(GraphData);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
        chart.appear(1000, 100);

    }); // end am5.ready()
}
Admin.function2 = function (data) {
    am5.ready(function() {
  
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("wcs_chart");
        
        
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
        
        
        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(
          am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
          })
        );
        var chartData = []
        for (var i = 0; i < data.workCenterList.length; i++) {
            var data7 = data.workCenterList;
            var year = data7[i].workCenterCode;
            var fieldName = data7[i].notStarted;
            
            // Create an object with extracted values and settings
            var graphItem = {
                year: year,
                fieldName: fieldName,
            };
        
            // Push the object into the GraphData array
            chartData.push(graphItem);
        }        
        
        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9
        })
        
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "year",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        xRenderer.grid.template.setAll({
          location: 1
        })
        
        xAxis.data.setAll(chartData);
        
        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
          })
        }));
        
        
        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name, fieldName) {
          var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "fieldName",
            categoryXField: "year"
          }));
        
          series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}:{valueY}",
            width: am5.percent(90),
            tooltipY: 0,
            strokeOpacity: 0
          });
        
          series.data.setAll(chartData);
        
          // Make stuff animate on load
          // https://www.amcharts.com/docs/v5/concepts/animations/
          series.appear();
        
          series.bullets.push(function() {
            return am5.Bullet.new(root, {
              locationY: 0,
              sprite: am5.Label.new(root, {
                text: "{valueY}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: 0,
                centerX: am5.p50,
                populateText: true
              })
            });
          });
        
          legend.data.push(series);
        }
        
        makeSeries("Completed", fieldName);
        makeSeries("InProgress", fieldName);
        makeSeries("NotStarted", fieldName);        
        
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
        
        }); // end am5.ready()
}
Admin.function3 = function (data) {
    am5.ready(function () {


        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("ap_chart");


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
            wheelY: "zoomX"
        }));


        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomX"
        }));
        cursor.lineY.set("visible", false);

        var pageData=[]
        for (var i = 0; i < data.activePagesList.length; i++) {
            var data7 = data.activePagesList;
            var pageCode = data7[i].pageCode;
            var totalDuration = data7[i].totalDuration;
            
            // Create an object with extracted values and settings
            var graphItem = {
                pageCode: pageCode,
                totalDuration: totalDuration,
            };
        
            // Push the object into the GraphData array
            pageData.push(graphItem);
        }


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        })

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "pageCode",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(pageData);

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));


        // Add series
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "totalDuration",
            categoryXField: "pageCode"
        }));

        series.columns.template.setAll({
            tooltipText: "{categoryX}: {valueY}",
            tooltipY: 0,
            strokeOpacity: 0,
            templateField: "columnSettings"
        });

        series.data.setAll(pageData);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
        chart.appear(1000, 100);

    }); // end am5.ready()
}
Admin.function4 = function (data) {
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
        var roleData = [];
        for (var i = 0; i < data.activeRolesList.length; i++) {
            var data7 = data.activeRolesList;
            var roleCode = data7[i].roleCode;
            var utilized = data7[i].utilized;
            
            // Create an object with extracted values and settings
            var graphItem = {
                utilized: utilized,
                roleCode: roleCode,
            };
        
            // Push the object into the GraphData array
            roleData.push(graphItem);
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

        yAxis.data.setAll(roleData);


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
            cornerRadius: 20
        });

        series1.data.setAll(roleData);


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

        series2.data.setAll(roleData);

        // Animate chart and series in
        // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
        series1.appear(1000);
        series2.appear(1000);
        chart.appear(1000, 100);

    }); // end am5.ready()
}

//#endregion Base Page


Admin.BindAllWorkItem = function () {
    var select = document.getElementById('PartItemIdSelect');
    var data = Admin.PartItemList;
    select.innerHTML = "";
    optHtml = '<option value="0" id="RolesSelectOption_0">Select an option</option>'
    select.innerHTML = select.innerHTML + optionHtml
    for (var i = 0; i < data.length; i++) {

        var optionHtml = '<option value="' + data[i].partId + '" id="RolesSelectOption_' + data[i].partId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].partName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
    if (PartItemDetail.PartId == 0) {
        Admin.PartItemFetch();
    }
    else {
        document.getElementById('PartItemIdSelect').value = PartItemDetail.PartId;
        Admin.PartItemFetch();
    }
}

Admin.PartItemFetch = function () {
    let selectedPartItemId = document.getElementById('PartItemIdSelect').value;
}
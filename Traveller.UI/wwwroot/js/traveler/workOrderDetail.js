WorkOrderDetail = new Object();

WorkOrderDetail.WorkOrderId = 0;
WorkOrderDetail.WorkName = "";
WorkOrderDetail.WorkCode = "";
WorkOrderDetail.WorkDesc = "";
WorkOrderDetail.WorkFlowId = 0;
WorkOrderDetail.WorkFlowName = "";
WorkOrderDetail.WorkFlowCode = "";
WorkOrderDetail.PartName = "";
WorkOrderDetail.PartCode = "";
WorkOrderDetail.PartDesc = "";
WorkOrderDetail.UnitsOrdered = 0;
WorkOrderDetail.NumberOfTraveler = 0;
WorkOrderDetail.WorkCenterName = "";
WorkOrderDetail.WorkCenterCode = "";
WorkOrderDetail.StepName = "";
WorkOrderDetail.StepCode = "";
WorkOrderDetail.WorkOrderList = {};

//#region -- WorkOrder
WorkOrderDetail.CreateWorkOrderOnReady = function () {
    WorkOrder.LoadAll();
}

WorkOrderDetail.LoadAll = function (data) {

    if (WorkOrderDetail.WorkOrderId && WorkOrderDetail.WorkOrderId != 0) {
        WorkOrderDetail.WorkOrderId = WorkOrderDetail.WorkOrderId;
    }
    else if (data && data != null) {
        WorkOrderDetail.WorkOrderId = data;
    }
    else {
        WorkOrderDetail.WorkOrderId = document.getElementById('WorkOrderIdSelect').value;
    }

    Ajax.AuthPost("traveler/WorkOrderDetails", WorkOrderDetail, WorkOrderDetail_OnSuccessCallBack, WorkOrderDetail_OnErrorCallBack);
    WorkOrderDetail.WorkOrderId = 0;
}

WorkOrderDetail.LoadTravelerProgressBar = function (data) {
    var dataArray = [];
    var travelerArray = [];

    // Iterate through the travelerList objects in data
    for (var i = 0; i < data.travelerList.length; i++) {
        var traveler = data.travelerList[i];
        dataArray.push(traveler.progress);
        travelerArray.push(traveler.workItemCode);
    }

    // Now dataArray contains progress values and travelerArray contains workItemName values
    Highcharts.chart('TravelerProgressBarDiv', {
        chart: {
            type: 'column',
            spacing: [5, 5, 0, 0],
            backgroundColor: null
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
            align: 'left'
        },
        subtitle: {
            text:
                '',
            align: 'left'
        },
        xAxis: {
            categories: travelerArray,
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        navigation: {
            buttonOptions: {
              enabled: false
              }
             },
        series: [
            {
                showInLegend: false,
                name: '',
                data: dataArray
            }
        ]
    });
}

WorkOrderDetail.LoadWorkOrderProgressPieChart = function (data) {
    var timeSpent = Util.DisplayTime(data.workOrderDetailDTO.timeSpent);
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("CWA_chart_web", am4charts.PieChart);

        // Calculate the sum of progress values for Completed status
        var completedSum = 0;
        for (var i = 0; i < data.travelerList.length; i++) {
            completedSum += data.travelerList[i].progress;
        }

        // Calculate the total number of workItemName items
        var totalWorkItems = data.travelerList.length;

        // Calculate the value for Remaining status
        var totalProgressSum = totalWorkItems * 100;
        var remainingValue = totalProgressSum - completedSum;

        // Calculate the values out of 100 and round to 2 decimal points
        var completedPercentage = ((completedSum / totalProgressSum) * 100).toFixed(2);
        var remainingPercentage = ((remainingValue / totalProgressSum) * 100).toFixed(2);

        // Check if completedPercentage is NaN and assign 0 if true
        completedPercentage = isNaN(completedPercentage) ? 0 : completedPercentage;

        // Check if remainingPercentage is NaN and assign 0 if true
        remainingPercentage = isNaN(remainingPercentage) ? (100-completedPercentage) : remainingPercentage;

        document.getElementById("completedId").innerText = completedPercentage + "%";
        document.getElementById("remainingId").innerText = remainingPercentage + "%";
        document.getElementById("timeSpent").innerText = timeSpent;


        // Add data
        chart.data = [{
            "status": "Completed",
            "values": completedPercentage
        }, {
            "status": "Remaining",
            "values": remainingPercentage
        }];

        // Set inner radius
        chart.innerRadius = am4core.percent(90);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "values";
        pieSeries.dataFields.category = "status";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 0;
        pieSeries.slices.template.strokeOpacity = 0;
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.colors.list = [
            am4core.color("#e9621f"),
            am4core.color("#f9f8fa")
        ];

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

    });

}

//#region  -- Show Orders
function WorkOrderDetail_OnSuccessCallBack(data) {
    WorkOrderDetail.SetHeader(data);
        WorkOrderDetail.SetBody(data)
    WorkOrderDetail.LoadTravelerProgressBar(data);
    WorkOrderDetail.LoadWorkOrderProgressPieChart(data);
    if (data != null && data.workOrderDetailDTO != null) {
        document.getElementById('WorkOrderDetailLabel').innerText = `WorkOrder Details - ${data.workOrderDetailDTO.workName}`;
    }
}
function WorkOrderDetail_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);

}

WorkOrderDetail.SetHeader = function (WorkOrderDetail) {
    if (WorkOrderDetail != null && WorkOrderDetail.workOrderDetailDTO != null) {
        document.getElementById("workName").innerText = WorkOrderDetail.workOrderDetailDTO.workName;
        document.getElementById("workCode").innerText = WorkOrderDetail.workOrderDetailDTO.workCode;
        document.getElementById("partName").innerText = WorkOrderDetail.workOrderDetailDTO.partName;
        document.getElementById("partCode").innerText = WorkOrderDetail.workOrderDetailDTO.partCode;
        document.getElementById("unitsReceived").innerText = WorkOrderDetail.workOrderDetailDTO.unitsOrdered;
        document.getElementById('numOfTravelers').innerText = WorkOrderDetail.workOrderDetailDTO.numberOfTravelers;
    }
}

WorkOrderDetail.SetBody = function (WorkOrderDetail) {

    if (WorkOrderDetail.travelerList && WorkOrderDetail.travelerList.length > 0) {
        var body = document.getElementById("TravelersListBody");
        body.innerHTML = "";
        let SrNo = 0;
        for (var i = 0; i < WorkOrderDetail.travelerList.length; i++) {
            SrNo += 1;
            var RowHtml = ('<tr>'
                + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + SrNo + '</td>'
                + '                <td>' + WorkOrderDetail.travelerList[i].workItemName + '</td>'
                + '                <td>' + WorkOrderDetail.travelerList[i].workItemCode + '</td>'
                + '                <td>' + WorkOrderDetail.travelerList[i].stepsCompleted + '</td>'
                + '                <td>' + WorkOrderDetail.travelerList[i].totalSteps + '</td>'
                + '                <td>'
                + '                    <div class="progress mb-1" style="height: 7px;">'
                + '                        <div class="progress-bar rounded-pill" role="progressbar" style="width: ' + parseInt((WorkOrderDetail.travelerList[i].stepsCompleted * 100) / WorkOrderDetail.travelerList[i].totalSteps).toString() + '%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>'
                + '                    </div>'
                + '                    ' + Util.GetUnitsPercentageString(WorkOrderDetail.travelerList[i].stepsCompleted, WorkOrderDetail.travelerList[i].totalSteps) + '%'
                + '                </td>'
                + '                <td>' + WorkOrderDetail.travelerList[i].workCenterCode + '</td>'
                + '                <td>' + WorkOrderDetail.travelerList[i].stepName + '</td>'
                + '                <td class="text-center">'
                + '                     <div class="btn-group dots_dropdown">'
                + '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                + '                             <i class="fas fa-ellipsis-v"></i>'
                + '                         </button>'
                + '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                + '                             <button class="dropdown-item" type="button" id="viewIcon_' + WorkOrderDetail.travelerList[i].workOrderId + '" onclick="WorkOrderDetail.View (\'' + encodeURIComponent(JSON.stringify(WorkOrderDetail.travelerList[i])) + '\')">'
                + '                                 <i class="fa fa-eye"></i> View'
                + '                             </button>'
                + '                         </div>'
                + '                     </div>'
                + '                </td> '
                + '            </tr>'
                + '');

            body.innerHTML = body.innerHTML + RowHtml;
        }
    }
    else {
        var body = document.getElementById("TravelersListBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan = "10">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
}

WorkOrderDetail.View = function (data) {
    WorkItem.WorkOrder = JSON.parse(decodeURIComponent(data));
    WorkItem.WorkItemId = WorkItem.WorkOrder.workItemId;
    Navigation.LoadPageFromUrl('/html/traveler/WorkItemDetail.html', 'URAD');
}

WorkOrderDetail.WorkOrderDetaillistDropDown = function () {
    var select = document.getElementById('WorkOrderIdSelect');
    var data = WorkOrderDetail.WorkOrderList;
    select.innerHTML = "";
    optHtml = '<option value="0" id="RolesSelectOption_0">Select an option</option>'
    select.innerHTML = select.innerHTML + optionHtml
    for (var i = 0; i < data.length; i++) {

        var optionHtml = '<option value="' + data[i].workOrderId + '" id="RolesSelectOption_' + data[i].workOrderId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].workName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
    if (WorkOrderDetail.WorkOrderId == 0) {
        WorkOrderDetail.WorkOrderFetch();
    }
    else {
        document.getElementById('WorkOrderIdSelect').value = WorkOrderDetail.WorkOrderId;
        WorkOrderDetail.WorkOrderFetch();
    }

}

WorkOrderDetail.WorkOrderFetch = function () {
    let selectedWorkorderId = document.getElementById('WorkOrderIdSelect').value;
    WorkOrderDetail.LoadAll(selectedWorkorderId);
}
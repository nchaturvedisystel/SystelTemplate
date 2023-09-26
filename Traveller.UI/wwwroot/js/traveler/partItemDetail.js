PartItemDetail = new Object();

PartItemDetail.PartId = 0;
PartItemDetail.PartName = "";
PartItemDetail.PartCode = "";
PartItemDetail.PartDesc = "";
PartItemDetail.UserGroup = "";
PartItemDetail.NumberOfWorkOrders = 0;
PartItemDetail.NumberOfTraveler = 0;
PartItemDetail.PartItemList = {};

//#region -- PartItem
PartItemDetail.CreatePartMasterOnReady = function () {
    PartMaster.LoadAll();
}

PartItemDetail.LoadAll = function (data) {
    PartItemDetail.PartId = data;
    Ajax.AuthPost("traveler/PartItemDetails", PartItemDetail, PartItemDetail_OnSuccessCallBack, PartItemDetail_OnErrorCallBack);
}

PartItemDetail.LoadWorkOrderProgressBar = function (data) {
    var dataArray = [];
    var workOrdersArray = [];

    // Iterate through the travelerList objects in data
    for (var i = 0; i < data.workOrdersList.length; i++) {
        var workOrder = data.workOrdersList[i];
        dataArray.push(workOrder.progress);
        workOrdersArray.push(workOrder.workCode);
    }

    // Now dataArray contains progress values and travelerArray contains workItemName values


    Highcharts.chart('WorkOrderProgressBarDiv', {
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
            categories: workOrdersArray,
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

    var timeSpent = Util.DisplayTime(data.partItem.timeSpent);

    ////////// Category wise Allocation ///////////
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("CWA_chart_web", am4charts.PieChart);

        // Calculate the sum of progress values for Completed status
        var completedSum = 0;
        for (var i = 0; i < data.workOrdersList.length; i++) {
                completedSum += data.workOrdersList[i].progress;
        }

        var totalProgressSum = calculateTotalStepsSum(data.workOrdersList);
        var remainingValue = totalProgressSum - completedSum;

        // Calculate the sum of totalSteps values for each workOrdersList object
        function calculateTotalStepsSum(workOrdersList) {
            var sum = 0;
            for (var i = 0; i < workOrdersList.length; i++) {
                sum += workOrdersList[i].progress;
            }
            return sum;
            
            
        }

         // Calculate the values out of 100 and round to 2 decimal points
        var completedPercentage = ((completedSum / totalProgressSum) * 100).toFixed(2);
        var remainingPercentage = ((remainingValue / totalProgressSum) * 100).toFixed(2);

        // Check if completedPercentage is NaN and assign 0 if true
        completedPercentage = isNaN(completedPercentage) ? 0 : completedPercentage;

        // Check if remainingPercentage is NaN and assign 0 if true
        remainingPercentage = isNaN(remainingPercentage) ? (100-completedPercentage) : remainingPercentage;

        document.getElementById("numOfSteps").innerText = totalProgressSum;
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

//#region  -- Show PartItemDetail
function PartItemDetail_OnSuccessCallBack(data) {
    PartItemDetail.SetHeader(data);
    PartItemDetail.SetBody(data);
    PartItemDetail.BindChildData(data);
    PartItemDetail.LoadWorkOrderProgressBar(data);

    if (data != null && data.partItem != null) {
        document.getElementById('PartItemDetailLabel').innerText = `Top Level Details - ${data.partItem.partName}`;
    }
}
function PartItemDetail_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);

}

PartItemDetail.SetHeader = function (data) {
    if (data.partItem != null) {
        document.getElementById("partName").innerText = data.partItem.partName;
        document.getElementById("partCode").innerText = data.partItem.partCode;
        document.getElementById("numOfWorkOrders").innerText = data.partItem.numberOfWorkOrders;
        document.getElementById("numOfTravelers").innerText = data.partItem.noOfTravelers;
      }
    }

PartItemDetail.SetBody = function (PartItemDetail) {

    if (PartItemDetail.workOrdersList && PartItemDetail.workOrdersList.length > 0) {
        var body = document.getElementById("PartItemListBody");
        body.innerHTML = "";
        var SrNo = 0;
        for (var i = 0; i < PartItemDetail.workOrdersList.length; i++) {
            if (PartItemDetail.workOrdersList[i].workOrderId == 0) { }
            SrNo += 1;
            var RowHtml = '<tr>'
                + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';"> '
                + '                     <i class="fa fa-angle-down expand_row_arrow" aria-hidden="true" id="ExpandWorkOrder' + PartItemDetail.workOrdersList[i].workOrderId.toString() + '" onclick="PartItemDetail.ExpandWorkOrdersDataRowOnClick (' + PartItemDetail.workOrdersList[i].workOrderId.toString() + ', this)" ></i>'
                + '                <td>' + SrNo + '</td>'
                + '                <td>' + PartItemDetail.workOrdersList[i].workName + '</td>'
                + '                <td>' + PartItemDetail.workOrdersList[i].workCode + '</td>'
                + '                <td>' + PartItemDetail.workOrdersList[i].workDesc + '</td>'
                + '                <td>' + PartItemDetail.workOrdersList[i].unitsOrdered + '</td>'
                + '                <td>'
                + '                    <div class="progress mb-1" style="height: 7px;">'
                + '                        <div class="progress-bar rounded-pill" role="progressbar" style="width: ' + parseInt((PartItemDetail.workOrdersList[i].stepsCompleted * 100) / PartItemDetail.workOrdersList[i].totalSteps).toString() + '%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>'
                + '                    </div>'
                + '                    ' + Util.GetUnitsPercentageString(PartItemDetail.workOrdersList[i].stepsCompleted, PartItemDetail.workOrdersList[i].totalSteps) + '%'
                + '                </td>'
                + '                <td class="text-center">'
                + '                     <div class="btn-group dots_dropdown">'
                + '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                + '                             <i class="fas fa-ellipsis-v"></i>'
                + '                         </button>'
                + '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                + '                             <button class="dropdown-item" type="button" id="viewIcon_' + PartItemDetail.workOrdersList[i].workOrderId + '" onclick="WorkOrder.View(\'' + encodeURIComponent(JSON.stringify(PartItemDetail.workOrdersList[i])) + '\')">'
                + '                                 <i class="fa fa-eye"></i> View'
                + '                             </button>'
                + '                         </div>'
                + '                     </div>'
                + '                </td> '
                + '            </tr>'
                + '             <tr id="WorkOrderChild' + PartItemDetail.workOrdersList[i].workOrderId.toString() + '" class="ParentChildTable">'
                + '                 <td colspan="8" >'
                + '                     <div class="showDiv" style="padding-top:0px; padding-left:10px">'
                + '                         <table class="table table-bordered com_table" style="width: 100%;">'
                + '                             <thead style="border-left: 5px solid #' + Util.WCColors[i] + '; padding-left:10px ;">'
                + '                                 <tr>'
                + '                                    <th scope="col" class="col-2">Traveler Number</th>'
                + '                                    <th scope="col" class="col-1">Traveler Code</div></th>'
                + '                                    <th scope="col" class="col-1">Steps</th>'
                + '                                    <th scope="col" class="col-2">Progress</th>'
                + '                                    <th scope="col" class="col-2">Current WC</th>'
                + '                                    <th scope="col" class="col-3">Current StepName</th>'
                + '                                    <th scope="col" class="col-1"></th>'
                + '                                </tr>'
                + '                             </thead>'
                + '                             <tbody class="WorkOrderChildBody" id="WorkOrderChildBody' + PartItemDetail.workOrdersList[i].workOrderId.toString() + '" ribbonColor="#' + Util.WCColors[i] + '">'
                + '                             </tbody>'
                + '                          </table>'
                + '                     </div>'
                + '                 </td>'
                + '             </tr>'
                + '                </td>'
                + '';

            body.innerHTML = body.innerHTML + RowHtml;
        }
    }
    else {
        var body = document.getElementById("PartItemListBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan = "10">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
}

PartItemDetail.BindChildData = function (data) {
    for (var i = 0; i < data.travelerList.length; i++) {
        if (data.travelerList[i].workOrderId != 0) {
            var body = document.getElementById("WorkOrderChildBody" + data.travelerList[i].workOrderId.toString().trim());
            var ribbonColor
            if(body !== null){
                ribbonColor = body.getAttribute("ribbonColor");
            }
            var RowHtml = (''
                + '<tr>'
                + '     <td  style=" border-left:5px solid ' + ribbonColor + '; padding-left:10px;">' + data.travelerList[i].workItemName + '</td>'
                + '     <td style="padding-left:10px;">'
                + '             <div class="badge badge-secondary font-l" style="background-color: ' + ribbonColor + ';">' + data.travelerList[i].workItemCode + '</div>'
                + '     </td>'
                + '     <td style="padding-left:10px;">' + data.travelerList[i].stepsCompleted.toString() + '/' + data.travelerList[i].totalSteps.toString() + '</td>'
                + '     <td>'
                + '        <div class="progress mb-1" style="height: 7px;">'
                + '             <div class="progress-bar rounded-pill" role="progressbar" style="width: ' + parseInt((data.travelerList[i].stepsCompleted * 100) / data.travelerList[i].totalSteps).toString() + '%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>'
                + '        </div>'
                + '              ' + Util.GetUnitsPercentageString(data.travelerList[i].stepsCompleted, data.travelerList[i].totalSteps) + '%'
                + '     </td>'
                + '     <td style="padding-left:10px;">' + data.travelerList[i].workCenterName + '</td>'
                + '     <td style="padding-left:10px;">' + data.travelerList[i].stepName + '</td>'
                + '                <td class="text-center">'
                + '                     <div class="btn-group dots_dropdown">'
                + '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                + '                             <i class="fas fa-ellipsis-v"></i>'
                + '                         </button>'
                + '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                + '                             <button class="dropdown-item" type="button" id="viewIcon_' + data.travelerList[i].workOrderId + '" onclick="WorkOrderDetail.View(\'' + encodeURIComponent(JSON.stringify(data.travelerList[i])) + '\')">'
                + '                                 <i class="fa fa-eye"></i> View'
                + '                             </button>'
                + '                         </div>'
                + '                     </div>'
                + '                </td> '
                + '</tr>')

                if(body !== null){
                    body.innerHTML = body.innerHTML + RowHtml;
                }
            }
        }
    }

PartItemDetail.ExpandWorkOrdersDataRowOnClick = function (workOrderId, sender) {
    if (sender.classList.contains("active_arrow")) {
        sender.classList.remove("active_arrow");
        $("#WorkOrderChild" + workOrderId + " .showDiv").slideToggle(1000);
    }
    else {
        sender.classList.add("active_arrow");
        $("#WorkOrderChild" + workOrderId + " .showDiv").slideToggle(1000);
    }
}

PartItemDetail.ExpandWorkOrderGroupDataAllRowOnClick = function (sender) {
    if (sender.classList.contains("active_arrow")) {
        //Hide All Child Tables
        for (var i = 0; i < $(".fa-angle-down").length; i++) {
            if ($(".fa-angle-down")[i].classList.contains("active_arrow"))
                $(".fa-angle-down")[i].classList.remove("active_arrow");
        }
        for (var i = 0; i < $(".ParentChildTable").length; i++) {
            if ($("#" + $(".ParentChildTable")[i].id + " .showDiv").is(":visible"))
                $("#" + $(".ParentChildTable")[i].id + " .showDiv").slideToggle(1000);
        }
    }
    else {
        //Show All Child Tables
        for (var i = 0; i < $(".fa-angle-down").length; i++) {
            if (!$(".fa-angle-down")[i].classList.contains("active_arrow"))
                $(".fa-angle-down")[i].classList.add("active_arrow");
        }
        for (var i = 0; i < $(".ParentChildTable").length; i++) {
            if (!$("#" + $(".ParentChildTable")[i].id + " .showDiv").is(":visible"))
                $("#" + $(".ParentChildTable")[i].id + " .showDiv").slideToggle(1000);
        }

    }
}

PartItemDetail.PartItemDetaillistDropDown = function () {
    var select = document.getElementById('PartItemIdSelect');
    var data = PartItemDetail.PartItemList;
    select.innerHTML = "";
    optHtml = '<option value="0" id="RolesSelectOption_0">Select an option</option>'
    select.innerHTML = select.innerHTML + optionHtml
    for (var i = 0; i < data.length; i++) {

        var optionHtml = '<option value="' + data[i].partId + '" id="RolesSelectOption_' + data[i].partId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].partName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
    if (PartItemDetail.PartId == 0) {
        PartItemDetail.PartItemFetch();
    }
    else {
        document.getElementById('PartItemIdSelect').value = PartItemDetail.PartId;
        PartItemDetail.PartItemFetch();
    }

}

PartItemDetail.PartItemFetch = function () {
    let selectedPartItemId = document.getElementById('PartItemIdSelect').value;
    PartItemDetail.LoadAll(selectedPartItemId);

}

WorkItem = new Object();
WorkItem.userList = {}
WorkItem.WorkItemId = 0;
WorkItem.StepRemarks = '';
WorkItem.BugId = 0;
WorkItem.ActionUser = User.UserId;
WorkItem.UserRoleList = []



WorkItem.GetTravelerDetail = function () {
    UserMaster.LoadAll();

    WorkItem.GetAllTravelersList();
    roleList = User.RoleId.split(",");
    WorkItem.UserRoleList = roleList.map(i => {
        return i.trim();
    });

}

WorkItem.LoadAll = function (data) {
    if (data) {
        WorkItem.WorkItemId = data
    }
    Ajax.AuthPost("traveler/GetWorkItemTransition", WorkItem, GetWorkItemDetail_OnSuccessCallBack, GetWorkItemDetail_OnErrorCallBack);
}

function GetWorkItemDetail_OnSuccessCallBack(data) {
    if (data && data.header && data.parentList && data.childList) {
        headerData = data.header; // Assign data.menus to the menuData array
        parentData = data.parentList; // Assign data.menus to the menuData array
        childData = data.childList; // Assign data.menus to the menuData array
        WorkItem.BindParentData(parentData);
        WorkItem.BindChildData(childData);
        WorkItem.SetHeader(headerData);
        WorkItem.DisplayChartData(data);
        WorkItem.LoadWorkOrderProgressPieChart(data);
        document.getElementById("WorkItemLevelFilesCount").innerHTML = data.header.noOfFiles;
        document.getElementById("WorkItemLevelStepsCount").innerHTML = data.header.totalSteps;
        document.getElementById("WorkItemLevelInstructionsCount").innerHTML = data.header.noOfInstructions;
        if (data.header.noOfFiles > 0)
            document.getElementById("WorkItemLevelFilesCount").style.backgroundColor = "var(--orange-col)";
        if (data.header.totalSteps > 0)
            document.getElementById("WorkItemLevelStepsCount").style.backgroundColor = "var(--orange-col)";
        if (data.header.noOfInstructions > 0)
            document.getElementById("WorkItemLevelInstructionsCount").style.backgroundColor = "var(--orange-col)";

    } else {
        var body = document.getElementById("WorkflowTemplateTabularBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan="11">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
}
function GetWorkItemDetail_OnErrorCallBack(error) {
    var err = error
    Util.DisplayAutoCloseErrorPopUp(err.Message, 1500);
}

WorkItem.BindParentData = function (data) {
    var body = document.getElementById('WorkflowTemplateTabularBody');
    body.innerHTML = "";
    var SrNo = 0;
    var parentMap = {}; // To store parent data

    for (var i = 0; i < data.length; i++) {
        var parentKey = data[i].workCenterCode; // Assuming workCenterCode is unique for parents
        if (!parentMap[parentKey]) {
            SrNo += 1;
            parentMap[parentKey] = true;

            var RowHtml = ('<tr>'
                + '<td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';"> '
                + '     <i class="fa fa-angle-down expand_row_arrow" aria-hidden="true" id="ExpandTemplateWC' + data[i].workCenterId.toString() + '" onclick="WorkItem.ExpandWorkItemDataRowOnClick(' + data[i].workCenterId.toString() + ', this)" ></i>'
                + '     <td> ' + SrNo + '</td>'
                + '     <td> ' + data[i].workCenterName + '</td>'
                + '     <td>'
                + '         <div>'
                + '             <div class="badge badge-secondary font-l" style="background-color: #' + Util.WCColors[i] + ';">' + data[i].workCenterCode + '</div>'
                + '         </div>'
                + '     </td>'
                + '     <td>' + data[i].workCenterDesc + '</td>'
                + '     <td>'
                + '         <div class="row no-gutters">'
                + '             <div class="col" title="WorkCenter level total Files"><span><img src="../../Layout2/images/file_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data[i].noOfFiles) + '">' + data[i].noOfFiles.toString() + '</b></span></div>'
                + '             <div class="col" title="WorkCenter level total Steps"><span><img src="../../Layout2/images/step_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data[i].totalSteps) + '">' + data[i].totalSteps.toString() + '</b></span></div>'
                + '             <div class="col" title="WorkCenter level total Instructions"><span><img src="../../Layout2/images/instruction_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data[i].noOfInstructions) + '">' + data[i].noOfInstructions.toString() + '</b></span></div>'
                + '         </div>'
                + '     </td>'
                + ' </tr>'
                + ' <tr id="WorkItemChild' + data[i].workCenterId.toString() + '" class="ParentChildTable">'
                + '     <td colspan="8" >'
                + '         <div class="showDiv" style="padding-top:0px;  padding-left:10px;">'
                + '             <table class="table table-bordered com_table" style="width: 100%;">'
                + '                 <thead">'
                + '                     <tr style="border-left: 5px solid #' + Util.WCColors[i] + '; padding-left:10px ;">'
                + '                         <th>Sr No</th>'
                + '                         <th><div style="width: 100px;">Step Name</div></th>'
                + '                         <th><div style="width: 100px;">Complete Time</div></th>'
                + '                         <th>Current Status</th>'
                + '                         <th>Remark</th>'
                + '                         <th>Assigned To</th>'
                + '                         <th>Completed By</th>'

                + '                     </tr>'
                + '                 </thead>'
                + '                 <tbody class="WorkItemChildBody" id="WorkItemChildBody' + data[i].workCenterId.toString() + '" ribbonColor="#' + Util.WCColors[i] + '">'
                + '                 </tbody>'
                + '             </table>'
                + '         </div>'
                + '     </td>'
                + ' </tr>'
            );
            body.innerHTML = body.innerHTML + RowHtml;

        }
    }
}

// Assuming this is your existing code for adding parent rows
WorkItem.BindChildData = function (data) {
    var workCenterCounter = {};
    for (var i = 0; i < data.length; i++) {
        var SrNo = 1

        if (data[i].workCenterId != 0) {

            var workCenterId = data[i].workCenterId;
        
            // Initialize the counter for this workCenterId if not already set
            if (!workCenterCounter.hasOwnProperty(workCenterId)) {
                workCenterCounter[workCenterId] = 1;
            }
            
            // Use the counter for this workCenterId as the SrNo
            var SrNo = workCenterCounter[workCenterId]++;

            
            var body = document.getElementById("WorkItemChildBody" + data[i].workCenterId.toString());
            var ribbonColor = body.getAttribute("ribbonColor");
            var currentStatus = '';
            if (data[i].currentStatus == 0 && data[i].assignedToId == User.UserId) {
                currentStatus = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data[i].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">Check Out</button>';
            
            } else if (data[i].currentStatus == 0 && data[i].assignedToId != User.UserId) {
                currentStatus = " ";
            } else if (data[i].currentStatus == 1 && data[i].assignedToId == User.UserId) {
                currentStatus = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data[i].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">Complete</button>';
                if (WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3')) {
                   currentStatus += '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data[i].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">Reopen</button>';
                   
                }
            } else if (data[i].currentStatus == 1 && data[i].assignedToId != User.UserId) {
                currentStatus = '<div class="badge bg-warning font-l ml-4" id="checkStatusBadge_' + data[i].transitionId + '" >Checked Out</div>';
                if (WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3')) {
                    currentStatus += '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data[i].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">Reopen</button>';
                }
            } else if (data[i].currentStatus == 2) {
                currentStatus = '<div class="badge bg-success font-l ml-4 mr-2" id="checkStatusBadge_' + data[i].transitionId + '">Completed</div>';
                if (WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3')) {
                    currentStatus += '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data[i].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">Reopen</button>';
                }
            }

         

            
        


         if (data[i].currentStatus == 0) {
                currentStatus = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data[i].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">Check Out</button>';
            }

         
               




        var startDate = (data[i].startTime == null) ? '' : (new Date(data[i].startTime).toLocaleDateString("en-ES"));
            var endDate = (data[i].endTime == null) ? '' : (new Date(data[i].endTime).toLocaleDateString("en-ES"));

            let stepName = ''
            if (data[i].stepRemarks != "" || data[i].stepRemarks != '') {
                stepName = data[i].stepName + " (Rework Step)"
                stepName = `${data[i].stepName} <span style="color: blue;">(Rework Step)</span>`;

            }
            else {
                stepName = data[i].stepName
            }
            
            var RowHtml = (''
                + '<tr id="transitionRow_' + data[i].transitionId + '">'
                + '     <td  style=" border-left:5px solid ' + ribbonColor + '; padding-left:10px;">' + SrNo + '</td>'
                + '     <td  style="padding-left:10px;">' + stepName + '</td>'
                + '     <td  style="padding-left:10px;">' + endDate + '</td>'
                + '     <td  style="padding-left:10px;" id="currentStatus_' + data[i].transitionId + '">' + currentStatus + '</td>'
                + '     <td  style="padding-left:10px;" id="reworkStep_' + data[i].transitionId + '">' + data[i].stepRemarks + '</td>'
                + '     <td  style="padding-left:10px; " id="AssignTo_' + data[i].transitionId + '">'
                + '     </td>'
                + '     <td  style="padding-left:10px;" id="CompletedBy_' + data[i].transitionId + '">' + data[i].completedBy + '</td>'
                //     + '     <td  style="padding-left:10px;">' + data[i].completedBy +'</td>'

                + '     <td>'
                + '         <div class="row no-gutters">'
                + '             <div class="col" title="Step level total Files"><span><img src="../../Layout2/images/file_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data[i].noOfFiles) + '">' + data[i].noOfFiles.toString() + '</b></span></div>'
                + '             <div class="col" title="Step level total Instructions"><span><img src="../../Layout2/images/instruction_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data[i].noOfInstructions) + '">' + data[i].noOfInstructions.toString() + '</b></span></div>'
                + '              <div class="col" title="Total Bug reports"><span><i class="fa fa-exclamation-triangle grayscale"></i> <b style="background-color: ' + Util.GetNotificationColor(data[i].noOfBugReports) + '">' + data[i].noOfBugReports.toString() + '</b></span></div>'
                + '          <div class="btn-group dots_dropdown show">'
                + '             <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                + '                  <i class="fas fa-ellipsis-v"></i>'
                + '              </button>'
                + '              <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                + '                  <button class="dropdown-item" type="button" id="addicon_' + data[i].transitionId + '" onclick="WorkItem.AddReworkStep(this, \'' + encodeURIComponent(JSON.stringify(data[i])) + '\')"><i class="fa fa-plus grayscale"></i> Add Rework Step</button>'
                + '                  <button class="dropdown-item" type="button" id="editIcon_' + data[i].transitionId + '" onclick="WorkItem.EditStep(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')"><i class="fa fa-edit"></i> Update Rework Step</button>'
                + '                  <button class="dropdown-item" type="button" id="transitionDeleteIcon_' + data[i].transitionId + '" onclick="WorkItem.Delete(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')"><i class="fa fa-trash-alt"></i> Delete Step</button>'
                + '                  <button class="dropdown-item" type="button" id="reportBugIcon_' + data[i].transitionId + '" onclick="WorkItem.BugReport(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')"><i class="fa fa-exclamation-triangle"></i> Report Problem</button>'
                + '              </div>'
                + '         </div>'
                + '    </td>'
                + '</tr>');
            body.innerHTML = body.innerHTML + RowHtml;
            if (data[i].currentStatus == 0 ) {
                document.getElementById(`transitionDeleteIcon_${data[i].transitionId}`).style.display = 'block';
                document.getElementById(`editIcon_` + data[i].transitionId).style.display = 'block';

            } else {
                document.getElementById(`transitionDeleteIcon_${data[i].transitionId}`).style.display = 'none';
                document.getElementById(`editIcon_` + data[i].transitionId).style.display = 'none';

            }

            if (!(WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3'))) {
                document.getElementById(`transitionDeleteIcon_${data[i].transitionId}`).style.display = 'none';
                document.getElementById(`addicon_${data[i].transitionId}`).style.display = 'none';
                document.getElementById(`editIcon_` + data[i].transitionId).style.display = 'none';
            } 
            
        }
        if (data[i].assignedTo == "" && data[i].currentStatus == 0) {
            var assignToCell = document.getElementById(`AssignTo_${data[i].transitionId}`);
            // Add a dropdown list to assign user
            var dropdownHTML = '<select class="form-control rounded-pill btn-sm assignDropdownList_' + data[i].transitionId + '" style="width: 150px ; height: 30px;" onchange="WorkItem.dropdownChange(' + data[i].transitionId + ', this)">';
            var defaultOption = '<option value="0">Please Select...</option>';

            dropdownHTML += defaultOption;
            for (let j = 0; j < WorkItem.userList.length; j++) {
                var user = WorkItem.userList[j];
                dropdownHTML += `<option value="${user.userId}">${user.firstName} ${user.middleName} ${user.lastName}</option>`;
            }
            dropdownHTML += '</select>';
            if (WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3')) {
                assignToCell.innerHTML = dropdownHTML;
            }
        }
        else {
            document.getElementById(`AssignTo_${data[i].transitionId}`).innerHTML = (''
                + '         <div onClick = "WorkItem.AssignWorkItem(' + data[i].transitionId + ',' + data[i].assignedToId + ',' + data[i].currentStatus + ')" > ' + data[i].assignedTo + '</div>'
            )
        }

        if (data[i].currentStatus == 0) {
            currentStatus = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data[i].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">Check Out</button>';
        }
      
        
    }}
      
    




WorkItem.CheckStatus = function (sender, data) {
    let workList = new Object()
    if (sender.innerText === "Complete") {
        workList.CurrentStatus = 1
    }
    else if (sender.innerText === "Reopen") {
        workList.CurrentStatus = 4
    }
    else {
        workList.CurrentStatus = 0
    }
    let workListItem = JSON.parse(decodeURIComponent(data));
    workList.ActionUser = User.UserId
    workList.transitionId = workListItem.transitionId
    Ajax.AuthPost("user/GetUserWorkItemUpdate", workList, CheckOut_OnSuccessCallBack, WorkItem_OnErrorCallBack);
}
function WorkItem_OnErrorCallBack (err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

function CheckOut_OnSuccessCallBack(data) {
    if (data.userWorkItems[0].currentStatus === 2) {
        var messageText = "Checked-In Successful";
        Toast.create("Success", messageText, TOAST_STATUS.SUCCESS, 1500);
        document.getElementById(`currentStatus_${data.userWorkItems[0].transitionId}`).innerHTML = '<div class="badge bg-success font-l ml-4 mr-2" style="background-color:green;">Completed</div>';
        if (WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3')) {
            document.getElementById(`currentStatus_${data.userWorkItems[0].transitionId}`).innerHTML += '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data.userWorkItems[0].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data.userWorkItems[0])) + '\')">Reopen</button>';
        }
        document.getElementById(`transitionDeleteIcon_${data.userWorkItems[0].transitionId}`).style.display='none';
    }
    else if (data.userWorkItems[0].currentStatus === 1 && data.userWorkItems[0].assignedTo == User.UserId) {
        var messageText = "Checked-Out Successful";
        Toast.create("Success", messageText, TOAST_STATUS.SUCCESS, 1500);
        document.getElementById(`currentStatus_${data.userWorkItems[0].transitionId}`).innerHTML = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data.userWorkItems[0].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data.userWorkItems[0])) + '\')">Complete</button>';
        if(WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3')){
            document.getElementById(`currentStatus_${data.userWorkItems[0].transitionId}`).innerHTML += '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data.userWorkItems[0].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data.userWorkItems[0])) + '\')">Reopen</button>';
        }
        document.getElementById(`transitionDeleteIcon_${data.userWorkItems[0].transitionId}`).style.display='none';

    } else if (data.userWorkItems[0].currentStatus === 1 && data.userWorkItems[0].assignedTo != User.UserId) {
        var messageText = "Checked-Out Successful";
        Toast.create("Success", messageText, TOAST_STATUS.SUCCESS, 1500);
        document.getElementById(`currentStatus_${data.userWorkItems[0].transitionId}`).innerHTML = '<div class="badge bg-warning font-l ml-4" id="checkStatusBadge_' + data.userWorkItems[0].transitionId + '" >Checked Out</div>';
        if (WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3')) {
            document.getElementById(`currentStatus_${data.userWorkItems[0].transitionId}`).innerHTML += '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data.userWorkItems[0].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data.userWorkItems[0])) + '\')">Reopen</button>';
        }

    }
    else if (data.userWorkItems[0].currentStatus === 0) {
        var messageText = "Re-Opened Successfully";
        Toast.create("Success", messageText, TOAST_STATUS.SUCCESS, 1500);
        document.getElementById(`currentStatus_${data.userWorkItems[0].transitionId}`).innerHTML = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data.userWorkItems[0].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data.userWorkItems[0])) + '\')">Check Out</button>';

        var assignToCell = document.getElementById(`AssignTo_${data.userWorkItems[0].transitionId}`);
            // Add a dropdown list to assign user
            var dropdownHTML = '<select class="form-control rounded-pill btn-sm assignDropdownList_' + data.userWorkItems[0].transitionId + '" style="width: 150px ; height: 30px;" onchange="WorkItem.dropdownChange(' + data.userWorkItems[0].transitionId + ', this)">';
            var defaultOption = '<option value="0">Please Select...</option>';

            dropdownHTML += defaultOption;
            for (let j = 0; j < WorkItem.userList.length; j++) {
                var user = WorkItem.userList[j];
                dropdownHTML += `<option value="${user.userId}">${user.firstName} ${user.middleName} ${user.lastName}</option>`;
            }
            dropdownHTML += '</select>';
            if (WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3')) {
                assignToCell.innerHTML = dropdownHTML;
            }
            document.getElementById(`transitionDeleteIcon_${data.userWorkItems[0].transitionId}`).style.display='block';
        


     
    }

    if(data.userWorkItems[0].assignedTo!=null || data.userWorkItems[0].assignedTo!= undefined){
        document.getElementById(`AssignTo_${data.userWorkItems[0].transitionId}`).innerHtml = ''
        let user = WorkItem.userList
        var assignedUser = user.filter(res=>{return res.userId == data.userWorkItems[0].assignedTo})
        document.getElementById(`AssignTo_${data.userWorkItems[0].transitionId}`).innerText = `${assignedUser[0].firstName} ${assignedUser[0].lastName}`
    }
    if(data.userWorkItems[0].completedBy!=null || data.userWorkItems[0].completedBy!= undefined){
        document.getElementById(`CompletedBy_${data.userWorkItems[0].transitionId}`).innerHtml = ''
        let user = WorkItem.userList
        var assignedUser = user.filter(res=>{return res.userId == data.userWorkItems[0].completedBy})
        document.getElementById(`CompletedBy_${data.userWorkItems[0].transitionId}`).innerText = `${assignedUser[0].firstName} ${assignedUser[0].lastName}`
    }
  
   
}

WorkItem.SetHeader = function (data) {
    if (data) {
        document.getElementById('WorkItemDetailLabel').innerText = `Traveler - ${data.workItemName}`;
        document.getElementById("workItemName").innerText = data.workItemName;
        document.getElementById("workItemCode").innerText = data.workItemCode;
        document.getElementById("partName").innerText = data.partName;
        document.getElementById("partCode").innerText = data.partCode;
        document.getElementById("workName").innerText = data.workName;
        document.getElementById("workCode").innerText = data.workCode;
        document.getElementById("totalSteps").innerText = data.totalSteps;

    }
}


WorkItem.ExpandWorkItemAllDataRowOnClick = function (sender) {
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

WorkItem.ExpandWorkItemDataRowOnClick = function (workCenterId, sender) {
    if (sender.classList.contains("active_arrow")) {
        sender.classList.remove("active_arrow");
        $("#WorkItemChild" + workCenterId + " .showDiv").slideToggle(1000);
    }
    else {
        sender.classList.add("active_arrow");
        $("#WorkItemChild" + workCenterId + " .showDiv").slideToggle(1000);
    }
}

WorkItem.GetAllTravelersList = function (data) {
    WorkItem.ActionUser = User.UserId;
    Ajax.AuthPost("traveler/GetAllWorkItems", WorkItem, GetAllWorkItemDetail_OnSuccessCallBack, GetWorkAllItemDetail_OnErrorCallBack);
}

function GetAllWorkItemDetail_OnSuccessCallBack(data) {
    if (data && data.travelerList) {
        travelerData = data.travelerList;
        WorkItem.BindAllWorkItem(travelerData);

    } else {
        var body = document.getElementById("WorkflowTemplateTabularBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan="11">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
}

function GetWorkAllItemDetail_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

WorkItem.BindAllWorkItem = function (data) {
    var select = document.getElementById('WorkItemIdSelect');
    select.innerHTML = "";
    optHtml = '<option value="0" id="WorkItemOption_0">Select an option</option>'
    select.innerHTML = select.innerHTML + optionHtml
    for (var i = 0; i < data.length; i++) {

        var optionHtml = '<option value="' + data[i].workItemId + '" id="WorkItemOption_' + data[i].workItemId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].workItemName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
    if (WorkItem.WorkItemId == 0) {
        WorkItem.WorkItemFetch();
    }
    else {
        document.getElementById('WorkItemIdSelect').value = WorkItem.WorkItemId;
        WorkItem.WorkItemFetch();
    }

}

WorkItem.WorkItemFetch = function () {
    let selectedWorkItemId = document.getElementById('WorkItemIdSelect').value;
    WorkItem.LoadAll(selectedWorkItemId);
}

//Dropdown

WorkItem.AssignWorkItem = function (id, assignedTo, currentStatus) {
    if (currentStatus === 0) {
        var userList = WorkItem.userList;
        var dropdownHTML = '<select class="form-control rounded-pill btn-sm assignDropdownList_' + id + '" style="width: 150px ; height: 30px;" onchange="WorkItem.dropdownChange(' + id + ',this)">';
        var defaultOption = '<option value="0">Please Select...</option>'
        dropdownHTML += defaultOption
        for (let i = 0; i < userList.length; i++) {
            dropdownHTML += `<option value="${userList[i].userId}">${userList[i].firstName} ${userList[i].middleName} ${userList[i].lastName}</option>`;
        }

        dropdownHTML += '</select>';

        var cells = document.querySelectorAll(`td[id^="AssignTo_${id}"]`);

        for (var i = 0; i < cells.length; i++) {
            cells[i].innerHTML = dropdownHTML;
        }

        var dropdowns = document.querySelectorAll(`select.assignDropdownList_${id}`);
        for (var i = 1; i < dropdowns.length; i++) {
            dropdowns[i].style.display = "none";
        }
        document.getElementsByClassName(`assignDropdownList_${id}`)[0].value = assignedTo
     //   + '         <div onClick = "WorkItem.AssignWorkItem(' + data.childDataList[0].transitionId + ',' + data.childDataList[0].assignedToId + ',' + data.childDataList[0].currentStatus + ')" > ' + data.childDataList[0].assignedTo + '</div>'
    }
}


WorkItem.dropdownChange = function (id, sender) {
    var selectedOption = sender.options[sender.selectedIndex];
    var selectedUserName = selectedOption.textContent;

    AssignObject = {}
    AssignObject.transitionId = id
    AssignObject.ActionUser = User.UserId
    AssignObject.AssignedTo = sender.value

    Ajax.AuthPost("user/GetUserWorkItemAssign", AssignObject, function (data) {
        AssignObject_OnSuccessCallBack(data, id, selectedUserName);
    }, AssignObject_OnErrorCallBack);
}

AssignObject_OnSuccessCallBack = function (data, id, selectedUserName) {
    Toast.create("Success", "Selected Successful", TOAST_STATUS.SUCCESS, 1500);
    // Replace the Assign To column with the selected user's name
    var cells = document.querySelectorAll(`td[id^="AssignTo_${id}"]`);
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = selectedUserName;
    }
}

AssignObject_OnErrorCallBack = function (err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}


//Add stepRework function
WorkItem.AddReworkStep = function (sender, data) {
    document.getElementById("stepRemark").value = ''
    let transitionData = JSON.parse(decodeURIComponent(data));
    $('#AddReworkStepModal').modal('show')
    document.getElementById('addreworkbutton').onclick = function () {
        WorkItem.AddStepRemark(transitionData);
    }
}
WorkItem.AddStepRemark = function (transitionData) {
    let workitem = {}
    workitem.StepRemarks = document.getElementById("stepRemark").value
    workitem.ActionUser = User.UserId;
    workitem.TransitionId = transitionData.transitionId
    Ajax.AuthPost("traveler/CreateReworkSteps", workitem, RemarkStepRework_OnSuccessCallback, GetWorkItemDetail_OnErrorCallBack);
}
//Update Remark Step
WorkItem.EditStep = function (data) {
    let transitionData = JSON.parse(decodeURIComponent(data));
    document.getElementById("stepRemark").value = transitionData.stepRemarks
    $('#AddReworkStepModal').modal('show')
    document.getElementById('addreworkbutton').onclick = function () {
        WorkItem.EditStepRemark(transitionData);
    }
}
WorkItem.EditStepRemark = function (transitionData) {
    transitionData.StepRemarks = document.getElementById("stepRemark").value
    Ajax.AuthPost("traveler/UpdateReworkSteps", transitionData, UpdateStepRework_OnSuccessCallback, GetWorkItemDetail_OnErrorCallBack);
}
function UpdateStepRework_OnSuccessCallback(data) {
    data = data.childDataList[0]
    Toast.create("Success", "Update Rework Sucessfully ", TOAST_STATUS.SUCCESS, 1500);
    $('#AddReworkStepModal').modal('hide')
    document.getElementById(`reworkStep_${data.transitionId}`).innerText = data.stepRemarks
    var elementToRemove = document.getElementById(`transitionRow_` + data.childDataList[0].transitionId);
    if (elementToRemove) {
        parent.removeChild(elementToRemove);
    }


}





function RemarkStepRework_OnSuccessCallback(data) {
    Toast.create("Success", "Rework Step Created", TOAST_STATUS.SUCCESS, 1500);
    $('#AddReworkStepModal').modal('hide')
    var body = document.getElementById(`WorkItemChildBody` + data.childDataList[0].workCenterId);
    var ribbonColor = body.getAttribute("ribbonColor");

    var currentStatus = '';
    if (data.childDataList[0].currentStatus == 0) {
        currentStatus = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data.childDataList[0].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data.childDataList[0])) + '\')">Check Out</button>';

    } else if (data.childDataList[0].currentStatus == 1) {
        currentStatus = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data.childDataList[0].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data.childDataList[0])) + '\')">Complete</button>';

    } else if (data.childDataList[0].currentStatus == 2) {
        currentStatus = '<div class="badge bg-success font-l" style="background-color:green;">Completed</div>';
    }


    var startDate = (data.childDataList[0].startTime == null) ? '' : (new Date(data.childDataList[0].startTime).toLocaleDateString("en-ES"));
    var endDate = (data.childDataList[0].endTime == null) ? '' : (new Date(data.childDataList[0].endTime).toLocaleDateString("en-ES"));
    let stepName = ''
    if (data.childDataList[0].stepRemarks != null) {
        stepName = data.childDataList[0].stepName + " (Rework Step) "
        stepName = `${data.childDataList[0].stepName} <span style="color: blue;">(Rework Step)</span>`;
        //stepName = `${data.childDataList[0].stepName} <span style="color: blue;">(Rework Step)</span>`;

    }
    else {
        stepName = data.childDataList[0].stepName
    }

    var RowHtml = (''
        + '<tr id="transitionRow_' + data.childDataList[0].transitionId + '">'
        + '     <td  style=" border-left:5px solid ' + ribbonColor + '; padding-left:10px;"></td>'
        + '     <td  style="padding-left:10px;">' + stepName + ' </td>'
        + '     <td  style="padding-left:10px;">' + endDate + '</td>'
        + '     <td  style="padding-left:10px;" id="currentStatus_' + data.childDataList[0].transitionId + '">' + currentStatus + '</td>'
        + '     <td  style="padding-left:10px;" id="reworkStep_' + data.childDataList[0].transitionId + '">' + data.childDataList[0].stepRemarks + '</td>'
        // + '     <td  style="padding-left:10px;">' + data.childDataList[0].assignedTo + '</td>'
        + '     <td  style="padding-left:10px;" id="AssignTo_' + data.childDataList[0].transitionId + '">'
        +' </td>'
        + '     <td  style="padding-left:10px;">' + data.childDataList[0].completedBy + '</td>'
        + '     <td>'

        + '         <div class="row no-gutters">'
        + '             <div class="col" title="Step level total Files"><span><img src="../../Layout2/images/file_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data.childDataList[0].noOfFiles) + '">' + data.childDataList[0].noOfFiles.toString() + '</b></span></div>'
        + '             <div class="col" title="Step level total Instructions"><span><img src="../../Layout2/images/instruction_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data.childDataList[0].noOfInstructions) + '">' + data.childDataList[0].noOfInstructions.toString() + '</b></span></div>'
        // + ' <div class="col" title="Step level total Files"><span><img src="../../Layout2/images/file_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data.childDataList[0].noOfFiles) + '">' + data.childDataList[0].noOfFiles.toString() + '</b></span></div>'
        // +'  <i class="fa fa-exclamation-triangle" type="button" aria-hidden="true" onclick="WorkItem.BugReport(this, \'' + encodeURIComponent(JSON.stringify(data.childDataList[0].bugid)) + '\')"></i>'
        + '              <div class="col" title="Total Bug reports"><span><i class="fa fa-exclamation-triangle grayscale"></i> <b style="background-color: ' + Util.GetNotificationColor(data.childDataList[0].noOfBugReports) + '">' + data.childDataList[0].noOfBugReports.toString() + '</b></span></div>'
        + '          <div class="btn-group dots_dropdown">'
        + '              <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
        + '                  <i class="fas fa-ellipsis-v"></i>'
        + '              </button>'
        + '              <div class="dropdown-menu dropdown-menu-right shadow-lg">'
        + '                  <button class="dropdown-item" type="button" onclick="WorkItem.AddReworkStep(this, \'' + encodeURIComponent(JSON.stringify(data.childDataList[0])) + '\')"><i class="fa fa-plus grayscale"></i>Add Rework Step</button>'
        + '                  <button class="dropdown-item" type="button" id="editIcon_' + data.childDataList[0].transitionId + '" onclick="WorkItem.EditStep(\'' + encodeURIComponent(JSON.stringify(data.childDataList[0])) + '\')"><i class="fa fa-edit"></i> Update Rework Step</button>'
        + '                  <button class="dropdown-item" type="button" id="transitionDeleteIcon_' + data.childDataList[0].transitionId + '" onclick="WorkItem.Delete(\'' + encodeURIComponent(JSON.stringify(data.childDataList[0])) + '\')"><i class="far fa-trash-alt"></i> Delete Rework Step</button>'
        + '                  <button class="dropdown-item" type="button" id="reportBugIcon_' + data.childDataList[0].transitionId + '" onclick="WorkItem.BugReport(\'' + encodeURIComponent(JSON.stringify(data.childDataList[0])) + '\')"><i class="fa fa-exclamation-triangle"></i> Report Bug</button>'

        + '              </div>'
        + '         </div>'
        + '    </td>'
        + '</tr>');

    body.innerHTML = body.innerHTML + RowHtml;
    if (data.childDataList[0].currentStatus == 0 || data.childDataList[0].stepRemarks == '') {
        document.getElementById(`transitionDeleteIcon_` + data.childDataList[0].transitionId).style.display = 'block';
        document.getElementById(`editIcon_` + data.childDataList[0].transitionId).style.display = 'block';
    } else {
        document.getElementById(`transitionDeleteIcon_` + data.childDataList[0].transitionId).style.display = 'none';
        document.getElementById(`editIcon_` + data.childDataList[0].transitionId).style.display = 'none';
    }

    if (data.childDataList[0].assignedTo == "" && data.childDataList[0].currentStatus == 0) {
        var assignToCell = document.getElementById(`AssignTo_${data.childDataList[0].transitionId}`);
        // Add a dropdown list to assign user
        var dropdownHTML = '<select class="form-control rounded-pill btn-sm assignDropdownList_' + data.childDataList[0].transitionId + '" style="width: 150px ; height: 30px;" onchange="WorkItem.dropdownChange(' + data.childDataList[0].transitionId + ',this)">';
        var defaultOption = '<option value="0">Please Select...</option>'
        dropdownHTML += defaultOption;
        for (let j = 0; j < WorkItem.userList.length; j++) {
            var user = WorkItem.userList[j];
            dropdownHTML += `<option value="${user.userId}">${user.firstName} ${user.middleName} ${user.lastName}</option>`;
        }
        dropdownHTML += '</select>';
        if (WorkItem.UserRoleList.includes('2') || WorkItem.UserRoleList.includes('3')) {
            assignToCell.innerHTML = dropdownHTML;
        }
    }
    else {
        document.getElementById(`AssignTo_${data.childDataList[0].transitionId}`).innerHTML = (''
            + '         <div onClick = "WorkItem.AssignWorkItem(' + data.childDataList[0].transitionId + ',' + data.childDataList[0].assignedToId + ',' + data.childDataList[0].currentStatus + ')" > ' + data.childDataList[0].assignedTo + '</div>'
        )
    }
    
    
    if (data.childDataList[0].currentStatus == 0) {
        currentStatus = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button" id="checkButton_' + data.childDataList[0].transitionId + '" onclick="WorkItem.CheckStatus(this,\'' + encodeURIComponent(JSON.stringify(data.childDataList[0])) + '\')">Check Out</button>';
    }
}



WorkItem.Delete = function (transitionId) {
   // console.log("this is delete")
    let workitem = {};
    let data = JSON.parse(decodeURIComponent(transitionId));
    workitem.TransitionId = data.transitionId
    workitem.ActionUser = User.UserId;
    workitem.TransitionId = data.transitionId
    var Title = 'Are you sure, you want to delete ' + data.stepName + ' ?';
    Util.DeleteConfirm(workitem, Title, WorkItem.DeleteReworkStep);
}

WorkItem.DeleteReworkStep = function (workitem) {
    Ajax.AuthPost("traveler/RemoveReworkStep", workitem, DeleteReworkStep_OnSuccessCallBack, GetWorkItemDetail_OnErrorCallBack);
}

function DeleteReworkStep_OnSuccessCallBack(data) {
   // var currentStatus = data.childDataList[0].currentStatus;
  
    Toast.create("Delete Sucessfully", "Delete Sucessfully", TOAST_STATUS.DANGER, 1500);
    var parent = document.getElementById(`WorkItemChildBody` + data.childDataList[0].workCenterId);
    var elementToRemove = document.getElementById(`transitionRow_` + data.childDataList[0].transitionId);
    if (elementToRemove) {
        parent.removeChild(elementToRemove);
    }


   
}

//BugReport

WorkItem.BugReport = function (data) {
    ClearModalForm()
    $('#ReportBugModal').modal('show')
    let transitionItem = JSON.parse(decodeURIComponent(data));
    document.getElementById('saveReport').onclick = function () {
        WorkItem.AddBugReport(transitionItem)
    }
}
WorkItem.AddBugReport = function (data) {
    let BugReport = {}
    BugReport.TransitionId = data.transitionId
    BugReport.BPriority = document.getElementById('bugReportPriority').value
    BugReport.BDetail = document.getElementById('bugReportDetail').value
    BugReport.Category = document.getElementById('bugReportCategory').value
    BugReport.ActionUser = User.UserId
    Ajax.AuthPost("traveler/CreateBugReport", BugReport, BugReport_OnSuccessCallback, GetWorkItemDetail_OnErrorCallBack);
}

function BugReport_OnSuccessCallback() {
    Toast.create("Success", "Bug Reported Sucessfully", TOAST_STATUS.SUCCESS, 1500);
    $('#ReportBugModal').modal('hide')
}

function ClearModalForm() {
    document.getElementById('bugReportPriority').value = '0'
    document.getElementById('bugReportDetail').value = ''
    document.getElementById('bugReportCategory').value = '0'
}

WorkItem.DisplayChartData = function (data) {
    var containerId = 'container';
    var stepNames = [];
    var progressValues = [];
    for (var i = 0; i < data.parentList.length; i++) {
        var stepName = data.parentList[i].workCenterCode;
        var progress = data.parentList[i].progress;
        stepNames.push(stepName);
        progressValues.push(progress);
    }

    Highcharts.chart(containerId, {
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
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: stepNames,
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
                data: progressValues
            }
        ]
    });

}

WorkItem.LoadWorkOrderProgressPieChart = function (data) {
    var timeSpent = Util.DisplayTime(data.header.timeSpent)
    am4core.ready(function () {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("CWA_chart_web", am4charts.PieChart)
        var completedSum = 0;
        for (var i = 0; i < data.parentList.length; i++) {
            completedSum += data.parentList[i].progress;
        }
        // Calculate the total number of workItemName items
        var totalWorkItems = data.parentList.length;
        var totalProgressSum = totalWorkItems * 100;
        var remainingValue = totalProgressSum - completedSum;
        // Calculate the values out of 100 and round to 2 decimal points
        var completedPercentage = ((completedSum / totalProgressSum) * 100).toFixed(2);
        var remainingPercentage = ((remainingValue / totalProgressSum) * 100).toFixed(2);

        // Check if completedPercentage is NaN and assign 0 if true
        completedPercentage = isNaN(completedPercentage) ? 0 : completedPercentage;

        // Check if remainingPercentage is NaN and assign 0 if true
        remainingPercentage = isNaN(remainingPercentage) ? (100-completedPercentage) : remainingPercentage;
        
        document.getElementById("completedId").innerText = completedPercentage +'%';
        document.getElementById("remainingId").innerText = remainingPercentage +'%';
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
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
    });
}


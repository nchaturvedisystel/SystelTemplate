DashboardWorkList = new Object()
DashboardWorkList.ActionUser = User.UserId
DashboardWorkList.userList = {}

DashboardWorkList.CreateDashboardWorkListOnReady = function () {
    DashboardWorkList.LoadAll();
    UserMaster.LoadAll();
}

DashboardWorkList.LoadAll = function () {
    DashboardWorkList.ActionUser = User.UserId
    Ajax.AuthPost("user/GetUserWorkItems", DashboardWorkList, DashboardWorkList_OnSuccessCallBack, DashboardWorkList_OnErrorCallBack);
}

DashboardWorkList_OnSuccessCallBack = function (data) {
    if (data && data.userWorkItems.length > 0) {
        var body = document.getElementById('DashboardWorklistBody')
        body.innerHTML = "";
        let workitems = data.userWorkItems
        for (var i = 0; i < workitems.length; i++) {
            var RowHtml = '<tr>'
                + '<td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + workitems[i].partName + '</td>'
                + '<td>' + workitems[i].workName + '</td>'
                + '<td>' + workitems[i].workItemName + '</td>'
                + '<td>'
                + '<div class="badge badge-secondary font-l" style="background-color: #' + Util.WCColors[i] + ';">' + workitems[i].workCenterCode + '</div>'
                + '</td>'
                + '<td>' + workitems[i].stepName + '</td>'
                + '<td id="checkOutBtn_' + workitems[i].transitionId + '">' + workitems[i].currentStatus + '</td>'
                + '<td>' + workitems[i].stepRemarks + '</td>'
                + '<td>' + workitems[i].activityTime + '</td>'
                + '<td>' + workitems[i].createdBy + '</td>'
                + '<td id="AssignTo_' + workitems[i].transitionId + '" >'
                + '<div onClick="DashboardWorkList.AssignWorkItem(' + workitems[i].transitionId + ',' + workitems[i].assignedId + ',' + workitems[i].currentStatus + ')"> ' + workitems[i].assignedTo + '</div>'
                + '</td>';

            RowHtml += '</tr>';
            body.innerHTML += RowHtml;
            var checkBtn = document.getElementById(`checkOutBtn_${workitems[i].transitionId}`);
            if (workitems[i].currentStatus === 1) {
                checkBtn.innerHTML = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button check-in-button " onclick="DashboardWorkList.AssignStep(\'' + encodeURIComponent(JSON.stringify(workitems[i])) + '\')">Check In</button>';
            } else if (workitems[i].currentStatus === 0) {
                checkBtn.innerHTML = '<button class="btn btn-outline-primary rounded-pill btn-sm check-button check-out-button " onclick="DashboardWorkList.AssignStep(\'' + encodeURIComponent(JSON.stringify(workitems[i])) + '\')">Check Out</button>';
            }
            else if (workitems[i].currentStatus === 2) {
                checkBtn.innerHTML = '<div class="badge bg-success font-l" style="background-color:green;">Completed</div>';
            }

        }
    }
    else {
        var body = document.getElementById('DashboardWorklistBody')
        body.innerHTML = ('<tr>'
            + '<td  colspan = "7">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }


}

DashboardWorkList.AssignStep = function (data) {
    let workListItem = JSON.parse(decodeURIComponent(data));

    let workList = new Object()
    workList.ActionUser = User.UserId
    workList.CurrentStatus = workListItem.currentStatus
    workList.TransitionId = workListItem.transitionId
    Ajax.AuthPost("user/GetUserWorkItemUpdate", workList, AssignStep_OnSuccessCallBack, DashboardWorkList_OnErrorCallBack);
}

function AssignStep_OnSuccessCallBack() {

    Toast.create("Success", "Check success", TOAST_STATUS.SUCCESS, 1500);
    DashboardWorkList.LoadAll()
}
DashboardWorkList_OnErrorCallBack = function (err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
DashboardWorkList.AssignWorkItem = function (id, assignedTo, currentStatus) {
    if (currentStatus === 0) {
        var userList = DashboardWorkList.userList;
        var dropdownHTML = '<select class="form-control rounded-pill btn-sm assignDropdownList_' + id + '" onchange="DashboardWorkList.onchange(' + id + ', this)">';
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
    }

}


DashboardWorkList.onchange = function (id, sender) {
    var selectedOption = sender.options[sender.selectedIndex];
    var selectedUserName = selectedOption.textContent;

    AssignObjectDashboard = {}
    AssignObjectDashboard.TransitionId = id
    AssignObjectDashboard.ActionUser = User.UserId
    AssignObjectDashboard.AssignedTo = sender.value
    Ajax.AuthPost("user/GetUserWorkItemAssign", AssignObjectDashboard, function (data) {
        AssignObjectDashboard_OnSuccessCallBack(data, id, selectedUserName);
    }, AssignObjectDashboard_OnErrorCallBack);
}

function AssignObjectDashboard_OnSuccessCallBack(data, id, selectedUserName) {

    Toast.create("Success", "Assigned Successful", TOAST_STATUS.SUCCESS, 1500);
    var cells = document.querySelectorAll(`td[id^="AssignTo_${id}"]`);
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = selectedUserName;
    }
    DashboardWorkList.LoadAll()
}

function AssignObjectDashboard_OnErrorCallBack(err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}












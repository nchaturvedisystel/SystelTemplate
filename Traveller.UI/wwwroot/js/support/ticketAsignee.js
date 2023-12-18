TicketAsignee = new Object();

//#region Load Task Asignee Grid
TicketAsignee.LoadAll = function () {
    var ticketAsignee = {};
    ticketAsignee.ticketId = CurrentTicket.TicketId;
    Ajax.AuthPost("TicketAsignee/GetAllByTicketId", ticketAsignee, SaveAsignee_OnSuccessCallBack, SaveAsignee_OnErrorCallBack);
}
function LoadAll_OnSuccessCallBack(data) {
    TicketAsignee.BindDataToAsigneeList(data);
}
function LoadAll_OnErrorCallBack(data) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
TicketAsignee.BindDataToAsigneeList = function (data) {
    var TicketAsigneeListBody = document.getElementById('TicketAsigneeListBody');
    TicketAsigneeListBody.innerHTML = "";
    if (data.ticketAsignee && data.ticketAsignee.length > 0) {
        for (var i = 0; i < data.ticketAsignee.length; i++) {
            ticketAsignee = data.ticketAsignee[i];
            var startBtnDisplay = ((ticketAsignee.aStatus) === 'Open' || (ticketAsignee.aStatus) === 'Hold') ? '' : 'none';
            var holdBtnDisplay = ((ticketAsignee.aStatus) === 'InProgress') ? '' : 'none';
            var closeBtnDisplay = ((ticketAsignee.aStatus) === 'InProgress') ? '' : 'none';
            var clickEventData = {};
            clickEventData = ticketAsignee;
            var RowHtml = ('<tr>'
                + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + (i + 1).toString() + '</td>'
                + '                <td>' + ticketAsignee.assignedToName + '</td>'
                + '                <td>' + ticketAsignee.workRatio + '</td>'
                + '                <td title="' + ticketAsignee.assignDesc + '">' + ticketAsignee.assignDesc + '</td>'
                + '                <td>' + ticketAsignee.assignedByName + '</td>'
                + '                <td>' + ticketAsignee.aStatus + '</td>'
                + '                <td>'
                + '                     <button class="btn btn-primary btn-sm mt-2" onclick="TicketAsignee.StartTask(\'' + encodeURIComponent(JSON.stringify(clickEventData)) + '\')" style="display:' + startBtnDisplay + ';" > Start</button>'
                + '                     <button class="btn btn-info btn-sm mt-2" onclick="TicketAsignee.CloseTask(\'' + encodeURIComponent(JSON.stringify(clickEventData)) + '\')" style="display:' + closeBtnDisplay + ';"> Close</button>'
                + '                     <button class="btn btn-warning btn-sm mt-2" onclick="TicketAsignee.HoldTask(\'' + encodeURIComponent(JSON.stringify(clickEventData)) + '\')" style="display:' + holdBtnDisplay + ';"> Hold</button>'
                + '                </td>'
                + '                <td class="text-center">'
                + '                    <div class="btn-group dots_dropdown">'
                + '                        <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                + '                            <i class="fas fa-ellipsis-v"></i>'
                + '                        </button>'
                + '                        <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                + '                            <button class="dropdown-item" type="button" onclick="TicketAsignee.UpdateOnClick(\'' + encodeURIComponent(JSON.stringify(clickEventData)) + '\')">'
                + '                                <i class="far fa fa-edit"></i> Update'
                + '                            </button>'
                + '                            <button class="dropdown-item" type="button" onclick="TicketAsignee.DeleteOnClick(\'' + encodeURIComponent(JSON.stringify(clickEventData)) + '\')">'
                + '                                <i class="far fa fa-trash"></i> Delete'
                + '                            </button>'
                + '                        </div>'
                + '                    </div>'
                + '                </td>'
                + '            </tr>'
                + '');
            TicketAsigneeListBody.innerHTML = TicketAsigneeListBody.innerHTML + RowHtml;
        }
    }
}
//#endregion

//#region Save Task Asignee
TicketAsignee.SaveAsignee = function () {
    var ticketAsignee = TicketAsignee.GetValues();
    ticketAsignee.taId = 0;
    ticketAsignee.aStatus = "Open";
    if (TicketAsignee.Validate(ticketAsignee)) {
        Ajax.AuthPost("TicketAsignee/Insert", ticketAsignee, SaveAsignee_OnSuccessCallBack, SaveAsignee_OnErrorCallBack);
    }
}
function SaveAsignee_OnSuccessCallBack(data) {
    TicketAsignee.BindDataToAsigneeList(data);
}
function SaveAsignee_OnErrorCallBack(err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
//#endregion

//#region Update Task Asignee
TicketAsignee.UpdateOnClick = function (ticketAsignee) {
    ticketAsignee = JSON.parse(decodeURIComponent(ticketAsignee));
    TicketAsignee.SetValues(ticketAsignee);
    document.getElementById("TicketAsigneeSaveUpdateBtn").innerHTML = "Update";
    document.getElementById("TicketAsigneeSaveUpdateBtn").onclick = function () { TicketAsignee.UpdateAsignee(ticketAsignee); }
}
TicketAsignee.UpdateAsignee = function (ticketAsignee) {
    ticketAsignee = TicketAsignee.GetValues(ticketAsignee);
    if (TicketAsignee.Validate(ticketAsignee)) {
        Ajax.AuthPost("TicketAsignee/Update", ticketAsignee, UpdateAsignee_OnSuccessCallBack, UpdateAsignee_OnErrorCallBack);
    }
}
function UpdateAsignee_OnSuccessCallBack(data){
    TicketAsignee.BindDataToAsigneeList(data);
    TicketAsignee.ClearAsigneeForm();
}
function UpdateAsignee_OnErrorCallBack(err) {
    TicketAsignee.ClearAsigneeForm();
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
//#endregion

//#region Delete Task Asignee
TicketAsignee.DeleteOnClick = function (ticketAsignee) {
    ticketAsignee = JSON.parse(decodeURIComponent(ticketAsignee));
    //Open Confirmation PopUp
    var deleteMessage = ("Are you sure you want to delete assigned User <b>" + ticketAsignee.assignedToName + "</b>");
    Util.DeleteConfirm(ticketAsignee, deleteMessage, TicketAsignee.DeleteAsignee);
    //TicketAsignee.SetValues(ticketAsignee);
}
TicketAsignee.DeleteAsignee = function (ticketAsignee) {
    Ajax.AuthPost("TicketAsignee/Delete", ticketAsignee, DeleteAsignee_OnSuccessCallBack, DeleteAsignee_OnErrorCallBack);
}
function DeleteAsignee_OnSuccessCallBack(data) {
    TicketAsignee.BindDataToAsigneeList(data);
}
function DeleteAsignee_OnErrorCallBack(err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
//#endregion

//#region Clear Task Asignee Form
TicketAsignee.ClearAsigneeForm = function () {
    TicketAsignee.ClearValues();
    document.getElementById("TicketAsigneeSaveUpdateBtn").innerHTML = "Save";
    document.getElementById("TicketAsigneeSaveUpdateBtn").onclick = function () { TicketAsignee.SaveAsignee(); }
}
//#endregion

//#region Asignee Task Start/Close
TicketAsignee.StartTask = function (ticketAsignee) {
    ticketAsignee = JSON.parse(decodeURIComponent(ticketAsignee));
    ticketAsignee.aStatus = "InProgress";
    ticketAsignee.actionUser = User.UserId.toString();
    Ajax.AuthPost("TicketAsignee/UpdateStatus", ticketAsignee, AsigneeTaskStartClose_OnSuccessCallBack, AsigneeTaskStartClose_OnErrorCallBack);
}
TicketAsignee.CloseTask = function (ticketAsignee) {
    ticketAsignee = JSON.parse(decodeURIComponent(ticketAsignee));
    ticketAsignee.aStatus = "Close";
    ticketAsignee.actionUser = User.UserId.toString();
    Ajax.AuthPost("TicketAsignee/UpdateStatus", ticketAsignee, AsigneeTaskStartClose_OnSuccessCallBack, AsigneeTaskStartClose_OnErrorCallBack);
}
TicketAsignee.HoldTask = function (ticketAsignee) {
    ticketAsignee = JSON.parse(decodeURIComponent(ticketAsignee));
    ticketAsignee.aStatus = "Hold";
    ticketAsignee.actionUser = User.UserId.toString();
    Ajax.AuthPost("TicketAsignee/UpdateStatus", ticketAsignee, AsigneeTaskStartClose_OnSuccessCallBack, AsigneeTaskStartClose_OnErrorCallBack);
}
function AsigneeTaskStartClose_OnSuccessCallBack(data) {
    TicketAsignee.BindDataToAsigneeList(data);
}
function AsigneeTaskStartClose_OnErrorCallBack(err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
//#endregion

//#region Common
TicketAsignee.GetValues = function (ticketAsignee) {
    if (ticketAsignee == undefined) {
        var ticketAsignee = {};
        ticketAsignee.ticketId = CurrentTicket.TicketId;
    }
    ticketAsignee.assignedTo = document.getElementById("assignToList").value;
    ticketAsignee.workRatio = document.getElementById("TicketAsigneeWorkRatio").value;
    ticketAsignee.assignDesc = document.getElementById("TicketAsigneeDescription").value;
    ticketAsignee.actionUser = User.UserId.toString();
    return ticketAsignee;
}
TicketAsignee.SetValues = function (ticketAsignee) {
    document.getElementById("assignToList").value = ticketAsignee.assignedTo;
    document.getElementById("TicketAsigneeWorkRatio").value = ticketAsignee.workRatio;
    document.getElementById("TicketAsigneeDescription").value = ticketAsignee.assignDesc;
}
TicketAsignee.ClearValues = function () {
    document.getElementById("assignToList").value = "0";
    document.getElementById("TicketAsigneeWorkRatio").value = "100";
    document.getElementById("TicketAsigneeDescription").value = "";
}
TicketAsignee.Validate = function (ticketAsignee) {
    var validated = false;
    if (ticketAsignee.assignedTo != undefined && ticketAsignee.assignedTo != 0) {
        validated = true;
    }
    else {
        var ValidationMsg = "Please select <font color='red'>Assign To User</font> for this ticket..";
        Util.DisplayAutoCloseErrorPopUp(ValidationMsg, 1500);
    }
    return validated;
}
//#endregion
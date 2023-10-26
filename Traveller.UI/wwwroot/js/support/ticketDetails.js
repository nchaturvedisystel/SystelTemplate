
TicketDetails = new Object()

TicketDetails.ticketId = 0;
TicketDetails.flag = true;
TicketDetails.UserId = 0;

CurrentTicket = new Object()

TicketDetails.InstructionsEditorLoaded = 0;
TicketDetails.InstructionsEditor;

TicketDetails.onReady = function () {
    UserMaster.GetAllUserList();
    TicketDetails.InitiateRTE("TemplateInstEditor");
}

//#region Load Ticket Details
TicketDetails.LoadTicketDetail = function () {
    // $('#CreateTicketModal').modal('hide');
    var ticket = new Object();
    ticket.ticketId = TicketDetails.ticketId;
    Ajax.AuthPost("Ticket/TicketDetails", ticket, LoadTicketDetail_OnSuccessCallBack, LoadTicketDetail_OnErrorCallBack);
    Ticket.LoadSupportUsersDDL();
    TicketDetails.CheckUserOptions();
}
Ticket.LoadSupportUsersDDL = function () {
    var TicketResolverDropDown = {};
    TicketResolverDropDown.ActionUser = User.UserId;
    Ajax.AuthPost("Ticket/GetTicketResolverList", TicketResolverDropDown, TicketResolverDropDown_OnSuccessCallBack, LoadTicketDetail_OnErrorCallBack);
}
TicketDetails.CheckUserOptions = function () {
    if (document.getElementById("TicketCommentBtn")) {
        TicketDetails.EnableUserSpecificFunctions();
    }
    else {
        setTimeout(function () {
            TicketDetails.CheckUserOptions();
        }, 1000);
    }
}
TicketDetails.EnableUserSpecificFunctions = function () {

    if (User.RoleId.toString().trim() == "3")//ClientUser
    {
        document.getElementById("TicketCommentBtn").style.display = "block";
        document.getElementById("TicketEditBtn").style.display = "block";

        document.getElementById("TicketTakeOverBtn").style.display = "none";
        document.getElementById("TicketAssignBtn").style.display = "none";
        document.getElementById("TicketForceCloseBtn").style.display = "none";
    }
}
function LoadTicketDetail_OnSuccessCallBack(data) {
    let ticketDetail = data.tickets[0];
    TicketDetails.SetCurrentTicket(data.tickets[0])
    document.getElementById("headerTicketStatus").innerHTML = ticketDetail.ticketStatus;
    document.getElementById("headerTicketTitle").innerHTML = ticketDetail.title;
    document.getElementById("headerTicketId").innerHTML = "#" + ticketDetail.ticketId;

    document.getElementById("detailTicketStatus").innerHTML = ticketDetail.ticketStatus;
    document.getElementById("detailTicketPriority").innerHTML = ticketDetail.ticketPriority;
    document.getElementById("detailTicketType").innerHTML = ticketDetail.ticketType;
    document.getElementById("detailAssignedTo").innerHTML = UserMaster.GetUserNameById(ticketDetail.assignedTo);
    document.getElementById("detailTicketOwnedBy").innerHTML = UserMaster.GetUserNameById(ticketDetail.ownedBy);
    document.getElementById("detailTicketTag").innerHTML = ticketDetail.tagList;
    document.getElementById("detailTicketDesc").innerHTML = ticketDetail.ticketDesc;
    document.getElementById("detailTicketDueDate").innerHTML = TicketDetails.DateFormat(ticketDetail.dueDate);
    document.getElementById("detailTicketTargetDate").innerHTML = TicketDetails.DateFormat(ticketDetail.targetDate);
    document.getElementById("detailTicketResolutionDate").innerHTML = TicketDetails.DateFormat(ticketDetail.resolutionDate);
    document.getElementById("detailTicketUpdatedBy").innerHTML = UserMaster.GetUserNameById(ticketDetail.modifiedBy);
    document.getElementById("detailTicketUpdatedOn").innerHTML = TicketDetails.DateFormat(ticketDetail.modifiedOn);
    document.getElementById("detailTicketCreatedBy").innerHTML = UserMaster.GetUserNameById(ticketDetail.createdBy);
    document.getElementById("detailTicketCreatedOn").innerHTML = TicketDetails.DateFormat(ticketDetail.createdOn);
    document.getElementById("detailTicketEstimatedDuration").innerHTML = ticketDetail.estimatedDuration;
    document.getElementById("detailTicketActualDuration").innerHTML = ticketDetail.actualDuration;

    TicketDetails.UserId = User.UserId;
    TicketDetails.LoadTicketActivity(ticketDetail.ticketId);
}

function LoadTicketDetail_OnErrorCallBack(err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
//#endregion

//#region Common

TicketDetails.SetCurrentTicket = function (data) {
    CurrentTicket = {
        ActionUser: data.actionUser,
        ActualDuration: data.actualDuration,
        AddField1: data.addField1,
        AddField2: data.addField2,
        AddField3: data.addField3,
        AddField4: data.addField4,
        AddField5: data.addField5,
        AffectsCustomer: data.affectsCustomer,
        AppVersion: data.appVersion,
        AssignedTo: data.assignedTo,
        AssignedToId: data.assignedToId,
        AssignedToName: data.assignedToName,
        Category: data.category,
        CompanyId: data.companyId,
        CompanyName: data.companyName,
        CreatedBy: data.createdBy,
        CreatedOn: data.createdOn,
        DueDate: data.dueDate,
        EstimatedDuration: data.estimatedDuration,
        IsActive: data.isActive,
        IsDeleted: data.isDeleted,
        ModifiedBy: data.modifiedBy,
        ModifiedOn: data.modifiedOn,
        Name: data.name,
        OwnedBy: data.ownedBy,
        ProjectId: data.projectId,
        ProjectName: data.projectName,
        ResolutionDate: data.resolutionDate,
        TagList: data.tagList,
        TargetDate: data.targetDate,
        TicketComments: data.ticketComments,
        TicketDesc: data.ticketDesc,
        TicketId: data.ticketId,
        TicketOwner: data.ticketOwner,
        TicketPriority: data.ticketPriority,
        TicketStatus: data.ticketStatus,
        TicketType: data.ticketType,
        Title: data.title,
        UserId: data.userId
    };

}
TicketDetails.DateFormat = function (dateString) {
    const indexOfT = dateString.indexOf('T');
    const dateWithoutTime = dateString.substring(0, indexOfT);
    return dateWithoutTime;
}
TicketDetails.DateTimeFormat = function (date) {
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}
TicketDetails.InitiateRTE = function (id) {
    if (document.getElementById(id)) {
        var editorId = ("#" + id);

        TicketDetails.InstructionsEditor = new RichTextEditor(editorId);
        TicketDetails.LoadTicketDetail();
    }
    else {
        setTimeout(function () {
            TicketDetails.InitiateRTE(id);
        }, 1000);
    }
}
//#endregion

//#region  Ticket Comments and Updates
TicketDetails.AddCommentButtonOnClick = function () {
    if (!$('#detailActivityDiv').is(':visible')) {
        $("#detailActivityDiv").slideToggle();
    }
}
TicketDetails.CloseCommentDialougeOnClick = function () {
    if ($('#detailActivityDiv').is(':visible')) {
        $("#detailActivityDiv").slideToggle();
    }
    TicketDetails.ClearActivityForm();
}

TicketDetails.TakeOverButtonOnClick = function () {
    var assignModel = {};
    assignModel.TicketId = CurrentTicket.TicketId;
    assignModel.ActionUser = User.UserId;
    assignModel.AssignedTo = User.UserId;
    Ajax.AuthPost("Ticket/AssignToUser", assignModel, AssignTicketToSupportUser_OnSuccessCallBack, AssignTicketToSupportUser_OnErrorCallBack);

}

TicketDetails.SupportTicket_Forceclose = function () {
    CurrentTicket.TicketStatus = "Close";
    CurrentTicket.ActionUser = User.UserId
    Ajax.AuthPost("ticket/ForceCloseTicket", CurrentTicket, SupportTicket_Forceclose_OnSuccessCallBack, SupportTicket_Forceclose_OnErrorCallBack);
}

function SupportTicket_Forceclose_OnSuccessCallBack(data) {
    TicketDetails.ticketId = data.ticketId;
    TicketDetails.LoadTicketDetail();
}
function SupportTicket_Forceclose_OnErrorCallBack(err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
TicketDetails.AssignTicketToUserOnClick = function () {
    if (!$('#AssignTicketToUserDiv').is(':visible')) {
        $("#AssignTicketToUserDiv").slideToggle();
    }
}
TicketDetails.CloseAssignTicketToUserOnClick = function () {
    if ($('#AssignTicketToUserDiv').is(':visible')) {
        $("#AssignTicketToUserDiv").slideToggle();
    }
}











//TicketDetails.ForceCloseButtonOnClick = function () {
//    CurrentTicket.TicketStatus = "Close";
//    CurrentTicket.ActionUser = User.UserId
//    Ajax.AuthPost("ticket/ManageTicket", CurrentTicket, ForceClose_OnSuccessCallBack, LoadTicketDetail_OnErrorCallBack);
//}
//function ForceClose_OnSuccessCallBack(data) {

//    var ticketActivity = new Object();
//    ticketActivity.ticketComments = `<div><span style=" text-align: left; font-style: italic"><span style="color: rgb(48, 62, 61); font-family: Montserrat, sans-serif; font-size: 10.5px; text-align: center; white-space: nowrap; background-color: rgba(48, 62, 61, 0.03)"><span style="font-weight: bold; background-color: rgb(255, 255, 255); color: rgb(128, 128, 128)">${User.UserName}</span><span>&nbsp;</span></span></span><span style=" white-space: nowrap; color: rgb(48, 62, 61); font-family: Montserrat, sans-serif; font-size: 10.5px; text-align: center; background-color: rgba(48, 62, 61, 0.03)"><span style="font-style: italic; background-color: rgb(255, 255, 255); color: rgb(128, 128, 128)">has closed this ticket. </span></span><br /></div>`
//    ticketActivity.ticketId = TicketDetails.ticketId;
//    ticketActivity.createdBy = (TicketDetails.UserId).toString();
//    Ajax.AuthPost("Ticket/TicketComments", ticketActivity, InsertTicketActivity_OnSuccessCallBack, InsertTicketActivity_OnErrorCallBack);
//    TicketDetails.LoadTicketDetail();
//}

TicketDetails.LoadTicketActivity = function (ticketId) {
    var ticketActivity = new Object();
    ticketActivity.ticketId = ticketId;
    Ajax.AuthPost("Ticket/TicketComments", ticketActivity, InsertTicketActivity_OnSuccessCallBack, InsertTicketActivity_OnErrorCallBack);
}


TicketDetails.InsertTicketActivity = function () {
    var ticketActivity = new Object();
    ticketActivity.ticketComments = TicketDetails.InstructionsEditor.getHTML();
    ticketActivity.ticketId = TicketDetails.ticketId;
    ticketActivity.createdBy = (TicketDetails.UserId).toString();
    Ajax.AuthPost("Ticket/TicketComments", ticketActivity, InsertTicketActivity_OnSuccessCallBack, InsertTicketActivity_OnErrorCallBack);

}

function InsertTicketActivity_OnSuccessCallBack(data) {
    var ticketActivities = data.ticketActivities;
    var ticketDetailActivity = document.getElementById('ticketDetailActivity');
    ticketDetailActivity.innerHTML = "";
    for (var i = 0; i < ticketActivities.length; i++) {
        var activityHTML = (''
            + '<div class="card mb-3">'
            + '<div class="card-header" >'
            + '            <div><b>' + UserMaster.GetUserNameById(ticketActivities[i].createdBy) + '</b></div>'
            + '            <small class="text-muted">' + TicketDetails.DateTimeFormat(ticketActivities[i].modifiedOn) + '</small>'
            + '        </div>'
            + '<div class="card-body">' + ticketActivities[i].ticketComments + '</div>'
            + '</div> '
        );

        ticketDetailActivity.innerHTML = (ticketDetailActivity.innerHTML + activityHTML);
    }
    TicketDetails.CloseCommentDialougeOnClick();
}
function InsertTicketActivity_OnErrorCallBack(err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

TicketDetails.ClearActivityForm = function () {
    TicketDetails.InstructionsEditor.setPlainText("");
}
//#endregion

function TicketResolverDropDown_OnSuccessCallBack(data) {
    var resolverList = data.tickets;
    var assignToList = document.getElementById("assignToList");
    assignToList.innerHTML = "";
    //Assigning Default Value
    assignToList.innerHTML = ('<option value="0">Please Select..</option>');

    for (var i = 0; i < resolverList.length; i++) {
        var selOptionHTML = ('<option value="' + resolverList[i].userId + '">' + resolverList[i].name +'</option>');
        assignToList.innerHTML += selOptionHTML;
    }
}

TicketDetails.AssignTicketToSupportUser_OnClick = function () {
    var assignToList = document.getElementById("assignToList");
    var assignModel = {};
    assignModel.TicketId = CurrentTicket.TicketId;
    assignModel.ActionUser = User.UserId;
    assignModel.AssignedTo = assignToList.value;
    Ajax.AuthPost("Ticket/AssignToUser", assignModel, AssignTicketToSupportUser_OnSuccessCallBack, AssignTicketToSupportUser_OnErrorCallBack);
}
function AssignTicketToSupportUser_OnSuccessCallBack(data) {
    TicketDetails.ticketId = data.ticketId;
    TicketDetails.LoadTicketDetail();
    TicketDetails.CloseAssignTicketToUserOnClick();
}
function AssignTicketToSupportUser_OnErrorCallBack() {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}








//TicketDetails.AssignToDropdown = function () {
//    var assignToDropdown = document.getElementById("assignToDropdown");
//    var dropdownDiv = document.getElementById("dropdownDiv");
//    if (assignToDropdown.style.display === "none") {
//        assignToDropdown.style.display = "block";
//    } else {
//        assignToDropdown.style.display = "none";
//    }
//    dropdownDiv.style.display = "none";
//}

//TicketDetails.handleAssigneeChange = function (selectElement) {

//    var selectedOption = selectElement.options[selectElement.selectedIndex];
//    var selectedId = selectedOption.value;
//    var selectedName = selectedOption.textContent;
//    let ticketId = TicketDetails.ticketId;

//    var updateAssignedToOther = {};
//    updateAssignedToOther.ticketId = ticketId;
//    updateAssignedToOther.assignedToId = selectedId;
//    updateAssignedToOther.ActionUser = User.UserId;
//    Ajax.AuthPost("menus/GetTicketResolverList", updateAssignedToOther, UpdatedTicketResolverList_OnSuccessCallBack, LoadTicketDetail_OnErrorCallBack);

//}

//function UpdatedTicketResolverList_OnSuccessCallBack(data) {
//    let assignToList = document.getElementById('assignToList');
//    assignToList.innerHTML = "";
//    TicketDetails.LoadTicketDetail();
//}

TicketDetails.OpenEditTicketModal = function () {
    $('#EditTicketModal').modal('show');
}

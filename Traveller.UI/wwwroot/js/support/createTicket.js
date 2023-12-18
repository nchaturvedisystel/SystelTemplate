var Ticket = new Object();
Ticket.TicketId = 0;
Ticket.Title = "";
Ticket.TicketDesc = "";
Ticket.TicketType = "";
Ticket.Category = "";
Ticket.TagList = "";
Ticket.AssignedTo = "";
Ticket.TicketStatus = "";
Ticket.TicketPriority = "";
Ticket.AffectsCustomer = "";
Ticket.AppVersion = "";
Ticket.DueDate = new Date();
Ticket.EstimatedDuration = "";
Ticket.ActualDuration = "";
Ticket.TargetDate = new Date();
Ticket.ResolutionDate = new Date();
Ticket.Department = "";
Ticket.RaisedBy = "";
Ticket.AddField3 = "";
Ticket.AddField4 = "";
Ticket.AddField5 = "";
Ticket.IsActive = 0;
Ticket.IsDeleted = 0;
Ticket.TicketOwner = "";
Ticket.ProjectId = 0;
Ticket.CompanyId = 0;
Ticket.CompanyName = "";
Ticket.ProjectName = "";
Ticket.ActionUser = 0;
Ticket.InstructionsEditorLoaded = 0;
Ticket.InstructionsEditor;

Ticket.ClientUserActiveTicketListTblDT = {};
Ticket.ClientUserInProgressTicketListTbl = {};
Ticket.ClientUserClosedTicketListTbl = {};

Ticket.BasepageOnReady = function () {
    loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    Ajax.CompanyId = parseInt(loggedInUser.companyId);
    Company.LoadAll();
    Ticket.LoadAll();
}
//#region Load All for dataTable
Ticket.LoadAll = function () {
    var newTicket = {};
    Ticket.ClearForm();
    newTicket.ActionUser = User.UserId;
    newTicket.CompanyId = Ajax.CompanyId;
    Ajax.AuthPost("Ticket/ClientUserTicketList", newTicket, Ticket_OnSuccessCallBack, Ticket_OnErrorCallBack);
}
function Ticket_OnSuccessCallBack(data) {
    $('#CreateTicketModal').modal('hide');

    if ($.fn.dataTable.isDataTable('#ClientUserActiveTicketListTbl')) {
        Ticket.ClientUserActiveTicketListTblDT = $('#ClientUserActiveTicketListTbl').DataTable();
        Ticket.ClientUserActiveTicketListTblDT.destroy();

        Ticket.ClientUserInProgressTicketListTbl = $('#ClientUserInProgressTicketListTbl').DataTable();
        Ticket.ClientUserInProgressTicketListTbl.destroy();

        Ticket.ClientUserClosedTicketListTbl = $('#ClientUserClosedTicketListTbl').DataTable();
        Ticket.ClientUserClosedTicketListTbl.destroy();
    }

    var ClientUserActiveTicketData = data.activeTickets;
    var ClientUserInProgressTicketData = data.inprogressTickets;
    var ClientUserClosedTicketData = data.closedTickets;

    var ClientUserActiveTicketListBody = document.getElementById('ClientUserActiveTicketListBody');
    var ClientUserInProgressTicketListBody = document.getElementById('ClientUserInProgressTicketListBody');
    var ClientUserClosedTicketListBody = document.getElementById('ClientUserClosedTicketListBody');

    ClientUserActiveTicketListBody.innerHTML = "";
    ClientUserInProgressTicketListBody.innerHTML = "";
    ClientUserClosedTicketListBody.innerHTML = "";

    Ticket.BindClientUserTicketList(ClientUserActiveTicketListBody, ClientUserActiveTicketData);
    Ticket.BindClientUserTicketList(ClientUserInProgressTicketListBody, ClientUserInProgressTicketData);
    Ticket.BindClientUserTicketList(ClientUserClosedTicketListBody, ClientUserClosedTicketData);


    Ticket.ClientUserActiveTicketListTblDT = $('#ClientUserActiveTicketListTbl').DataTable({
        columnDefs: [{ "width": "5%", "targets": [0, 7] }, { "width": "10%", "targets": [1, 3, 4, 5, 6] }, { "width": "40%", "targets": [2] }]
    });

    Ticket.ClientUserInProgressTicketListTbl = $('#ClientUserInProgressTicketListTbl').DataTable({
        columnDefs: [{ "width": "5%", "targets": [0, 7] }, { "width": "10%", "targets": [1, 3, 4, 5, 6] }, { "width": "40%", "targets": [2] }]
    });

    Ticket.ClientUserClosedTicketListTbl = $('#ClientUserClosedTicketListTbl').DataTable({
        columnDefs: [{ "width": "5%", "targets": [0, 7] }, { "width": "10%", "targets": [1, 3, 4, 5, 6] }, { "width": "40%", "targets": [2] }]
    });
}
function Ticket_OnErrorCallBack(data) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
Ticket.BindClientUserTicketList = function (tbody, ticketData) {
    for (var i = 0; i < ticketData.length; i++) {
        var clickEventData = {};
        clickEventData.ticketId = ticketData[i].ticketId;
        var RowHtml = ('<tr>'
            + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + (i + 1).toString() + '</td>'
            + '                <td>' + ticketData[i].ticketId + '</td>'
            + '                <td>' + ticketData[i].title + '</td>'
            + '                <td>' + (new Date(ticketData[i].targetDate).toLocaleDateString("en-US")) + '</td>'
            + '                <td>' + (new Date(ticketData[i].createdOn).toLocaleDateString("en-US")) + '</td>'
            + '                <td>' + ticketData[i].ticketStatus + '</td>'
            + '                <td>' + ticketData[i].assignedToName + '</td>'
            + '                <td>' + (new Date(ticketData[i].modifiedOn).toLocaleDateString("en-US")) + '</td>'
            + '                <td class="text-center">'
            + '                    <div class="btn-group dots_dropdown">'
            + '                        <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
            + '                            <i class="fas fa-ellipsis-v"></i>'
            + '                        </button>'
            + '                        <div class="dropdown-menu dropdown-menu-right shadow-lg">'
            + '                            <button class="dropdown-item" type="button" onclick="DashboardWorkList.View(\'' + encodeURIComponent(JSON.stringify(clickEventData)) + '\')">'
            + '                                <i class="far fa fa-eye"></i> View'
            + '                            </button>'
            //+ '                            <button class="dropdown-item" type="button" onclick="Ticket.OpenTicketUpdateModal(\'' + encodeURIComponent(JSON.stringify(ticketData[i])) + '\')">'
            //+ '                                <i class="fa fa-edit"></i> Edit'
            //+ '                            </button>'
            //+ '                            <button class="dropdown-item" type="button" onclick="UserMaster.Delete(\'' + encodeURIComponent(JSON.stringify(ticketData[i])) + '\')">'
            //+ '                                <i class="far fa-trash-alt"></i> Delete'
            //+ '                            </button>'
            + '                        </div>'
            + '                    </div>'
            + '                </td> '
            + '            </tr>'
            + '');
        tbody.innerHTML = tbody.innerHTML + RowHtml;
    }
}
//#endregion

//#region Create Ticket
Ticket.OpenCreateTicketModal = function () {
    if (Ticket.InstructionsEditorLoaded == 0) {
        Ticket.InstructionsEditor = new RichTextEditor("#TemplateInstEditor");
        Ticket.InstructionsEditorLoaded = 1;
    }
    $('#CreateTicketModal').modal('show');
    Ticket.ClearForm();
    Ticket.SetDefault();
    if (User.DefaultCompanyId.split(',').indexOf(Ajax.CompanyId.toString()) >= 0 && UserMaster.CompanyList.length > 0) {
        document.getElementById("CompanySelectionOption").style.display = "";
        Ticket.BindCompanyDropdownList();
    }
    else {
        document.getElementById("CompanySelectionOption").style.display = "none";
    }
    document.getElementById("WorkflowInstructionsModalLabel").innerHTML = "Create Ticket";
    document.getElementById("SupportTicketSaveBtn").innerHTML = "Create Ticket";
    document.getElementById("SupportTicketSaveBtn").onclick = Ticket.CreateNew;
}
Ticket.CreateNew = function () {
    var newTicket = Ticket.GetDetails();
    newTicket.TicketId = 0;

    if (Ticket.ValidateData(newTicket)){
        Ajax.AuthPost("ticket/ManageTicket", newTicket, NewTicket_OnSuccessCallBack, NewTicket_OnErrorCallBack);
    }
}
function NewTicket_OnSuccessCallBack(data) {
    if ($(".rte-floatpanel-paragraphop")) {
        $(".rte-floatpanel-paragraphop").remove();
    }
    Util.ShowSuccessMessage("Ticket Created", "Your Ticket generated successfully!!")
    Ticket.LoadAll();
}
function NewTicket_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
Ticket.BindCompanyDropdownList = function() {
    var companyDropdown = document.getElementById('CompanyList')
    companyDropdown.innerHTML = ""
    options = ''
    let companylist = UserMaster.CompanyList
    for (var i = 0; i < companylist.length; i++) {
        options = '<option value=' + companylist[i].companyId + '>' + companylist[i].cName + '</option>'
        companyDropdown.innerHTML = companyDropdown.innerHTML + options
    }
}
//#endregion

//#region Update Ticket
Ticket.OpenTicketUpdateModal = function (ticketData) {
    var ticketData = JSON.parse(decodeURIComponent(ticketData));
    if (Ticket.InstructionsEditorLoaded == 0) {
        Ticket.InstructionsEditor = new RichTextEditor("#TemplateInstEditor");
        Ticket.InstructionsEditorLoaded = 1;
    }
    $('#CreateTicketModal').modal('show');
    Ticket.SetDetails(ticketData);
    document.getElementById("WorkflowInstructionsModalLabel").innerHTML = ("Update Ticket - (" + ticketData.companyName + ")");
    document.getElementById("SupportTicketSaveBtn").innerHTML = "Update Ticket";
    document.getElementById("SupportTicketSaveBtn").onclick = function () { Ticket.UpdateTicket(ticketData)};

}
Ticket.UpdateTicket = function (ticketData) {
    var newTicket = Ticket.GetDetails();
    newTicket.TicketId = ticketData.ticketId;
    newTicket.TicketStatus = ticketData.ticketStatus;
    newTicket.IsActive = ticketData.isActive;
    newTicket.IsDeleted = ticketData.isDeleted;
    newTicket.ActionUser = User.UserId;

    if (Ticket.ValidateData(newTicket)) {
        Ajax.AuthPost("ticket/ManageTicket", newTicket, UpdateTicket_OnSuccessCallBack, UpdateTicket_OnErrorCallBack);
    }
}
function UpdateTicket_OnSuccessCallBack(data) {
    Ticket.LoadAll();
}
function UpdateTicket_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
//#endregion

//#region common functions
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Date.prototype.toDateString = function () {
    var date = new Date(this.valueOf());
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return (date.getFullYear() + "-" + (month) + "-" + (day));
}
//#endregion

//#region Get/Set/Clear/Validation
Ticket.GetDetails = function () {
    var ticketData = {};
    ticketData.Title = document.getElementById("title").value;
    ticketData.TicketDesc = Ticket.InstructionsEditor.getHTML();
    ticketData.TicketType = document.getElementById("ticketType").value;
    ticketData.Category = document.getElementById("category").value;
    ticketData.TagList = document.getElementById("tags").value;
    ticketData.TicketPriority = document.getElementById("priority").value;
    ticketData.AffectsCustomer = document.getElementById("affectsCustomer").checked.toString();
    ticketData.TargetDate = new Date(document.getElementById("targetDate").value);
    ticketData.ProjectId = document.getElementById("project").value;
    ticketData.Department = document.getElementById("department").value;
    ticketData.RaisedBy = document.getElementById("raisedBy").value;
    ticketData.AddField3 = document.getElementById("raisedByContactNo").value;
    ticketData.ActionUser = User.UserId;
    ticketData.CompanyId = Ajax.CompanyId;

    if (User.DefaultCompanyId.split(',').indexOf(Ajax.CompanyId.toString()) >= 0) {
        ticketData.CompanyId = document.getElementById("CompanyList").value;
    }
    else {
        ticketData.CompanyId = Ajax.CompanyId;
    }

    return ticketData;
}
Ticket.SetDefault = function () {
    //SetTargetDate = Today+3Days    
    var defaultTargetDate = new Date();
    defaultTargetDate = defaultTargetDate.addDays(3);

    var day = ("0" + defaultTargetDate.getDate()).slice(-2);
    var month = ("0" + (defaultTargetDate.getMonth() + 1)).slice(-2);
    var defaultTargetDate = defaultTargetDate.getFullYear() + "-" + (month) + "-" + (day);

    $('#targetDate').val(defaultTargetDate);
    document.getElementById("project").value = 1;
    document.getElementById("priority").value = "High";
    document.getElementById("ticketType").value = "Technical";
    document.getElementById("category").value = "1";
    document.getElementById("affectsCustomer").checked = true;
}
Ticket.SetDetails = function (ticketData) {
    document.getElementById("title").value = ticketData.title;
    Ticket.InstructionsEditor.setHTML(ticketData.ticketDesc);
    document.getElementById("ticketType").value = ticketData.ticketType;
    document.getElementById("category").value = ticketData.category;
    document.getElementById("tags").value = ticketData.tagList;
    document.getElementById("priority").value = ticketData.ticketPriority;
    document.getElementById("affectsCustomer").checked = (ticketData.affectsCustomer?.toLowerCase?.() === 'true');
    document.getElementById("targetDate").value = new Date(ticketData.targetDate).toDateString();
    document.getElementById("project").value = ticketData.projectId;
    document.getElementById("department").value = ticketData.department;
    document.getElementById("raisedBy").value = ticketData.raisedBy;
    document.getElementById("raisedByContactNo").value = ticketData.AddField3;
}
Ticket.ClearForm = function () {
    if (Ticket.InstructionsEditorLoaded > 0) {
        document.getElementById("title").value = "";
        Ticket.InstructionsEditor.setHTML("");
        document.getElementById("ticketType").value = "";
        document.getElementById("category").value = "";
        document.getElementById("tags").value = "";
        document.getElementById("priority").value = "";
        document.getElementById("affectsCustomer").value = true;
        document.getElementById("targetDate").value = new Date().addDays(3).toDateString();
        document.getElementById("project").value = "";
        document.getElementById("department").value = "";
        document.getElementById("raisedBy").value = "";
        document.getElementById("raisedByContactNo").value = "";
    }
}
Ticket.ValidateData = function (ticketData) {
    var validated = true;
    var ValidationMsg = " Please provide ";
    ValidationMsg += (ticketData.Title.trim() === '') ? " <font color='red'>Title</font>," : '';
    ValidationMsg += (ticketData.Category.trim() === '') ? " <font color='red'>Category</font>," : '';
    ValidationMsg += (ticketData.TicketPriority.trim() === '') ? " <font color='red'>Priority</font>," : '';
    ValidationMsg += (ticketData.TicketType.trim() === '') ? " <font color='red'>Type</font>," : '';
    ValidationMsg += (ticketData.TagList.trim() === '') ? " <font color='red'>Tag</font>," : '';
    ValidationMsg += (ticketData.RaisedBy.trim() === '') ? " <font color='red'>Raised By</font>," : '';
    ValidationMsg += (ticketData.AddField3.trim() === '') ? " <font color='red'>Raised By Contact No.</font>," : '';

    if (ValidationMsg.trim() != "Please provide") {
        Util.DisplayAutoCloseErrorPopUp(ValidationMsg,1500);
        //alert(ValidationMsg);
        validated = false;
    }
    return validated;
}
//#endregion

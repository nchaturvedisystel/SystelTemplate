DashboardWorkList = new Object()
DashboardWorkList.TicketId = 0;
DashboardWorkList.Title = "";
DashboardWorkList.TicketDesc = "";
DashboardWorkList.TicketType = "";
DashboardWorkList.Category = "";
DashboardWorkList.TagList = "";
DashboardWorkList.AssignedTo = "";
DashboardWorkList.TicketStatus = "";
DashboardWorkList.TicketPriority = "";
DashboardWorkList.AffectsCustomer = "";
DashboardWorkList.AppVersion = "";
DashboardWorkList.DueDate = new Date();
DashboardWorkList.EstimatedDuration = "";
DashboardWorkList.ActualDuration = "";
DashboardWorkList.TargetDate = new Date();
DashboardWorkList.ResolutionDate = new Date();
DashboardWorkList.IsActive = 0;
DashboardWorkList.IsDeleted = 0;
DashboardWorkList.TicketOwner = "";
DashboardWorkList.ProjectId = 0;
DashboardWorkList.CompanyId = 0;
DashboardWorkList.CompanyName = "";
DashboardWorkList.ProjectName = "";
DashboardWorkList.ActionUser = 0;
DashboardWorkList.InstructionsEditorLoaded = 0;
DashboardWorkList.InstructionsEditor;
DashboardWorkList.AssignedToName = "";
DashboardWorkList.TicketResolverListObj = {};

DashboardWorkList.ClientWorkInProgressListTblDT = {};
DashboardWorkList.ClientAssignedToMeListTblDT = {};
DashboardWorkList.ClientOpenTicketsListTblDT = {};
DashboardWorkList.ClientClosedTicketsListTblDT = {};
DashboardWorkList.ClientAssignedToOthersListTblDT = {};

DashboardWorkList.CreateDashboardWorkListOnReady = function () { 
    if (document.getElementById("ClosedTicketsStartDate")) {
        DashboardWorkList.LoadDefaultDates();
        loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        Ajax.CompanyId = parseInt(loggedInUser.companyId);
        DashboardWorkList.LoadAll();
    }
    else {
        setTimeout(function () {
            DashboardWorkList.CreateDashboardWorkListOnReady();
        }, 1000);
    }
}

DashboardWorkList.LoadAll = function () {
    var newDashboardWorkList = {};
    DashboardWorkList.ClearCRUDform();

    newDashboardWorkList.ActionUser = User.UserId;
    newDashboardWorkList.CompanyId = Ajax.CompanyId;
    newDashboardWorkList.StartDate = $("#ClosedTicketsStartDate").val();
    newDashboardWorkList.EndDate = $("#ClosedTicketsEndDate").val();

    Ajax.AuthPost("Ticket/GetClientWorkList", newDashboardWorkList, DashboardWorkList_OnSuccessCallBack, DashboardWorkList_OnErrorCallBack);
    var TicketResolverList = {};
    TicketResolverList.ActionUser = User.UserId;
    Ajax.AuthPost("Ticket/GetTicketResolverList", TicketResolverList, TicketResolverList_OnSuccessCallBack, TicketResolverList_OnErrorCallBack);
}

function DashboardWorkList_OnSuccessCallBack(data) {
    //$('#CreateTicketModal').modal('hide');

    var ClientWorkInProgressData = data.workInProgress;
    var ClientAssignedToMeData = data.assignedToMe;
    var ClientOpenTicketsData = data.openTickets;
    var ClientClosedTicketsData = data.closedTickets;
    var ClientAssignedToOthersData = data.assignedToOthers;

    if ($.fn.DataTable.isDataTable('#ClientWorkInProgressListTbl')) {
        Ticket.ClientWorkInProgressListTblDT = $('#ClientWorkInProgressListTbl').DataTable();
        Ticket.ClientWorkInProgressListTblDT.destroy();

        Ticket.ClientAssignedToMeListTblDT = $('#ClientAssignedToMeListTbl').DataTable();
        Ticket.ClientAssignedToMeListTblDT.destroy();

        Ticket.ClientOpenTicketsListTblDT = $('#ClientOpenTicketsListTbl').DataTable();
        Ticket.ClientOpenTicketsListTblDT.destroy();

        Ticket.ClientClosedTicketsListTblDT = $('#ClientClosedTicketsListTbl').DataTable();
        Ticket.ClientClosedTicketsListTblDT.destroy();

        Ticket.ClientAssignedToOthersListTblDT = $('#ClientAssignedToOthersListTbl').DataTable();
        Ticket.ClientAssignedToOthersListTblDT.destroy();
    }

    var ClientWorkInProgressListBody = document.getElementById('ClientWorkInProgressListBody');
    var ClientAssignedToMeListBody = document.getElementById('ClientAssignedToMeListBody');
    var ClientOpenTicketsListBody = document.getElementById('ClientOpenTicketsListBody');
    var ClientClosedTicketsListBody = document.getElementById('ClientClosedTicketsListBody');
    var ClientAssignedToOthersListBody = document.getElementById('ClientAssignedToOthersListBody');

    ClientWorkInProgressListBody.innerHTML = "";
    ClientAssignedToMeListBody.innerHTML = "";
    ClientOpenTicketsListBody.innerHTML = "";
    ClientClosedTicketsListBody.innerHTML = "";
    ClientAssignedToOthersListBody.innerHTML = "";

    DashboardWorkList.BindClientUserTicketList(ClientWorkInProgressListBody, ClientWorkInProgressData);
    DashboardWorkList.BindClientUserTicketList(ClientAssignedToMeListBody, ClientAssignedToMeData);
    DashboardWorkList.BindClientUserTicketList(ClientOpenTicketsListBody, ClientOpenTicketsData);
    DashboardWorkList.BindClientUserTicketList(ClientClosedTicketsListBody, ClientClosedTicketsData);
    DashboardWorkList.BindClientUserTicketList(ClientAssignedToOthersListBody, ClientAssignedToOthersData);


    Ticket.ClientWorkInProgressListTblDT  = $('#ClientWorkInProgressListTbl').DataTable({
        columnDefs: [{ "width": "5%", "targets": [0, 0] }, { "width": "8%", "targets": [1, 2, 3, 5, 6, 7, 8, 9] }, { "width": "34%", "targets": [4] }]
    });

    Ticket.ClientAssignedToMeListTblDT = $('#ClientAssignedToMeListTbl').DataTable({
        columnDefs: [{ "width": "5%", "targets": [0, 10] }, { "width": "8%", "targets": [1, 2, 3, 5, 6, 7, 8, 9] }, { "width": "34%", "targets": [4] }]
    });

    Ticket.ClientOpenTicketsListTblDT = $('#ClientOpenTicketsListTbl').DataTable({
        columnDefs: [{ "width": "5%", "targets": [0, 10] }, { "width": "8%", "targets": [1, 2, 3, 5, 6, 7, 8, 9] }, { "width": "34%", "targets": [4] }]
    });

    Ticket.ClientClosedTicketsListTblDT = $('#ClientClosedTicketsListTbl').DataTable({
        columnDefs: [{ "width": "5%", "targets": [0, 10] }, { "width": "8%", "targets": [1, 2, 3, 5, 6, 7, 8, 9] }, { "width": "34%", "targets": [4] }]
    });

    Ticket.ClientAssignedToOthersListTblDT = $('#ClientAssignedToOthersListTbl').DataTable({
        columnDefs: [{ "width": "5%", "targets": [0, 10] }, { "width": "8%", "targets": [1, 2, 3, 5, 6, 7, 8, 9] }, { "width": "34%", "targets": [4] }]
    });

}

DashboardWorkList.BindClientUserTicketList = function (tbody, ticketData) {
    for (var i = 0; i < ticketData.length; i++) {
        var clickEventData = {};
        clickEventData.ticketId = ticketData[i].ticketId;
        var RowHtml = ('<tr>'
            + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + (i + 1).toString() + '</td>'
            + '                <td>' + ticketData[i].raisedBy + '</td>'
            + '                <td>' + ticketData[i].ticketId + '</td>'
            + '                <td>' + (new Date(ticketData[i].createdOn).toLocaleDateString("en-US")) + '</td>'
            + '                <td title="' + ticketData[i].title + '" >' + ticketData[i].title + '</td>'
            + '                <td>' + ticketData[i].assignedToName + '</td>'
            + '                <td>' + ticketData[i].ticketStatus + '</td>'
            + '                <td title="' + ticketData[i].companyName + '" >' + ticketData[i].companyCode + '</td>'
            + '                <td>' + (new Date(ticketData[i].targetDate).toLocaleDateString("en-US")) + '</td>'
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
            + '                        </div>'
            + '                    </div>'
            + '                </td> '
            + '            </tr>'
            + '');
        tbody.innerHTML = tbody.innerHTML + RowHtml;
    }
    if (tbody == ClientAssignedToOthersListBody) {

    }
}

function DashboardWorkList_OnErrorCallBack(data) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

DashboardWorkList.AssignWorkItem = function (data) {
    let ticketdetails = JSON.parse(decodeURIComponent(data))
    console.log(ticketdetails)
    var body = document.getElementById(`AssignTo_${ticketdetails.ticketId}`)
    body.innerHTML = ''

    // userList = [1, 2, 3, 4]
    let ticketResolverList = DashboardWorkList.TicketResolverListObj;
    var dropdownHTML = '<select class="form-control rounded-pill btn-sm assignDropdownList_' + ticketdetails.ticketId + '" onchange="DashboardWorkList.onchange(' + ticketdetails.ticketId + ', this)">';
    var defaultOption = '<option value="0">Please Select...</option>'
    dropdownHTML += defaultOption
    for (let i = 0; i < ticketResolverList.tickets.length; i++) {
        dropdownHTML += `<option value="${ticketResolverList.tickets[i].userId}">${ticketResolverList.tickets[i].name}</option>`;
    }
    dropdownHTML += '</select>';

    body.innerHTML = dropdownHTML
}

DashboardWorkList.onchange = function (data) {
    var body = document.getElementsByClassName(`assignDropdownList_${data}`)[0].value
    console.log(data, body)
    var updateAssignedTo = {};
    updateAssignedTo.ticketId = data;
    updateAssignedTo.assignedToId = body;
    updateAssignedTo.ActionUser = User.UserId;
    Ajax.AuthPost("menus/GetTicketResolverList", updateAssignedTo, UpdatedTicketResolverList_OnSuccessCallBack, UpdatedTicketResolverList_OnErrorCallBack);
    DashboardWorkList.LoadAll();
}

function UpdatedTicketResolverList_OnSuccessCallBack(data) {

}
function UpdatedTicketResolverList_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

function TicketResolverList_OnSuccessCallBack(data) {
    DashboardWorkList.TicketResolverListObj = data;
}
function TicketResolverList_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

function DashboardWorkList_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
DashboardWorkList.View = function (ticketData) {
    let ticketdetails = JSON.parse(decodeURIComponent(ticketData));
    TicketDetails.ticketId = ticketdetails.ticketId;
    var date = new Date();
    var RedirectUrl = '/html/support/TicketDetails.html' + '?' + date.valueOf().toString(); //Ensure to load latest changes
    Navigation.LoadPage(RedirectUrl, 'TDDB');

}
DashboardWorkList.TicketDetails = function () {

}
DashboardWorkList.ClearCRUDform = function () {

}
DashboardWorkList.LoadDefaultDates = function () {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    //var lastDay = new Date(y, m + 1, 0);

    var day = ("0" + firstDay.getDate()).slice(-2);
    var month = ("0" + (firstDay.getMonth() + 1)).slice(-2);
    var firstDay = firstDay.getFullYear() + "-" + (month) + "-" + (day);
    $("#ClosedTicketsStartDate").val(firstDay);

    day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var today = date.getFullYear() + "-" + (month) + "-" + (day);
    $("#ClosedTicketsEndDate").val(today);
}

















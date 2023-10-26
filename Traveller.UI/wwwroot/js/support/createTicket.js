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


Ticket.BasepageOnReady = function () {
    loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    Ajax.CompanyId = parseInt(loggedInUser.companyId);
    Ticket.LoadAll();
}
Ticket.LoadAll = function () {
    var newTicket = {};
    Ticket.ClearCRUDform();
    newTicket.ActionUser = User.UserId;
    newTicket.CompanyId = Ajax.CompanyId;
    Ajax.AuthPost("Ticket/ClientUserTicketList", newTicket, Ticket_OnSuccessCallBack, Ticket_OnErrorCallBack);
}
Ticket.OpenCreateTicketModal = function () {
    if (Ticket.InstructionsEditorLoaded == 0) {
        Ticket.InstructionsEditor = new RichTextEditor("#TemplateInstEditor");
        Ticket.InstructionsEditorLoaded = 1;
    }
    $('#CreateTicketModal').modal('show');

    //SetTargetDate = Today+3Days    
    var defaultTargetDate = new Date();
    defaultTargetDate = defaultTargetDate.addDays(3);

    var day = ("0" + defaultTargetDate.getDate()).slice(-2);
    var month = ("0" + (defaultTargetDate.getMonth() + 1)).slice(-2);
    var defaultTargetDate = defaultTargetDate.getFullYear() + "-" + (month) + "-" + (day);

    $('#targetDate').val(defaultTargetDate);
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function Ticket_OnSuccessCallBack(data) {
    $('#CreateTicketModal').modal('hide');

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
}

Ticket.BindClientUserTicketList = function (tbody, ticketData) {
    for (var i = 0; i < ticketData.length; i++) {
        var RowHtml = ('<tr>'
            + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + ticketData[i].ticketId + '</td>'
            + '                <td>' + ticketData[i].title + '</td>'
            + '                <td>' + (new Date(ticketData[i].targetDate).toLocaleDateString("en-US")) + '</td>'
            + '                <td>' + (new Date(ticketData[i].createdOn).toLocaleDateString("en-US")) + '</td>'
            + '                <td>' + ticketData[i].assignedToName + '</td>'
            + '                <td>' + (new Date(ticketData[i].modifiedOn).toLocaleDateString("en-US")) + '</td>'
            + '                <td class="text-center">'
            + '                    <div class="btn-group dots_dropdown">'
            + '                        <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
            + '                            <i class="fas fa-ellipsis-v"></i>'
            + '                        </button>'
            + '                        <div class="dropdown-menu dropdown-menu-right shadow-lg">'
            + '                            <button class="dropdown-item" type="button" onclick="DashboardWorkList.View(\'' + encodeURIComponent(JSON.stringify(ticketData[i])) + '\')">'
            + '                                <i class="far fa fa-eye"></i> View'
            + '                            </button>'
            + '                            <button class="dropdown-item" type="button" onclick="Ticket.Update(\'' + encodeURIComponent(JSON.stringify(ticketData[i])) + '\')">'
            + '                                <i class="fa fa-edit"></i> Edit'
            + '                            </button>'
            + '                            <button class="dropdown-item" type="button" onclick="UserMaster.Delete(\'' + encodeURIComponent(JSON.stringify(ticketData[i])) + '\')">'
            + '                                <i class="far fa-trash-alt"></i> Delete'
            + '                            </button>'
            + '                        </div>'
            + '                    </div>'
            + '                </td> '
            + '            </tr>'
            + '');
        tbody.innerHTML = tbody.innerHTML + RowHtml;
    }
}



function Ticket_OnErrorCallBack(data) {
    console.error(data);
}
Ticket.CreateNew = function () {

    var newTicket = {};
    newTicket.TicketId = 0;
    newTicket.Title = document.getElementById("title").value;
    newTicket.TicketDesc = Ticket.InstructionsEditor.getHTML();
    newTicket.TicketType = document.getElementById("ticketType").value;
    newTicket.Category = document.getElementById("category").value;
    newTicket.TagList = document.getElementById("tags").value;
    newTicket.TicketPriority = document.getElementById("priority").value;
    newTicket.AffectsCustomer = document.getElementById("affectsCustomer").value;
    newTicket.TargetDate = new Date(document.getElementById("targetDate").value);
    newTicket.ProjectId = document.getElementById("project").value;
    newTicket.ActionUser = User.UserId;
    newTicket.CompanyId = Ajax.CompanyId;
    newTicket.Department = document.getElementById("department").value;
    newTicket.RaisedBy = document.getElementById("raisedBy").value;
    //console.log(newTicket);

    // Perform validation
    var ValidationMsg = " Please provide ";
    ValidationMsg += (newTicket.Title.trim() === '') ? " Title," : '';
    ValidationMsg += (newTicket.Category.trim() === '') ? " Category," : '';
    ValidationMsg += (newTicket.TicketPriority.trim() === '') ? " Priority," : '';
    ValidationMsg += (newTicket.TicketType.trim() === '') ? " Type," : '';
    ValidationMsg += (newTicket.TagList.trim() === '') ? " Tag," : '';

    if (ValidationMsg.trim() != "Please provide") {
        alert(ValidationMsg);
    }
    else {
        Ajax.AuthPost("ticket/ManageTicket", newTicket, NewTicket_OnSuccessCallBack, NewTicket_OnErrorCallBack);
    }
}

function NewTicket_OnSuccessCallBack(data) {
    Ticket.LoadAll();
}

function NewTicket_OnErrorCallBack(error) {
    console.error(error);
}

Ticket.ClearCRUDform = function () {

}

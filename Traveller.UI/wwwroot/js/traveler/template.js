Template = new Object();

Template.WorkflowId = 0;
Template.WorkflowName = "";
Template.WorkflowCode = "";
Template.WorkflowDesc = "";
Template.IsActive = 0;
Template.IsDeleted = 0;
Template.ActionUser = User.UserId;
Template.DetailLoadCounter = 0;

Template.WorkCenters = {};
Template.WorkflowSteps = {};
Template.WorkflowFiles = {};
Template.WorkflowInstructions = {};
Template.WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];
Template.SystelWCColors = ["FEC87C", "FDBD71", "FCB165", "FBA75C", "FA9C51", "F98F45", "F8843A", "F77B31", "F67027", "F5641B", "F35910", "F24C04", "F35910", "F5641B", "F67027", "F77B31", "F8843A", "F98F45", "FA9C51", "FBA75C", "FCB165"];

var InstructionsEditor;

//#region Base Page
Template.BasepageOnReady = function () {
   
}
//#endregion Base Page

//#region CreateTemplate
Template.CreateTemplateOnReady = function () {
    Template.LoadAll();
}

Template.LoadAll = function () {
    Ajax.AuthPost("traveler/GetAllWorkflowTemplates", Template, LoadAllTemplates_OnSuccessCallBack, LoadAllTemplates_OnErrorCallBack);
}

// Close the modal when the 'Cancel' button is clicked
$(document).on('click', '[data-dismiss="modal"]', function () {
    $('#CreateTemplateModal').modal('hide');
});
Template.CreateNew = function () {
    Template.ClearForm();
    document.getElementById('modalSavebtn').innerHTML = "Create Template";
    $('#CreateTemplateModal').modal('show');
    document.getElementById('modalSavebtn').onclick = Template.ValidateAndCreateNewTemplate;
}

Template.ClearForm = function () {
    document.getElementById("TemplateNameInput").value = "";
    document.getElementById("TemplateCodeInput").value = "";
    document.getElementById("TemplateDescArea").value = "";
    document.getElementById("IsActive").checked = true;

    Template.WorkflowName = "";
    Template.WorkflowCode = "";
    Template.WorkflowDesc = "";
    Template.IsActive = 1;
    Template.IsDeleted = 0;
    Template.WorkflowId = 0;
}

Template.ValidateAndCreateNewTemplate = function () {

    Template.ActionUser = User.UserId;
    Template.WorkflowName = document.getElementById("TemplateNameInput").value;
    Template.WorkflowCode = document.getElementById("TemplateCodeInput").value;
    Template.WorkflowDesc = document.getElementById("TemplateDescArea").value;
    Template.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    Template.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("traveler/CreateWorkflowTemplate", Template, CreateNewTemplate_OnSuccessCallBack, CreateNewTemplate_OnErrorCallBack);
    $('#CreateTemplateModal').modal('hide');
}
function CreateNewTemplate_OnSuccessCallBack(data) {
    Template.LoadAll();
}
function CreateNewTemplate_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

function LoadAllTemplates_OnSuccessCallBack(data) {
    if (data && data.items && data.items.length > 0) {
        if (Navigation.MenuCode == "CTTLR")
            Template.BindList(data.items);
        else if (Navigation.MenuCode == "TDTLR")
            Template.BindTemplateListDropDown(data.items);
        else if (Navigation.MenuCode == "WOTLR")
            WorkOrder.WorkFlowList = data.items

    }
    else {
        var body = document.getElementById("TemplateListBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan = "7">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
}
function LoadAllTemplates_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred, please try again later..", 1500);
}
Template.BindList = function (data) {
    var body = document.getElementById("TemplateListBody");
    body.innerHTML = "";
    let SrNo = 0;
    for (var i = 0; i < data.length; i++) {
        SrNo += 1;
        var RowHtml = ('<tr>'
            + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Template.WCColors[i] +';">' + SrNo + '</td>'
            + '                <td> ' + data[i].workflowName + '</td>'
            + '                <td>'
            + '                    <div>'
            + '                        <div class="badge badge-secondary font-l" style="background-color: #' + Template.WCColors[i] + ';">' + data[i].workflowCode + '</div>'
            + '                    </div>'
            + '                </td>'
            + '                <td>' + data[i].workflowDesc + '</td>'
            + '                <td>' + (new Date(data[i].createdOn).toLocaleDateString("en-US")) + '</td>'
            + '                <td>' + data[i].createdBy + '</td>'
            + '                <td class="text-center">'
            + '                     <div class="btn-group dots_dropdown">'
            + '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
            + '                             <i class="fas fa-ellipsis-v"></i>'
            + '                         </button>'
            + '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">'
            + '                             <button class="dropdown-item" type="button" onclick="Template.Update(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">'
            + '                                 <i class="fa fa-edit"></i> Edit'
            + '                             </button>'
            + '                             <button class="dropdown-item" type="button" onclick="Template.View(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">'
            + '                                 <i class="fa fa-eye"></i> View'
            + '                             </button>'
            + '                             <button class="dropdown-item" type="button" onclick="Template.Delete(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')" >'
            + '                                 <i class="far fa-trash-alt"></i> Delete'
            + '                             </button>'
            + '                         </div>'
            + '                     </div>'
            + '                </td> '
            + '            </tr>'
            + '');


        body.innerHTML = body.innerHTML + RowHtml;
    }
}
Template.Delete = function (template) {
    template = JSON.parse(decodeURIComponent(template));
    var Title = 'Are you sure, you want to delete ' + template.workflowName + ' ?';
    Util.DeleteConfirm(template, Title, DeleteTemplate);
}
function DeleteTemplate(template) {
    template.isDeleted = 1;
    template.isActive = 0;
    template.actionUser = User.UserId;
    Ajax.AuthPost("traveler/DeleteWorkflowTemplate", template, DeleteTemplate_OnSuccessCallback, DeleteTemplate_OnErrorCallback);
}
function DeleteTemplate_OnSuccessCallback(data) {
    Template.LoadAll();
    Util.ShowSuccessMessage("Deleted Successfully!!", (data.workflowName + " is deleted."));
}
function DeleteTemplate_OnErrorCallback(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred, please try again later..", 1500);
}

Template.SetForm = function (data) {
    document.getElementById("TemplateNameInput").value = data.workflowName;
    document.getElementById("TemplateCodeInput").value = data.workflowCode;
    document.getElementById("TemplateDescArea").value = data.workflowDesc;
    document.getElementById("IsActive").checked = data.isActive === 1;
    document.getElementById("WorkflowId").value = data.workflowId;
}

Template.Update = function (template) {
    template = JSON.parse(decodeURIComponent(template));
    Template.SetForm(template);
    document.getElementById('modalSavebtn').innerHTML = "Update Template";
    $('#CreateTemplateModal').modal('show');
    document.getElementById('modalSavebtn').onclick = function () {
        Template.ValidateAndUpdateTemplate(template);
    };
}
Template.ValidateAndUpdateTemplate = function (template) {
    Template.ActionUser = User.UserId;
    Template.WorkflowName = document.getElementById("TemplateNameInput").value;
    Template.WorkflowCode = document.getElementById("TemplateCodeInput").value;
    Template.WorkflowDesc = document.getElementById("TemplateDescArea").value;
    Template.WorkflowId = document.getElementById("WorkflowId").value
    Template.WorkflowTrackingByGroup = template.workflowTrackingByGroup;
    Template.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    Template.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("traveler/UpdateWorkflowTemplate", Template, UpdateTemplate_OnSuccessCallback, UpdateTemplate_OnErrorCallback);
    $('#CreateTemplateModal').modal('hide');
}
function UpdateTemplate_OnSuccessCallback(data) {
    Template.LoadAll();
    Util.ShowSuccessMessage("Updated Successfully!!", (data.workflowName + " is updated."));
}
function UpdateTemplate_OnErrorCallback(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred, please try again later..", 1500);
}
Template.View = function (template) {
    localStorage.setItem('template', template);
    Navigation.LoadPage(('/html/traveler/TemplateDetail.html?' + Math.random()), 'TDTLR', event);
}
//#endregion

//#region TemplateDetail
//#region Template Detail
Template.TemplateDetailOnReady = function () {
    try {
        Template.LoadDetails();
        Template.LoadAll();

    }
    catch (ex) {
        Util.DisplayAutoCloseErrorPopUp("Error occurred, kindly contact Admin!!", 1500);
    }
}
Template.BindTemplateListDropDown = function (data) {
    var select = document.getElementById("WorkflowTemplateSelect");
    select.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var optionHtml = '<option value="WorkflowTemplateSelectOption_' + data[i].workflowId + '" id="WorkflowTemplateSelectOption_' + data[i].workflowId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].workflowName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
}
Template.FetchDetails = function (templateId) {

    //fetching template id if not provided
    if (templateId == 0) {
        var templateSelect = document.getElementById("WorkflowTemplateSelect");
        localStorage.setItem('template', templateSelect.options[templateSelect.selectedIndex].getAttribute("customData"));
    }
    //Setting Template Detail
    Template.LoadDetails();
}
Template.GetFromLocalStorage = function () {
    var template = localStorage.getItem('template');
    template = JSON.parse(decodeURIComponent(template));
    if (template == null) {
        var templateSelect = document.getElementById("WorkflowTemplateSelect");
        var selectedTemplateOptionData = templateSelect.options[templateSelect.selectedIndex].getAttribute("customData");
        localStorage.setItem('template', selectedTemplateOptionData);
        template = JSON.parse(decodeURIComponent(selectedTemplateOptionData));
    }
    Template.ActionUser = User.UserId;
    Template.WorkflowId = template.workflowId;
    Template.WorkflowName = template.workflowName;
    Template.WorkflowCode = template.workflowCode;
    Template.WorkflowDesc = template.workflowDesc;
}
Template.LoadDetails = function () {
    if (document.getElementById("TemplateDetailLabel")) {
        Template.GetFromLocalStorage();
        document.getElementById("TemplateDetailLabel").innerHTML = Template.WorkflowName;
        document.getElementById('WorkflowTemplateSelect').value = ("WorkflowTemplateSelectOption_" + Template.WorkflowId);
        Template.DetailLoadCounter = 0;
        Template.LoadCommulativeDetails();
        Template.LoadWorkcenter();
    }
    else {
        Template.DetailLoadCounter += 1;
        if (Template.DetailLoadCounter < 5) {
            setTimeout(function () {
                Template.LoadDetails();
            }, 500);
        }
        else
            Template.DetailLoadCounter = 0;
    }
}
Template.LoadCommulativeDetails = function () {
    Ajax.AuthPost("traveler/GetAWorkflowTemplateById", Template, LoadCommulativeDetails_OnSuccessCallBack, LoadCommulativeDetails_OnErrorCallBack);
}
function LoadCommulativeDetails_OnSuccessCallBack(data) {
    Template.WorkCenters = data.workCenters;
    Template.WorkflowSteps = data.workflowSteps;
    Template.WorkflowFiles = data.workflowFiles;
    Template.WorkflowInstructions = data.workflowInstructions;

    //Setting Count Values --Header
    document.getElementById("WorkflowLevelFilesCount").innerHTML = data.workflow.filesCount;
    document.getElementById("WorkflowLevelStepsCount").innerHTML = data.workflow.stepsCount;
    document.getElementById("WorkflowLevelInstructionsCount").innerHTML = data.workflow.instructionsCount;

    //Changing color of cnt --Header
    if (data.workflow.filesCount > 0)
        document.getElementById("WorkflowLevelFilesCount").style.backgroundColor = "var(--orange-col)";
    if (data.workflow.stepsCount > 0)
        document.getElementById("WorkflowLevelStepsCount").style.backgroundColor = "var(--orange-col)";
    if (data.workflow.instructionsCount > 0)
        document.getElementById("WorkflowLevelInstructionsCount").style.backgroundColor = "var(--orange-col)";

    //Load Tabular View
    Template.BindWorkCenters();
    Template.BindWorkflowFiles();
    Template.BindWorkflowInstruction();

    //Load Graphical View
    Template.BindGraphicalWorkCenters();
}
function LoadCommulativeDetails_OnErrorCallBack(data) {
    Util.DisplayAutoCloseErrorPopUp("Error occurred, kindly contact Admin!!", 1500);
}
Template.BindWorkCenters = function () {
    var body = document.getElementById("WorkflowTemplateTabularBody");
    body.innerHTML = "";
    if (Template.WorkCenters && Template.WorkCenters.length > 0) {
        for (var i = 0; i < Template.WorkCenters.length; i++) {
            var rowHTML = '<tr>'
                + '<td class="dtr-control sorting_1" style="border-left: 5px solid #' + Template.WCColors[i] + ';"> '
                + '                     <i class="fa fa-angle-down expand_row_arrow" aria-hidden="true" id="ExpandTemplateWC' + Template.WorkCenters[i].workCenterId.toString() + '" onclick="Template.ExpandTemplateGroupDataRowOnClick(' + Template.WorkCenters[i].workCenterId.toString() + ', this)" ></i>'
                + '                </td>'
                + '                <td>' + (i + 1).toString() + '</td>'
                + '                <td>'
                + '                    ' + Template.WorkCenters[i].workCenterName
                + '                </td>'
                + '                <td>'
                + '                    <div>'
                + '                        <div class="badge badge-secondary font-l" style="background-color: #' + Template.WCColors[i] + ';">' + Template.WorkCenters[i].workCenterCode + '</div>'
                + '                    </div>'
                + '                </td>'
                + '                <td>' + Template.WorkCenters[i].workCenterDesc + '</td>'
                + '                <td>' + Template.WorkCenters[i].noOfSteps.toString() + '/' + Template.WorkCenters[i].totalSteps.toString() + '</td>'
                + '                <td>'
                + '                    <div class="progress mb-1" style="height: 7px;">'
                + '                        <div class="progress-bar rounded-pill" role="progressbar" style="width: ' + parseInt((Template.WorkCenters[i].noOfSteps * 100) / Template.WorkCenters[i].totalSteps).toString() + '%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>'
                + '                    </div>'
                + '                    ' + Util.GetUnitsPercentageString(Template.WorkCenters[i].noOfSteps, Template.WorkCenters[i].totalSteps) + '%'
                + '                </td>'
                + '                <td>'
                + '                    <div class="row no-gutters">'
                + '                        <div class="col" title="WorkCenter level total Files"><span><img src="../../Layout2/images/file_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(Template.WorkCenters[i].noOfFiles) + '">' + Template.WorkCenters[i].noOfFiles.toString() + '</b></span></div>'
                + '                        <div class="col" title="WorkCenter level total Steps"><span><img src="../../Layout2/images/step_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(Template.WorkCenters[i].noOfSteps) + '">' + Template.WorkCenters[i].noOfSteps.toString() + '</b></span></div>'
                + '                        <div class="col" title="WorkCenter level total Instructions"><span><img src="../../Layout2/images/instruction_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(Template.WorkCenters[i].noOfInstructions) + '">' + Template.WorkCenters[i].noOfInstructions.toString() + '</b></span></div>'
                + '                    </div>'
                + '                </td>'
                + '            </tr> '
                + '             <tr id="TemplateWCChild' + Template.WorkCenters[i].workCenterId.toString() + '" class="TemplateWCChild">'
                + '                 <td colspan="8" >'
                + '                     <div class="showDiv" style="padding-top:0px;">'
                + '                         <table class="table table-bordered com_table" style="width: 100%;">'
                + '                             <thead style="display:none;">'
                + '                                 <tr>'
                + '                                    <th><div style="width: 100px;">Step Name</div></th>'
                + '                                    <th>Step Code</th>'
                + '                                    <th><div style="width: 100px;">Step Desc</div></th>'
                + '                                    <th style="width:150px;">Additional Info</th>'
                + '                                </tr>'
                + '                             </thead>'
                + '                             <tbody class="WorCenterChildBody" id="WorCenterChildBody' + Template.WorkCenters[i].workCenterId.toString() + '" ribbonColor="#' + Template.WCColors[i] + '">'
                + '                             </tbody>'
                + '                          </table>'
                + '                     </div>'
                + '                 </td>'
                + '             </tr>'
                + '';

            body.innerHTML += rowHTML;
        }
    }
    else {
        body.innerHTML = ('<tr>'
            + '                 <td colspan="8">'
            + '                    <div>'
            + '                        <div class="badge badge-secondary font-l" style="background-color: #c584d3;">No Records to display..</div>'
            + '                    </div>'
            + '                </td>'
            + '            </tr> ');
    }

    Template.BindWorkflowSteps();
}
Template.BindWorkflowSteps = function () {
    //Clearing the existing data
    for (var i = 0; i < $('.WorCenterChildBody').length; i++) {
        $('.WorCenterChildBody')[i].innerHTML = "";
    }

    //Binding the child to its parent DataCenter
    if (Template.WorkflowSteps && Template.WorkflowSteps.length > 0) {
        for (var i = 0; i < Template.WorkflowSteps.length; i++) {
            var data = Template.WorkflowSteps[i];
            var body = document.getElementById("WorCenterChildBody" + data.workCenterId);
            var ribbonColor = body.getAttribute("ribbonColor");

            var rowHTML = '<tr>'
                + ' <td style="width:25%; border-left:5px solid ' + ribbonColor + '; padding-left:10px;">' + data.stepName + '</td>'
                + ' <td style="width:25%;">' + data.stepCode + '</td>'
                + ' <td style="width:50%;">'
                + '     <div style="width: -moz-calc(100%-100px); width: -webkit-calc(100%-100px); width: calc(100%-100px); float:left; display: inline-block; "> &nbsp;' + data.stepDesc + '</div>'
                + '     <div class="row no-gutters" style="width:80px;">'
                + '         <div class="col" title="Step level total Files"><span><img src="../../Layout2/images/file_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data.noOfFiles) + '">' + data.noOfFiles.toString() + '</b></span></div>'
                + '         <div class="col" title="Step level total Instructions"><span><img src="../../Layout2/images/instruction_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(data.noOfInstructions) + '">' + data.noOfInstructions.toString() + '</b></span></div>'
                + '     </div>'
                + ' </td>'
                + '</tr>';
            body.innerHTML += rowHTML;
        }
    }
}
Template.BindWorkflowFiles = function () {

}
Template.BindWorkflowInstruction = function () {

}
Template.BindGraphicalWorkCenters = function () {
    var body = document.getElementById("GraphicalWorkCenterGroup");
    body.innerHTML = "";
    var windowTop = ((document.documentElement.clientHeight / 2) - 100),
        left = 0,
        transformArr = ["0.7", "0.85", "0.95"],
        t = 0,
        leftIncrement = 0,
        top = windowTop - 70,
        topOdd = 10,
        topEven = 70;

    if (Template.WorkCenters && Template.WorkCenters.length > 0) {
        for (var i = 0; i < Template.WorkCenters.length; i++) {
            top != (windowTop - topEven) ? (windowTop - topEven) : (windowTop - topOdd);

            if (Template.WorkCenters[i].noOfSteps <= 2) {
                t = 0;
                leftIncrement = 90;
            }
            else if (Template.WorkCenters[i].noOfSteps <= 5) {
                t = 1;
                leftIncrement = 100;
            }
            else {
                t = 2;
                leftIncrement = 100;
            }
            var rowHTML = '<a href="#" class="wc_bubbles_list" onclick="Template.GraphicalWorkCentersOnClick(' + Template.WorkCenters[i].workCenterId.toString() + ')" data-toggle="modal" data-target="#exampleModal" style="border : 10px solid #' + Template.SystelWCColors[i] + '; top : ' + top.toString() + 'px; left: ' + left.toString() + 'px; z-index: ' + (i + 1).toString() + '; transform: scale(' + transformArr[t] + ')">'
                + '         <h2>'
                + '             <div>'
                + '                <div class="badge badge-secondary font-l" style="background-color: #' + Template.WCColors[i] + ';">' + Template.WorkCenters[i].workCenterCode + '</div>'
                + '             </div>'
                + '         </h2>'
                + '         <div class="trav_counts">'
                + '             <div class="row no-gutters">'
                + '                 <div class="col"><span><img src="../../Layout2/images/file_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(Template.WorkCenters[i].noOfFiles) + '">' + Template.WorkCenters[i].noOfFiles.toString() + '</b></span></div>'
                + '                 <div class="col"><span><img src="../../Layout2/images/step_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(Template.WorkCenters[i].noOfSteps) + '">' + Template.WorkCenters[i].noOfSteps.toString() + '</b></span></div>'
                + '                 <div class="col"><span><img src="../../Layout2/images/instruction_icon.svg"> <b style="background-color: ' + Util.GetNotificationColor(Template.WorkCenters[i].noOfInstructions) + '">' + Template.WorkCenters[i].noOfInstructions.toString() + '</b></span></div>'
                + '             </div>'
                + '         </div>'
                + '        </a>'

            body.innerHTML += rowHTML;
            left += leftIncrement;
        }
    }
    else {
    }
}
Template.GraphicalWorkCentersOnClick = function (WorkCenterId) {
    alert("Group Id:" + WorkCenterId);
}
Template.ExpandTemplateGroupDataRowOnClick = function (groupId, sender) {
    if (sender.classList.contains("active_arrow")) {
        sender.classList.remove("active_arrow");
        $("#TemplateWCChild" + groupId + " .showDiv").slideToggle(1000);
    }
    else {
        sender.classList.add("active_arrow");
        $("#TemplateWCChild" + groupId + " .showDiv").slideToggle(1000);
    }
}
Template.ExpandTemplateGroupDataAllRowOnClick = function (sender) {
    if (sender.classList.contains("active_arrow")) {
        //Hide All Child Tables
        for (var i = 0; i < $(".fa-angle-down").length; i++) {
            if ($(".fa-angle-down")[i].classList.contains("active_arrow"))
                $(".fa-angle-down")[i].classList.remove("active_arrow");
        }
        for (var i = 0; i < $(".TemplateWCChild").length; i++) {
            if ($("#" + $(".TemplateWCChild")[i].id + " .showDiv").is(":visible"))
                $("#" + $(".TemplateWCChild")[i].id + " .showDiv").slideToggle(1000);
        }
    }
    else {
        //Show All Child Tables
        for (var i = 0; i < $(".fa-angle-down").length; i++) {
            if (!$(".fa-angle-down")[i].classList.contains("active_arrow"))
                $(".fa-angle-down")[i].classList.add("active_arrow");
        }
        for (var i = 0; i < $(".TemplateWCChild").length; i++) {
            if (!$("#" + $(".TemplateWCChild")[i].id + " .showDiv").is(":visible"))
                $("#" + $(".TemplateWCChild")[i].id + " .showDiv").slideToggle(1000);
        }

    }
}
Template.ViewFiles = function () {
    $("#FileViewerModal").modal("show");
}
//#endregion Template Detail
//#region Template Detial - Work Center
Template.LoadWorkcenter = function () {
    Ajax.AuthPost("traveler/GetWorkCenterByWorkflowId", Template, LoadWorkcenterByWorkflowId_OnSuccessCallBack, LoadWorkcenterByWorkflowId_OnErrorCallBack);
}
function LoadWorkcenterByWorkflowId_OnSuccessCallBack(data) {
    var WorkCenterMasterDiv = document.getElementById("WorkCenterMasterDiv");
    var TemplateWorkCenterDiv = document.getElementById("TemplateWorkCenterDiv");
    WorkCenterMasterDiv.innerHTML = "";
    TemplateWorkCenterDiv.innerHTML = "";

    if (data && data.items && data.items.length > 0) {
        data = data.items;
        for (var i = 0; i < data.length; i++) {
            var workCenterItemHTML = "";
            if (data[i].centerId == 0) {
                workCenterItemHTML = ('<div class="card d-inline-block mb-3 p-2 shadow-sm w-auto mr-3">'
                    + ' <label class="mb-0"> <input type="checkbox" id="' + data[i].workCenterId + '" /> ' + data[i].workCenterCode + '</label>'
                    + '</div>');
                WorkCenterMasterDiv.innerHTML += workCenterItemHTML;
            }
            else {
                workCenterItemHTML = ('<div class="card d-inline-block mb-3 p-2 shadow-sm w-auto mr-3">'
                    + ' <label class="mb-0"> <input type="checkbox" id="' + data[i].workCenterId + '" /> ' + data[i].workCenterCode + '</label>'
                    + '</div>');
                TemplateWorkCenterDiv.innerHTML += workCenterItemHTML;
            }
        }
    }
    Template.LoadWorkcenterSteps();
    Template.LoadAllFiles();
    Template.LoadAllInstructions();
}
function LoadWorkcenterByWorkflowId_OnErrorCallBack(data) {
    Util.DisplayAutoCloseErrorPopUp("Error occurred, kindly contact Admin!!", 1500);
}
Template.AddAllWorkCenterOnClick = function () {
    var WorkCenterMasterDiv = document.getElementById("WorkCenterMasterDiv");
    var checkboxesAll = WorkCenterMasterDiv.querySelectorAll('input[type="checkbox"]');
    if (checkboxesAll.length == 0) {
        Util.DisplayAutoCloseErrorPopUp("No Group Center to be selected..", 1500);
    }
    else {
        for (var i = 0; i < checkboxesAll.length; i++) {
            checkboxesAll[i].checked = true;
        }
        Template.AddSelectedWorkCenterOnClick();
    }
}
Template.AddSelectedWorkCenterOnClick = function () {
    var data = new Object();
    data.Items = [];
    var WorkCenterMasterDiv = document.getElementById("WorkCenterMasterDiv");
    var checkBoxesSelected = WorkCenterMasterDiv.querySelectorAll('input[type="checkbox"]:checked');
    if (checkBoxesSelected.length == 0) {
        Util.DisplayAutoCloseErrorPopUp("No Group Center selected..", 1500);
    }
    else {
        for (var i = 0; i < checkBoxesSelected.length; i++) {
            var dataCenter = Object();
            dataCenter.WorkflowId = Template.WorkflowId;
            dataCenter.WorkCenterId = checkBoxesSelected[i].id;
            dataCenter.IsActive = 1;
            dataCenter.IsDeleted = 0;
            dataCenter.ActionUser = User.UserId;
            data.Items[i] = dataCenter
        }
        Template.UpdateGroupCenter(data);
    }
}
Template.RemoveSelectedWorkCenterOnClick = function () {
    var data = new Object();
    data.Items = [];
    var TemplateWorkCenterDiv = document.getElementById("TemplateWorkCenterDiv");
    var checkBoxesSelected = TemplateWorkCenterDiv.querySelectorAll('input[type="checkbox"]:checked');
    if (checkBoxesSelected.length == 0) {
        Util.DisplayAutoCloseErrorPopUp("No Group Center selected..", 1500);
    }
    else {
        for (var i = 0; i < checkBoxesSelected.length; i++) {
            var dataCenter = Object();
            dataCenter.WorkflowId = Template.WorkflowId;
            dataCenter.WorkCenterId = checkBoxesSelected[i].id;
            dataCenter.IsActive = 1;
            dataCenter.IsDeleted = 1;
            dataCenter.ActionUser = User.UserId;
            data.Items[i] = dataCenter
        }
        Template.UpdateGroupCenter(data);
    }
}
Template.RemoveAllWorkCenterOnClick = function () {
    var TemplateWorkCenterDiv = document.getElementById("TemplateWorkCenterDiv");
    var checkboxesAll = TemplateWorkCenterDiv.querySelectorAll('input[type="checkbox"]');
    if (checkboxesAll.length == 0) {
        Util.DisplayAutoCloseErrorPopUp("No Group Center to be selected..", 1500);
    }
    else {
        for (var i = 0; i < checkboxesAll.length; i++) {
            checkboxesAll[i].checked = true;
        }
        Template.RemoveSelectedWorkCenterOnClick();
    }
}
Template.UpdateGroupCenter = function (data) {
    Ajax.AuthPost("traveler/WorkCenterForWorkflowBulkCRUD", data, UpdateGroupCenterForTemplate_OnSuccessCallBack, UpdateGroupCenterForTemplate_OnErrorCallBack);
}
function UpdateGroupCenterForTemplate_OnSuccessCallBack(data) {
    LoadWorkcenterByWorkflowId_OnSuccessCallBack(data);
}
function UpdateGroupCenterForTemplate_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error occurred, kindly contact Admin!!", 1500);
}
//#endregion Template Detial - Work Center
//#region Template Detial - Work Center Steps
Template.LoadWorkcenterSteps = function () {
    Ajax.AuthPost("traveler/GetWorkCenterStepsByWorkflowId", Template, LoadWorkcenterStepsByWorkflowId_OnSuccessCallBack, LoadWorkcenterStepsByWorkflowId_OnErrorCallBack);
}
function LoadWorkcenterStepsByWorkflowId_OnSuccessCallBack(data) {
    var WorkCenterStepsMasterDiv = document.getElementById("WorkCenterStepsMasterDiv");
    var TemplateWorkCenterStepsDiv = document.getElementById("TemplateWorkCenterStepsDiv");
    WorkCenterStepsMasterDiv.innerHTML = "";
    TemplateWorkCenterStepsDiv.innerHTML = "";

    if (data && data.items && data.items.length > 0) {
        data = data.items;
        for (var i = 0; i < data.length; i++) {
            var workCenterStepsItemHTML = "";
            if (data[i].workflowStepId == 0) {
                workCenterStepsItemHTML = ('<div class="card d-inline-block mb-3 p-2 shadow-sm w-auto mr-3">'
                    + ' <label class="mb-0"> <input type="checkbox" id="' + data[i].stepId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '"  /> ' + data[i].workCenterCode + '-' + data[i].stepName + '</label>'
                    + '</div>');
                WorkCenterStepsMasterDiv.innerHTML += workCenterStepsItemHTML;
            }
            else {
                workCenterStepsItemHTML = ('<div class="card d-inline-block mb-3 p-2 shadow-sm w-auto mr-3">'
                    + ' <label class="mb-0"> <input type="checkbox" id="' + data[i].stepId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '" /> ' + data[i].workCenterCode + '-' + data[i].stepName + '</label>'
                    + '</div>');
                TemplateWorkCenterStepsDiv.innerHTML += workCenterStepsItemHTML;
            }
        }
    }

}
function LoadWorkcenterStepsByWorkflowId_OnErrorCallBack(data) {
    Util.DisplayAutoCloseErrorPopUp("Error occurred, kindly contact Admin!!", 1500);
}
Template.AddAllWorkCenterStepsOnClick = function () {
    var WorkCenterStepsMasterDiv = document.getElementById("WorkCenterStepsMasterDiv");
    var checkboxesAll = WorkCenterStepsMasterDiv.querySelectorAll('input[type="checkbox"]');
    if (checkboxesAll.length == 0) {
        Util.DisplayAutoCloseErrorPopUp("No Group Center to be selected..", 1500);
    }
    else {
        for (var i = 0; i < checkboxesAll.length; i++) {
            checkboxesAll[i].checked = true;
        }
        Template.AddSelectedWorkCenterStepsOnClick();
    }
}
Template.AddSelectedWorkCenterStepsOnClick = function () {
    var data = new Object();
    data.Items = [];
    var WorkCenterStepsMasterDiv = document.getElementById("WorkCenterStepsMasterDiv");
    var checkBoxesSelected = WorkCenterStepsMasterDiv.querySelectorAll('input[type="checkbox"]:checked');
    if (checkBoxesSelected.length == 0) {
        Util.DisplayAutoCloseErrorPopUp("No Group Center selected..", 1500);
    }
    else {
        for (var i = 0; i < checkBoxesSelected.length; i++) {
            var step = JSON.parse(decodeURIComponent(checkBoxesSelected[i].getAttribute("customData")));
            var dataCenter = Object();
            dataCenter.WorkflowId = Template.WorkflowId;
            dataCenter.WorkCenterId = step.workCenterId;
            dataCenter.StepId = step.stepId;
            dataCenter.DisplaySeq = step.displaySeq;
            dataCenter.IsActive = 1;
            dataCenter.IsDeleted = 0;
            dataCenter.ActionUser = User.UserId;
            data.Items[i] = dataCenter
        }
        Template.UpdateGroupCenterSteps(data);
    }
}
Template.RemoveSelectedWorkCenterStepsOnClick = function () {
    var data = new Object();
    data.Items = [];
    var TemplateWorkCenterStepsDiv = document.getElementById("TemplateWorkCenterStepsDiv");
    var checkBoxesSelected = TemplateWorkCenterStepsDiv.querySelectorAll('input[type="checkbox"]:checked');
    if (checkBoxesSelected.length == 0) {
        Util.DisplayAutoCloseErrorPopUp("No Group Center selected..", 1500);
    }
    else {
        for (var i = 0; i < checkBoxesSelected.length; i++) {
            var step = JSON.parse(decodeURIComponent(checkBoxesSelected[i].getAttribute("customData")));
            var dataCenter = Object();
            dataCenter.WorkflowId = Template.WorkflowId;
            dataCenter.WorkCenterId = step.workCenterId;
            dataCenter.StepId = step.stepId;
            dataCenter.DisplaySeq = step.displaySeq;
            dataCenter.IsActive = 1;
            dataCenter.IsDeleted = 1;
            dataCenter.ActionUser = User.UserId;
            data.Items[i] = dataCenter
        }
        Template.UpdateGroupCenterSteps(data);
    }
}
Template.RemoveAllWorkCenterStepsOnClick = function () {
    var TemplateWorkCenterStepsDiv = document.getElementById("TemplateWorkCenterStepsDiv");
    var checkboxesAll = TemplateWorkCenterStepsDiv.querySelectorAll('input[type="checkbox"]');
    if (checkboxesAll.length == 0) {
        Util.DisplayAutoCloseErrorPopUp("No Group Center to be selected..", 1500);
    }
    else {
        for (var i = 0; i < checkboxesAll.length; i++) {
            checkboxesAll[i].checked = true;
        }
        Template.RemoveSelectedWorkCenterStepsOnClick();
    }
}
Template.UpdateGroupCenterSteps = function (data) {
    Ajax.AuthPost("traveler/WorkCenterStepsForWorkflowBulkCRUD", data, UpdateGroupCenterStepsForTemplate_OnSuccessCallBack, UpdateGroupCenterStepsForTemplate_OnErrorCallBack);
}
function UpdateGroupCenterStepsForTemplate_OnSuccessCallBack(data) {
    LoadWorkcenterStepsByWorkflowId_OnSuccessCallBack(data);
}
function UpdateGroupCenterStepsForTemplate_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error occurred, kindly contact Admin!!", 1500);
}
//#endregion Template Detial - Work Center Steps
//#region Template Detail - Manage Files
Template.LoadAllFiles = function () {
    Ajax.AuthPost("traveler/WorkflowFilesCRUD", Template, LoadAllFilesByWorkflowId_OnSuccessCallBack, LoadAllFilesByWorkflowId_OnErrorCallBack);
}
function LoadAllFilesByWorkflowId_OnSuccessCallBack(data) {
    if (data && data.items && data.items.length > 0) {
        data = data.items;
        var body = document.getElementById("TemplateFileListBody");
        body.innerHTML = "";
        let SrNo = 0;
        for (var i = 0; i < data.length; i++) {
            SrNo += 1;
            var RowHtml = ('<tr>'
                + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Template.WCColors[i] +';">' + SrNo + '</td>'
                + '                <td>' + data[i].fileName + '</td>'
                + '                <td>'
                + '                    <div>'
                + '                        <div class="badge badge-secondary font-l" style="background-color: #' + Template.WCColors[i] + ';">' + data[i].fileCode + '</div>'
                + '                    </div>'
                + '                </td>'
                + '                <td>' + data[i].fileDesc + '</td>'
                + '                <td>' + (new Date(data[i].createdOn).toLocaleDateString("en-US")) + '</td>'
                + '                <td>' + data[i].createdBy + '</td>'
                + '                <td class="text-center">'
                + '                     <div class="btn-group dots_dropdown">'
                + '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                + '                             <i class="fas fa-ellipsis-v"></i>'
                + '                         </button>'
                + '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                + '                             <button class="dropdown-item" type="button" onclick="Template.UpdateFile(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">'
                + '                                 <i class="fa fa-edit"></i> Edit'
                + '                             </button>'
                + '                             <button class="dropdown-item" type="button" onclick="Template.ViewFile(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">'
                + '                                 <i class="fa fa-eye"></i> View'
                + '                             </button>'
                + '                             <button class="dropdown-item" type="button" onclick="Template.DeleteFile(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')" >'
                + '                                 <i class="fa fa-trash"></i> Delete'
                + '                             </button>'
                + '                         </div>'
                + '                     </div>'
                + '                </td> '
                + '            </tr>'
                + '');


            body.innerHTML = body.innerHTML + RowHtml;
        }
    }
}
function LoadAllFilesByWorkflowId_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred, please try again later..", 1500);
}
Template.AddNewTemplateFile = function () {
    try {
        $('#WorkflowFilesModal').modal('show');
        //var NewTemplateDataFormHTML = (''
        //    + '<div class="form-group row" style="margin:0px;">'
        //    + ' <div class="col-md-9"  style="text-align:left;">'
        //    + '     <label for="TemplateNameInput">Name</label>'
        //    + '     <input class="form-control" id="TemplateFileNameInput" type="text">'
        //    + ' </div>'
        //    + ' <div class="col-md-3" style="text-align:left;">'
        //    + '     <label for="TemplateCodeInput">Code</label>'
        //    + '     <input class="form-control" id="TemplateFileCodeInput" type="text">'
        //    + ' </div>'
        //    + ' <div class="col-md-12" style="text-align:left;">'
        //    + '     <label for="TemplateDescArea">Description</label>'
        //    + '     <textarea class="form-control" rows="5" id="TemplateDescArea"></textarea>'
        //    + ' </div>'
        //    + ' <div class="col-md-12" style="text-align:left;">'
        //    + '     <br/>'
        //    + '     <label for="TemplateFileUploadInput">Upload</label>'
        //    + '     <input type="file" id="TemplateFileUploadInput" name="filename">'
        //    + ' </div>'
        //    + '</div > '
        //);


        //Swal.fire({
        //    title: '<strong>Create <u>Template Files</u></strong>',
        //    html: NewTemplateDataFormHTML,
        //    showCloseButton: true,
        //    showCancelButton: true,
        //    focusConfirm: false,
        //    confirmButtonText:
        //        'Upload',
        //    cancelButtonText:
        //        'Cancel'
        //}).then((result) => {
        //    /* On Create Click */
        //    if (result.isConfirmed) {
        //        var templateFile = new Object();
        //        templateFile.IsDeleted = 0;
        //        Template.ValidateAndUploadNewTemplateFile(templateFile);
        //    }
        //});
    }
    catch (ex) {
        alert(ex);
    }
}
Template.SaveFile = function (){
    var templateFile = new Object();
    templateFile.IsDeleted = 0;
    Template.ValidateAndUploadNewTemplateFile(templateFile);
}
Template.ValidateAndUploadNewTemplateFile = function (templateFile) {
    templateFile.ActionUser = User.UserId;
    if (templateFile.IsDeleted == 1) {
        Ajax.AuthPost("traveler/WorkflowFilesCRUD", templateFile, LoadAllFilesByWorkflowId_OnSuccessCallBack, LoadAllFilesByWorkflowId_OnErrorCallBack);
    }
    else {
        Util.ImageEncodeToBase64("TemplateFileUploadInput", UploadNewTemplateFileBase64, templateFile);
        Util.CloseModal('WorkflowFilesModal');
    }
}
function UploadNewTemplateFileBase64(templateFile, base64File) {
    templateFile.FileName = document.getElementById("TemplateFileNameInput").value;
    templateFile.FileCode = document.getElementById("TemplateFileCodeInput").value;
    templateFile.FileDesc = document.getElementById("TemplateDescArea").value;
    templateFile.FileBase64 = base64File;
    templateFile.WorkflowId = Template.WorkflowId;
    templateFile.IsActive = 1;
    Ajax.AuthPost("traveler/WorkflowFilesCRUD", templateFile, LoadAllFilesByWorkflowId_OnSuccessCallBack, LoadAllFilesByWorkflowId_OnErrorCallBack);
}
Template.UpdateFile = function (workflowFile) {

}
Template.ViewFile = function (workflowFile) {
    workflowFile = JSON.parse(decodeURIComponent(workflowFile));
    $("#FileViewerModal").modal("show");
    var modalFileListTab = document.getElementById("ModalFileListTab");
    var modalFileListDetail = document.getElementById("ModalFileListDetail");

    modalFileListTab.innerHTML = "";
    modalFileListDetail.innerHTML = "";

    //Div Class for non active: aria-selected="false"
    //Div Class for active:  class="active"  aria-selected="true"
    //pdf icon : class="far fa-file-pdf mr-2"
    //doc icon : class="far fa-file-word mr-2"
    modalFileListTab.innerHTML += (''
        + '<a data-toggle="tab"  class="active" href="#FileListDetailTab' + workflowFile.fileId.toString() + '" role="tab" aria-selected="true">'
        + ' <div class="row no-gutters" >'
        + '     <div class="col-auto">'
        + '         <i class="far fa-file-pdf mr-2"></i>'
        + '     </div>'
        + '     <div class="col">'
        + '         <div>' + workflowFile.fileName + '</div>'
        + '         <div class="small text-muted">PDF</div>'
        + '     </div>'
        + ' </div>'
        + '</a>'
    );

    //Div Class for non active: class="tab-pane fade"
    //Div Class for active: class="tab-pane fade show active"
    modalFileListDetail.innerHTML += (''
        + '<div class="tab-pane fade show active" id="FileListDetailTab' + workflowFile.fileId.toString() + '" role="tabpanel">'
        + '     <iframe src="' + Ajax.BaseURI + workflowFile.filePath +'" width="100%" height="600" > </iframe>'
        + '</div> '
    );
}
Template.ViewTemplateFiles = function () {
    $("#FileViewerModal").modal("show");
    var modalFileListTab = document.getElementById("ModalFileListTab");
    var modalFileListDetail = document.getElementById("ModalFileListDetail");

    modalFileListTab.innerHTML = "";
    modalFileListDetail.innerHTML = "";

    for (var i = 0; i < Template.WorkflowFiles.length; i++) {
        var workflowFile = Template.WorkflowFiles[i];
        var listItemClass = 'aria-selected="false"';
        var detailItemClass = 'class="tab-pane fade"';

        if (i == 0) {
            listItemClass = 'class="active"  aria-selected="true"';
            detailItemClass = 'class="tab-pane fade show active"';
        }

        //Binding List
        modalFileListTab.innerHTML += (''
            + '<a data-toggle="tab"  href="#FileListDetailTab' + workflowFile.fileId.toString() + '" role="tab" ' + listItemClass +'>'
            + ' <div class="row no-gutters" >'
            + '     <div class="col-auto">'
            + '         <i class="far fa-file-pdf mr-2"></i>'
            + '     </div>'
            + '     <div class="col">'
            + '         <div>' + workflowFile.fileName + '</div>'
            + '         <div class="small text-muted">PDF</div>'
            + '     </div>'
            + ' </div>'
            + '</a>'
        );

        //Binding List Detail
        modalFileListDetail.innerHTML += (''
            + '<div id="FileListDetailTab' + workflowFile.fileId.toString() + '" role="tabpanel" ' + detailItemClass +'>'
            + '     <iframe src="' + Ajax.BaseURI + workflowFile.filePath + '" width="100%" height="600" > </iframe>'
            + '</div> '
        );
    }
}
function IFrameOnload() {
    //alert("Iframe loaded");
    //$("#scaled-frame")[0].children('img')[0].style.width = "820px";
}
Template.DeleteFile = function (workflowFile) {
    workflowFile = JSON.parse(decodeURIComponent(workflowFile));
    workflowFile.IsDeleted = 1;
    var Title = 'Are you sure, you want to delete File : ' + workflowFile.fileName + ' ?';
    Util.DeleteConfirm(workflowFile, Title, Template.DeleteFileConfirm);
}
Template.DeleteFileConfirm = function (workflowFile) {
    Ajax.AuthPost("traveler/WorkflowFilesCRUD", workflowFile, LoadAllFilesByWorkflowId_OnSuccessCallBack, LoadAllFilesByWorkflowId_OnErrorCallBack);
}
//#endregion Template Detail - Manage Files
//#region Template Detail - Manage Instructions
Template.LoadAllInstructions = function () {
    Ajax.AuthPost("traveler/WorkflowInstructionsCRUD", Template, LoadAllInstructionsByWorkflowId_OnSuccessCallBack, LoadAllInstructionsByWorkflowId_OnErrorCallBack);
}
function LoadAllInstructionsByWorkflowId_OnSuccessCallBack(data) {
    var body = document.getElementById("TemplateInstructionsListBody");
    body.innerHTML = "";
    if (data && data.items && data.items.length > 0) {
        data = data.items;
        var body = document.getElementById("TemplateInstructionsListBody");
        body.innerHTML = "";
        let SrNo = 0;
        for (var i = 0; i < data.length; i++) {
            SrNo += 1;
            var RowHtml = ('<tr>'
                + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Template.WCColors[i] +';">' + SrNo + '</td>'
                + '                <td>' + data[i].instTitle + '</td>'
                + '                <td>'
                + '                    <div>'
                + '                        <div class="badge badge-secondary font-l" style="background-color: #' + Template.WCColors[i] + ';">' + data[i].instSub + '</div>'
                + '                    </div>'
                + '                </td>'
                + '                <td>' + data[i].instruction + '</td>'
                + '                <td>' + (new Date(data[i].createdOn).toLocaleDateString("en-US")) + '</td>'
                + '                <td>' + data[i].createdBy + '</td>'
                + '                <td class="text-center">'
                + '                     <div class="btn-group dots_dropdown">'
                + '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                + '                             <i class="fas fa-ellipsis-v"></i>'
                + '                         </button>'
                + '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                + '                             <button class="dropdown-item" type="button" onclick="Template.UpdateInstructions(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">'
                + '                                 <i class="fa fa-edit"></i> Edit'
                + '                             </button>'
                + '                             <button class="dropdown-item" type="button" onclick="Template.ViewInstructions(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">'
                + '                                 <i class="fa fa-eye"></i> View'
                + '                             </button>'
                + '                             <button class="dropdown-item" type="button" onclick="Template.DeleteInstructions(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')" >'
                + '                                 <i class="fa fa-trash"></i> Delete'
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
        var body = document.getElementById("TemplateInstructionsListBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan = "7">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
}
function LoadAllInstructionsByWorkflowId_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred, please try again later..", 1500);
}
Template.AddNewTemplateInstruction = function () {
    try {
        InstructionsEditor = new RichTextEditor("#TemplateInstEditor");
        $('#WorkflowInstructionsModal').modal('show');
        document.getElementById("SubmitInstructions").innerHTML = "Save";
        document.getElementById("SubmitInstructions").onclick = function () { Template.ValidateAndCreateNewTemplateInstruction(0); };
    }
    catch (ex) {
        alert(ex);
    }
}
Template.ValidateAndCreateNewTemplateInstruction = function (templateInstruction) {
    if (templateInstruction == 0){
        templateInstruction = {};
        templateInstruction.IsDeleted = 0;
    }
    if (templateInstruction.IsDeleted != 1) {
        templateInstruction.InstTitle = document.getElementById("TemplateInstTitleInput").value;
        templateInstruction.InstSub = document.getElementById("TemplateInstSubjectInput").value;
        templateInstruction.Instruction = InstructionsEditor.getHTMLCode();
        templateInstruction.WorkflowId = Template.WorkflowId;
        templateInstruction.IsActive = 1;

    }
    templateInstruction.ActionUser = User.UserId;
    Ajax.AuthPost("traveler/WorkflowInstructionsCRUD", templateInstruction, LoadAllInstructionsByWorkflowId_OnSuccessCallBack, LoadAllInstructionsByWorkflowId_OnErrorCallBack);
    $('#WorkflowInstructionsModal').modal('hide');
}
Template.UpdateInstructions = function (workflowInstruction) {
    workflowInstruction = JSON.parse(decodeURIComponent(workflowInstruction));
    InstructionsEditor = new RichTextEditor("#TemplateInstEditor");
    $('#WorkflowInstructionsModal').modal('show');
    document.getElementById("TemplateInstTitleInput").value = workflowInstruction.instTitle;
    document.getElementById("TemplateInstSubjectInput").value = workflowInstruction.instSub;
    InstructionsEditor.setHTMLCode(workflowInstruction.instruction);
    document.getElementById("SubmitInstructions").innerHTML = "Update";
    document.getElementById("SubmitInstructions").onclick = function () { Template.ValidateAndCreateNewTemplateInstruction(workflowInstruction); };

}
Template.ViewInstructions = function (workflowInstruction) {
    workflowInstruction = JSON.parse(decodeURIComponent(workflowInstruction));

    var NewTemplateDataFormHTML = (''
        + '<div id="ViewInstructionsDiv" class="wrapIframeDiv">'
        + '</div>'
    );

    Swal.fire({
        title: '<strong>View <u>Template Instructions</u></strong>',
        html: NewTemplateDataFormHTML,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        customClass: 'swal-wide',
        cancelButtonText:
            'Cancel'
    });
    document.getElementById("ViewInstructionsDiv").innerHTML = workflowInstruction.instruction;
}
Template.DeleteInstructions = function (workflowInstruction) {
    workflowInstruction = JSON.parse(decodeURIComponent(workflowInstruction));
    var Title = 'Are you sure, you want to delete <b><i>' + workflowInstruction.instTitle + '</i></b> ?';
    Util.DeleteConfirm(workflowInstruction, Title, DeleteInstructionsConfirmed);
}
function DeleteInstructionsConfirmed(workflowInstruction) {
    workflowInstruction.IsDeleted = 1;
    Template.ValidateAndCreateNewTemplateInstruction(workflowInstruction);
}



Template.CloneCreateNew = function () {

    CloneTemplate = {}
    CloneTemplate.CloneWorkflowId = Template.WorkflowId
    CloneTemplate.WorkflowId = 0
    CloneTemplate.WorkflowName = document.getElementById('CloneCreateTemplateNameInput').value;
    CloneTemplate.WorkflowCode = document.getElementById('CloneCreateTemplateCodeInput').value;
    CloneTemplate.WorkflowDesc = document.getElementById('CloneCreateTemplateDescInput').value;
    CloneTemplate.ActionUser = User.UserId;
    Ajax.AuthPost("traveler/CloneWorkflowTemplate", CloneTemplate, CloneCreateNew_OnSuccessCallBack, CreateNewTemplate_OnErrorCallBack);
}


function CloneCreateNew_OnSuccessCallBack(data) {
    $('#CloneCreateTemplateModal').modal('hide');

    localStorage.setItem('template', encodeURIComponent(JSON.stringify(data)));
    Template.LoadDetails();
    Template.LoadAll();


}
//#endregion Template Detail - Manage Instructions
//#endregion  TemplateDetail


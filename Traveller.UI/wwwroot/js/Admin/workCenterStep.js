WorkCenterStep = new Object();

WorkCenterStep.StepId = 0;
WorkCenterStep.WorkCenterId = 0;
WorkCenterStep.StepName = "";
WorkCenterStep.StepCode = "";
WorkCenterStep.StepDesc = "";
WorkCenterStep.ActionUser = User.UserId;
WorkCenterStep.DisplaySeq = 0;
WorkCenterStep.IsActive = 0;
WorkCenterStep.IsDeleted = 0;
WorkCenterStep.WorkCenterList = {};

//#region -- WorkCenter Steps
WorkCenterStep.CreateStepsOnReady = function () {
    WorkCenterStep.LoadAll();
    WorkCenter.LoadAll();

}

WorkCenterStep.LoadAll = function () {
    WorkCenterStep.ClearForm();
    WorkCenterStep.ActionUser = User.UserId;
    WorkCenter.ActionUser = User.UserId;
    Ajax.AuthPost("admin/WorkCenterStepsCRUD", WorkCenterStep, WorkCenterSteps_OnSuccessCallBack, WorkCenterSteps_OnErrorCallBack);
}

// Close the modal when the 'Cancel' button is clicked
$(document).on('click', '[data-dismiss="modal"]', function () {
    $('#WorkCenterModal').modal('hide');
});
//#region -- Create WorkCenter Step
WorkCenterStep.CreateNew = function () {
    $('#WorkCenterModal').modal('show');
    WorkCenterStep.ClearForm();
    document.getElementById("IsActive").checked = true;
    document.getElementById('modalSavebtn').innerHTML = "Create Step";
    WorkCenterStep.BindWorkCenterListDropDown();
    document.getElementById('modalSavebtn').onclick = WorkCenterStep.ValidateAndCreateNewStep;
}

WorkCenterStep.ClearForm = function(){
    WorkCenterStep.StepId = 0;
    WorkCenterStep.StepName = "";
    WorkCenterStep.StepCode = "";
    WorkCenterStep.WorkCenterId = 0;
    WorkCenterStep.StepDesc = "";
    WorkCenterStep.ActionUser = User.UserId;
    WorkCenterStep.DisplaySeq = 0;
    WorkCenterStep.IsActive = 0;
    WorkCenterStep.IsDeleted = 0;
}
WorkCenterStep.BindWorkCenterListDropDown = function () {
    var select = document.getElementById("WorkCenterSelect");
    var data = WorkCenterStep.WorkCenterList;
     //Setting default
     var opHtml = '<option value="0" id="WorkCenterSelectOption_0" customData="0">Please Select..</option>';
     select.innerHTML = select.innerHTML + opHtml;
    select.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var optionHtml = '<option value="WorkCenterSelectOption_' + data[i].workCenterId + '" id="WorkCenterSelectOption_' + data[i].workCenterId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].workCenterName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
    
}
WorkCenterStep.ValidateAndCreateNewStep = function () {
    var WorkCenterSelect = document.getElementById("WorkCenterSelect");

    WorkCenterStep.ActionUser = User.UserId;
    WorkCenterStep.StepName = document.getElementById("StepNameInput").value;
    WorkCenterStep.StepCode = document.getElementById("StepCodeInput").value;
    WorkCenterStep.StepDesc = document.getElementById("StepDescArea").value;
    WorkCenterStep.WorkCenterId = JSON.parse(decodeURIComponent(WorkCenterSelect.options[WorkCenterSelect.selectedIndex].getAttribute("customData"))).workCenterId;
    WorkCenterStep.DisplaySeq = document.getElementById("StepDisplaySeqInput").value;
    WorkCenterStep.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    WorkCenterStep.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("admin/WorkCenterStepsCRUD", WorkCenterStep, WorkCenterSteps_OnSuccessCallBack, WorkCenterSteps_OnErrorCallBack);
    $('#WorkCenterModal').modal('hide');
}
//#endregion Create WorkCenter Step

//#region  -- Show WorkCenter Step
function WorkCenterSteps_OnSuccessCallBack(data) {
    if (data && data.steps && data.steps.length > 0) {
        data = data.steps;
        var body = document.getElementById("WorkCenterStepsListBody");
        body.innerHTML = "";
        let SrNo = 0;
        for (var i = 0; i < data.length; i++) {
            SrNo += 1;
            var RowHtml = ('<tr>'
                + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + SrNo + '</td>'
                + '                <td>' + data[i].workCenterName + '</td>'
                + '                <td>' + data[i].stepName + '</td>'
                + '                <td>' 
                + '                     <div>'
                + '                         <div class="badge badge-secondary font-l" style="background-color: #' + Util.WCColors[i] + ';">' + data[i].stepCode + '</div>'
                + '                     </div>'
                + '                </td>'
                + '                <td>' + data[i].stepDesc + '</td>'
                + '                <td>' + data[i].displaySeq + '</td>'
                + '                <td>' + (new Date(data[i].createdOn ).toLocaleDateString("en-US")) + '</td>'
                + '                <td>' + data[i].createdBy + '</td>'
                + '                <td class="text-center">' 
				+ '                    <div class="btn-group dots_dropdown">' 
				+ '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">' 
				+ '                             <i class="fas fa-ellipsis-v"></i>' 
				+ '                         </button>' 
				+ '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">' 
				+ '                             <button class="dropdown-item" type="button" onclick="WorkCenterStep.Update(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                                 <i class="fa fa-edit"></i> Edit' 
				+ '                             </button>' 
				+ '                             <button class="dropdown-item" type="button" onclick="WorkCenterStep.Delete(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                                 <i class="far fa-trash-alt"></i> Delete' 
				+ '                             </button>' 
				+ '                         </div>' 
				+ '                    </div>' 
                + '                </td> '
                + '        </tr>'
                + '');


            body.innerHTML = body.innerHTML + RowHtml;
        }
    }
    else {
        var body = document.getElementById("WorkCenterStepsListBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan = "8">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }

}
function WorkCenterSteps_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

//#endregion -- Show WorkCenter Step

//#region -- Delete WorkCenterStep
WorkCenterStep.Delete = function (data) {
    data = JSON.parse(decodeURIComponent(data));
    var Title = 'Are you sure, you want to delete ' + data.stepName + ' ?';
    Util.DeleteConfirm(data, Title, DeleteWorkCenterStep);
}
function DeleteWorkCenterStep(data) {
    data.isDeleted = 1;
    data.isActive = 0;
    data.actionUser = User.UserId;
    Ajax.AuthPost("admin/WorkCenterStepsCRUD", data, WorkCenterSteps_OnSuccessCallBack, WorkCenterSteps_OnErrorCallBack);
}

//#endregion -- Delete WorkCenterStep

//#region -- Update WorkCenterStep
WorkCenterStep.SetForm = function(data) {
    document.getElementById("StepNameInput").value = data.stepName;
    document.getElementById("StepCodeInput").value = data.stepCode;
    document.getElementById("StepDisplaySeqInput").value = data.displaySeq;
    document.getElementById("StepDescArea").value = data.stepDesc;
    document.getElementById("IsActive").checked = data.isActive === 1;
    document.getElementById('stepid').value = data.stepId;
    document.getElementById('WorkCenterSelect').value = ("WorkCenterSelectOption_" + data.workCenterId);
}

WorkCenterStep.Update = function (data) {
    data = JSON.parse(decodeURIComponent(data));
    WorkCenterStep.BindWorkCenterListDropDown();
    WorkCenterStep.SetForm(data);
    document.getElementById('modalSavebtn').innerHTML = "Update Step";
    $('#WorkCenterModal').modal('show');
    document.getElementById('modalSavebtn').onclick = function() {
        WorkCenterStep.ValidateAndUpdateStep(data.stepId);
    };
}

WorkCenterStep.ValidateAndUpdateStep = function (stepId) {
    
    var workCenterSelect = document.getElementById("WorkCenterSelect");

    WorkCenterStep.ActionUser = User.UserId;
    WorkCenterStep.StepName = document.getElementById("StepNameInput").value;
    WorkCenterStep.StepCode = document.getElementById("StepCodeInput").value;
    WorkCenterStep.StepDesc = document.getElementById("StepDescArea").value;
    WorkCenterStep.DisplaySeq = document.getElementById("StepDisplaySeqInput").value;
    WorkCenterStep.WorkCenterId = JSON.parse(decodeURIComponent(workCenterSelect.options[workCenterSelect.selectedIndex].getAttribute("customData"))).workCenterId;
    WorkCenterStep.StepId = stepId;
    WorkCenterStep.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    WorkCenterStep.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("admin/WorkCenterStepsCRUD", WorkCenterStep, WorkCenterSteps_OnSuccessCallBack, WorkCenterSteps_OnErrorCallBack);
    $('#WorkCenterModal').modal('hide');
}
//#endregion -- Update WorkCenterStep
//#endregion -- WorkCenter Steps
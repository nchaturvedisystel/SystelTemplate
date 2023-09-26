WorkCenter = new Object();

WorkCenter.WorkCenterId = 0;
WorkCenter.WorkCenterName = "";
WorkCenter.WorkCenterCode = "";
WorkCenter.WorkCenterDesc = "";
WorkCenter.DisplaySeq = 0;
WorkCenter.IsActive = 0;
WorkCenter.IsDeleted = 0;
WorkCenter.ActionUser = User.UserId;

//#region -- WorkCenter
WorkCenter.CreateWorkCenterOnReady = function () {
    WorkCenter.LoadAll();
}

WorkCenter.LoadAll = function () {
    WorkCenter.ClearForm();
    WorkCenter.ActionUser = User.UserId;
    Ajax.AuthPost("admin/WorkCenterMasterCRUD", WorkCenter, WorkCenterCRUD_OnSuccessCallBack, WorkCenterCRUD_OnErrorCallBack);
}

// Close the modal when the 'Cancel' button is clicked
$(document).on('click', '[data-dismiss="modal"]', function () {
    $('#WorkCenterModal').modal('hide');
});
//#region -- Create New WorkCenter
WorkCenter.CreateNew = function () {
    $('#WorkCenterModal').modal('show');
    WorkCenter.ClearForm();
    document.getElementById("IsActive").checked = true; // Set IsActive to true by default
    document.getElementById('modalSavebtn').innerHTML = "Create WorkCenter";
    document.getElementById('modalSavebtn').onclick = WorkCenter.ValidateAndCreateWorkCenter;
}

WorkCenter.ClearForm = function () {
    WorkCenter.WorkCenterName = "";
    WorkCenter.WorkCenterCode = "";
    WorkCenter.WorkCenterDesc = "";
    WorkCenter.DisplaySeq = 0;
    WorkCenter.IsActive = 1;
    WorkCenter.IsDeleted = 0;
    WorkCenter.WorkCenterId = 0;
}


WorkCenter.ValidateAndCreateWorkCenter = function () {

    WorkCenter.ActionUser = User.UserId;
    WorkCenter.WorkCenterName = document.getElementById("WorkCenterNameInput").value;
    WorkCenter.WorkCenterCode = document.getElementById("WorkCenterCodeInput").value;
    WorkCenter.WorkCenterDesc = document.getElementById("WorkCenterDescInput").value;
    WorkCenter.DisplaySeq = document.getElementById("DisplaySeqInput").value;
    WorkCenter.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    WorkCenter.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("admin/WorkCenterMasterCRUD", WorkCenter, WorkCenterCRUD_OnSuccessCallBack, WorkCenterCRUD_OnErrorCallBack);
    $('#WorkCenterModal').modal('hide');
}
//#endregion -- Create New WorkCenter

//#region -- Show WorkCenter
function WorkCenterCRUD_OnSuccessCallBack(data) {
    if (data && data.items && data.items.length > 0) {
        data = data.items;
        if (Navigation.MenuCode == "MWAD")
        WorkCenter.BindWorkCenterList(data);
        else if (Navigation.MenuCode == "MWSAD")
        WorkCenterStep.WorkCenterList = data;
        else if(Navigation.MenuCode == "USRL")
        UserMaster.WorkCenterList = data;
    }
    WorkCenter.ClearForm();
}

WorkCenter.BindWorkCenterList = function (data) {
    if (data && data.length > 0) {
        var body = document.getElementById("WorkCenterListBody");
        body.innerHTML = "";
        let SrNo = 0;
        for (var i = 0; i < data.length; i++) 
        {
            SrNo += 1;
            var RowHtml = ('<tr>'
                + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + SrNo + '</td>'
                + '                <td>' + data[i].workCenterName + '</td>'
                + '                <td>' 
                + '                     <div>'
                + '                         <div class="badge badge-secondary font-l" style="background-color: #' + Util.WCColors[i] + ';">' + data[i].workCenterCode + '</div>'
                + '                     </div>'
                + '                </td>'
                + '                <td>' + data[i].workCenterDesc + '</td>'
                + '                <td>' + data[i].displaySeq + '</td>'
                + '                <td>' + (new Date(data[i].createdOn).toLocaleDateString("en-US")) + '</td>'
                + '                <td>' + data[i].createdBy + '</td>'
                + '                <td class="text-center">' 
				+ '                    <div class="btn-group dots_dropdown">' 
				+ '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">' 
				+ '                             <i class="fas fa-ellipsis-v"></i>' 
				+ '                         </button>' 
				+ '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">' 
				+ '                             <button class="dropdown-item" type="button" onclick="WorkCenter.Update(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                                 <i class="fa fa-edit"></i> Edit' 
				+ '                             </button>' 
				+ '                             <button class="dropdown-item" type="button" onclick="WorkCenter.Delete(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                                 <i class="far fa-trash-alt"></i> Delete' 
				+ '                             </button>' 
				+ '                         </div>' 
				+ '                    </div>' 
                + '               </td> '
                + '        </tr>'
                + '');


            body.innerHTML = body.innerHTML + RowHtml;
        }
    }
    else {
        var body = document.getElementById("WorkCenterListBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan = "7">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    } 
}
  
function WorkCenterCRUD_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

//#endregion -- show workcenter

//#region -- Delete Workcenter
WorkCenter.Delete = function (workCenter) {
    workCenter = JSON.parse(decodeURIComponent(workCenter));
    var Title = 'Are you sure, you want to delete ' + workCenter.workCenterName + ' ?';
    Util.DeleteConfirm(workCenter, Title, DeleteWorkCenter);
}
function DeleteWorkCenter(workCenter) {
    workCenter.isDeleted = 1;
    workCenter.isActive = 0;
    workCenter.actionUser = User.UserId;
    Ajax.AuthPost("admin/WorkCenterMasterCRUD", workCenter, WorkCenterCRUD_OnSuccessCallBack, WorkCenterCRUD_OnErrorCallBack);
}

//#endregion -- Delete Workcenter

//#region -- Update WorkCenter
WorkCenter.SetForm = function(data) {
    document.getElementById("WorkCenterNameInput").value = data.workCenterName;
    document.getElementById("WorkCenterCodeInput").value = data.workCenterCode;
    document.getElementById("DisplaySeqInput").value = data.displaySeq;
    document.getElementById("WorkCenterDescInput").value = data.workCenterDesc;
    document.getElementById("IsActive").checked = data.isActive === 1;
    document.getElementById('workcenterid').value = data.workCenterId;
}

WorkCenter.Update = function(workCenter) {
    workCenter = JSON.parse(decodeURIComponent(workCenter));
    WorkCenter.SetForm(workCenter);
    document.getElementById('modalSavebtn').innerHTML = "Update WorkCenter";
    $('#WorkCenterModal').modal('show');
    document.getElementById('modalSavebtn').onclick = function() {
        WorkCenter.ValidateAndUpdateWorkCenter(workCenter.workCenterId);
    };
}

WorkCenter.ValidateAndUpdateWorkCenter = function(workCenterId) {
    WorkCenter.ActionUser = User.UserId;
    WorkCenter.WorkCenterName = document.getElementById("WorkCenterNameInput").value;
    WorkCenter.WorkCenterCode = document.getElementById("WorkCenterCodeInput").value;
    WorkCenter.WorkCenterDesc = document.getElementById("WorkCenterDescInput").value;
    WorkCenter.DisplaySeq = document.getElementById("DisplaySeqInput").value;
    WorkCenter.WorkCenterId = workCenterId;
    WorkCenter.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    WorkCenter.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("admin/WorkCenterMasterCRUD", WorkCenter, WorkCenterCRUD_OnSuccessCallBack, WorkCenterCRUD_OnErrorCallBack);
    $('#WorkCenterModal').modal('hide');
}

//#endregion -- Update WorkCenter

//#endregion -- WorkCenter
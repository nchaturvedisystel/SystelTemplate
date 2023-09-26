PartMaster = new Object();

PartMaster.PartId = 0;
PartMaster.PartName = "";
PartMaster.PartCode = "";
PartMaster.PartDesc = "";
PartMaster.UserGroupId = 0;
PartMaster.ActionUser = User.UserId;
PartMaster.IsActive = 0;
PartMaster.IsDeleted = 0;
PartMaster.UserGroupList = {};

//#region -- PartMaster
PartMaster.CreatePartMasterOnReady = function () {
    PartMaster.LoadAll();
    UserGroup.LoadAll();
}

PartMaster.LoadAll = function () {
    PartMaster.ClearForm()
    PartMaster.ActionUser = User.UserId;
    UserGroup.ActionUser = User.UserId;
    Ajax.AuthPost("traveler/PartMasterCrud", PartMaster, PartMasterCRUD_OnSuccessCallBack, PartMasterCRUD_OnErrorCallBack);

}

// Close the modal when the 'Cancel' button is clicked
$(document).on('click', '[data-dismiss="modal"]', function () {
    $('#PartMasterModal').modal('hide');
});

//#region -- Create New Part
PartMaster.CreateNew = function () {
    $('#PartMasterModal').modal('show');
    PartMaster.ClearForm();
    document.getElementById("IsActive").checked = true;
    document.getElementById('modalSavebtn').innerHTML = "Create Part";
    PartMaster.BindUserGroupListDropDown();
    document.getElementById('modalSavebtn').onclick = PartMaster.ValidateAndCreateNewPart;
}

PartMaster.ClearForm = function () {
    PartMaster.PartId = 0;
    PartMaster.PartName = "";
    PartMaster.PartCode = "";
    PartMaster.PartDesc = "";
    PartMaster.UserGroupId = 0;
    PartMaster.ActionUser = User.UserId;
    PartMaster.IsActive = 0;
    PartMaster.IsDeleted = 0;

}
PartMaster.BindUserGroupListDropDown = function () {
    var select = document.getElementById("UserGroupSelect");
    var data = PartMaster.UserGroupList;
    select.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var optionHtml = '<option value="UserGroupSelectOption_' + data[i].groupId + '" id="UserGroupSelectOption_' + data[i].groupId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].groupName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }

}
PartMaster.ValidateAndCreateNewPart = function () {

    var userGroupSelect = document.getElementById("UserGroupSelect");

    PartMaster.ActionUser = User.UserId;
    PartMaster.PartName = document.getElementById("PartNameInput").value;
    PartMaster.PartCode = document.getElementById("PartCodeInput").value;
    PartMaster.PartDesc = document.getElementById("PartDescArea").value;
    PartMaster.UserGroupId = JSON.parse(decodeURIComponent(userGroupSelect.options[userGroupSelect.selectedIndex].getAttribute("customData"))).groupId;
    PartMaster.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    PartMaster.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("traveler/PartMasterCrud", PartMaster, PartMasterCRUD_OnSuccessCallBack, PartMasterCRUD_OnErrorCallBack);
    $('#PartMasterModal').modal('hide');
}
//#endregion Create New Part

//#region  -- Show Parts
function PartMasterCRUD_OnSuccessCallBack(data) {
    if (Navigation.MenuCode == "WOTLR") {
        WorkOrder.PartList = data.items;
    }
    else if (Navigation.MenuCode == "PDTLR") {
        PartItemDetail.PartItemList = data.items;
        PartItemDetail.PartItemDetaillistDropDown();
    }
    else if (Navigation.MenuCode == "ADM") {
        Admin.PartItemList = data.items;
        Admin.BindAllWorkItem ();
    }
    else if (Navigation.MenuCode == "DB") {
        Dashboard.PartItemList = data.items;
        Dashboard.BindAllWorkItem ();
    }
    else {
        if (data && data.items && data.items.length > 0) {
            data = data.items;
            var body = document.getElementById("PartListBody");
            body.innerHTML = "";
            let SrNo = 0;
            for (var i = 0; i < data.length; i++) {
                SrNo += 1;
                var RowHtml = ('<tr>'
                    + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + data[i].partName + '</td>'
                    + '                <td>' + data[i].partCode + '</td>'
                    + '                <td>' + data[i].partDesc + '</td>'
                    + '                <td>' + data[i].groupName + '</td>'
                    + '                <td>' + data[i].workOrders + '</td>'
                    + '                <td>' + (new Date(data[i].createdOn).toLocaleDateString("en-US")) + '</td>'
                    + '                <td>' + data[i].createdBy + '</td>'
                    + '                <td class="text-center">'
                    + '                     <div class="btn-group dots_dropdown">'
                    + '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                    + '                             <i class="fas fa-ellipsis-v"></i>'
                    + '                         </button>'
                    + '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                    + '                             <button class="dropdown-item" type="button" onclick="PartMaster.Update(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">'
                    + '                                 <i class="fa fa-edit"></i> Edit'
                    + '                             </button>'
                    + '                             <button class="dropdown-item" type="button" onclick="PartMaster.View(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')" >'
                    + '                                 <i class="far fa-eye"></i> View'
                    + '                             </button>'
                    + '                             <button class="dropdown-item" type="button" onclick="PartMaster.Delete(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')" >'
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
        else {
            var body = document.getElementById("PartListBody");
            body.innerHTML = ('<tr>'
                + '<td  colspan = "7">'
                + ' <font style="color:red;">No Records found..</font>'
                + '        </td>'
                + '    </tr>');
        }

    }

}
function PartMasterCRUD_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
//#endregion -- Show Parts

//#region -- Delete Part Item
PartMaster.Delete = function (partMaster) {
    partMaster = JSON.parse(decodeURIComponent(partMaster));
    var Title = 'Are you sure, you want to delete ' + partMaster.partName + ' ?';
    Util.DeleteConfirm(partMaster, Title, DeletePartMaster);
}
function DeletePartMaster(partMaster) {
    partMaster.isDeleted = 1;
    partMaster.isActive = 0;
    partMaster.actionUser = User.UserId;
    Ajax.AuthPost("traveler/PartMasterCrud", partMaster, PartMasterCRUD_OnSuccessCallBack, PartMasterCRUD_OnErrorCallBack);
}

//#endregion -- Delete Part Item

//#region -- Update Part Item
PartMaster.SetForm = function (data) {
    document.getElementById("PartNameInput").value = data.partName;
    document.getElementById("PartCodeInput").value = data.partCode;
    document.getElementById("PartDescArea").value = data.partDesc;
    document.getElementById("IsActive").checked = data.isActive === 1;
    document.getElementById('PartId').value = data.partId;
    document.getElementById('UserGroupSelect').value = ("UserGroupSelectOption_" + data.groupId);
}

PartMaster.Update = function (data) {
    data = JSON.parse(decodeURIComponent(data));
    PartMaster.BindUserGroupListDropDown();
    PartMaster.SetForm(data);
    document.getElementById('modalSavebtn').innerHTML = "Update Part";
    $('#PartMasterModal').modal('show');
    document.getElementById('modalSavebtn').onclick = function () {
        PartMaster.ValidateAndUpdatePart(data.partId);
    };
}

PartMaster.ValidateAndUpdatePart = function (partId) {
    var userGroupSelect = document.getElementById("UserGroupSelect");
    PartMaster.ActionUser = User.UserId;
    PartMaster.PartName = document.getElementById("PartNameInput").value;
    PartMaster.PartCode = document.getElementById("PartCodeInput").value;
    PartMaster.PartDesc = document.getElementById("PartDescArea").value;
    PartMaster.UserGroupId = JSON.parse(decodeURIComponent(userGroupSelect.options[userGroupSelect.selectedIndex].getAttribute("customData"))).groupId;
    PartMaster.PartId = partId;
    PartMaster.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    PartMaster.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("traveler/PartMasterCrud", PartMaster, PartMasterCRUD_OnSuccessCallBack, PartMasterCRUD_OnErrorCallBack);
    $('#PartMasterModal').modal('hide');
}
//#endregion -- Update Part Item

PartMaster.View = function (data) {
    let PartId = JSON.parse(decodeURIComponent(data)).partId;
    PartItemDetail.LoadAll(PartId);
    Navigation.LoadPageFromUrl('/html/traveler/PartItemDetail.html', 'PDTLR');
}

//#endregion -- PartMaster
UserGroup = new Object();

UserGroup.GroupId = 0;
UserGroup.GroupName = "";
UserGroup.GroupCode = "";
UserGroup.GroupDesc = "";
UserGroup.IsDeleted = 0;
UserGroup.IsActive = 0;
UserGroup.ActionUser = User.UserId;

//#region -- UserGroup
UserGroup.CreateGroupOnReady = function () {
    UserGroup.LoadAll();
}

UserGroup.LoadAll = function () {
    UserGroup.ClearForm()
    UserGroup.ActionUser = User.UserId;
    Ajax.AuthPost("admin/UserGroupCRUD", UserGroup, UserGroupCRUD_OnSuccessCallBack, UserGroupCRUD_OnErrorCallBack);
}

// Close the modal when the 'Cancel' button is clicked
$(document).on('click', '[data-dismiss="modal"]', function () {
    $('#UserGroupModal').modal('hide');
});
//#region -- Create UserGroup
UserGroup.CreateNew = function () {
    $('#UserGroupModal').modal('show');
    UserGroup.ClearForm();
    document.getElementById("IsActive").checked = true;
    document.getElementById('modalSavebtn').innerHTML = "Create UserGroup";
    document.getElementById('modalSavebtn').onclick = UserGroup.ValidateAndCreateNewGroup;
}

UserGroup.ClearForm = function(){
    UserGroup.GroupId = 0;
    UserGroup.GroupName = "";
    UserGroup.GroupCode = "";
    UserGroup.GroupDesc = "";
    UserGroup.IsActive = 0;
    UserGroup.IsDeleted = 0;
}

UserGroup.ValidateAndCreateNewGroup = function () {

    UserGroup.ActionUser = User.UserId;
    UserGroup.GroupName = document.getElementById("GroupNameInput").value;
    UserGroup.GroupCode = document.getElementById("GroupCodeInput").value;
    UserGroup.GroupDesc = document.getElementById("GroupDescArea").value;
    UserGroup.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    UserGroup.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("admin/UserGroupCRUD", UserGroup, UserGroupCRUD_OnSuccessCallBack, UserGroupCRUD_OnErrorCallBack);
    $('#UserGroupModal').modal('hide');
}
//#endregion -- Create UserGroup

//#region -- Show UserGroup
function UserGroupCRUD_OnSuccessCallBack(data) {
    if (data && data.groups && data.groups.length > 0) {
        data = data.groups;
        if (Navigation.MenuCode == "UGAD")
            UserGroup.BindUserGroupList(data);
        else if (Navigation.MenuCode == "CPTLR")
            PartMaster.UserGroupList = data;        
    }
    UserGroup.ClearForm();
}

UserGroup.BindUserGroupList = function (data) {
    if (data && data.length > 0) {
        var body = document.getElementById("GroupListBody");
        body.innerHTML = "";
        let SrNo = 0;
        for (var i = 0; i < data.length; i++) {
            SrNo += 1;
            var RowHtml = ('<tr>'
                + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + SrNo + '</td>'
                + '                <td>' + data[i].groupName + '</td>'
                + '                <td>' 
                + '                     <div>'
                + '                         <div class="badge badge-secondary font-l" style="background-color: #' + Util.WCColors[i] + ';">' + data[i].groupCode + '</div>'
                + '                     </div>'
                + '                </td>'
                + '                <td>' + data[i].groupDesc + '</td>'
                + '                <td>' + (new Date(data[i].createdOn).toLocaleDateString("en-US")) + '</td>'
                + '                <td>' + data[i].createdBy + '</td>'
                + '                <td class="text-center">' 
				+ '                    <div class="btn-group dots_dropdown">' 
				+ '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">' 
				+ '                             <i class="fas fa-ellipsis-v"></i>' 
				+ '                         </button>' 
				+ '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">' 
				+ '                             <button class="dropdown-item" type="button" onclick="UserGroup.Update(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                                 <i class="fa fa-edit"></i> Edit' 
				+ '                             </button>' 
				+ '                             <button class="dropdown-item" type="button" onclick="UserGroup.Delete(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                                 <i class="far fa-trash-alt"></i> Delete' 
				+ '                             </button>' 
				+ '                         </div>' 
				+ '                    </div>' 
                + '                </td> '
                + '            </tr>'
                + '');


            body.innerHTML = body.innerHTML + RowHtml;
        }
    }
    else {
        var body = document.getElementById("GroupListBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan = "7">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
}

function UserGroupCRUD_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

//#endregion -- Show UserGroup

//#region -- Delete UserGroup
UserGroup.Delete = function (userGroup) {
    userGroup = JSON.parse(decodeURIComponent(userGroup));
    var Title = 'Are you sure, you want to delete ' + userGroup.groupName + ' ?';
    Util.DeleteConfirm(userGroup, Title, DeleteUserGroup);
}
function DeleteUserGroup(userGroup) {
    userGroup.isDeleted = 1;
    userGroup.isActive = 0;
    userGroup.actionUser = User.UserId;
    Ajax.AuthPost("admin/UserGroupCRUD", userGroup, UserGroupCRUD_OnSuccessCallBack, UserGroupCRUD_OnErrorCallBack);
}

//#endregion -- Delete UserGroup

//#region -- Update UserGroup
UserGroup.SetForm = function(data) {
    document.getElementById("GroupNameInput").value = data.groupName;
    document.getElementById("GroupCodeInput").value = data.groupCode;
    document.getElementById("GroupDescArea").value = data.groupDesc;
    document.getElementById("IsActive").checked = data.isActive === 1;
    document.getElementById("groupId").value = data.groupId;
}
UserGroup.Update = function (userGroup) {
    userGroup = JSON.parse(decodeURIComponent(userGroup));
    UserGroup.SetForm(userGroup);
    document.getElementById('modalSavebtn').innerHTML = "Update UserGroup";
    $('#UserGroupModal').modal('show');
    document.getElementById('modalSavebtn').onclick = function() {
        UserGroup.ValidateAndUpdateGroup(userGroup.groupId);
    };
}

UserGroup.ValidateAndUpdateGroup = function (groupId) {

    UserGroup.ActionUser = User.UserId;
    UserGroup.GroupName = document.getElementById("GroupNameInput").value;
    UserGroup.GroupCode = document.getElementById("GroupCodeInput").value;
    UserGroup.GroupDesc = document.getElementById("GroupDescArea").value;
    UserGroup.GroupId = groupId;
    UserGroup.IsActive = document.getElementById("IsActive").checked ? 1 : 0;
    UserGroup.IsDeleted = document.getElementById("IsActive").checked ? 0 : 1;
    Ajax.AuthPost("admin/UserGroupCRUD", UserGroup, UserGroupCRUD_OnSuccessCallBack, UserGroupCRUD_OnErrorCallBack);
    $('#UserGroupModal').modal('hide');
}
//#endregion -- Update UserGroup

//#endregion -- UserGroup
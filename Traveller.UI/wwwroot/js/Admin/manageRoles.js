
Roles = new Object();

Roles.RoleId = 0;
Roles.RoleName = "";
Roles.RoleCode = "";
Roles.RoleDesc = "";
Roles.ActionUser = User.UserId;
Roles.IsDeleted = 0;
//#region -- UserRole
Roles.CreateRoleOnReady = function () {
    Roles.LoadAll();
}

Roles.LoadAll = function () {
    Roles.ActionUser = User.UserId;
    Ajax.AuthPost("admin/RolesCRUD", Roles, RolesCRUD_OnSuccessCallBack, RolesCRUD_OnErrorCallBack);
}
//#region -- Create User Role

Roles.CreateNew = function () {
    $('#manageRoleModal').modal('show');
    Roles.ClearUserRolesCRUDForm();
    document.getElementById('modalSaveButton').innerHTML = "Create Role";
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('modalSaveButton').onclick= Roles.ValidateAndCreateNewRole;
}

Roles.ClearUserRolesCRUDForm = function(){
    document.getElementById('roleName').value = "";
    document.getElementById('roleCode').value = "";
    document.getElementById('roleDesc').value = "";
    document.getElementById('isActive').checked = true;
    Roles.RoleId = 0;
    Roles.RoleName = "";
    Roles.RoleCode = "";
    Roles.RoleDesc = "";
    Roles.IsActive = 1;
    Roles.IsDeleted = 0;
};

Roles.ValidateAndCreateNewRole = function () {

    Roles.ActionUser = User.UserId;
    Roles.RoleName = document.getElementById("roleName").value;
    Roles.RoleCode = document.getElementById("roleCode").value;
    Roles.RoleDesc = document.getElementById("roleDesc").value;
    Roles.IsActive = 1;

    if (Roles.RoleName.trim() === '' || Roles.RoleCode.trim() === '') {
        // Display error message
        document.getElementById('error-message').innerText = 'Role Name and Role Code are mandatory fields.';
        document.getElementById('error-message').style.display = 'block';
    } 
    else {
        // Hide error message if fields are not blank
        document.getElementById('error-message').style.display = 'none';

        // Perform AJAX request
        Ajax.AuthPost("admin/RolesCRUD", Roles, RolesCRUD_OnSuccessCallBack, RolesCRUD_OnErrorCallBack);
        
    }    
    
}

//#endregion -- Create User Role

//#region -- Show User Role
function RolesCRUD_OnSuccessCallBack(data) {
    $('#manageRoleModal').modal('hide');
    if (data && data.roles && data.roles.length > 0) {
        data = data.roles;
        if (Navigation.MenuCode == "RAD")
            Roles.BindRolesList(data);
        else if (Navigation.MenuCode == "SAD") {
            SubRole.LastFetchedData = data;
            SubRole.RolelistDropDown();
        }
        else if (Navigation.MenuCode == "USRL") {
            UserMaster.RoleList = data
        }
        
    }
}

function RolesCRUD_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

Roles.BindRolesList = function (data) {
    if (data && data.length > 0) {
        var body = document.getElementById("RolesListBody");
        body.innerHTML = "";
        let SrNo = 0;
        for (var i = 0; i < data.length; i++) {
            SrNo += 1;
            var RowHtml = ('<tr>'
                + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + SrNo + '</td>'
                + '                <td>' + data[i].roleName + '</td>'
                + '                <td>' +'<div class="badge badge-secondary font-l" style="background-color: #' + Util.WCColors[i] + ';">' + data[i].roleCode + '</div>' +'</td>'
                + '                <td>' + data[i].roleDesc + '</td>'
                + '                <td>' + data[i].createdBy + '</td>'
                + '                <td class="text-center">' 
				+ '                    <div class="btn-group dots_dropdown">' 
				+ '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">' 
				+ '                             <i class="fas fa-ellipsis-v"></i>' 
				+ '                         </button>' 
				+ '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">' 
				+ '                             <button class="dropdown-item" type="button" onclick="Roles.Update(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                                 <i class="fa fa-edit"></i> Edit' 
				+ '                             </button>' 
				+ '                             <button class="dropdown-item" type="button" onclick="Roles.Delete(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                                 <i class="far fa-trash-alt"></i> Delete' 
				+ '                             </button>' 
				+ '                         </div>' 
				+ '                    </div>' 
                + '               </td> '
                + '            </tr>'
                + '');


            body.innerHTML = body.innerHTML + RowHtml;
        }
    }
    else {
        var body = document.getElementById("RolesListBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan = "7">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
    Roles.ClearUserRolesCRUDForm();
}
//#endregion -- Show User Role

//#region -- Delete User Role
Roles.Delete = function (role) {
    role = JSON.parse(decodeURIComponent(role));
    var Title = 'Are you sure, you want to delete ' + role.roleName + ' ?';
    Util.DeleteConfirm(role, Title, DeleteRoles);
}
function DeleteRoles(role) {
    role.IsDeleted = 1;
    role.IsActive = 0;
    role.actionUser = User.UserId;
    Ajax.AuthPost("admin/RolesCRUD", role, RolesCRUD_OnSuccessCallBack, RolesCRUD_OnErrorCallBack);
}

//#endregion -- Delete User Role

//#region -- Update User Role
Roles.SetUserRolesCRUDForm = function(role){
    document.getElementById('roleId').value = role.roleId;
    document.getElementById('roleName').value = role.roleName;
    document.getElementById('roleCode').value = role.roleCode;
    document.getElementById('roleDesc').value = role.roleDesc;
    document.getElementById('isActive').checked = role.isActive === 1;
    
};
Roles.Update = function (role) {

    role = JSON.parse(decodeURIComponent(role));
    $('#manageRoleModal').modal('show');
    Roles.SetUserRolesCRUDForm(role);
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('modalSaveButton').onclick= Roles.ValidateAndUpdateRole;
    document.getElementById('modalSaveButton').innerHTML = "Update Role";
}

Roles.ValidateAndUpdateRole = function (role) {
    role.ActionUser = User.UserId;
    role.RoleName = document.getElementById('roleName').value;
    role.RoleCode = document.getElementById('roleCode').value;
    role.RoleDesc = document.getElementById('roleDesc').value;
    role.RoleId = document.getElementById('roleId').value;
    role.IsActive = document.getElementById('isActive').checked?1:0;
    Ajax.AuthPost("admin/RolesCRUD", role, RolesCRUD_OnSuccessCallBack, RolesCRUD_OnErrorCallBack);
}
//#endregion -- Update User Role

//#endregion -- UserRole






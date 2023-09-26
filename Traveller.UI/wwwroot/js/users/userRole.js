UserRole = new Object;

UserRole.UserRoleId = 0;
UserRole.UserId = 0;
UserRole.RoleId = 0; 
UserRole.IsActive = 1;
UserRole.IsDeleted =0;
UserRole.ActionUser = '';
UserRole.userRoleList = {};

UserRole.AssignRole = function(data){
    userData = JSON.parse(decodeURIComponent(data))
    $('#userListModal').modal('show');
    document.getElementById('errorMsg').style.display="none";

    document.getElementById('userListModalLabel').innerHTML = "Assign Role";
    document.getElementById('modalSaveButton').style.display = "none";
    document.getElementById('userWorkcenterMap').style.display = "block";
    document.getElementById('userCreationForm').style.display = "none";
    document.getElementById('FetchWorkcenterDetailbtn').innerText = "Add Role";
    document.getElementById('errorMsg').innerText = "No Roles to select";


    
    document.getElementById('FetchWorkcenterDetailbtn').onclick = function() {
        UserRole.AddRole(userData);
    };
    UserRole.UserId = userData.userId;
    UserRole.ActionUser = User.UserId;
    document.getElementById('WorkCenterMasterDiv').innerHTML = " ";
    

    Ajax.AuthPost("users/UserRoleCRUD", UserRole, UserRoleCRUD_OnSuccessCallBack, UserRoleCRUD_OnErrorCallBack);
}

UserRole.BindRoleDropdown = function(userData){
    UserRole.userRoleList = UserMaster.RoleList;

    var select = document.getElementById('WorkcenterList')
    select.innerHTML = '';
    var opHtml = '<option value="0">Please Select..</option>';
    select.innerHTML = select.innerHTML + opHtml
    for (var i = 0; i < UserRole.userRoleList.length; i++) {
        var data = UserRole.userRoleList[i];
        var optionHtml = '<option value="'+ data.roleId + '" id="WorkflowTemplateSelectOption_' + data.roleId + '" customData="' + encodeURIComponent(JSON.stringify(data)) +'">' + data.roleName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml; 
    }
}

UserRole.AddRole = function(data){
    let userID = data.userId;
    let roleID = +document.getElementById('WorkcenterList').value
    UserRole.UserId = userID
    UserRole.RoleId = roleID
    if(roleID != 0){
        Ajax.AuthPost("users/UserRoleCRUD", UserRole, UserRoleCRUD_OnSuccessCallBack, UserRoleCRUD_OnErrorCallBack);
    }
    else{
        document.getElementById('errorMsg').style.display="block"
    }
}



function UserRoleCRUD_OnSuccessCallBack (data){
    UserRole.BindRoleDropdown(data)

    var workCenterDiv =  document.getElementById('WorkCenterMasterDiv');
    workCenterDiv.innerHTML = "";

    roleData = data.userRole;
    
    for (var j = 0; j < UserRole.userRoleList.length; j++) {
        var data = UserRole.userRoleList[j];
        document.getElementById("WorkflowTemplateSelectOption_" + data.roleId).style.display = "block";
    }   

    for (var i = 0; i < roleData.length; i++) {
        for (var j = 0; j < UserRole.userRoleList.length; j++) {
            var data = UserRole.userRoleList[j];
            if (roleData[i].roleId == data.roleId)
                document.getElementById("WorkflowTemplateSelectOption_" + data.roleId).style.display = "none";
        }        
        var itemHtml = '<div class="card d-inline-block mb-3 p-2 shadow-sm w-auto mr-2" itemID="' + roleData[i].roleId + '">' + roleData[i].roleName + ' <i class="fa fa-trash grayscale ml-1" style="font-size:18px;color: red; cursor:pointer;" onclick="UserRole.Delete(\'' + encodeURIComponent(JSON.stringify(roleData[i])) + '\')" ></i></div>';
        workCenterDiv.innerHTML += itemHtml;
    }
    UserRole.ClearFormData();
}

function UserRoleCRUD_OnErrorCallBack (error){
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
    UserRole.ClearFormData();
}


UserRole.Delete = function(data){
    let roleData = JSON.parse(decodeURIComponent(data))
    roleData.isActive = 0
    roleData.isDeleted = 1
    roleData.actionUser = User.UserId
    Ajax.AuthPost("users/UserRoleCRUD", roleData, UserRoleCRUD_OnSuccessCallBack, UserRoleCRUD_OnErrorCallBack);
}


UserRole.ClearFormData = function(){
    UserRole.UserRoleId = 0;
    UserRole.UserId = 0;
    UserRole.RoleId = 0;
    UserRole.IsActive = 1;
    UserRole.IsDeleted = 0;
}
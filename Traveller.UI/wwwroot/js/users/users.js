UserMaster = new Object();
UserMaster.WorkCenterList = { };
UserMaster.RoleList = { };

UserMaster.UserId = 0;
UserMaster.FirstName = "";
UserMaster.MiddleName = "";
UserMaster.LastName = "";
UserMaster.MobileNo = "";
UserMaster.EmailId = "";
UserMaster.Designation = "";
UserMaster.IsActive = 0;
UserMaster.IsDeleted = 0;
UserMaster.DOB = new Date();
UserMaster.CompanyList = [];
UserMaster.AllUserList = new Object();

UserMaster.ViewAllUsersTblDT = {};


/*Base Page Start*/
UserMaster.BasePageOnReady = function () {
    var layoutContainerFluid = document.getElementById("LayoutContainerFluid");
    layoutContainerFluid.style.background = "linear-gradient(315deg, #F89C00 0%, #F24800 100%)";
    layoutContainerFluid.style.height = "100%";
}
/*Base Page End*/


UserMaster.CreateUserMasterOnReady = function () {
    UserMaster.LoadAll();
    WorkCenter.LoadAll();
    Roles.LoadAll();
    Company.LoadAll();
}

UserMaster.LoadAll = function () {
    UserMaster.ClearObject()
    UserMaster.ActionUser = User.UserId;
    Ajax.AuthPost("users/UserMasterCrud", UserMaster, UserMasterCRUD_OnSuccessCallBack, UserMasterCRUD_OnErrorCallBack);

}

UserMaster.CreateNew = function(){
    $('#userListModal').modal('show');
    document.getElementById('userListModalLabel').innerHTML = "Create User";
    document.getElementById('modalSaveButton').innerHTML = "Create User";
    document.getElementById('modalSaveButton').style.display = "block";
    document.getElementById('userCreationForm').style.display = "block";
    document.getElementById('userWorkcenterMap').style.display = "none";


    document.getElementById('modalSaveButton').onclick= UserMaster.ValidateAndCreateNewUser;



    UserMaster.ClearUserMasterCRUDForm();
    document.getElementById('profilePic').onchange = previewFile;
    bindCompanyDropdownList();


}

function bindCompanyDropdownList() {
    var companyDropdown = document.getElementById('UserCompany')
    companyDropdown.innerHTML = ""
    options = ''
    let companylist = UserMaster.CompanyList
    for (var i = 0; i < companylist.length; i++) {
        options = '<option value=' + companylist[i].companyId + '>' + companylist[i].cName + '</option>'
        companyDropdown.innerHTML = companyDropdown.innerHTML + options
    }
}


function previewFile() {
    const fileInput = document.getElementById('profilePic');
    const imgPreview = document.getElementById('previewImg');
    
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function (e) {
        imgPreview.src = e.target.result;
      }
      
      reader.readAsDataURL(fileInput.files[0]);
    }
    else{
        imgPreview.src = "img/Users/defaultUser.jpg";
    }
}

UserMaster.ValidateForm = function() {
    // Perform form validation here
    // Check if required fields are filled
    var UserEmail = document.getElementById('UserEmail').value;
    if (UserEmail.trim() === '') {
        return false;
    }

    var UserFirstname = document.getElementById('UserFirstname').value;
    if (UserFirstname.trim() === '') {
        return false;
    }

    // Add similar validation checks for other fields

    return true; // If all validation checks pass
}

UserMaster.ValidateAndCreateNewUser = function (templateFile) {
    UserMaster.ActionUser = User.UserId;
    if (UserMaster.IsDeleted == 1) {
        Ajax.AuthPost("traveler/WorkflowFilesCRUD", templateFile, LoadAllFilesByWorkflowId_OnSuccessCallBack, LoadAllFilesByWorkflowId_OnErrorCallBack);
    }
    else {
        UserMaster.UserId = 0;
        UserMaster.FirstName = document.getElementById('UserFirstname').value;
        UserMaster.MiddleName = document.getElementById('UserMiddlename').value;
        UserMaster.LastName = document.getElementById('UserLastname').value;
        UserMaster.MobileNo = document.getElementById('UserMobile').value;
        UserMaster.EmailId = document.getElementById('UserEmail').value;
        UserMaster.Designation = document.getElementById('UserDesignation').value;
        UserMaster.CompanyId = document.getElementById('UserCompany').value;
        UserMaster.IsActive = document.getElementById('isUserActive').checked ? 1 : 0;
        UserMaster.DOB = document.getElementById('UserDOB').value;
        UserMaster.ActionUser = User.UserId;
        Util.ImageEncodeToBase64("profilePic", ValidatedCreateNewUser, UserMaster);
    }
}

function ValidatedCreateNewUser (UserMaster,base64Image) {    
    UserMaster.ProfileImageBase64 = base64Image;
    Ajax.AuthPost("users/UserMasterCrud", UserMaster, CreateNewUser_OnSuccesscallback, UserMasterCRUD_OnErrorCallBack);
}

function CreateNewUser_OnSuccesscallback(data){
    var userCred = {};
    userCred.UserId = data.users[0].activeUserId;
    userCred.UserName = document.getElementById('UserLoginName').value;
    userCred.UserPassword = document.getElementById('UserLoginPassword').value;
    userCred.ActionUser = User.UserId;
    Ajax.AuthPost("users/GenerateUserCredentials", userCred, UserMasterCRUD_OnSuccessCallBack, UserMasterCRUD_OnErrorCallBack);
}

function UserMasterCRUD_OnSuccessCallBack(data) {
    if (Navigation.MenuCode == "WDB") {
        DashboardWorkList.userList = data.users;
    }
    else if (Navigation.MenuCode == "URAD") {
        WorkItem.userList = data.users;
    }
    else {
        $('#userListModal').modal('hide');
        if (data.users && data.users.length > 0) {

            if ($.fn.dataTable.isDataTable('#ViewAllUsersTbl')) {
                UserMaster.ViewAllUsersTblDT = $('#ViewAllUsersTbl').DataTable();
                UserMaster.ViewAllUsersTblDT.destroy();
            }


            let userData = data.users;
            var body = document.getElementById('TemplateListBody');
            body.innerHTML = "";
            for (var i = 0; i < userData.length; i++) {
                var RowHtml = ('<tr>'
                    + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + (i + 1).toString() + '</td>'
                    + '                <td>' + userData[i].firstName + ' ' + userData[i].middleName + ' ' + userData[i].lastName + '</td>'
                    + '                <td>' + userData[i].companyName + '</td>'
                    + '                <td>' + userData[i].designation + '</td>'
                    + '                <td>' + userData[i].mobileNo + '</td>'
                    + '                <td>' + userData[i].emailId + '</td>'
                    + '                <td>' + userData[i].username + '</td>'
                    + '                <td>' + userData[i].createdBy + '</td>'
                    + '                <td class="col-3">' + userData[i].roleName + '</td>'
                    + '                <td>'
                    + '                     <input type="checkbox" id="employeeIsActive"' + (userData[i].isActive ? ' checked' : '') + ' onchange="UserMaster.EmployeeStatusUpdate(this,\'' + encodeURIComponent(JSON.stringify(userData[i])) + '\')" >'
                    + '                </td>'
                    + '                <td class="text-center">'
                    + '                    <div class="btn-group dots_dropdown">'
                    + '                        <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                    + '                            <i class="fas fa-ellipsis-v"></i>'
                    + '                        </button>'
                    + '                        <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                    + '                            <button class="dropdown-item" type="button" onclick="UserMaster.Update(\'' + encodeURIComponent(JSON.stringify(userData[i])) + '\')">'
                    + '                                <i class="fa fa-edit"></i> Edit'
                    + '                            </button>'
                    + '                            <button class="dropdown-item" type="button" onclick="UserMaster.Delete(\'' + encodeURIComponent(JSON.stringify(userData[i])) + '\')">'
                    + '                                <i class="far fa-trash-alt"></i> Delete'
                    + '                            </button>'
                    + '                            <button class="dropdown-item" type="button" onclick="UserWorkCenter.AssignWorkcenter(\'' + encodeURIComponent(JSON.stringify(userData[i])) + '\')" >'
                    + '                                <i class="fa fa-sign-in-alt"></i> Assign Workcenter'
                    + '                            </button>'
                    + '                            <button class="dropdown-item" type="button" onclick="UserRole.AssignRole(\'' + encodeURIComponent(JSON.stringify(userData[i])) + '\')" >'
                    + '                                <i class="fa fa-plus"></i> Assign Role'
                    + '                            </button>'
                    + '                        </div>'
                    + '                    </div>'
                    + '                </td> '
                    + '            </tr>'
                    + '');

                body.innerHTML = body.innerHTML + RowHtml;
            }
            UserMaster.ViewAllUsersTblDT = $('#ViewAllUsersTbl').DataTable();
            //new DataTable('#ViewAllUsersTbl');
        } else {
            var body = document.getElementById("TemplateListBody");
            body.innerHTML = ('<tr>'
                + '<td  colspan = "7">'
                + ' <font style="color:red;">No Records found..</font>'
                + '        </td>'
                + '    </tr>');
        }
    }
}
function UserMasterCRUD_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}


UserMaster.Delete = function(userMaster){
    userMaster = JSON.parse(decodeURIComponent(userMaster));
    var Title = 'Are you sure, you want to delete ' + userMaster.firstName + ' ?';
    Util.DeleteConfirm(userMaster, Title, DeleteUserMaster);
}

function DeleteUserMaster(userMaster) {
    userMaster.isDeleted = 1;
    userMaster.isActive = 0;
    userMaster.actionUser = User.UserId;
    Ajax.AuthPost("users/UserMasterCrud", userMaster, UserMasterCRUD_OnSuccessCallBack, UserMasterCRUD_OnErrorCallBack);
}

UserMaster.Update = function (userMaster) {
    userMaster = JSON.parse(decodeURIComponent(userMaster));
    $('#userListModal').modal('show');
    document.getElementById('userListModalLabel').innerHTML = "Update User";
    document.getElementById('modalSaveButton').innerHTML = "Update User";

    document.getElementById('modalSaveButton').style.display = "block";
    document.getElementById('userCreationForm').style.display = "block";
    document.getElementById('userWorkcenterMap').style.display = "none";

    bindCompanyDropdownList();
    UserMaster.SetUserMasterCRUDForm(userMaster);
    document.getElementById('modalSaveButton').onclick= UserMaster.ValidateAndUpdateUser;
    document.getElementById('profileImagePath').value = userMaster.profileImage;
    document.getElementById('profilePic').onchange = previewFile;
    
    
}

UserMaster.ValidateAndUpdateUser = function (userMaster) {

    userMaster.userId = document.getElementById('UserID').value
    userMaster.firstName = document.getElementById('UserFirstname').value;
    userMaster.middleName = document.getElementById('UserMiddlename').value;
    userMaster.lastName = document.getElementById('UserLastname').value;
    userMaster.mobileNo = document.getElementById('UserMobile').value;
    userMaster.emailId = document.getElementById('UserEmail').value;
    userMaster.designation = document.getElementById('UserDesignation').value;
    userMaster.companyId = document.getElementById('UserCompany').value;
    userMaster.isActive = document.getElementById('isUserActive').checked ? 1 : 0;
    userMaster.isDeleted = document.getElementById('isUserActive').checked ? 0 : 1;
    userMaster.dob = document.getElementById('UserDOB').value;
    userMaster.profileImage = document.getElementById('profileImagePath').value;
    userMaster.actionUser = User.UserId;

    Util.ImageEncodeToBase64("profilePic", ValidatedUpdateUser, userMaster);

}

function ValidatedUpdateUser(userMaster, base64Image) {
    if(base64Image != ""){
        userMaster.ProfileImageBase64 = base64Image;
    }
    
    Ajax.AuthPost("users/UserMasterCrud", userMaster, UpdateUser_OnSuccesscallback, UserMasterCRUD_OnErrorCallBack);
}

function UpdateUser_OnSuccesscallback(data){
    var currentUserIDString = document.getElementById('UserID').value;
    var currentUserID = parseInt(currentUserIDString);
    var newData = data.users.filter(res => res.userId === currentUserID);

    if(newData.length > 0 && newData[0].username === document.getElementById('UserLoginName').value && document.getElementById('UserLoginPassword').value ===''){
        UserMasterCRUD_OnSuccessCallBack(data);
    }
    else{
        var userCred = {};
        userCred.UserId = currentUserID;
        userCred.UserName = document.getElementById('UserLoginName').value;
        userCred.UserPassword = document.getElementById('UserLoginPassword').value;
        userCred.ActionUser = User.UserId;
    
        Ajax.AuthPost("users/GenerateUserCredentials", userCred, UserMasterCRUD_OnSuccessCallBack, UserMasterCRUD_OnErrorCallBack);
    }
}


UserMaster.previewName = function(){
    var name = document.getElementById('UserFirstname').value + ' ' + document.getElementById('UserMiddlename').value + ' ' + document.getElementById('UserLastname').value
    document.getElementById('userDisplayName').innerText = name;
}

UserMaster.EmployeeStatusUpdate = function(sender,data){
    data = JSON.parse(decodeURIComponent(data));
    let userData = {}
    userData.userId = data.userId
    userData.isActive =  sender.checked? 1 : 0
    userData.actionUser = User.UserId;

    Ajax.AuthPost("users/UserStatusUpdate", userData, UpdateUserStatus_OnSuccesscallback, UpdateUserStatus_OnErrorCallBack);
}

UserMaster.SetUserMasterCRUDForm = function(userMaster){
    document.getElementById('UserID').value = userMaster.userId;
    document.getElementById('previewImg').src = userMaster.profileImageBase64 ? `data:image/png;base64,${userMaster.profileImageBase64}` :'img/Users/defaultUser.jpg' ;
    document.getElementById('UserFirstname').value = userMaster.firstName;
    document.getElementById('UserMiddlename').value = userMaster.middleName;
    document.getElementById('UserLastname').value = userMaster.lastName;
    document.getElementById('UserEmail').value = userMaster.emailId;
    document.getElementById('UserMobile').value = userMaster.mobileNo;
    document.getElementById('UserDOB').value = userMaster.dob.split("T")[0];
    document.getElementById('UserDesignation').value = userMaster.designation;
    document.getElementById('UserCompany').value = userMaster.companyId;
    document.getElementById('isUserActive').checked = userMaster.isActive === 1;
    document.getElementById('profileImagePath').value = userMaster.profileImage;

    document.getElementById('userDisplayName').value = userMaster.firstName +' ' + userMaster.middleName +' ' + userMaster.lastName;
    document.getElementById('UserLoginName').value = userMaster.username ? userMaster.username : '' ;
    document.getElementById('UserLoginPassword').value = "";
    document.getElementById('profilePic').value = "";
};

UserMaster.ClearUserMasterCRUDForm = function(){
    document.getElementById('previewImg').src = "img/Users/defaultUser.jpg";
    document.getElementById('UserFirstname').value = "";
    document.getElementById('UserMiddlename').value = "";
    document.getElementById('UserLastname').value = "";
    document.getElementById('UserEmail').value = "";
    document.getElementById('UserMobile').value = "";
    document.getElementById('UserDOB').value = "";
    document.getElementById('UserDesignation').value = "";
    document.getElementById('UserCompany').value = "";
    document.getElementById('isUserActive').checked = true;
    document.getElementById('profilePic').value = "";

    document.getElementById('userDisplayName').value = "";
    document.getElementById('UserLoginName').value = "";
    document.getElementById('UserLoginPassword').value = "";
};

UserMaster.CloseModal = function(){
    UserMaster.ClearObject();
    UserMaster.LoadAll();
}

UserMaster.ClearObject = function(){
    UserMaster.UserId = 0;
    UserMaster.FirstName = "";
    UserMaster.MiddleName = "";
    UserMaster.LastName = "";
    UserMaster.MobileNo = "";
    UserMaster.EmailId = "";
    UserMaster.Designation = "";
    UserMaster.IsActive = 0;
    UserMaster.IsDeleted = 0;
    UserMaster.DOB = new Date();
}

function UpdateUserStatus_OnSuccesscallback(response){
    if(response.isActive === 1){

        Toast.create("Success","User Active",TOAST_STATUS.SUCCESS,1500);
    }else{
        Toast.create("Success","User Inactive",TOAST_STATUS.WARNING,1500);
    }
} 

function UpdateUserStatus_OnErrorCallBack(data){
    Toast.create("Danger","Some Error occured",TOAST_STATUS.DANGER,1500);
}

UserMaster.GetAllUserList = function () {
    Ajax.AuthGet("users/GetAllUserList", GetAllUserList_OnSuccessCallBack, GetAllUserList_OnErrorCallBack);
}
function GetAllUserList_OnSuccessCallBack(data) {
    if (data && data.dropDownList) {
        UserMaster.AllUserList = data.dropDownList;
    }
}
function GetAllUserList_OnErrorCallBack(error) {
    Toast.create("Danger", "Some Error occured", TOAST_STATUS.DANGER, 1500);
}

UserMaster.GetUserNameById = function (id) {
    if (UserMaster.AllUserList) {
        for (var i = 0; i < UserMaster.AllUserList.length; i++) {
            if (UserMaster.AllUserList[i].key == id) {
                id = UserMaster.AllUserList[i].value;
            }
        }
    }
    return id;
}



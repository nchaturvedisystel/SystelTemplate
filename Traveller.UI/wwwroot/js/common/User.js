User = new Object()

User.UserName = "John Doe";
User.UserId = -1;
User.token = "";
User.ProfileImagePath = "";
User.Designation = "";
User.EmailId = "";
User.MobileNo = "";
User.RoleId = "";
User.CompanyId = "";
User.DefaultCompanyId = "";


User.Signout = function () {
    localStorage.clear();
    localStorage.setItem('token', "");
    window.location = window.location.origin + "/login";
}

User.ValidateToken = function (token) {
    User.token = token;
    Ajax.AuthGet("users/ValidateToken",ValidateToken_OnSuccessCallBack, ValidateToken_OnErrorCallBack);
}
function ValidateToken_OnSuccessCallBack(data) {
    User.SetValues(data);
    $("#MenuUserNameLabel")[0].innerHTML = User.UserName;
    $("#HeaderUserNameLabel")[0].innerHTML = User.UserName;
    $("#HeaderUserImg")[0].src = User.ProfileImagePath;
    $("#MenuUserImg")[0].src = User.ProfileImagePath;
    $("#MenuUserTypeLabel")[0].textContent = User.Designation;

    //Call Load Menu for User
    Menu.GetMenuForUser(data.userId);
}
function ValidateToken_OnErrorCallBack(error) {
    localStorage.setItem('token', "");
    window.location = window.location.origin + "/login";
}
User.SetValues = function (data) {
    User.UserId = data.userId;
    User.UserName = data.userName;
    User.ProfileImagePath = data.profileImage;
    User.Designation = data.designation;
    User.EmailId = data.emailId;
    User.MobileNo = data.mobileNo;
    User.RoleId = data.roleId;
    User.CompanyId = data.companyId;
    User.DefaultCompanyId = data.defaultCompanyId;
}
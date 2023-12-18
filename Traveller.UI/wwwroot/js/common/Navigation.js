Navigation = new Object();
Navigation.MenuCode = "";
Navigation.PageLandingTime = new Date();

Navigation.LoadPage = function (htmlUrl, MenuCode, e) {
    //e.preventDefault();
    if (htmlUrl.split("?")[0].trim() == "") {
        htmlUrl = "/html/common/pageNotFound.html";
    }
    Navigation.LoadPageFromUrl(htmlUrl, MenuCode);
}

Navigation.LoadPageFromUrl = function (htmlUrl, MenuCode) {
    try {
        fetch(htmlUrl)
            .then(response => response.text())
            .then(text => document.getElementById('MainContainer').innerHTML = text)
            .then(Navigation.OnLoadSettings(MenuCode));
    }
    catch (error) {
        fetch("/html/Common/pageNotFound.html")
            .then(response => response.text())
            .then(text => document.getElementById('MainContainer').innerHTML = text)
            .then(Navigation.OnLoadSettings(MenuCode));
    }
}
Navigation.OnLoadSettings = function (MenuCode) {
   // Ensuring minimum height of the body
    var WindowHeight = window.outerHeight;
    var ContentHeight = document.getElementById('MainContainer').clientHeight;

    if ((ContentHeight + 270) < WindowHeight)
        document.getElementById('MainContainer').style.height = (WindowHeight - 270) + "px";

    Navigation.CallPageLoad(MenuCode);
}

Navigation.CallPageLoad = function (MenuCode) {

    var layoutContainerFluid = document.getElementById("LayoutContainerFluid");
    layoutContainerFluid.style.background = "";
    Navigation.TrackTime(Navigation.MenuCode, MenuCode, Navigation.PageLandingTime);
    Navigation.MenuCode = MenuCode;

    //Base Pages PageLoad function
    if (MenuCode == "TLR") {
        Template.BasepageOnReady();
    }
    //Pages Pageload function
    else if (MenuCode == "CTTLR") {
        Template.CreateTemplateOnReady();
    }
    else if (MenuCode == "TDTLR") {
        Template.TemplateDetailOnReady();
    }
    else if (MenuCode == "CPTLR") {
        PartMaster.CreatePartMasterOnReady();
    }
    else if (MenuCode == "PDTLR") {
        PartItemDetail.CreatePartMasterOnReady();
    }
    else if (MenuCode == "UGAD") {
        UserGroup.CreateGroupOnReady();
    }
    else if (MenuCode == "USR") {
        UserDashboard.CreateUserDashboardOnReady();
    }
    else if (MenuCode == "USRL") {
        UserMaster.CreateUserMasterOnReady();
    }
    else if (MenuCode == "MAD") {
        MenuMaster.CreateMenuMasterOnReady();
    }
    else if (MenuCode == "MWAD") {
        WorkCenter.CreateWorkCenterOnReady();
    }
    else if (MenuCode == "MWSAD") {
        WorkCenterStep.CreateStepsOnReady();
    }
    else if (MenuCode == "RAD") {
        Roles.CreateRoleOnReady();
    }
    else if (MenuCode == "SAD") {
        SubRole.CreateSubRolesOnReady();
    }
    else if (MenuCode == "WDB") {
        DashboardWorkList.CreateDashboardWorkListOnReady();
    }
    else if (MenuCode == "WOTLR") {
        WorkOrder.CreateWorkOrderOnReady();
    }
    else if (MenuCode == "WDTLR") {
        WorkOrderDetail.CreateWorkOrderOnReady();
    }
    else if (MenuCode == "SHAL") {
        GlobalSearch.ShowAllOnReady();
    }
    else if (MenuCode == "URAD") {
        WorkItem.GetTravelerDetail();
    }
    else if (MenuCode == "ADM") {
        Admin.BasepageOnReady();
    }
    else if (MenuCode == "DB") {
        Dashboard.BasepageOnReady();
    }
    else if (MenuCode == 'CSD') {
        Ticket.BasepageOnReady();
    }
    else if (MenuCode == 'TDSD') {
        TicketDetails.onReady();
    }
    else if (MenuCode == 'MCAD') {
        Company.BasepageOnReady();
    }
    else if (MenuCode == 'TDDB') {
        TicketDetails.onReady();
    }
    else if (MenuCode == 'SDAD') {
        SupportDashBoard.AdminOnReady();
    }
    else if (MenuCode == 'SDCD') {
        SupportDashBoard.ClientOnReady();
    }
    else if (MenuCode == 'SDUD') {
        SupportDashBoard.UserOnReady();
    }

}

Navigation.TrackTime = function (PreviousMenuCode, RequestedMenuCode, PageLandingTime) {
    var TimeSpent = 0, startTime = new Date();

    if (PreviousMenuCode == RequestedMenuCode) {
        //Do Nothing
    }
    else if (PreviousMenuCode) {
        startTime = Navigation.PageLandingTime;
        TimeSpent = Math.abs((new Date()) - Navigation.PageLandingTime);
        Navigation.PageLandingTime = new Date();
    }
    else {
        Navigation.PageLandingTime = new Date();
    }

    if (TimeSpent > 4999) {
        let timeTrack = {}
        timeTrack.PageCode = PreviousMenuCode
        timeTrack.ActionUser = User.UserId
        timeTrack.StartTime = startTime
        timeTrack.EndTime = new Date()
        timeTrack.Duration = TimeSpent
       
        Ajax.AuthPost("common/UserTimeTrack", timeTrack,  TrackTime_OnSuccessCallBack, TrackTime_OnErrorCallBack);
    }
}

function TrackTime_OnSuccessCallBack(data) {

}
function TrackTime_OnErrorCallBack(err) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}
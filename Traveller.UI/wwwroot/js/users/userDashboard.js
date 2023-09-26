UserDashboard = new Object();
UserDashboard.ActionUser = User.UserId;

UserDashboard.CreateUserDashboardOnReady = function(){
    var layoutContainerFluid = document.getElementById("LayoutContainerFluid");
    layoutContainerFluid.style.background = "linear-gradient(315deg, #F89C00 0%, #F24800 100%)";
    layoutContainerFluid.style.height = "100%";
    UserDashboard.LoadAll();
}

UserDashboard.LoadAll = function () {
    UserDashboard.ActionUser = User.UserId;
    Ajax.AuthPost("users/UserDashboardGet", UserDashboard, UserDashboard_OnSuccessCallBack, UserDashboard_OnErrorCallBack);
}

function UserDashboard_OnSuccessCallBack(data){
dashData = data.userDashboardDetails
var mfgGroupDetailBody = document.getElementById('mfgGroupDetail')
var TotalUsers = document.getElementById('TotalUsers')
var Users = document.getElementById('Users')
var Rolewise = document.getElementById('Rolewise')
var ActiveUsers = document.getElementById('ActiveUsers')
var Workcenter = document.getElementById('Workcenter')


mfgGroupDetailBody.innerHTML = ""
TotalUsers.innerHTML = ""
Users.innerHTML = ""
Rolewise.innerHTML = ""
ActiveUsers.innerHTML = ""
Workcenter.innerHtml = ""

for(var i = 0; i< dashData.length; i++){
    if(dashData[i].labelType === 'UserGroup'){
        var RowHtml = ('<tr>'
                + '         <td>' + dashData[i].labelName + '</td>'
                + '         <td>' + dashData[i].labelValue + '</td>'
                + '    </tr>'
                + '');

        mfgGroupDetailBody.innerHTML = mfgGroupDetailBody.innerHTML + RowHtml

    }

    if(dashData[i].labelType === 'UserCount'){
        TotalUsers.innerText = dashData[i].labelValue

        var RowHtml = ('<tr>'
                + '         <td>' + dashData[i].labelName + '</td>'
                + '         <td>' + dashData[i].labelValue + '</td>'
                + '    </tr>'
                + '');
        Users.innerHTML += RowHtml; 
    }

    if(dashData[i].labelType === 'Users'){
        var RowHtml = ('<tr>'
                + '         <td>' + dashData[i].labelName + '</td>'
                + '         <td>' + dashData[i].labelValue + '</td>'
                + '    </tr>'
                + '');
        Users.innerHTML += RowHtml;
        
    }

    if(dashData[i].labelType === 'UserRole'){
        var RowHtml = ('<tr>'
                + '         <td>' + dashData[i].labelName + '</td>'
                + '         <td>' + dashData[i].labelValue + '</td>'
                + '    </tr>'
                + '');
        Rolewise.innerHTML = Rolewise.innerHTML+ RowHtml; 
    }
    if(dashData[i].labelType === 'ActiveUser'){
        var RowHtml = ('<tr>'
                + '         <td>' + dashData[i].labelName + '</td>'
                + '         <td>' + dashData[i].labelValue + '</td>'
                + '    </tr>'
                + '');
        ActiveUsers.innerHTML += RowHtml;
    }
    if(dashData[i].labelType === 'UserWorkcenter'){
        var RowHtml = ('<tr>'
                + '         <td>' + dashData[i].labelName + '</td>'
                + '         <td>' + dashData[i].labelValue + '</td>'
                + '    </tr>'
                + '');
        Workcenter.innerHTML += RowHtml;
    }
}

}

function UserDashboard_OnErrorCallBack(err){
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}


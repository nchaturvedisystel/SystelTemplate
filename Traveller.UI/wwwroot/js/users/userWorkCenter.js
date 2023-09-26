UserWorkCenter = new Object;

UserWorkCenter.UserWorkCenterId = 0;
UserWorkCenter.UserId = 0;
UserWorkCenter.WorkCenterId = 0; 
UserWorkCenter.IsActive = 1;
UserWorkCenter.IsDeleted =0;
UserWorkCenter.ActionUser = '';
UserWorkCenter.userWorkCenterList = {};

UserWorkCenter.AssignWorkcenter = function(data){
    userData = JSON.parse(decodeURIComponent(data))
    $('#userListModal').modal('show');
    document.getElementById('errorMsg').style.display="none";

    document.getElementById('userListModalLabel').innerHTML = "Assign WorkCenter";
    document.getElementById('modalSaveButton').style.display = "none";
    document.getElementById('userWorkcenterMap').style.display = "block";
    document.getElementById('userCreationForm').style.display = "none";
    document.getElementById('FetchWorkcenterDetailbtn').innerText = "Add Workcenter"
    document.getElementById('errorMsg').innerText = "No work-centers to select"


    
    document.getElementById('FetchWorkcenterDetailbtn').onclick = function() {
        UserWorkCenter.AddWorkCenter(userData);
    };
    UserWorkCenter.UserId = userData.userId;
    UserWorkCenter.ActionUser = User.UserId;
    document.getElementById('WorkCenterMasterDiv').innerHTML = " ";
    

    Ajax.AuthPost("users/UserWorkCenterCRUD", UserWorkCenter, UserWorkCenterCRUD_OnSuccessCallBack, UserWorkCenterCRUD_OnErrorCallBack);
}

UserWorkCenter.BindWorkcenterDropdown = function(userData){
    UserWorkCenter.userWorkCenterList = UserMaster.WorkCenterList;

    var select = document.getElementById('WorkcenterList')
    select.innerHTML = '';
    var opHtml = '<option value="0">Please Select..</option>';
    select.innerHTML = select.innerHTML + opHtml
    for (var i = 0; i < UserWorkCenter.userWorkCenterList.length; i++) {
        var data = UserWorkCenter.userWorkCenterList[i];
        var optionHtml = '<option value="'+ data.workCenterId + '" id="WorkflowTemplateSelectOption_' + data.workCenterId + '" customData="' + encodeURIComponent(JSON.stringify(data)) +'">' + data.workCenterName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml; 
    }
}


UserWorkCenter.AddWorkCenter = function(data){
    let userID = data.userId;
    let workCenterID = +document.getElementById('WorkcenterList').value
    UserWorkCenter.UserId = userID
    UserWorkCenter.WorkCenterId = workCenterID
    if(workCenterID != 0){
        Ajax.AuthPost("users/UserWorkCenterCRUD", UserWorkCenter, UserWorkCenterCRUD_OnSuccessCallBack, UserWorkCenterCRUD_OnErrorCallBack);
    }
    else{
        document.getElementById('errorMsg').style.display="block"
    }
}


function UserWorkCenterCRUD_OnSuccessCallBack(data){
    UserWorkCenter.BindWorkcenterDropdown(data)

    var workCenterDiv =  document.getElementById('WorkCenterMasterDiv');
    workCenterDiv.innerHTML = "";

    workCenterData = data.userWorkCenter;
    
    for (var j = 0; j < UserWorkCenter.userWorkCenterList.length; j++) {
        var data = UserWorkCenter.userWorkCenterList[j];
        document.getElementById("WorkflowTemplateSelectOption_" + data.workCenterId).style.display = "block";
    }   

    for (var i = 0; i < workCenterData.length; i++) {
        for (var j = 0; j < UserWorkCenter.userWorkCenterList.length; j++) {
            var data = UserWorkCenter.userWorkCenterList[j];
            if (workCenterData[i].workCenterId == data.workCenterId)
                document.getElementById("WorkflowTemplateSelectOption_" + data.workCenterId).style.display = "none";
        }        
        var itemHtml = '<div class="card d-inline-block mb-3 p-2 shadow-sm w-auto mr-2" itemID="' + workCenterData[i].workCenterId + '">' + workCenterData[i].workCenterName + ' <i class="fa fa-trash grayscale ml-1" style="font-size:18px;color: red; cursor:pointer;" onclick="UserWorkCenter.Delete(\'' + encodeURIComponent(JSON.stringify(workCenterData[i])) + '\')" ></i></div>';
        workCenterDiv.innerHTML += itemHtml;
    }
    UserWorkCenter.ClearFormData();
}

function UserWorkCenterCRUD_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
    UserWorkCenter.ClearFormData();
}


UserWorkCenter.Delete = function(data){
   let workCenterData = JSON.parse(decodeURIComponent(data))
   workCenterData.isActive = 0
   workCenterData.isDeleted = 1
   workCenterData.actionUser = User.UserId
   console.log(workCenterData);
   Ajax.AuthPost("users/UserWorkCenterCRUD", workCenterData, UserWorkCenterCRUD_OnSuccessCallBack, UserWorkCenterCRUD_OnErrorCallBack);
}

UserWorkCenter.ClearFormData = function(){
    UserWorkCenter.UserWorkCenterId = 0;
    UserWorkCenter.UserId = 0;
    UserWorkCenter.WorkCenterId = 0;
    UserWorkCenter.IsActive = 1;
    UserWorkCenter.IsDeleted = 0;
}
SubRole = new Object();

SubRole.SubRoleId = 0;
SubRole.RoleId = 1;
SubRole.MenuId = 0;
SubRole.MenuName = "";
SubRole.MenuCode = "";
SubRole.MenuDesc = "";
SubRole.IsActive = 0;
SubRole.IsDeleted = 0;
SubRole.ActionUser = User.UserId;
SubRole.LastFetchedData = {};

//#region -- SubRole
SubRole.CreateSubRolesOnReady = function () {
    SubRole.LoadAll();
    Roles.LoadAll();
}
SubRole.LoadAll = function () {
    SubRole.ActionUser = User.UserId;
    Ajax.AuthPost("admin/SubRolesMapping", SubRole, SubRoles_OnSuccessCallBack, SubRoles_OnErrorCallBack);
}

SubRole.FetchDetails = function () {
    var select = document.getElementById('RoleList');
    var label = document.getElementById('RoleLabel');
    var customData = JSON.parse(decodeURIComponent(select.options[select.selectedIndex].getAttribute("customData")));
    
    SubRole.RoleId = customData.roleId;
    label.innerText = customData.roleName;
    SubRole.LoadAll();
};
//#region -- Show SubRoles

function SubRoles_OnSuccessCallBack(data) {
    if (data.subRoles && data.subRoles.length > 0) {
        menuData = data.subRoles; 
        SubRole.BindParentData(menuData);
        SubRole.BindChildData(menuData);
    } else {
        var body = document.getElementById("SubRolesBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan="11">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
}

function SubRoles_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

SubRole.RolelistDropDown = function (){
    var select =  document.getElementById('RoleList');
    var data = SubRole.LastFetchedData;
    select.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var optionHtml = '<option value="RolesSelectOption_' + data[i].roleId + '" id="RolesSelectOption_' + data[i].roleId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].roleName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
}

SubRole.BindParentData = function (data) {

    var body = document.getElementById('SubRolesBody');
    body.innerHTML = "";
    var SrNo = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentMenuId == 0) {
            var checkBoxHtml = '<input type="checkbox"' + (data[i].hasAccess ? ' checked' : '')+ ' class="ParentCheckBox" onchange="SubRole.HandleCheckboxChange(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\',this)" id="checkBox_' + data[i].menuId + '">';
            SrNo += 1;
            var RowHtml = ('<tr>'
                + '    <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[SrNo] + ';"> '
                + '         <i class="fa fa-angle-down expand_row_arrow" aria-hidden="true" id="ExpandTemplateWC' + data[i].menuId.toString() + '" onclick="SubRole.ExpandMenuMasterDataRowOnClick(' + data[i].menuId.toString() + ', this)" ></i>'
                + '    </td>'
                + '    <td>' + SrNo + '</td>'
                + '    <td>' + data[i].menuName + '</td>'
                + '    <td>'
                + '         <div>'
                + '             <div class="badge badge-secondary font-l" style="background-color: #' + Util.WCColors[SrNo] + ';">' + data[i].menuCode + '</div>'
                + '         </div>'
                + '    </td>'
                + '    <td>' + data[i].menuDesc + '</td>'
                + '    <td class="text-center">' + data[i].displayOrder + '</td>'
                + '    <td class="text-center">' + checkBoxHtml + '</td>'
                + '</tr>'
                + '<tr id="ParentChildTable' + data[i].menuId.toString() + '" class="ParentChildTable">'
                + '    <td colspan="8" >'
                + '        <div class="showDiv" style="padding-top:0px;">'
                + '            <table class="table table-bordered com_table" style="width: 100%;">'
                + '                <thead style="display:none;">'
                + '                    <tr>'
                + '                         <th><div style="width: 100px;">Menu Name</div></th>'
                + '                         <th>Menu Code</th>'
                + '                         <th><div style="width: 100px;">Menu Desc</div></th>'
                + '                         <th style="width:150px;">Display Order</th>'
                + '                         <th style="width:150px;">Action</th>'
                + '                    </tr>'
                + '                </thead>'
                + '                <tbody class="MenuMasterChildBody" id="MenuMasterChildBody' + data[i].menuId.toString() + '" ribbonColor="#' + Util.WCColors[SrNo] + '">'
                + '                </tbody>'
                + '             </table>'
                + '        </div>'
                + '    </td>'
                + '</tr>'
                + '');
            body.innerHTML = body.innerHTML + RowHtml;
        }
    }
}


SubRole.BindChildData = function (data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentMenuId != 0) {
            var body = document.getElementById("MenuMasterChildBody" + data[i].parentMenuId.toString().trim());
            var ribbonColor
            if(body !== null){
                ribbonColor = body.getAttribute("ribbonColor");
            }
            // Create a checkbox based on the value of data[i].hasAccess
            var checkBoxHtml = '<input type="checkbox"' + (data[i].hasAccess ? ' checked' : '') + '  class="ChildCheckBox_'+data[i].parentMenuId.toString().trim()+'" onchange="SubRole.HandleCheckboxChange(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\',this)" name="ChildCheckbox" id="checkBox_' + data[i].menuId + '">';
            var RowHtml = (''
                + '                    <tr>'
                + '                       <td style="border-left:5px solid '+ribbonColor+'; padding-left:40px; width:300px;">' + data[i].menuName + '</td>'
                + '                       <td style="padding-left:40px; width:150px;">'
                + '                            <div class="badge badge-secondary font-l" style=" background-color: '+ribbonColor  + ';">' + data[i].menuCode + '</div>'
                + '                       </td>'
                + '                       <td style="padding-left:50px; width:1400px;">' + data[i].menuDesc + '</td>'
                + '                       <td class="text-center" style="width:150px;">' + data[i].displayOrder + '</td>'
                + '                       <td class="text-center" style="padding-left:20px; width:150px;">' + checkBoxHtml + '</td>'
                + '                    </tr>')
                if(body !== null){
                    body.innerHTML = body.innerHTML + RowHtml;
                }

        }
    }
}

SubRole.ExpandMenuMasterDataAllRowOnClick = function (sender) {
    if (sender.classList.contains("active_arrow")) {
        //Hide All Child Tables
        for (var i = 0; i < $(".fa-angle-down").length; i++) {
            if ($(".fa-angle-down")[i].classList.contains("active_arrow"))
                $(".fa-angle-down")[i].classList.remove("active_arrow");
        }
        for (var i = 0; i < $(".ParentChildTable").length; i++) {
            if ($("#" + $(".ParentChildTable")[i].id + " .showDiv").is(":visible"))
                $("#" + $(".ParentChildTable")[i].id + " .showDiv").slideToggle(1000);
        }
    }
    else {
        //Show All Child Tables
        for (var i = 0; i < $(".fa-angle-down").length; i++) {
            if (!$(".fa-angle-down")[i].classList.contains("active_arrow"))
                $(".fa-angle-down")[i].classList.add("active_arrow");
        }
        for (var i = 0; i < $(".ParentChildTable").length; i++) {
            if (!$("#" + $(".ParentChildTable")[i].id + " .showDiv").is(":visible"))
                $("#" + $(".ParentChildTable")[i].id + " .showDiv").slideToggle(1000);
        }

    }
}

SubRole.ExpandMenuMasterDataRowOnClick = function (menuId, sender) {
    if (sender.classList.contains("active_arrow")) {
        sender.classList.remove("active_arrow");
        $("#ParentChildTable" + menuId + " .showDiv").slideToggle(1000);
    }
    else {
        sender.classList.add("active_arrow");
        $("#ParentChildTable" + menuId + " .showDiv").slideToggle(1000);
    }
}
//#endregion -- Show SubRoles

//#region  -- Update SubRoles

SubRole.HandleCheckboxChange = function (data,sender) {
    data = JSON.parse(decodeURIComponent(data));    
    if (sender.checked) {
        SubRole.RoleId = data.roleId;
        SubRole.MenuId = data.menuId;
        SubRole.SubRoleId = data.subRoleId;
        SubRole.IsActive = 1;
        SubRole.IsDeleted = 0;
        SubRole.ActionUser = User.UserId;
        Ajax.AuthPost("admin/SubRolesMapping", SubRole, SubRoles_OnSuccessCallBack, SubRoles_OnErrorCallBack);        
    } else {
        SubRole.RoleId = data.roleId;
        SubRole.MenuId = data.menuId;
        SubRole.SubRoleId = data.subRoleId;
        SubRole.IsActive = 0;
        SubRole.IsDeleted = 1;
        SubRole.ActionUser = User.UserId;
        Ajax.AuthPost("admin/SubRolesMapping", SubRole, SubRoles_OnSuccessCallBack, SubRoles_OnErrorCallBack);
    }
    if(sender.classList.contains("ParentCheckBox")){
        var ChildClassName = ".ChildCheckBox_"+data.menuId.toString().trim();
        for (var i = 0; i < $(ChildClassName).length; i++) {
            if (sender.checked){
                if(!$(ChildClassName)[i].checked){
                    $(ChildClassName)[i].click();
                }
            }
            else
            {
                if($(ChildClassName)[i].checked){
                    $(ChildClassName)[i].click();
                }
            }
        }
    }
}
//#endregion -- Update SubRoles
//#endregion -- SubRole




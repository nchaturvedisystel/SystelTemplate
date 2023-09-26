var MenuMaster = new Object();

MenuMaster.MenuId = 0;
MenuMaster.MenuName = "";
MenuMaster.MenuCode = "";
MenuMaster.MenuDesc = "";
MenuMaster.DisplayOrder = 0;
MenuMaster.ParentMenuId = 0;
MenuMaster.DefaultChildMenuId = 0;
MenuMaster.TemplatePath = "";
MenuMaster.IsActive = 0;
MenuMaster.IsDeleted = 0;
MenuMaster.ActionUser = User.UserId;
MenuMaster.ParentMenu = {};


//From here the functions which displays the data on screenn for admin manange menu starts
MenuMaster.CreateMenuMasterOnReady = function () {
    MenuMaster.LoadAll();
}

MenuMaster.LoadAll = function () {
    MenuMaster.ClearCRUDForm();
    MenuMaster.ActionUser = User.UserId;
    Ajax.AuthPost("admin/MenuMasterCRUD", MenuMaster, MenuMasterCRUD_OnSuccessCallBack, MenuMasterCRUD_OnErrorCallBack);
}

function MenuMasterCRUD_OnSuccessCallBack(data) {
    MenuMaster.ClearCRUDForm();
    $('#newMenuModal').modal('hide');
    if (data.menus && data.menus.length > 0) {
        menuData = data.menus; // Assign data.menus to the menuData array
        stringData = encodeURIComponent(JSON.stringify(menuData));
        
        MenuMaster.BindParentData(data.menus);
        document.getElementById('menuStringObject').value = stringData;
        

    } else {
        var body = document.getElementById("TemplateListBody");
        body.innerHTML = ('<tr>'
            + '<td  colspan="11">'
            + ' <font style="color:red;">No Records found..</font>'
            + '        </td>'
            + '    </tr>');
    }
}

MenuMaster.BindParentData = function (data) {

    var body = document.getElementById('TemplateListBody');
    body.innerHTML = "";
    var SrNo = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i].parentMenuId == 0) {
            SrNo += 1;
            var RowHtml = ('<tr>'
                + '    <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';"> '
                + '         <i class="fa fa-angle-down expand_row_arrow" aria-hidden="true" id="ExpandTemplateWC' + data[i].menuId.toString() + '" onclick="MenuMaster.ExpandMenuMasterDataRowOnClick(' + data[i].menuId.toString() + ', this)" ></i>'
                 + '   </td>'
                + '    <td>' + SrNo + '</td>'
                + '    <td>' + data[i].menuName + '</td>'
                + '    <td>'
                + '         <div>'
                + '              <div class="badge badge-secondary font-l" style="background-color: #' + Util.WCColors[i] + ';">' + data[i].menuCode + '</div>'
                + '         </div>'
                + '    </td>'
                + '    <td>' + data[i].menuDesc + '</td>'
                + '    <td>' + data[i].createdBy + '</td>'
                + '    <td class="text-center">' 
				+ '         <div class="btn-group dots_dropdown">' 
				+ '             <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">' 
				+ '                  <i class="fas fa-ellipsis-v"></i>' 
				+ '             </button>' 
				+ '             <div class="dropdown-menu dropdown-menu-right shadow-lg">' 
				+ '                  <button class="dropdown-item" type="button" onclick="MenuMaster.Update(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                        <i class="fa fa-edit"></i> Edit' 
				+ '                  </button>' 
				+ '                  <button class="dropdown-item" type="button" onclick="MenuMaster.Delete(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                        <i class="far fa-trash-alt"></i> Delete' 
				+ '                  </button>' 
                + '                  <button class="dropdown-item" type="button" onclick="MenuMaster.AddNew (\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')" >' 
				+ '                        <i class="fa fa-plus"></i> Add New' 
				+ '                  </button>' 
                + '             </div>' 
				+ '         </div>' 
                + '    </td> '
                + '</tr>'
                + '<tr id="MenuMasterChild' + data[i].menuId.toString() + '" class="ParentChildTable">'
                + '    <td colspan="8" >'
                + '        <div class="showDiv" style="padding-top:0px;">'
                + '            <table class="table table-bordered com_table" style="width: 100%;">'
                + '                <thead style="display:none;">'
                + '                    <tr>'
                + '                       <th><div style="width: 100px;">Menu Name</div></th>'
                + '                       <th>Menu Code</th>'
                + '                       <th><div style="width: 100px;">Menu Desc</div></th>'
                + '                       <th style="width:150px;">Created by</th>'
                + '                       <th style="width:150px;">Action</th>'
                + '                   </tr>'
                + '                </thead>'
                + '                <tbody class="MenuMasterChildBody" id="MenuMasterChildBody' + data[i].menuId.toString() + '" ribbonColor="#' + Util.WCColors[i] + '">'
                + '                </tbody>'
                + '             </table>'
                + '        </div>'
                + '    </td>'
                + '</tr>'
                + '                </td>'
                + '');
            body.innerHTML = body.innerHTML + RowHtml;
        }
    }
    MenuMaster.BindChildData(data);
}

MenuMaster.BindChildData = function (data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentMenuId != 0) {
            var body = document.getElementById("MenuMasterChildBody" + data[i].parentMenuId.toString().trim());
            var ribbonColor;
            if(body !== null){
                ribbonColor = body.getAttribute("ribbonColor");
            }
            var RowHtml = (''
                + '<tr>'
                + '     <td  style=" border-left:5px solid ' + ribbonColor +'; padding-left:40px; width:300px;">' + data[i].menuName + '</td>'
                + '     <td style="padding-left:40px; width:150px;">'
                + '             <div class="badge badge-secondary font-l" style="background-color: ' + ribbonColor + ';">' + data[i].menuCode + '</div>'
                + '     </td>'
                + '     <td style="padding-left:50px; width:1400px;">' + data[i].menuDesc + '</td>'
                + '     <td class="text-center" style=" width:150px;">' + data[i].createdBy + '</td>'
                + '     <td class="text-center" style=" width:150px;">' 
				+ '         <div class="btn-group dots_dropdown">' 
				+ '             <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">' 
				+ '                  <i class="fas fa-ellipsis-v"></i>' 
				+ '             </button>' 
				+ '             <div class="dropdown-menu dropdown-menu-right shadow-lg">' 
				+ '                  <button class="dropdown-item" type="button" onclick="MenuMaster.Update(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                        <i class="fa fa-edit"></i> Edit' 
				+ '                  </button>' 
				+ '                  <button class="dropdown-item" type="button" onclick="MenuMaster.Delete(\'' + encodeURIComponent(JSON.stringify(data[i])) + '\')">' 
				+ '                        <i class="far fa-trash-alt"></i> Delete' 
				+ '                  </button>' 
                + '             </div>' 
				+ '         </div>' 
                + '     </td> '
                + '</tr>')
                if(body !== null){
                    body.innerHTML = body.innerHTML + RowHtml;
                }
        }
    }
}

MenuMaster.ExpandMenuMasterDataAllRowOnClick = function (sender) {
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

MenuMaster.ExpandMenuMasterDataRowOnClick = function (menuId, sender) {
    if (sender.classList.contains("active_arrow")) {
        sender.classList.remove("active_arrow");
        $("#MenuMasterChild" + menuId + " .showDiv").slideToggle(1000);
    }
    else {
        sender.classList.add("active_arrow");
        $("#MenuMasterChild" + menuId + " .showDiv").slideToggle(1000);
    }
}


// Function to get the menu name by its id
function getMenuNameById(parentMenuId) {
    for (var i = 0; i < menuData.length; i++) {
        if (menuData[i].menuId === parentMenuId) {
            return menuData[i].menuName; // Return the menuName if found
        }
    }
    return ''; // Return an empty string if the menuName is not found
}
function MenuMasterCRUD_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

//Display data functions for admin manage menu page ends

//Add functions for menu starts
MenuMaster.CreateNew = function () {
    $('#newMenuModal').modal('show');
    MenuMaster.ClearCRUDForm();
    document.getElementById("isActive").checked = 'true';
    MenuMaster.BindParentMenuDD();
    MenuMaster.BindDefaultChildMenuDD();
    document.getElementById('createMenuButton').innerHTML = 'Create Menu';
    document.getElementById('createMenuButton').onclick = MenuMaster.ValidateAndCreateNewMenu;
    document.getElementById('parentMenuId').onchange = MenuMaster.selectValueChange;
    MenuMaster.selectValueChange();
};

MenuMaster.selectValueChange = function () {
    data = JSON.parse(decodeURIComponent(document.getElementById('menuStringObject').value));
    menuID = document.getElementById('parentMenuId').value;
    displayOrder = data.filter(res => res.parentMenuId === +menuID);
    document.getElementById('displayOrder').value = displayOrder.length + 1;
}


//Clear the modal after the cancel button
MenuMaster.ClearCRUDForm = function () {
    MenuMaster.MenuName = "";
    MenuMaster.MenuCode = "";
    MenuMaster.MenuDesc = "";
    MenuMaster.DisplayOrder;
    MenuMaster.ParentMenuId = 0;
    MenuMaster.DefaultChildMenuId = 0;
    MenuMaster.TemplatePath = "";
    MenuMaster.IsActive = 0;
    MenuMaster.IsDeleted = 0;
}

//This function set the values in update modal
MenuMaster.SetCRUDForm = function (data) {
    document.getElementById("menuName").value = data.menuName;
    document.getElementById("menuCode").value = data.menuCode;
    document.getElementById("menuDesc").value = data.menuDesc;
    document.getElementById("displayOrder").value = data.displayOrder;
    document.getElementById("parentMenuId").value = data.parentMenuId;
    document.getElementById("defaultChildMenuId").value = data.defaultChildMenuId;
    document.getElementById("templatePath").value = data.templatePath;
    document.getElementById("isActive").checked = data.isActive === 1;
    document.getElementById("menuId").value = data.menuId;
}

//This function helps in binding the Parent Id in dropdown of create and update modal where create modal contains empty value
MenuMaster.BindParentMenuDD = function () {    
    var select = document.getElementById("parentMenuId");
    var data = Menu.MenuList;
    select.innerHTML = "";
    //Setting default
    var opHtml = '<option value="0" id="ParentMenuOption_0" customData="0">Please Select..</option>';
    select.innerHTML = select.innerHTML + opHtml;
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentMenuId == 0) {
            var optionHtml = '<option value="' + data[i].menuId + '" id="ParentMenuOption_' + data[i].menuId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].subRoleName + '</option>';
            select.innerHTML = select.innerHTML + optionHtml;
        }
    }
}

//This function helps in binding the Child Id in dropdown of create and update modal where create modal contains empty value
MenuMaster.BindDefaultChildMenuDD = function () {
    var select = document.getElementById("defaultChildMenuId");
    var data = Menu.MenuList;
    select.innerHTML = "";
    //Setting default
    var opHtml = '<option value="0" id="ChildMenuOption_0" customData="0">Please Select..</option>';
    select.innerHTML = select.innerHTML + opHtml;
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentMenuId != 0) {
            var optionHtml = '<option value="' + data[i].menuId + '" id="ChildMenuOption_' + data[i].menuId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].subRoleName + '</option>';
            select.innerHTML = select.innerHTML + optionHtml;
        }
    }
}

//This function is validating and creating the NEW MENU 
MenuMaster.ValidateAndCreateNewMenu = function () {
    MenuMaster.ActionUser = User.UserId;
    MenuMaster.MenuName = document.getElementById("menuName").value;
    MenuMaster.MenuCode = document.getElementById("menuCode").value;
    MenuMaster.MenuDesc = document.getElementById("menuDesc").value;
    MenuMaster.DisplayOrder = document.getElementById("displayOrder").value;
    MenuMaster.ParentMenuId = document.getElementById("parentMenuId").value;
    MenuMaster.DefaultChildMenuId = document.getElementById("defaultChildMenuId").value;
    MenuMaster.TemplatePath = document.getElementById("templatePath").value;
    MenuMaster.IsActive = document.getElementById("isActive").checked ? 1 : 0;
    Ajax.AuthPost("admin/MenuMasterCRUD", MenuMaster, MenuMasterCRUD_OnSuccessCallBack, MenuMasterCRUD_OnErrorCallBack);
}

//Add functions for menu ends

//Update functions for menu starts

//This function triggers on update icon click
MenuMaster.Update = function (menuData) {
    data = JSON.parse(decodeURIComponent(menuData));
    $('#newMenuModal').modal('show');
    MenuMaster.BindParentMenuDD();
    MenuMaster.BindDefaultChildMenuDD();
    MenuMaster.SetCRUDForm(data);
    document.getElementById('createMenuButton').innerHTML = 'Update Menu'
    document.getElementById('createMenuButton').onclick = MenuMaster.ValidateAndUpdateMenu;
    document.getElementById('parentMenuId').onchange = MenuMaster.selectValueChange;
    MenuMaster.selectValueChange();
}

//This function validates all the values from update modal and update the menu
MenuMaster.ValidateAndUpdateMenu = function () {
    MenuMaster.ActionUser = User.UserId;
    MenuMaster.MenuId = document.getElementById("menuId").value;
    MenuMaster.MenuName = document.getElementById("menuName").value;
    MenuMaster.MenuCode = document.getElementById("menuCode").value;
    MenuMaster.MenuDesc = document.getElementById("menuDesc").value;
    MenuMaster.DisplayOrder = document.getElementById("displayOrder").value;
    MenuMaster.ParentMenuId = document.getElementById("parentMenuId").value;
    MenuMaster.DefaultChildMenuId = document.getElementById("defaultChildMenuId").value;
    MenuMaster.TemplatePath = document.getElementById("templatePath").value;
    MenuMaster.IsActive = document.getElementById("isActive").checked ? 1 : 0;
    Ajax.AuthPost("admin/MenuMasterCRUD", MenuMaster,MenuMasterCRUD_OnSuccessCallBack, MenuMasterCRUD_OnErrorCallBack);
}

//Update functions fpr  menu ends

//Delete function for menu starts
MenuMaster.Delete = function (MenuMaster) {
    MenuMaster = JSON.parse(decodeURIComponent(MenuMaster));
    var Title = 'Are you sure, you want to delete ' + MenuMaster.menuName + ' ?';
    Util.DeleteConfirm(MenuMaster, Title, DeleteMenuMaster);
}
function DeleteMenuMaster(MenuMaster) {
    MenuMaster.isDeleted = 1;
    MenuMaster.isActive = 0;
    MenuMaster.actionUser = User.UserId;
    Ajax.AuthPost("admin/MenuMasterCRUD", MenuMaster, MenuMasterCRUD_OnSuccessCallBack, MenuMasterCRUD_OnErrorCallBack);
}

//Delete function for menu ends

//This functions triggers on add icon

MenuMaster.AddNew = function (data) {
    $('#newMenuModal').modal('show');
    MenuMaster.ClearCRUDForm();
    menuList = JSON.parse(decodeURIComponent(data))
    MenuMaster.BindDefaultChildMenuDD();
    displayOrder = Menu.MenuList.filter(res => res.parentMenuId === menuList.menuId);

    document.getElementById('displayOrder').value = displayOrder.length + 1;
    document.getElementById('createMenuButton').innerHTML = 'Add Menu'
    document.getElementById('createMenuButton').onclick = MenuMaster.ValidateAndAddMenu;
    document.getElementById('parentMenuId').onchange = MenuMaster.selectValueChange;
    MenuMaster.BindParentMenuName(menuList.menuId);
    MenuMaster.selectValueChange();

}
MenuMaster.BindParentMenuName = function (menuListId) {
    var select = document.getElementById("parentMenuId");
    var data = Menu.MenuList;
    select.innerHTML = "";
    //Setting default
    select.innerHTML = select.innerHTML;
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentMenuId == 0) {
            var optionHtml = '<option value="' + data[i].menuId + '" id="ParentMenuOption_' + data[i].menuId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].subRoleName + '</option>';
            select.innerHTML = select.innerHTML + optionHtml;
        }
        document.getElementById("parentMenuId").value = menuListId;
    }   
}
MenuMaster.SetCRUDForm = function (data) {
    document.getElementById("menuName").value = data.menuName;
    document.getElementById("menuCode").value = data.menuCode;
    document.getElementById("menuDesc").value = data.menuDesc;
    document.getElementById("displayOrder").value = data.displayOrder;
    document.getElementById("parentMenuId").value = data.parentMenuId;
    document.getElementById("defaultChildMenuId").value = data.defaultChildMenuId;
    document.getElementById("templatePath").value = data.templatePath;
    document.getElementById("isActive").checked = data.isActive === 1;
    document.getElementById("menuId").value = data.menuId;
}

MenuMaster.ValidateAndAddMenu = function () {
    MenuMaster.ActionUser = User.UserId;
    MenuMaster.MenuName = document.getElementById("menuName").value;
    MenuMaster.MenuCode = document.getElementById("menuCode").value;
    MenuMaster.MenuDesc = document.getElementById("menuDesc").value;
    MenuMaster.DisplayOrder = document.getElementById("displayOrder").value;
    MenuMaster.ParentMenuId = document.getElementById("parentMenuId").value;
    MenuMaster.DefaultChildMenuId = document.getElementById("defaultChildMenuId").value;
    MenuMaster.TemplatePath = document.getElementById("templatePath").value;
    MenuMaster.IsActive = document.getElementById("isActive").checked ? 1 : 0;
    Ajax.AuthPost("admin/MenuMasterCRUD", MenuMaster, MenuMasterCRUD_OnSuccessCallBack, MenuMasterCRUD_OnErrorCallBack);
    MenuMaster.ExpandMenuMasterDataOnClick()
}

MenuMaster.ExpandMenuMasterDataOnClick = function (menuId, sender) {
    if (sender.classList.contains("ValidateAndAddMenu")) {
        sender.classList.remove("ValidateAndAddMenu");
        $("#MenuMasterChild" + menuId + " .showDiv").slideToggle(1000);
    }
    else {
        sender.classList.add("ValidateAndAddMenu");
        $("#MenuMasterChild" + menuId + " .showDiv").slideToggle(1000);
    }
}





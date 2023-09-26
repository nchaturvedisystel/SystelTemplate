Menu = new Object();

Menu.UserId = 0;
Menu.MenuList = {};
Menu.GetMenuForUser = function (UserId) {
    Menu.UserId = UserId
    Ajax.AuthPost("menus/GetMenuForUser", Menu, GetMenuForUser_OnSuccessCallback, GetMenuForUser_OnErrorCallback);
}
function GetMenuForUser_OnSuccessCallback(data) {
    if (data && data.items && data.items.length > 0) {
        Menu.MenuList = data.items;
        Menu.Bind(data.items);
    }
    //Default Page
    //document.getElementById("ChildMenu_14").click();
}
function GetMenuForUser_OnErrorCallback(error) {
    alert(error);
}

Menu.Bind = function (data) {
    var AppVersion = localStorage.getItem('AppVersion');
    var LayoutNumber = localStorage.getItem('LayoutNumber');
    if (LayoutNumber.toString().trim() == "L1") {
        Menu.BindLayout1(data, AppVersion);
    }
    else if (LayoutNumber.toString().trim() == "L2") {
        Menu.BindLayout2(data, AppVersion);
    }
    else {
        Menu.BindLayout1(data, AppVersion);
    }
}

Menu.BindLayout1 = function (data, AppVersion) {
    //Bind Parent Menus
    //SubRoleCode will be unique for individual menu as it defines the PageLoad function on top of it
    for (var i = 0; i < data.length; i++) {
        if (data[i].isParent == 1) {
            var MenuHTML = ('<div class="nav-item dropdown">'
                + '<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"  onclick="Navigation.LoadPage(\'' + data[i].templatePath + '?' + AppVersion + '\',\'' + data[i].subRoleCode + '\', event)"> ' + data[i].menuIconUrl + '' + data[i].subRoleName + '</a>'
                + '<div id="ParenMenu_' + data[i].menuId + '" class="dropdown-menu bg-transparent border-0">'
                + '</div>'
                + '</div>');

            document.getElementById("MainNavigationBar").innerHTML = document.getElementById("MainNavigationBar").innerHTML + MenuHTML;
        }
    }

    //Bind where Child is Parent
    for (var i = 0; i < data.length; i++) {
        if (data[i].childIsParent == 1) {
            var MenuHTML = '<a id="PChildIsParentMenu_' + data[i].menuId + '" href="#" class="nav-item nav-link" onclick="Navigation.LoadPage(\'' + data[i].templatePath + '?' + AppVersion + '\',\'' + data[i].subRoleCode + '\', event)">' + data[i].menuIconUrl + '' + data[i].subRoleName + '</a>';
            document.getElementById("MainNavigationBar").innerHTML = document.getElementById("MainNavigationBar").innerHTML + MenuHTML;
        }
    }

    //Bind Child under Parent
    for (var i = 0; i < data.length; i++) {
        if (data[i].isParent != 1 && data[i].childIsParent != 1) {
            var MenuHTML = '<a id="ChildMenu_' + data[i].menuId + '" href="#" class="dropdown-item" onclick="Navigation.LoadPage(\'' + data[i].templatePath + '?' + AppVersion + '\',\'' + data[i].subRoleCode + '\', event)">' + data[i].menuIconUrl + ' &nbsp;' + data[i].subRoleName + '</a>';
            document.getElementById("ParenMenu_" + data[i].parentMenuId).innerHTML = document.getElementById("ParenMenu_" + data[i].parentMenuId).innerHTML + MenuHTML;
        }
    }
}
Menu.BindLayout2 = function (data, AppVersion) {
    //Bind Parent Menus
    //SubRoleCode will be unique for individual menu as it defines the PageLoad function on top of it
    for (var i = 0; i < data.length; i++) {
        if (data[i].isParent == 1) {
            var MenuHTML = ('<li class="nav-item">'
                + '    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#masterNav_' + data[i].menuId + '" aria-expanded="true" aria-controls="masterNav_' + data[i].menuId + '"  onclick="Navigation.LoadPage(\'' + data[i].templatePath + '?' + AppVersion + '\',\'' + data[i].subRoleCode + '\', event)"> <i>' + data[i].menuIconUrl + '</i> <span>' + data[i].subRoleName + '</span> </a>'
                + '    <div id="masterNav_' + data[i].menuId + '" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">'
                + '        <div id="ParenMenu_' + data[i].menuId + '" class="bg-gray-100 py-2 collapse-inner rounded">'
                + '        </div>'
                + '    </div>'
                + '</li>');

            document.getElementById("MainNavigationBar").innerHTML = document.getElementById("MainNavigationBar").innerHTML + MenuHTML;
        }
    }

    //Bind where Child is Parent
    for (var i = 0; i < data.length; i++) {
        if (data[i].childIsParent == 1) {
            var MenuHTML = '<li class="nav-item"> <a class="nav-link collapsed" id="PChildIsParentMenu_' + data[i].menuId + '" href="#" onclick="Navigation.LoadPage(\'' + data[i].templatePath + '?' + AppVersion + '\',\'' + data[i].subRoleCode + '\', event)"> <i>' + data[i].menuIconUrl + '</i> <span>' + data[i].subRoleName + '</span></a> </li>';
            document.getElementById("MainNavigationBar").innerHTML = document.getElementById("MainNavigationBar").innerHTML + MenuHTML;
        }
    }

    //Bind Child under Parent
    for (var i = 0; i < data.length; i++) {
        if (data[i].isParent != 1 && data[i].childIsParent != 1) {
            var MenuHTML = '<a id="ChildMenu_' + data[i].menuId + '" class="collapse-item" href="#" onclick="Navigation.LoadPage(\'' + data[i].templatePath + '?' + AppVersion + '\',\'' + data[i].subRoleCode + '\', event)"><span class="childMenu">' + data[i].subRoleName + '</span></a>';
            if (document.getElementById("ParenMenu_" + data[i].parentMenuId)) {
                document.getElementById("ParenMenu_" + data[i].parentMenuId).innerHTML = document.getElementById("ParenMenu_" + data[i].parentMenuId).innerHTML + MenuHTML;
            }
        }
    }


    // Mouse Hover Actions After binding Parent and child Menu
    var navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(function (navItem) {
        var collapse = navItem.querySelector('.collapse');
        navItem.addEventListener('mouseover', function () {
            if (collapse) {
                collapse.style.display = 'block';
            }
        });

        navItem.addEventListener('mouseout', function () {
            if (collapse && !navItem.classList.contains('clicked')) {
                collapse.style.display = 'none';
            }
        });
    });


}

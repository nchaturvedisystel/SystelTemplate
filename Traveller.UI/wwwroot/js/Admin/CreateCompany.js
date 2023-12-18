var Company = new Object();
Company.CompanyId = 0;
Company.CName = "";
Company.CCode = "";
Company.CDesc = "";
Company.CAddress = "";
Company.Email = "";
Company.Phone = "";
Company.Website = "";
Company.Category = "";
Company.SubCategory = "";
Company.ContactPerson = "";
Company.CreatedOn = new Date();;
Company.ModifiedBy = "";
Company.CreatedBy = "";
Company.ModifiedOn = new Date();;
Company.isActive = 0;
Company.isDeleted = 0;
Company.CType = "";
Company.ActionUser = "";
Company.CompanyMasterTblDT = {};

Company.BasepageOnReady = function () {
    loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    Ajax.CompanyId = parseInt(loggedInUser.companyId);
    Company.LoadAll();

}

Company.LoadAll = function () {
    $('#CreateCompany_Modal').modal('hide');
    var companyList = {};
    Company.ActionUser = User.UserId;
    Ajax.AuthPost("company/GetCompanyList", companyList, GetCompany_OnSuccessCallBack, GetCompanyList_OnErrorCallBack);
}

function GetCompany_OnSuccessCallBack(data) {
    if (Navigation.MenuCode == "MCAD") {

        if ($.fn.dataTable.isDataTable('#CompanyMasterTbl')) {
            Company.CompanyMasterTblDT = $('#CompanyMasterTbl').DataTable();
            Company.CompanyMasterTblDT.destroy();
        }
        body = document.getElementById('CompaniesListBody')
        Company.BindCompaniesList(body, data.companies)

        Company.CompanyMasterTblDT = $('#CompanyMasterTbl').DataTable();

        //new DataTable('#CompanyMasterTbl');

        $('#CreateCompany_Modal').modal('hide');
    } else {
        UserMaster.CompanyList = data.companies;
    }
}


Company.BindCompaniesList = function (Cbody, CompanyData) {
    Cbody.innerHTML = ''
    for (var i = 0; i < CompanyData.length; i++) {
        var RowHtml = ('<tr>'
            + '                <td class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + (i + 1).toString() + '</td>'
            + '                <td>' + CompanyData[i].companyId + '</td>'
            + '                <td>' + CompanyData[i].cName + '</td>'
            + '                <td>' + CompanyData[i].cCode + '</td>'
            + '                <td>' + CompanyData[i].email + '</td>'
            + '                <td>' + CompanyData[i].cType + '</td>'
            + '                <td>' + CompanyData[i].phone + '</td>'
            + '                <td class="text-center">'
            + '                    <div class="btn-group dots_dropdown">'
            + '                        <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
            + '                            <i class="fas fa-ellipsis-v"></i>'
            + '                        </button>'
            + '                        <div class="dropdown-menu dropdown-menu-right shadow-lg">'
            + '                            <button class="dropdown-item" type="button" onclick="Company.Update(\'' + encodeURIComponent(JSON.stringify(CompanyData[i])) + '\')">'
            + '                                <i class="fa fa-edit"></i> Edit'
            + '                            </button>'
            + '                            <button class="dropdown-item" type="button" onclick="Company.Delete(\'' + encodeURIComponent(JSON.stringify(CompanyData[i])) + '\')">'
            + '                                <i class="far fa-trash-alt"></i> Delete'
            + '                            </button>'
            + '                        </div>'
            + '                    </div>'
            + '                </td> '
            + '            </tr>'
            + '');
        Cbody.innerHTML = Cbody.innerHTML + RowHtml;
    }

}

function GetCompanyList_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred..", 1500);
}

Company.OpenCompanyModal = function () {
    $('#CreateCompany_Modal').modal('show');
    Company.ClearCRUDform()

}

Company.CloseModal = function () {
    console.log('close modal triggered');
    $('#CreateCompany_Modal').modal('hide');
}


Company.CreateCompany = function () {
    var newCompany = {};
    newCompany.CompanyId = document.getElementById("companyID").value ? document.getElementById("companyID").value : 0;
    newCompany.CName = document.getElementById("companyName").value;
    newCompany.CCode = document.getElementById("companyCode").value;
    newCompany.CDesc = document.getElementById("companyDescription").value;
    newCompany.CAddress = document.getElementById("companyAddress").value;
    newCompany.Email = document.getElementById("companyEmail").value;
    newCompany.Phone = document.getElementById("phoneNumber").value;
    newCompany.Website = document.getElementById("website").value;
    newCompany.Category = document.getElementById("category").value;
    newCompany.SubCategory = document.getElementById("subCategory").value;
    newCompany.ContactPerson = document.getElementById("contactPerson").value;
    newCompany.CType = document.getElementById("companyType").value;
    newCompany.IsActive = document.getElementById("isActive").checked ? 1 : 0
    console.log(newCompany);
    Ajax.AuthPost("company/GetCompanyList", newCompany, GetCompany_OnSuccessCallBack, GetCompanyList_OnErrorCallBack);
}

Company.ClearCRUDform = function () {
    document.getElementById("companyID").value = '';
    document.getElementById("companyName").value = '';
    document.getElementById("companyCode").value = '';
    document.getElementById("companyDescription").value = '';
    document.getElementById("companyAddress").value = '';
    document.getElementById("companyEmail").value = '';
    document.getElementById("phoneNumber").value = '';
    document.getElementById("website").value = '';
    document.getElementById("category").value = '';
    document.getElementById("subCategory").value = '';
    document.getElementById("contactPerson").value = '';
    document.getElementById("companyType").value = '';
}

Company.Update = function (data) {
    $('#CreateCompany_Modal').modal('show');
    Company.setCRUDForm(data)

}

Company.Delete = function (data) {
    let companyData = JSON.parse(decodeURIComponent(data))
    let newCompany = {};
    newCompany.CompanyId = companyData.companyId
    newCompany.CName = companyData.cName
    newCompany.CCode = companyData.cCode
    newCompany.CDesc = companyData.cDesc
    newCompany.CAddress = companyData.cAddress
    newCompany.Email = companyData.email
    newCompany.Phone = companyData.phone
    newCompany.Website = companyData.website
    newCompany.Category = companyData.category
    newCompany.SubCategory = companyData.subCategory
    newCompany.ContactPerson = companyData.contactPerson
    newCompany.CType = companyData.cType
    newCompany.IsActive = 0
    newCompany.IsDeleted = 1



    var Title = 'Are you sure, you want to delete ' + companyData.cName + ' ?';
    Util.DeleteConfirm(newCompany, Title, Company.DeleteCompany);

}

Company.DeleteCompany = function (data) {
    Ajax.AuthPost("company/GetCompanyList", data, GetCompany_OnSuccessCallBack, GetCompanyList_OnErrorCallBack);
}

Company.setCRUDForm = function (data) {
    let companyData = JSON.parse(decodeURIComponent(data))
    document.getElementById("companyID").value = companyData.companyId
    document.getElementById("companyName").value = companyData.cName
    document.getElementById("companyCode").value = companyData.cCode
    document.getElementById("companyDescription").value = companyData.cDesc
    document.getElementById("companyAddress").value = companyData.cAddress
    document.getElementById("companyEmail").value = companyData.email
    document.getElementById("phoneNumber").value = companyData.phone
    document.getElementById("website").value = companyData.website
    document.getElementById("category").value = companyData.category
    document.getElementById("subCategory").value = companyData.subCategory
    document.getElementById("contactPerson").value = companyData.contactPerson
    document.getElementById("companyType").value = companyData.cType
    document.getElementById("isActive").checked = companyData.isActive == 1 ? true : false
}
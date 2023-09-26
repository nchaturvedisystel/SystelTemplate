var WorkOrder = new Object();

WorkOrder.WorkOrderId = 0;
WorkOrder.PartId = 0;
WorkOrder.WorkFlowId = 0;
WorkOrder.WorkName = "";
WorkOrder.WorkDesc = "";
WorkOrder.UserGroupId = 0;
WorkOrder.UnitsOrdered = 0;
WorkOrder.IsActive = 0;
WorkOrder.ActionUser = User.UserId;
WorkOrder.PartList = {};
WorkOrder.WorkFlowList = {};


WorkOrder.CreateWorkOrderOnReady = function () {
    WorkOrder.LoadAll();
    PartMaster.LoadAll();
    Template.LoadAll();
}

WorkOrder.LoadAll = function () {
    WorkOrder.ActionUser = User.UserId;
    Ajax.AuthPost("traveler/WorkOrderCRUD", WorkOrder, WorkOrderCRUD_OnSuccessCallBack, LoadAllWorkOrder_OnErrorCallBack);
}

function WorkOrderCRUD_OnSuccessCallBack(data) {
    if (Navigation.MenuCode == 'WDTLR') {
        WorkOrderDetail.WorkOrderList = data.workOrders;
        WorkOrderDetail.WorkOrderDetaillistDropDown();
    }
    else {
        $('#newWorkOrderModal').modal('hide');
        WorkOrder.ClearCRUDForm();
        if (data.workOrders && data.workOrders.length > 0) {
            var workData = data.workOrders;
            var body = document.getElementById('WorkflowTemplateTabularBody');
            body.innerHTML = "";
            var SrNo = 0;
            for (var i = 0; i < workData.length; i++) {
                SrNo += 1;
                var RowHtml = ('<tr>'
                    + '    <td  class="dtr-control sorting_1" style="border-left: 5px solid #' + Util.WCColors[i] + ';">' + SrNo + '</td> '
                    + '    <td>' + workData[i].workName + '</td>'
                
                    + '    <td>' + workData[i].workDesc + '</td>'
                    + '    <td>' + workData[i].workflowName + '</td>'
                    + '    <td>' + workData[i].partName + '</td>'
                    + '    <td>' + workData[i].unitsOrdered + '</td>'
                    + '                <td class="text-center">'
                    + '                     <div class="btn-group dots_dropdown">'
                    + '                         <button type="button" class="dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">'
                    + '                             <i class="fas fa-ellipsis-v"></i>'
                    + '                         </button>'
                    + '                         <div class="dropdown-menu dropdown-menu-right shadow-lg">'
                    + '                             <button class="dropdown-item" type="button" onclick="WorkOrder.Update(\'' + encodeURIComponent(JSON.stringify(workData[i])) + '\')">'
                    + '                                 <i class="fa fa-edit"></i> Edit'
                    + '                             </button>'
                    + '                             <button class="dropdown-item" type="button" id="addIcon_' + workData[i].workOrderId + '" onclick="WorkOrder.AddNew(\'' + encodeURIComponent(JSON.stringify(workData[i])) + '\')">'
                    + '                                 <i class="fa fa-plus"></i> Create Traveler'
                    + '                             </button>'
                    + '                             <button class="dropdown-item" type="button" id="viewIcon_' + workData[i].workOrderId + '" onclick="WorkOrder.View(\'' + encodeURIComponent(JSON.stringify(workData[i])) + '\')">'
                    + '                                 <i class="fa fa-eye"></i> View'
                    + '                             </button>'
                    + '                             <button class="dropdown-item" type="button" onclick="WorkOrder.Delete(\'' + encodeURIComponent(JSON.stringify(workData[i])) + '\')" >'
                    + '                                 <i class="far fa-trash-alt"></i> Delete'
                    + '                             </button>'
                    + '                         </div>'
                    + '                     </div>'
                    + '                </td> '
                    + '</tr>'
                    + '');
                body.innerHTML = body.innerHTML + RowHtml;
                if (workData[i].noOfWorkItems > 0) {
                    document.getElementById(`viewIcon_${workData[i].workOrderId}`).style.display = "relative"
                    document.getElementById(`addIcon_${workData[i].workOrderId}`).style.display = "none"

                } else {
                    document.getElementById(`viewIcon_${workData[i].workOrderId}`).style.display = "none"
                    document.getElementById(`addIcon_${workData[i].workOrderId}`).style.display = "relative"
                }
            }
        } else {
            var body = document.getElementById("WorkflowTemplateTabularBody");
            body.innerHTML = ('<tr>'
                + '<td  colspan="11">'
                + ' <font style="color:red;">No Records found..</font>'
                + '        </td>'
                + '    </tr>');
        }
    }
}

function LoadAllWorkOrder_OnErrorCallBack(error) {
    Util.DisplayAutoCloseErrorPopUp("Error Occurred, please try again later..", 1500);
}

WorkOrder.BindWorkFlow = function () {
    var select = document.getElementById("workflowId");
    var data = WorkOrder.WorkFlowList;
    //Setting default
    var opHtml = '<option value="0" id="WorkFlowSelectOption_0" customData="0">Please Select..</option>';
    select.innerHTML = opHtml; // Set the default option directly
    for (var i = 0; i < data.length; i++) {
        var optionHtml = '<option value="' + data[i].workflowId + '" id="WorkFlowSelectOption_' + data[i].workflowId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].workflowName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
}

WorkOrder.BindPartMaster = function () {
    var select = document.getElementById("partId");
    var data = WorkOrder.PartList;
    select.innerHTML = "";
    //Setting default
    var opHtml = '<option value="0" id="PartSelectOption_0" customData="0">Please Select..</option>';
    //select.innerHTML = opHtml;
    select.innerHTML = select.innerHTML + opHtml;
    for (var i = 0; i < data.length; i++) {
        var optionHtml = '<option value="' + data[i].partId + '" id="PartSelectOption_' + data[i].partId + '" customData="' + encodeURIComponent(JSON.stringify(data[i])) + '">' + data[i].partName + '</option>';
        select.innerHTML = select.innerHTML + optionHtml;
    }
}


//Create
WorkOrder.CreateNew = function () {
    $('#newWorkOrderModal').modal('show');
    WorkOrder.ClearCRUDForm();
    WorkOrder.BindWorkFlow();
    WorkOrder.BindPartMaster();
    document.getElementById('createOrderButton').innerHTML = 'Create Order';
    document.getElementById('createOrderButton').onclick = WorkOrder.ValidateAndCreateNewOrder;
};
WorkOrder.ClearCRUDForm = function () {
    document.getElementById("workName").value = '';
    document.getElementById("workDesc").value = '';
    document.getElementById("partId").value = '';
    document.getElementById("workflowId").value = '';
    document.getElementById("unitsOrdered").value = '';
    document.getElementById("isActive").checked = 'true';

    WorkOrder.WorkOrderId = 0;
    WorkOrder.PartId = 0;
    WorkOrder.WorkFlowId = 0;
    WorkOrder.WorkName = "";
    WorkOrder.WorkDesc = "";
    WorkOrder.UserGroupId = 0;
    WorkOrder.UnitsOrdered = 0;
    WorkOrder.IsActive = 0;
}
WorkOrder.ValidateAndCreateNewOrder = function () {
    var selectWorkFlowId = document.getElementById("workflowId");
    var selectPartId = document.getElementById("partId");
    WorkOrder.ActionUser = User.UserId;
    WorkOrder.WorkName = document.getElementById("workName").value;
    WorkOrder.WorkDesc = document.getElementById("workDesc").value;
    WorkOrder.WorkFlowId = JSON.parse(decodeURIComponent(selectWorkFlowId.options[selectWorkFlowId.selectedIndex].getAttribute("customData"))).workflowId;
    WorkOrder.PartId = JSON.parse(decodeURIComponent(selectPartId.options[selectPartId.selectedIndex].getAttribute("customData"))).partId;
    WorkOrder.UnitsOrdered = document.getElementById("unitsOrdered").value;
    WorkOrder.IsActive = document.getElementById("isActive").checked ? 1 : 0;
    Ajax.AuthPost("traveler/WorkOrderCRUD", WorkOrder, WorkOrderCRUD_OnSuccessCallBack, LoadAllWorkOrder_OnErrorCallBack);

}



//Delete
WorkOrder.Delete = function (WorkOrder) {
    WorkOrder = JSON.parse(decodeURIComponent(WorkOrder));
    var Title = 'Are you sure, you want to delete ' + WorkOrder.workName + ' ?';
    Util.DeleteConfirm(WorkOrder, Title, DeleteWorkOrder); // Changed from DeleteWorkOrder to DeleteMenuMaster
}

function DeleteWorkOrder(WorkOrder) {
    WorkOrder.isDeleted = 1;
    WorkOrder.isActive = 0;
    WorkOrder.ActionUser = User.UserId;
    Ajax.AuthPost("traveler/WorkOrderCRUD", WorkOrder, WorkOrderCRUD_OnSuccessCallBack, LoadAllWorkOrder_OnErrorCallBack);
}



//Update
WorkOrder.Update = function (workData) {
    data = JSON.parse(decodeURIComponent(workData));
    $('#newWorkOrderModal').modal('show');
    WorkOrder.BindWorkFlow();
    WorkOrder.BindPartMaster();
    WorkOrder.SetCRUDForm(data);
    document.getElementById('createOrderButton').innerHTML = 'Update Menu'
    document.getElementById('createOrderButton').onclick = function () {
        WorkOrder.ValidateAndUpdateOrder(data.workOrderId)
    };
}
WorkOrder.SetCRUDForm = function (data) {
    document.getElementById("workName").value = data.workName;
    document.getElementById("workDesc").value = data.workDesc;
    document.getElementById("unitsOrdered").value = data.unitsOrdered;
    document.getElementById("isActive").checked = data.isActive === 1;
    document.getElementById(`PartSelectOption_${data.partId}`).value = data.partId;
    document.getElementById(`PartSelectOption_${data.partId}`).selected = true;
    document.getElementById(`WorkFlowSelectOption_${data.workflowId}`).value = data.workflowId;
    document.getElementById(`WorkFlowSelectOption_${data.workflowId}`).selected = true
}
WorkOrder.ValidateAndUpdateOrder = function (workOrderId) {
    WorkOrder.ActionUser = User.UserId;
    WorkOrder.WorkOrderId = workOrderId;
    WorkOrder.WorkName = document.getElementById("workName").value;
    WorkOrder.WorkDesc = document.getElementById("workDesc").value;
    WorkOrder.UnitsOrdered = document.getElementById("unitsOrdered").value;
    WorkOrder.PartId = +document.getElementById("partId").value;
    WorkOrder.WorkFlowId = +document.getElementById("workflowId").value;
    WorkOrder.IsActive = document.getElementById("isActive").checked ? 1 : 0;
    Ajax.AuthPost("traveler/WorkOrderCRUD", WorkOrder, WorkOrderCRUD_OnSuccessCallBack, LoadAllWorkOrder_OnErrorCallBack);
}

WorkOrder.View = function (data) {
    WorkOrderDetail.WorkOrderId = JSON.parse(decodeURIComponent(data)).workOrderId;
    Navigation.LoadPageFromUrl('/html/traveler/WorkOrderDetail.html', 'WDTLR');
}

WorkOrder.AddNew = function (data) {
    let WorkOrder = JSON.parse(decodeURIComponent(data));
    var Title = 'Do you want to create all the travelers for this WorkOder : ' + WorkOrder.workName + ' ?';
    Util.AddConfirm(WorkOrder, Title, CreateWorkItem); // Changed from DeleteWorkOrder to DeleteMenuMaster
}

function CreateWorkItem(data) {
    data.ActionUser = User.UserId;
    Ajax.AuthPost("traveler/WorkItemCreate", data, CreateWorkItem_OnSuccessCallBack, LoadAllWorkOrder_OnErrorCallBack);
}

function CreateWorkItem_OnSuccessCallBack(data) {
    WorkOrder.LoadAll()
    Util.ShowSuccessMessage("Traveler Created")
}

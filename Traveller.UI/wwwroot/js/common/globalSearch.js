GlobalSearch = new Object();

GlobalSearch.FilteredText = "";
GlobalSearch.FilterSize = 10;

var searchInput = document.getElementById('globalSearch');
var suggestionlist = document.getElementById('suggestionlist'); // Declare suggestionlist here

var typingTimer;
var doneTypingInterval = 1000; 
// Event listener to close suggestion box when clicking outside the search input
document.addEventListener('click', function(event) {
    if (event.target !== searchInput) {
        document.getElementById("GlobalSearchList").style.display = 'none';
    }
});

GlobalSearch.SearchText = function () {   
    GlobalSearch.FilteredText = searchInput.value;
    GlobalSearch.FilterSize = 10;
    clearTimeout(typingTimer);
    
    typingTimer = setTimeout(function() {
        Ajax.AuthPost("globalsearch/GetSearchResult", GlobalSearch, GetSearchresult_OnSuccessCallback, GetSearchresult_OnErrorCallback);
    }, doneTypingInterval);

}

function GetSearchresult_OnSuccessCallback(data) {
    suggestionlist.innerHTML = ''; // Clear previous suggestions
    data = data.searchResult;
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var bgcolor = "";
            if (data[i].valueType == "order") { bgcolor = "AAE272" }
            else if (data[i].valueType == "traveler") { bgcolor = "F8843A" }
            else { bgcolor = "A084D2" }
            var newLiElement = ('<li onclick="GlobalSearch.GoToPage(\'' + data[i].valueType + '\',' + data[i].searchId + ')" style="border-left: 5px solid #' + bgcolor + ';" '
                + 'data-toggle="tooltip" data-placement="left" title="' + data[i].valueType + '" >'
                + '<a href="#" >' + data[i].searchValue + '</a>'
                + '</li>');
            suggestionlist.innerHTML += newLiElement;
        }
        document.getElementById("GlobalSearchList").style.display = 'block'; // Ensure suggestion box is displayed
        document.getElementById("GlobalSearchShowAll").style.display = 'block';
        document.getElementById("GlobalSearchShowAll").innerHTML = 'Show All';
    } else {
        document.getElementById("GlobalSearchShowAll").style.display = 'block';
        document.getElementById("GlobalSearchShowAll").innerHTML = 'Search Not Found...';
    }
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}

function GetSearchresult_OnErrorCallback(error) {
    alert(error);
}
//#region -- Redirect Page
GlobalSearch.GoToPage = function (type, id) {
    type = type.trim();

    if (type == "part") {
        PartItemDetail.LoadAll(id);
        Navigation.LoadPageFromUrl('/html/traveler/PartItemDetail.html', 'PDTLR');
    }
    else if (type == "order") {
        WorkOrderDetail.WorkOrderId = id;
        Navigation.LoadPageFromUrl('/html/traveler/WorkOrderDetail.html', 'WDTLR');
    }
    else if (type == "traveler") {
        WorkItem.WorkItemId = id;
        Navigation.LoadPageFromUrl('/html/traveler/WorkItemDetail.html', 'URAD');
    }
}
//#endregion -- Redirect Page

//#region -- ShowAll
GlobalSearch.ShowAll = function(){
    Navigation.LoadPageFromUrl('/html/Common/ShowAll.html', 'SHAL');
}

function GetShowAllresult_OnSuccessCallback(data) {
    var searchResults = data.searchResult;
    var CardContainer = document.getElementById("cardContainer");
    CardContainer.innerHTML = "";

    const uniqueParts = [...new Set(searchResults.map(item => item.partDetail))]; 
    for (var i = 0; i < uniqueParts.length; i++) {
        var partDetailSplit = uniqueParts[i].split('|');
        CardContainer.innerHTML += GlobalSearch.GetPartsHTML(partDetailSplit[0],partDetailSplit[1]);

        var partOrders = searchResults.filter(obj => {
            return obj.partDetail === uniqueParts[i]
        })
        for (var j = 0; j < partOrders.length; j++) {
            if (partOrders[j].workOrderDetail != null) {
                var partCard = document.getElementById('CardPartId_' + partDetailSplit[0]);
                var partOrderSplit = partOrders[j].workOrderDetail.split('|');
                partCard.innerHTML += GlobalSearch.GetWorkOrderHTML(partOrderSplit[0], partOrderSplit[1]);

                if (partOrders[j].workItemDetail != null) {
                    var orderCard = document.getElementById('CardOrderId_' + partOrderSplit[0]);
                    var partTravelerSplit = partOrders[j].workItemDetail.split(',');
                    for (var k = 0; k < partTravelerSplit.length; k++) {
                        var travelerSplit = partTravelerSplit[k].split('|');
                        orderCard.innerHTML += GlobalSearch.GetWorkItemHTML(travelerSplit[0], travelerSplit[1]);
                    }
                }
            }
        }
    }
}

function GetShowAllresult_OnErrorCallback(error) {
    alert(error);
}

GlobalSearch.ShowAllOnReady = function()
{
    GlobalSearch.FilteredText = searchInput.value;
    GlobalSearch.FilterSize = 0;
    Ajax.AuthPost("globalsearch/GetSearchResult", GlobalSearch, GetShowAllresult_OnSuccessCallback, GetShowAllresult_OnErrorCallback);
}

GlobalSearch.GetPartsHTML = function (id, name) {
    var innerHTML = (''
        + '<div id="CardPartId_' + id +'" class="card bg-light mb-3" style="max-width: 100%;">'
        + '<div class="card-header" style="background-color: #dae4edd4;"> <a href="#" onclick="GlobalSearch.GoToPage(\'part\',' + id +')">' + name +'</a></div >'
        + '</div> ');

    return innerHTML;
}
GlobalSearch.GetWorkOrderHTML = function (id, name) {
    var innerHTML = (''
        + '    <div  class="card-body">'
        + '        <h5 class="card-title"><a href="#" onclick="GlobalSearch.GoToPage(\'order\',' + id + ')">' + name +'</a></h5>'
        + '        <p class="card-text" id="CardOrderId_' + id +'"></p>'
        + '    </div>'
        );
    return innerHTML;
}
GlobalSearch.GetWorkItemHTML = function (id, name) {
    var innerHTML = (''
        + '    <input type="button" class="btn btn-outline-primary btn-sm m-1" onclick="GlobalSearch.GoToPage(\'traveler\',' + id + ')" id="CardTravelerId_' + id +'" value="' + name +'" />'
    );
    return innerHTML;
}
//#endregion -- ShowAll

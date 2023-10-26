Util = new Object();
Util.WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b","c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b", "c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];
Util.SystelWCColors = ["FEC87C", "FDBD71", "FCB165", "FBA75C", "FA9C51", "F98F45", "F8843A", "F77B31", "F67027", "F5641B", "F35910", "F24C04", "F35910", "F5641B", "F67027", "F77B31", "F8843A", "F98F45", "FA9C51", "FBA75C", "FCB165"];

Util.ShowSuccessMessage = function (Title, message) {
    Swal.fire(
        Title,
        message,
        'success'
    )
}
Util.DisplayAutoCloseErrorPopUp = function (ValidationMsg, Timer) {
    let timerInterval
    Swal.fire({
        title: ValidationMsg,
        html: 'Retry in <b></b> milliseconds.',
        timer: Timer,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            //console.log('I was closed by the timer')
        }
    })
}

Util.DeleteConfirm = function (deleteObj, deleteMsg, deletefunction) {    
    Swal.fire({
        title: deleteMsg,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deletefunction(deleteObj);
        }
    })
}

Util.AddConfirm = function (addObj, addMsg, addfunction) {    
    Swal.fire({
        title: addMsg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add it!'
    }).then((result) => {
        if (result.isConfirmed) {
            addfunction(addObj);
        }
    })
}

Util.ImageEncodeToBase64 = function (inputId, callerFunction, callerParam) {
    var file = document.getElementById(inputId).files[0];
    if(file != undefined){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callerFunction(callerParam, reader.result);
            return reader.result;
        };
        reader.onerror = function (error) {
            Util.DisplayAutoCloseErrorPopUp("Error Occurred, please try again later..", 1500);
        };
    }
    else{
        callerFunction(callerParam, "");
    }
}
Util.GetUnitsPercentageString = function (units, totalUnits) {
    if (units == 0)
        return "0";
    else if (totalUnits == 0)
        return "0";
    else
        return parseInt((units * 100) / totalUnits).toString();
}
Util.GetNotificationColor = function (units) {
    if (units == 0)
        return "#dedede";
    else
        return "var(--orange-col);";
}

Util.CloseModal = function (id) {
    $('#' + id +'').modal('hide');
}

//Toast.setMaxCount(6);
//Toast.enableQueue(true);
Toast.setMaxCount(6);

Util.DisplayTime = function (ticks){
    var ticksInSec = ticks/1000;
    var hh = Math.floor(ticksInSec / 3600);
    var mm = Math.floor((ticksInSec % 3600) / 60);
    // var ss = ticks % 60;
    return (pad(hh, 2) + ":" + pad(mm, 2));
    
}
 
function pad(n, width) {
    var n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
Util.BindvaluesToDropDown = function (data) {

}




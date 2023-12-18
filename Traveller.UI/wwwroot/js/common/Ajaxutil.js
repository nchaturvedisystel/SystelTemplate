Ajax = new Object()
/*PROD*/
/*
Ajax.BaseURI = "https://localhost:44306/api/";
Ajax.BaseURI = (window.location.origin + "/API/");
*/
/*DEV*/
Ajax.BaseURI = "https://localhost:44306/";


Ajax.CompanyId = 1;
Ajax.Post = function (PostUrl, PostData, SuccessCallBack, ErrorCallBack) {
    /*PostData = {
        name: "Ipseeta",
        id: 1
    };*/
    PostUrl = Ajax.BaseURI + PostUrl;
    PostData = JSON.stringify(PostData);

    $.ajax({
        url: PostUrl,
        type: "POST",
        data: PostData,
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            SuccessCallBack(data);
        },
        error: function (error) {
            ErrorCallBack(error.responseText);
        }
    });
}

Ajax.Get = function (GetUrl, SuccessCallBack, ErrorCallBack) {
    GetUrl = Ajax.BaseURI + GetUrl;
    $.ajax({
        url: GetUrl,
        type: "GET",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            SuccessCallBack(data);
        },
        error: function (error) {
            ErrorCallBack(error);
        }
    });
}

Ajax.AuthPost = function (PostUrl, PostData, SuccessCallBack, ErrorCallBack) {
    /*PostData = {
        name: "Ipseeta",
        id: 1
    };*/
    PostUrl = Ajax.BaseURI + PostUrl;
    PostData = JSON.stringify(PostData);

    $.ajax({
        url: PostUrl,
        type: "POST",
        data: PostData,
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        success: function (data) {
            SuccessCallBack(data);
        },
        error: function (error) {
            Ajax.ErrorCallBackFn(ErrorCallBack, error);
        }
    });
}

Ajax.AuthGet = function (GetUrl, SuccessCallBack, ErrorCallBack) {
    GetUrl = Ajax.BaseURI + GetUrl;
    $.ajax({
        url: GetUrl,
        type: "GET",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        success: function (data) {
            SuccessCallBack(data);
        },
        error: function (error) {
            Ajax.ErrorCallBackFn(ErrorCallBack, error);
        }
    });
}
Ajax.ErrorCallBackFn = function (ErrorCallBack, error) {
    try {
        if (error && error.responseText) {
            ErrorCallBack(error.responseText);
        }
        else
            User.Signout();
    }
    catch (ex) {
        User.Signout();
    }
}
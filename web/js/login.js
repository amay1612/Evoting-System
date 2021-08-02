var userid, password;
function connectUser()
{
    userid = $("#username").val();
    password = $("#password").val();
    if (validateUser() === false)
    {
        swal("Access Denied ", "Please input userid/password", "error");
        return;
    }
    var data = {userid: userid, password: password};
    var xhr = $.post("LoginControllerServlet", data, processResponse);
    xhr.fail(handleError);
}
function processResponse(responseText)
{
    console.log(responseText);
    console.log(responseText.trim());
    console.log("aaaaaaaaaaaaaa");
    
    if (responseText.trim() === 'error')
    {
        swal("Access Denied", "Invalid userid/password", "error");

    }
    else if (responseText.trim().indexOf("jsessionid") !== -1)
    {
         swal("Success", "Login Successfull", "success").then((value) => {
                                    window.location = responseText.trim();
                                    });
        
    }


    else
    {
        swal("Access Denied", "Some problem occured:" + responseText, "error");
        return;
    }


}

function handleError(xhr)
{
    swal("Error!","Problem in server communication!"+xhr.statusText,"error");

}
function validateUser()
{
    if (userid === "" || password === "" )
    {
        swal("Error!", "All fields are mandatory", "error");
        return false;

    }
    return true;
}
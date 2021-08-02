var username, password, cpassword, city, address, adhar, email, mobile;
function addUser()
{
    username = $("#username").val();
    password = $("#password").val();
    cpassword = $("#cpassword").val();
    city = $("#city").val();
    address = $("#address").val();
    adhar = $("#adhar").val();
    email = $("#email").val();
    mobile = $("#mobile").val();
    if (validateUser())
    {
        if (password != cpassword)
        {
            swal("Error!", "Password doesn't match! sahi kr le", "error");
            return;
        }
        else
        {
            if (checkEmail() === false)
                return;
            var data = {
                username: username,
                password: password,
                city: city,
                address: address,
                userid: adhar, //registrationControllerServlet m userid se fetch kr rhe h isliye adhar likha
                email: email,
                mobile: mobile
            };
            var xhr = $.post("RegistrationControllerServlet", data, processResponse);
            xhr.fail(handleError);
        }
    }
}
function processResponse(responseText, textStatus, xhr)
{
    console.log(responseText);
    var str = responseText.trim();
    console.log(str);
    if (str === "success")
    {
        swal("Success!!", "Registration Done Successfully!", "success");
        setTimeout(redirectUser,3000);

    }
    else if (str === "uap")
        swal("Error!", "This Userid already present!", "error");
    else
        swal("Error!", "Registration Failed !!", "error");
}
function handleError(xhr)
{
    swal("Error!","Problem in server communication!"+xhr.statusText,"error");

}

function validateUser()
{
    if (username === "" || password === "" || cpassword === "" || city === "" || address === "" || adhar === "" || email === "" || mobile === "")
    {
        swal("Error!", "All fields are mandatory", "error");
        return false;

    }
    return true;
}
function checkEmail()
{
    var attherate = email.indexOf("@");
    var dotpos = email.indexOf(".");
    if (attherate < 1 || dotpos < attherate + 2 || dotpos + 2 > email.length)
    {
        swal("Error!", "Enter a valid Email", "error");
        return false;
    }
    return true;
}
function redirectUser()
{
    window.location="login.html";
}
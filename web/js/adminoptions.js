function redirectvotingpage()
{
swal("Admin !", "Redirecting to Voting Controller Page!", "success")
        .then((value) => {
                window.location = "VotingControllerServlet";
                });
}
function manageuser()
{
swal("Admin !", "Redirecting to User Management Page!", "success")
        .then((value) => {
        window.location = "ManageUser.jsp";
        });
}
function redirectadministratorpage()
{
swal("Admin !", "Redirecting to Admin Actions Page!", "success")
        .then((value) => {
        window.location = "adminactions.jsp";
        });
}
function managecandidate()
{
swal("Admin !", "Redirecting to Candidate Management Page!", "success")
        .then((value) => {
        window.location = "managecandidate.jsp";
        });
}
function showaddcandidateform()
{
console.log("inside show cand fun");
        removecandidateForm();
        var newdiv = document.createElement("div");
        newdiv.setAttribute("id", "candidateform");
        newdiv.setAttribute("float", "left");
        newdiv.setAttribute("padding-left", "12px");
        newdiv.setAttribute("border", "solid 2px red");
        newdiv.innerHTML = "<h3>Add New Candidate</h3>";
        newdiv.innerHTML = newdiv.innerHTML + "<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
<table><tr><th>Candidate Id:</th><td><input type='text' id='cid'></td></tr>\n\
<tr><th>User Id:</th><td><input type='text' id='uid' onkeypress='return getdetails(event)'></td></tr>\n\
<tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
<tr><th>City:</th><td><select id='city'></select></td></tr>\n\
<tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
<tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
<tr><th><input type='button' value='Add Candidate' onclick='addcandidate()' id='addcnd'></th>\n\
<th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
        newdiv.innerHTML = newdiv.innerHTML + "<br><span id='addresp'></span>";
        var addcand = $("#result")[0];
        addcand.appendChild(newdiv);
        $("#candidateform").hide();
        $("#candidateform").fadeIn(3500);
        data = {id:"getid"};
        $.post("AddCandidateControllerServlet", data, function(responseText){$("#cid").val(responseText); $('#cid').prop("disabled", true)});
}
function clearText()
{
$("#addresp").html("");
}
function getdetails(e)
{
if (e.keyCode === 13)
{
data = {uid:$("#uid").val()};
        $.post("AddCandidateControllerServlet", data, function(responseText)
        {
        let details = JSON.parse(responseText);
                let city = details.city;
                let uname = details.username;
                if (uname === "wrong")
                swal("Wrong Adhaar No!", "Adhaar no is invalid!", "error");
                else
        {
        $("#cname").val(uname);
                $("#city").empty();
                $("#city").append(city);
                $("#cname").prop("disabled", true);
        }
        });
}
}
function addcandidate()
{
var form = $('#fileUploadForm')[0];
        var data = new FormData(form);
        alert(data);
        var cid = $("#cid").val();
        var cname = $("#cname").val();
        var city = $("#city").val();
        var party = $("#party").val();
        var uid = $("#uid").val();
        data.append("cid", cid);
        data.append("uid", uid);
        data.append("cname", cname);
        data.append("party", party);
        data.append("city", city);
        $.ajax({
        type: "POST",
                enctype: 'multipart/form-data',
                url: "AddNewCandidateControllerServlet",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (data) {
                str = data + "....";
                        swal("Admin!", str, "success").then((value) => {
                showaddcandidateform();
                });
//                $("#addresp").text(str).css("color","green").css("font-weight","bold");
//                window.setTimeout(function(){showaddcandidateform();},5000);
                },
                error: function (e) {
                swal("Admin!", e, "error");
                }
        });
}
function removecandidateForm()
{
var contdiv = document.getElementById("result");
        var formdiv = document.getElementById("candidateform");
        if (formdiv !== null)
{
$("#candidateform").fadeOut("3500");
        contdiv.removeChild(formdiv);
}
}

function showcandidate()
{
removecandidateForm();
        var newdiv = document.createElement("div");
        newdiv.setAttribute("id", "candidateform");
        newdiv.setAttribute("float", "left");
        newdiv.setAttribute("padding-left", "12px");
        newdiv.setAttribute("border", "solid 2px red");
        newdiv.innerHTML = "<h3>Show Candidate</h3>";
        newdiv.innerHTML = newdiv.innerHTML + "<div style='color:white;font=weight:bold'>Candidate Id:</div><div><select id='cid'></select></div>";
        newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
        var addcand = $("#result")[0];
        addcand.appendChild(newdiv);
        $("#candidateform").hide();
        $("#candidateform").fadeIn(3500);
        data = {data:"cid"};
       
        $.post("ShowCandidateControllerServlet", data, function(responseText){
            var candidlist=JSON.parse(responseText);
            $("#cid").append(candidlist.cid);
            
            });
         $("#cid").change(function(){
                var cid=$("#cid").val();
                if(cid==='')
                {
                    swal("No selection!","Please select an id","error");
                    return;
                }
                data = {data:cid};
               
                 $.post("ShowCandidateControllerServlet", data, function(responseText){
                     clearText(); 
            var details=JSON.parse(responseText);
            $("#addresp").append(details.subdetails);
            });
            });
}
function deletecandidate()
{
     removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Remove Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div></div><select id='cid'></select></div>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span><br><div id='btn'></div>";
var addPrd=$("#result")[0];
addPrd.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn("3500");
data={data:"cid"};
  $.post("ShowCandidateControllerServlet",data,function(responseText){    
      $('#cid').append(responseText);  
      });
            
$("#cid").on('change',function()
{
      cid=$(this).children("option:selected").val();
     data={data:cid};
    $.post("ShowCandidateControllerServlet",data,function(responseText)
    {
        clearText();
        var details=JSON.parse(responseText);
        $("#addresp").append(details.subdetails);
        $("#image").append(details.image);
    });
    $("#btn").empty().append("<input type='button' value='Confirm' onclick='removeCandidate()'/>");
     });
}

function showdeleteuserform()
{
    $("#result").empty();
   
     removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","usersform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Remove Users</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>User Id:</div></div><select id='uid'></select></div>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span><br><div id='btn'></div>";
var addPrd=$("#result")[0];
addPrd.appendChild(newdiv);
$("#usersform").hide();
$("#usersform").fadeIn("3500");
data={data:"uid"};
  $.post("UsersDetailsControllerServlet",data,function(responseText){    
      $('#uid').append(responseText);  
      });
            
$("#uid").on('change',function()
{
    
      uid=$(this).children("option:selected").val();
     data={data:uid};
    $.post("UsersDetailsControllerServlet",data,function(responseText)
    {
        clearText();
        $("#addresp").append(responseText);
    });
    $("#btn").empty().append("<input type='button' value='Confirm' onclick='removeUser()'/>");
     });
}

function removeUser()
{
    data={data:uid};
    $.post("RemoveUserControllerServlet",data,function(responseText)
    {
        responseText=responseText.trim();
        if(responseText=="success")
        {
            showdeleteuserform();
            swal("success", responseText, "success");
           // $("#addresp").empty().html(responseText).css("color","green").css("font-weight","bold");
        }
        else
        {
            showdeleteuserform();
            swal("Error", responseText, "error");
           // $("#addresp").empty().html(responseText).css("color","red").css("font-weight","bold");
        }
    });
}

function showuserform()
{
    $.post("ShowUsersControllerServlet",function(responseText)
    {
       $("#result").empty().append(responseText); 
    });
}

function showupdatecandidateform(){
     removecandidateForm();
    //swal("sucess","form swaing","success")
   console.log("show candidate form start");
   var newdiv=document.createElement("div");
   newdiv.setAttribute("id","candidateform");
   newdiv.setAttribute("float","left");
   newdiv.setAttribute("padding-left","12px");
   newdiv.setAttribute("border","solid 2px red");
   newdiv.innerHTML="<h3>Update Candidate</h3>";
   newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>>\n\
<table><tr><th>City:</th><td><select id='cid' onchange='show()'></select></td></tr>\n\
<tr><th><label for='name'>UserName</label></th><td><input type='text' id='name'></td></tr>\n\
<tr><th><label for='party'>party  </label></th><td><input type='text' id='party'></td></tr>\n\
<tr><th><label for='city'>city  </label></th><td><input type='text' id='city'></td></tr>\n\
<tr><th><label for='image'>image </label></th><td><div id='image' style='width:300px;height:200px;border:solid 2px red'></div>\n\
<tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
<tr><th><input type='button' value='Update Candidate' onclick='updateCandidate()' id='addcnd'></th>\n\
<th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
console.log("show candidate form end");
var addcand=$("#result")[0];
addcand.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn("3500");
data={id:"cid"};
$.post("UpdateServlet",data,function(responseText){
    console.log("response text is "+responseText)
    var details=JSON.parse(responseText);
            var cid=details.cid;
            console.log(cid);
            var id=$("#cid");
            console.log("candidate id"+id);
            $("#cid").append(cid);
             console.log("before "+id);
});
}
function electionresult(){
    window.location.href='result.jsp';
}
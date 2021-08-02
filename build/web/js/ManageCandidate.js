function showupdatecandidateform(){
    window.location.href="";
}
function showaddcandidateform(){
     removecandidateForm();
    //swal("sucess","form swaing","success")
   console.log("show candidate form start");
   var newdiv=document.createElement("div");
   newdiv.setAttribute("id","candidateform");
   newdiv.setAttribute("float","left");
   newdiv.setAttribute("padding-left","12px");
   newdiv.setAttribute("border","solid 2px red");
   newdiv.innerHTML="<h3>Add New Candidate</h3>";
   newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>>\n\
<table><tr><th>Candidate Id:</th><td><input type='text' id='cid'></td></tr>\n\
<tr><th>User Id:</th><td><select id='uid' onchange='getDetails(event)'></select></td></tr>\n\
<tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
<tr><th>City:</th><td><select id='city'></select></td></tr>\n\
<tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
<tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
<tr><th><input type='button' value='Add Candidate' onclick='addCandidate()' id='addcnd'></th>\n\
<th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
console.log("show candidate form end");
var addcand=$("#result")[0];
addcand.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn("3500");
console.log("js file.........")
data={id:"getid"};    
$.post("AddCandidateServlet",data,function(responseText){
    
     var data=JSON.parse(responseText);
     console.log("text is "+data);
            var cid=data.cid;
            var id=data.id;
            console.log("cid is ",cid);
             console.log("uid is ",id);
    $("#cid").val(cid);
     $("#uid").append(id);
    $('#cid').prop("disabled",true)});
}
function getDetails(e){
    console.log("second ajax request");
    
         data={uid:$("#uid").val()}
       $.post("AddCandidateServlet",data,function(responseText){
            //console.log("responsetext is "+responseText);
            var details=JSON.parse(responseText);
            var name=details.username;
            var city=details.city;
            console.log(name);
            if(name==="wrong"){
		swal("Wrong Adhar!","Adhar no not found in DB","error");
                return;
            }
            $("#city").empty();
            $("#cname").val(name);
            $("#city").append(city);
        });
    
}
function addCandidate(){
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    var cid=$("#cid").val();
    var cname=$("#cname").val();
    var city=$("#city").val();
    var party=$("#party").val();
    var uid=$("#uid").val();
    data.append("cid",cid);
    data.append("uid",uid);
    data.append("cname",cname);
    data.append("party",party);
    data.append("city",city);
    $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "AddNewCandidateServlet",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                str=data.trim();
                console.log("responseText in added "+str);
                if(str=="success"){
                swal("Admin!","candidate added sucessfully", "success").then((value)=>{
                showaddcandidateform();
    })}
else if(str=='fail'){
    swal("Admin!","candidate not added", "error")
}
else{
    swal("Admin!","candidate already present from this party", "error");
}
    },
error: function (e) {
swal("Admin!", e, "success");
}
           
    });
    }
 function removecandidateForm()
{
    var contdiv=document.getElementById("result");
    var formdiv=document.getElementById("candidateform");
    if(formdiv!==null)
    {
        $("#candidateform").fadeOut("3500");
        contdiv.removeChild(formdiv);   
    }
}
   
    
    
    
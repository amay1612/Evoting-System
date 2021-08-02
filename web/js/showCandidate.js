function showcandidate(){
    removecandidateForm();
    console.log("show candidate form start");
   var newdiv=document.createElement("div");
   newdiv.setAttribute("id","candidateform");
   newdiv.setAttribute("float","left");
   newdiv.setAttribute("padding-left","12px");
   newdiv.setAttribute("border","solid 2px red");
   newdiv.innerHTML="<h3>Show Candidate</h3>";
   newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>>\n\
<table><tr><th>Candidate id:</th><td><select id='cid' onchange='shows()'></select></td></tr></table></form>"
var addcand=$("#result")[0];
addcand.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn("3500");
console.log("candidate show end");
data={id:"cid"};
$.post("ShowCandidateServlet",data,function(responseText){
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

function showAllCandidate(){
    swal("success","all candidtes ..","success");
}
function shows(){
var select=$("#cid").val();
console.log("value of selected item "+select)
if(select=='select id'){
    swal("error","select candidate id","error")
}
data={id:select};
$.post("ShowCandidateServlet",data,function(responseText){
    //console.log("responseText in show "+responseText);
     var details=JSON.parse(responseText);
     var tab=details.table;
     console.log(tab);
    var addcand=document.getElementById("data");
    console.log("add candidate"+addcand);
    addcand.innerHTML="";
    addcand.innerHTML=addcand.innerHTML+tab;
});

}

function removecandidateForm()
{
    var addcand=document.getElementById("data");
    addcand.innerHTML="";
    var contdiv=document.getElementById("result");
    var formdiv=document.getElementById("candidateform");
    if(formdiv!==null)
    {
        $("#candidateform").fadeOut("3500");
        contdiv.removeChild(formdiv);   
    }
    
}




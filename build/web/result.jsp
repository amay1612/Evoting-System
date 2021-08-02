<%-- 
    Document   : ManageCandidate
    Created on : May 11, 2021, 5:24:57 PM
    Author     : RC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
         <title> manage candidate</title>
        <link href="css/backgroundimage.css" rel="stylesheet">
        <link href="css/admin.css" rel="stylesheet">   
        <link href="css/pageheader.css" rel="stylesheet">
        <link href="css/result.css" rel="stylesheet">
        <script src="js/jquery.js"></script>    
        <script src="js/ShowResult.js"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js""></script> 
    </head>
    <body>
        <%
            String userid=(String)session.getAttribute("userid");
            if(userid==null)
            {
                response.sendRedirect("AccessDenied.html");
                return;
            }
            session.setAttribute("userid",userid);
            StringBuffer displayBlock=new StringBuffer("");
            displayBlock.append("<div class='sticky'><div class='candidate'>VOTE FOR CHANGE</div><br>"+
            "<div class='subcandidate'>Show Result</div><br><br>");
            displayBlock.append("<div class='logout'><a href='Login.html'>logout</a></div></div>");
            displayBlock.append("<div class='container'>");
            displayBlock.append("<div id='dv3' onclick='showCityWise()'>"
                    + "<img src='images/voteResult.jpg' height='300px' width='300px'>"
                    + "<br><h3>Show City Wise</h3></div>");
             displayBlock.append("<div id='dv4' onclick='showPartyWise()'>"
                    + "<img src='images/ResultPartyWise.jpg' height='300px' width='300px'>"
                    + "<br><h3>Show Party Wise</h3></div>");
              
             displayBlock.append("</div>");
             displayBlock.append("<br><br><div align='center' id='result'></div>");
             displayBlock.append("<br><br><div align='center' id='data'></div>");
             out.println(displayBlock);


            %>
    </body>
</html>


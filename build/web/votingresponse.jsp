<%-- 
    Document   : votingresponse
    Created on : 8 Jun, 2021, 12:26:55 AM
    Author     : amay saxena
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="evoting.dto.CandidateInfo" %>
<html>
   <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <link href="css/backgroundimage.css" rel="stylesheet">
        <link href="css/pageheader.css" rel="stylesheet">
        <link href="css/showcandidate.css" rel="stylesheet">
        <title>Voting Details</title>
    </head>
<body>
    <%
         String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        session.invalidate();    
        response.sendRedirect("accessdenied.html");
        return;
    }
    CandidateInfo c=(CandidateInfo)session.getAttribute("candidate");
    StringBuffer displayBlock=new StringBuffer();
    displayBlock.append("<div class='sticky'><div class='candidate'>VOTE FOR CHANGE</div><br>");
    if(c==null)
    {
        displayBlock.append("<div class='subcandidate'>Sorry! Your vote could not be casted</div><br><br>");
        displayBlock.append("<div><h4 id='logout><a href='LoginControllerServlet?logout=logout'>Logout</a></h4></div>");
        out.println(displayBlock);
    }
    else
    {
        displayBlock.append("<div class='subcandidate'>Thank You for voting!! Have Fun</div><br><br>");
        displayBlock.append("<div class='candidateprofile'>Your vote added successfully!</div>");
        displayBlock.append("<br><div class='candidateprofile'><p> CandidateId:"+c.getCandidateId()+"<br>");
        displayBlock.append("<strong>You voted for </strong><br><img src='data:image/jpg;base64,"+c.getSymbol()+"'style='width:300px;height:200px;'/>");
        displayBlock.append("<br><div class='candidateprofile'><p> CandidateId:"+c.getCandidateId()+"<br>");  
        displayBlock.append("Candidate Name:"+c.getCandidateName()+"<br>");                
        displayBlock.append("Party:"+c.getParty()+"<br></div>"); 
        out.println(displayBlock);
    }
    %>
</body>
</html>
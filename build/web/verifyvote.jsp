<%-- 
    Document   : verifyvote
    Created on : 8 Jun, 2021, 12:23:11 AM
    Author     : amay saxena
--%>

<%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        session.invalidate();    
        response.sendRedirect("accessdenied.html");
        return;
    }
    boolean result=(boolean)request.getAttribute("result");
    if(result==true)
    {
        out.println("success");
    }
    else
        out.println("failed");
    
%>
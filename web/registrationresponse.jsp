<%-- 
    Document   : registrationresponse
    Created on : 11 May, 2021, 12:16:30 AM
    Author     : amay saxena
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<% 
    boolean result=(boolean)request.getAttribute("result");
    boolean userfound=(boolean)request.getAttribute("userfound");
    if(userfound==true)
        out.println("uap");
    else if(result==true)
        out.println("success");
    else
        out.println("error"); 
%>
 
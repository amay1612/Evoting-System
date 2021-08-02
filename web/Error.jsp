<%-- 
    Document   : Error
    Created on : May 1, 2021, 7:06:08 PM
    Author     : RC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    Exception ex=null;
   ex=(Exception)request.getAttribute("exception");
   out.println("some error occours "+ex);
   ex.printStackTrace();
    %>
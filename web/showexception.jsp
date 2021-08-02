<%-- 
    Document   : showexception
    Created on : 11 May, 2021, 12:20:53 AM
    Author     : amay saxena
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
   Exception ex=(Exception)request.getAttribute("Exception");
   System.out.println("Exception is :"+ex);
   out.println("Some Exception occured:"+ex.getMessage());
%>

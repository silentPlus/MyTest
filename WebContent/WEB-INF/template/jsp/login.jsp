<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>  
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:import url="component/importcommon.jsp"></c:import>
<c:set var="ctx" value="http://192.168.9.124/mytest" scope="request"/> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>  
  <head>  
    <title>My JSP 'MyJsp.jsp' starting page</title> 
    <script type="text/javascript">
	    $(function(){
	    	console.log("message:${message}");
	    	console.log("ctx:${ctx}");
	    	//window.location.href = "${ctx}/aaa/bbb.html";
	    });
    </script> 
  </head>  
    
  <body> 
    <h1>登录页面<c:if test="${not empty message}">----${message }</c:if></h1>  
    <form action="login" id="form">  
        用户名：<input id="username" /> <br/> 
        密 &nbsp;&nbsp;码：<input type="password" id="password"/> <br/>  
    <input type="submit" id="submit" name="登录" />  
    <button id="button">ajax提交登录</button>
    </form>  
    <script type="text/javascript">
    $("#button").click(function(){
    	window.location.href = "${ctx}/aaa/bbb.html";
		//alert("${ctx}/home/login.html");
		/* $.ajax({
			url : "${ctx}/home/login.html",
			async : false,
			type : 'POST',
			cache:false,
			data : {
				username : $("#username").val(),
				password : $("#password").val()
			},
			dataType : 'json',
			timeout : 15000,
			beforeSend : function(xhr) {
				alert("before");
			},
			complete : function(xhr, ts) {
				alert("complete");
				window.location.href = "http://www.baidu.com";
			},
			error : function(xhr, ts, eh) {
				alert("error");
			},
			success : function(response) {
				alert("success");
				var json = eval(response);
				if (0===json.status){
					url = json.result;
					//alert(url);
					//window.location.href = "http://www.baidu.com";
                } else if (1===json.status){
                    alertDlg(json.message);
                }
			}
		}); */
	});
    </script>
  </body>  
</html>  

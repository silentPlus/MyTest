<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>  
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set var="ctx" value="http://192.168.9.124/mytest" scope="request"/> 
<script src=""WebContent/resources/js/jquery.js""></script>
<script src="http://cdn.bootcss.com/jquery/2.1.3/jquery.min.js"></script>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
<html>  
  <head>  
    <title>My JSP 'MyJsp.jsp' starting page</title> 
    <script type="text/javascript">
	    $(function(){
	    	console.log("message:${message}");
	    	console.log("ctx:${ctx}");
	    });
    </script> 
  </head>  
    
  <body> 
    <h1>登录页面<c:if test="${not empty message}">----${message }</c:if></h1>  
    <form action="login" id="form">  
        用户名：<input id="username" /> <br/> 
        密 &nbsp;&nbsp;码：<input type="password" id="password"/> <br/>  
    <button id="button" type="button" >ajax提交登录</button>
    </form>  
    <input type="button" value="click" onclick="test();" />  
    <script type="text/javascript">
    
    function test(){  
         /* $.post('${ctx}/aaa/bbb.html','',function(result){  
            alert(result);  
        });  */
        $.ajax({
			url : "${ctx}/aaa/bbb.html",
			async : false,
			type : 'POST',
			cache:false,
			data : {
				username : $("#username").val(),
				password : $("#password").val()
			},
			dataType : 'json',
			timeout : 15000,
			beforeSend : function() {
			},
			complete : function(XMLHttpRequest,textStatus) {
				console.log("complete:"+JSON.stringify(XMLHttpRequest));
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("error:"+JSON.stringify(XMLHttpRequest));
				console.log("error:"+textStatus);
				console.log("error:"+errorThrown);
			},
			success : function(response) {
				console.log("success:"+JSON.stringify(response));
			}
		});
    }  
    
    
    $("#button").click(function(){
		$.ajax({
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
			beforeSend : function() {
			},
			complete : function(XMLHttpRequest,textStatus) {
				/* if(textStatus=="parsererror"){
		               $.messager.alert('提示信息', "登陆超时！请重新登陆！", 'info',function(){
		                   window.location.href = 'login.jsp';
		               });
		          } else if(textStatus=="error"){
		              $.messager.alert('提示信息', "请求超时！请稍后再试！", 'info');
		          } */
			},
			error : function() {
				alert("error");
			},
			success : function(response) {
				var json = eval(response);
				if (0===json.status){
					url = json.result;
					window.location.href = "${ctx}/aaa/bbb.html";
                } else if (1===json.status){
                    alert(json.message);
                    window.location.reload();
                }
			}
		});
	});
    </script>
  </body>  
</html>  

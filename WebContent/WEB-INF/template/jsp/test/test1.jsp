<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<base href="<%=basePath%>">


<title>测试</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">

<script type="text/javascript" src="<%=basePath%>js/jquery.js"></script>
<script language="javascript" src="js/script.js"></script>
<link type="text/css" rel="Stylesheet"
	href="<%=basePath%>App_Themes/Default/style.css" />

<script type="text/javascript">

</script>

</head>

	
	
<body >
	hello,world
	
	<script type="text/javascript">
	var itemInfos = ${itemInfos};
	</script>
<script type="text/javascript" src="http://tajs.qq.com/h5?sId=500000817" charset="UTF-8"></script></body>
</html>

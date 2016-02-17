<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
<title>jsApiDemo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<c:import url="component/importcommon.jsp"></c:import>
<script type="text/javascript" src="${ctx}/lib/template.js"></script>
<style type="text/css">
.header,.footer{height:45px;line-height:45px;background:#ff0000;}
.itemline{height:60px;line-height:60px;border:1px solid #eee;}
.scroller{overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;}
.scroller::-webkit-scrollbar{width:0;background:none}
</style>
</head>
<body>


<div class="container-fluid">
	<div class="row">
		<div class="col-xs-12 header">
		header
		</div>
	</div>
	<div class="row scroller">
		<div class="itemline col-xs-12">1</div>
		<div class="itemline col-xs-12">2</div>
		<div class="itemline col-xs-12">3</div>
		<div class="itemline col-xs-12">4</div>
		<div class="itemline col-xs-12">5</div>
		<div class="itemline col-xs-12">6</div>
		<div class="itemline col-xs-12">7</div>
		<div class="itemline col-xs-12">8</div>
		<div class="itemline col-xs-12">9</div>
		<div class="itemline col-xs-12">0</div>
		<div class="itemline col-xs-12">1</div>
		<div class="itemline col-xs-12">2</div>
		<div class="itemline col-xs-12">3</div>
		<div class="itemline col-xs-12">4</div>
		<div class="itemline col-xs-12"><input type="text" value="" id="text" name="text" /></div>
		<div class="itemline col-xs-12">6</div>
		<div class="itemline col-xs-12">7</div>
		<div class="itemline col-xs-12">8</div>
		<div class="itemline col-xs-12">9</div>
		<div class="itemline col-xs-12">0</div>
		<div class="itemline col-xs-12">1</div>
		<div class="itemline col-xs-12">2</div>
		<div class="itemline col-xs-12">3</div>
		<div class="itemline col-xs-12">4</div>
	</div>
</div>


<script type="text/javascript">

var data = JSON.parse('${map}');
//var data = eval("(" + '${map}' + ")");
console.log(data);
console.log("data['a']" + data["a"][0]);



var wch = document.documentElement.clientHeight;
var wsh = wch-$(".header").outerHeight(true);
$(".scroller").css("height", wsh);


$(window).on('resize', function(){
	//var ch = document.documentElement.clientHeight;
	//$(".header").text(ch);
	//var sh = ch-$(".header").outerHeight(true);
	//$(".scroller").css("height", sh);
	//$(".scroller").scrollTop($(".scroller").scrollTop()+wch-ch);
	// var t = document.documentElement.scrollTop || document.body.scrollTop;
	//alert($(".scroller").scrollTop());



	//var st = $(".scroller").scrollTop();
	//$(".scroller").scrollTop(st);

	$(".header").text("wch:" + wch + ",ch:" + ch + ",st:" + $(".scroller").scrollTop());
});
</script>
<script type="text/javascript" src="http://tajs.qq.com/h5?sId=500000817" charset="UTF-8"></script></body>

</html>
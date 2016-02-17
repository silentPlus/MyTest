<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
<title>修改卡密码</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<c:import url="component/importcommon.jsp"></c:import>
<script src="${ctx}/lib/template.js"></script>
<script type="text/javascript" src="${ctx}/js/localstorage.js"></script>
<script type="text/javascript" src="${ctx}/lib/seapopup/seapopup.js?v201601271600"></script>
<link rel="stylesheet" href="${ctx}/lib/seapopup/sea-plugins-style.css?v20150130119" >
<style>

	.couponFixWidth{ width:290px !important;  height: 105px;background: url( ${ctx}/imgs/available_coupon.png ) no-repeat;background-size: 290px 105px;   margin: 10px auto;padding-top: 19px; }
	.unavailableCoupon{ background: url( ${ctx}/imgs/unavailable_coupon.png ) no-repeat;background-size: 290px 105px; }
	.available{ line-height: 40px;background:#fff;border-bottom:1px solid #fff; font-size:16px; }
	.available a{ border:none !important; }
	.available.active{ border-bottom:1px solid #f7941e;  background:#fff !important;}
	.grayFont{ color:#757575; }
	.active {background: #f0f0f0}
	.bgorange{ background: #f7941e; }
	.secondLdetail{ padding-left: 0px; }
	body{overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;}
	body::-webkit-scrollbar{width:0;background:none}
	.nav li.active a {color:#f7941e!important;}
	.ht34 {height:34px;line-height:34px;}
	#sendCodeBtn {border-left:1px solid #dedede!important;border-radius:0!important;width:100%;}
</style>
</head>
<body>
	<!-- 头部  回退按钮加入返回事件！！！ -->
	<div class="commonHeaderBar">
		<div class="commonHeaderBar-word-can"><span class="commonHeaderBar-word">修改卡密码</span></div>
		<i class="iconfont pull-left icon_left">&#xe611;</i>
		<i class="iconfont pull-right icon_right"></i><!-- &#xe636; -->
	</div>

	<!--这里面是有券的时候-->
	<div id="haveModifyPassport" class="container-fluid mt50 ModifyPassport">
	<script id="ModifyPassport" type="text/html">
	<ul class="row nav nav-tabs" role="tablist">
		<li class="col-xs-6 text-center available active  button01" role="presentation"><a href="#available" class ="fb" role="tab" data-toggle="tab">原密码校验</a></li>
		<li class="col-xs-6 text-center available button02" role="presentation"><a href="#unavailable" class ="fb" role="tab" data-toggle="tab">验证码校验</a></li>
	</ul>
	<div class="tab-content">
		<div class="row tab-pane active" id="available">
					<div class="col-xs-12 bgw seperatedLine mt0"></div>
					<div class="row pb10">
						<div class="col-xs-12 text-center lh34">
							<span class="f12 fc8d lhsm pt15">您要修改密码对应的卡号是</span><br>
							<span class="f18 fb lhsm">1234567890123</span><br>
						</div>
					</div>
					<div class="row bgw mb10">
					    <div class="col-xs-12 bgw seperatedLine mt0"></div>
					    <div class="col-xs-12 text-center f16 bgw ht34">
							<input type="password" class="form-control inputNoBorderShadow f16" id="oldPassport01" placeholder="请输入原密码">
						</div>
						<div class="col-xs-12 bgw seperatedLine mb0"></div>
					</div>
					<div class="row bgw">
					    <div class="col-xs-12 bgw seperatedLine mt0"></div>
					    <div class="col-xs-12 text-center f16 bgw ht34">
							<input type="password" class="form-control inputNoBorderShadow f16" id="newPassport01" placeholder="请输入新密码">
						</div>
						<div class="col-xs-12 seperatedLine"></div>
						<div class="col-xs-12 text-center f16 bgw ht34">
							<input type="password" class="form-control inputNoBorderShadow f16" id="confirmPassport01" placeholder="确认密码">
						</div>
						<div class="col-xs-12 bgw seperatedLine mb0"></div>
					</div>
					<div class="col-xs-12 mt30">
						<button type="button" class="btn btn-warning btn-block">保存</button>
					</div>
		</div>

		<div class="row tab-pane" id="unavailable">
			<div class="col-xs-12 bgw seperatedLine mt0"></div>
					<div class="row pb10">
						<div class="col-xs-12 text-center lh34">
							<span class="f12 fc8d lhsm pt15">您所验证的手机号是</span><br>
							<span class="f18 fb lhsm">12312341234</span><br>
						</div>
					</div>
					<div class="row bgw mb10">
					    <div class="col-xs-12 bgw seperatedLine mt0"></div>
					    <div class="col-xs-8 text-center f16 bgw ht34">
							<input type="password" class="form-control inputNoBorderShadow f16" id="oldPassport02" placeholder="请输入验证码">
						</div>
						<div class="col-xs-4 pl0 pr0">
							<span id="sendCodeBtn" class="btn text-center f16 fb">获取验证码</span>
						</div>
						<div class="col-xs-12 bgw seperatedLine mb0"></div>
					</div>
					<div class="row bgw">
					    <div class="col-xs-12 bgw seperatedLine mt0"></div>
					    <div class="col-xs-12 text-center f16 bgw ht34">
							<input type="password" class="form-control inputNoBorderShadow f16" id="newPassport02" placeholder="请输入新密码">
						</div>
						<div class="col-xs-12 seperatedLine"></div>
						<div class="col-xs-12 text-center f16 bgw ht34">
							<input type="password" class="form-control inputNoBorderShadow f16" id="confirmPassport02" placeholder="确认密码">
						</div>
						<div class="col-xs-12 bgw seperatedLine mb0"></div>
					</div>
					<div class="col-xs-12 mt30">
						<button type="button" class="btn btn-warning btn-block">保存</button>
					</div>
		</div>
	</div>
	</script>
	</div>
<script type="text/javascript">



// startdowncount($("#sendCodeBtn").text(), 60);

	$(function(){



		var ModifyPassportHtml = template("ModifyPassport");
		$(".ModifyPassport").html(ModifyPassportHtml);
		var value01;
		var value02;
		$(".button02").click(function(){
			var value01 = $("#newPassport01").val();
			var value03 = $("#confirmPassport01").val();
			$("#newPassport02").val(value01);
			$("#confirmPassport02").val(value03);
		})
		$(".button01").click(function(){
			var value02 = $("#newPassport02").val();
			var value04 = $("#confirmPassport02").val();
			$("#newPassport01").val(value02);
			$("#confirmPassport01").val(value04);
		})


		//添加验证码倒计时
/* function startdowncount(txt, nowcount) {
	var $s = $("#sendCodeBtn");
	if (isNaN(parseInt(nowcount)) || (nowcount < 1)){
		$s.text(txt).removeClass("disabled");
	} else {
		$s.text("重新发送(" + nowcount-- + ")").addClass("disabled");
		setTimeout("startdowncount('" + txt + "'," + nowcount + ")",1000);
	}
} */


		/* 验证码倒计时插件，seconds倒计时秒 暂时支持span按钮
		$.fn.captchaCountDown = function(seconds){
			// 可点击
			if (!$(this).hasClass("disabled")){
				var $t = $(this);
				var defaultName = $(this).text();
				var interObj = window.setInterval(function(){
					if (isNaN(parseInt(seconds)) || (seconds < 1)){
						$t.text(defaultName).removeClass("disabled");
						window.clearInterval(interObj);//停止计时器
					} else {
						$t.text("重新发送(" + seconds-- + ")").addClass("disabled");
					}
				}, 1000);
			}
			return $(this);
		}; */

		$("#sendCodeBtn").click(function(){
			var $this = $(this);
			$.ajax({
				url : 'ajaxRequest.html',
				async : true,
				type : 'POST',
				cache : false,
				data : {},
				dataType : 'json',
				timeout : 15000,
				beforeSend : function(xhr) {
					$this.addClass("disabled").attr("initText", $this.text()).text("发送中...");
				},
				complete : function(xhr, ts) {},
				error : function(xhr, ts, eh) {
					console.log("error");
					console.log("xhr.status:" + xhr.status);
					console.log("xhr.statusText:" + xhr.statusText );
					console.log("xhr.readyState:" + xhr.readyState );
					console.log("ts:" + ts);
					console.log("eh:" + eh);
					alertDlg("短信发送异常:" + eh);
				},
				success : function(data, st, xhr) {

					console.log("success");
					console.log("xhr.status:" + xhr.status);
					console.log("xhr.statusText:" + xhr.statusText );
					console.log("xhr.readyState:" + xhr.readyState );
					console.log("st:" + st);

					var json = eval(data);
					console.log("json.islogin:" + json.islogin);
					if (0 === json.status) {
						$this.captchaCountDown(json.lefttime);
					} else {
						$this.removeClass("disabled");
						if (1 === json.status) {
							alertDlg(json.message);
						} else if (2 === json.status) {
							$("#oldPassport02").val(json.result);
						} else if (3 === json.status) {
							alertDlg(json.message, function() {
								//wx.closeWindow();
								WeixinJSBridge.call("closeWindow");
							});
						} else if (405 === json.status) {
							console.log("333"+st);
							console.log("xhr.status:" + xhr.status);
							console.log("xhr.statusText :" + xhr.statusText );
							alertDlg(json.message);
						}
					}
				}
			});

		})
	});
</script>
<script type="text/javascript" src="http://tajs.qq.com/h5?sId=500000817" charset="UTF-8"></script></body>
</html>
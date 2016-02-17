<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<!DOCTYPE html><html>    <head>        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">    </head>    <body>        <script type="text/javascript">
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    var isAndroid = ua.indexOf('android') != -1;
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
    // function onReady(){
    //     if(isAndroid) {
    //         if (history.length && history.length > 1) {
    //             history.back();
    //         } else {
    //             WeixinJSBridge.invoke('closeWindow');
    //         }
    //     }
    // }
    // document.addEventListener?document.addEventListener("WeixinJSBridgeReady",onReady,!1):document.attachEvent&&document.attachEvent("onWeixinJSBridgeReady",onReady);
    //if (!isWeixin) {
        document.head.innerHTML = '<title>提示信息</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/connect/zh_CN/htmledition/style/wap_err1a9853.css">';
        document.body.innerHTML = '<div class="page_msg"><div class="inner"><span class="msg_icon_wrp"><i class="icon80_smile"></i></span><div class="msg_content"><h3>${errorMsg}</h3></div></div></div>';
   // }
</script>    <script type="text/javascript" src="http://tajs.qq.com/h5?sId=500000817" charset="UTF-8"></script></body></html>
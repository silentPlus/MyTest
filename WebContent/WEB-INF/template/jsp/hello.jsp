<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <!-- Bootstrap core CSS -->
    <script data-main="${ctx}/ngjsbiz/mp/main.js" src="${ctx}/ngjsbiz/mp/scripts/require.js"></script>

    <link href="${ctx}/ngcssbiz/style/main.css" rel="stylesheet">
    <link href="${ctx}/ngcssbiz/style/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="${ctx}/ngcssbiz/style/iconfont.css">
    <link rel="stylesheet" href="${ctx}/ngcssbiz/style/angular-block-ui.min.css">

    <style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\:form{display:block;}.ng-animate-start{clip:rect(0,auto,auto,0);-ms-zoom:1.0001;}.ng-animate-active{clip:rect(-1px,auto,auto,0);-ms-zoom:1;}</style>

    </head>
<body>
    <!--[if lt IE 9]>
    <p class="browsehappy">你正在使用一个 <strong>过时</strong> 浏览器. 请升级你的浏览器获得更好的体验.<br>推荐使用chrome谷歌浏览器!</p>
    <![endif]-->
    <div id="mainMenu" ng-show="showSideBar.isShow" style="display:none;">
        <!------- header ----------->
        <%--<section class="top-header" id="header">--%>
            <%--<header class="clearfix">--%>
                <%--<div class="logo">--%>
                    <%--<img height="30px" src="${ctx}/ngcssbiz/img/wuuxianglogo.png">--%>
                    <%--&nbsp;&nbsp;--%>
                    <%--<span class="hidden-xs">商户网关接口平台</span>--%>
                    <%--<span class="hidden-xs betaLogo"></span>--%>
                <%--</div>--%>
                <%--<div class="menu-button" ng-click="toggle()">--%>
                    <%--<span class="icon-bar"></span>--%>
                    <%--<span class="icon-bar"></span>--%>
                    <%--<span class="icon-bar"></span>--%>
                <%--</div>--%>
                <%--<div ng-show="displayContent" class="top-nav hidden-xs">--%>
                    <%--<ul class="nav-left list-unstyled ">--%>
                        <%--<li class="text-normal dropdown" ng-class="open">--%>
                            <%--<a class="text-success pointer"  ng-click="dropdown()">&nbsp;--%>
                                <%--<i class="fa fa-user fa-fw nav-icon"></i>--%>
                                <%--<span class="hidden-xs" ng-cloak>{{ userName }} - {{ apiname }} </span>--%>
                            <%--</a>--%>
                            <%--<ul class="dropdown-menu">--%>
                                <%--<li><a href="">hahaha</a></li>--%>
                                <%--<li><a href="">kilololo</a></li>--%>
                            <%--</ul>--%>
                        <%--</li>--%>

                        <%--<li class="text-normal">--%>
                            <%--<a class="text-success pointer">&nbsp;--%>
                                <%--<span class="hidden-xs">商户名称 [{{ shopname }}]</span>--%>
                            <%--</a>--%>
                        <%--</li>--%>
                        <%--<li class="text-normal">--%>
                            <%--<a class="text-success pointer" ng-click="logout()">--%>
                                <%--<i class="fa fa-sign-out"></i>--%>
                                <%--<span class="hidden-xs">退出</span>--%>
                            <%--</a>--%>
                        <%--</li>--%>
                    <%--</ul>--%>
                <%--</div>--%>
            <%--</header>--%>
    <%--</section>--%>
        <!-------- sidebar -------->
        <%--<aside id="nav-container">--%>
            <%--<div id="nav-wrapper" class="ng-scope">--%>
                <%--<ul id="nav">--%>
                    <%--<li ng-class="{true:'text-normal active',false:'text-normal'}[btnCtrl.isAuthorize]" ng-click="changeChannel('main/authorize')">--%>
                        <%--<a class="text-success">--%>
                            <%--<i class="fa fa-lock fa-fw icon-key"></i>--%>
                            <%--<span>--%>
                                <%--授权管理--%>
                            <%--</span>--%>
                        <%--</a>--%>
                        <%--<i class="fa fa-caret-right icon-has-ul"></i>--%>
                    <%--</li>--%>

                    <%--<li ng-class="{true:'text-normal active',false:'text-normal'}[btnCtrl.isAutoreply]" ng-click="changeChannel('main/autoreply')" >--%>
                        <%--<a class="text-success">--%>
                            <%--<i class="fa fa-reply fa-fw icon-key"></i>--%>
                            <%--<span>--%>
                                <%--自定义回复--%>
                            <%--</span>--%>
                        <%--</a>--%>
                        <%--<i class="fa fa-caret-right icon-has-ul"></i>--%>
                    <%--</li>--%>

                    <%--<li ng-class="{true:'text-normal active',false:'text-normal'}[btnCtrl.isDiymenu]" ng-click="changeChannel('main/diymenu')">--%>
                        <%--<a class="text-success">--%>
                            <%--<i class="fa fa-edit fa-fw icon-key"></i>--%>
                            <%--<span>--%>
                                <%--自定义菜单--%>
                            <%--</span>--%>
                        <%--</a>--%>
                        <%--<i class="fa fa-caret-right icon-has-ul"></i>--%>
                    <%--</li>--%>
                    <%--<li ng-class="{true:'text-normal active',false:'text-normal'}[btnCtrl.isQrcodenew]" ng-click="changeChannel('main/shopqrcodenew')">--%>
                        <%--<a class="text-success">--%>
                            <%--<i class="fa fa-qrcode fa-fw icon-key"></i>--%>
                            <%--<span>--%>
                                <%--带参二维码--%>
                            <%--</span>--%>
                        <%--</a>--%>
                        <%--<i class="fa fa-caret-right icon-has-ul"></i>--%>
                    <%--</li>--%>

                    <%--<li ng-class="{true:'text-normal active',false:'text-normal'}[btnCtrl.isTemplatemessage]" ng-click="changeChannel('main/templatemessage')">--%>
                        <%--<a class="text-success">--%>
                            <%--<i class="fa fa-fw icon-key">--%>
                                <%--<i class="iconfont pull-right icon_right" style="padding-right:2px;">&#xe65a</i>--%>
                            <%--</i>--%>
                            <%--<span>--%>
                                <%--模板消息--%>
                            <%--</span>--%>
                        <%--</a>--%>
                        <%--<i class="fa fa-caret-right icon-has-ul"></i>--%>
                    <%--</li>--%>
                    <%--<li ng-class="{true:'text-normal active',false:'text-normal'}[btnCtrl.isApimgmt]" ng-click="changeChannel('main/apimgmt')">--%>
                        <%--<a class="text-success">--%>
                            <%--<i class="fa fa-sitemap fa-fw icon-key"></i>--%>
                            <%--<span>--%>
                                <%--接口管理--%>
                            <%--</span>--%>
                        <%--</a>--%>
                        <%--<i class="fa fa-caret-right icon-has-ul"></i>--%>
                    <%--</li>--%>

                <%--</ul>--%>
            <%--</div>--%>
        <%--</aside>--%>
        <!---------content------------>
        <%--<div class="view-container">--%>
            <%--<section id="content" ng-class="{true: 'animate-fade-up', false: 'animate-fade-up noLogin'}[ showSideBar.isShow ]" class="animate-fade-up noLogin">--%>
                <%--<div class="ng-scope" ng-view>--%>

                <%--</div>--%>
                <%--<footer class="footer">--%>
                    <%--<p class="text-center" ng-class="{true: '', false: 'noLogin_foot'}[ showSideBar.isShow ]">--%>
                        <%--Copyright © 1998-2016 吾享(天津)网络科技有限公司版权所有 Wuuxiang.All Rights Reserved--%>
                    <%--</p>--%>
                <%--</footer>--%>
            <%--</section>--%>
        <%--</div>--%>
    </div>
    <script type="text/javascript" src="http://tajs.qq.com/h5?sId=500000817" charset="UTF-8"></script>
    <script>
    window.onload = function(){
        setTimeout(function(){
            var mainMenu = document.getElementById( "mainMenu" );
            mainMenu.style.display = "block";
        },2000);
    }
    </script>
</body>
</html>
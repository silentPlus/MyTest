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
    <%-- ${ msg }&nbsp;&nbsp;${ txt } --%>
    <div id="mainMenu" ng-show="showSideBar.isShow" style="display:none;">
        <img style="position:fixed;left:0;top:0;height:100%;width:100%;z-index:-1" class="img-responsive" ng-src="../ngcssbiz/img/bg.jpg">
        <div class="page" ng-controller="loginController" ng-init="initializeController()">
            <div class="row">
                <div class="page-sign">
                    <div class="sign-body" style="border-top:none;padding-top:100px;">
                        <div class="container">
                            <div class="form-container login-form">
                                <h4 style="margin-top:0;margin-bottom:30px;font-weight:bold;">欢迎使用吾享商户接口平台</h4>
                                <form ng-submit="processForm()">
                                    <fieldset>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <span class="input-group-addon">
                                                    <span class="glyphicon glyphicon-user"></span>
                                                </span>
                                                <input type="text" maxlength="" ng-model="formData.loginuser" ng-minlength="" placeholder="登录账号" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <span class="input-group-addon">
                                                    <span class="glyphicon glyphicon-lock"></span>
                                                </span>
                                                <input type="password" ng-model="formData.pwd" maxlength="20" placeholder="密码" class="form-control">
                                            </div>
                                            <h5 style="margin-top:20px"><div style="cursor:pointer" ng-click="forgetPwd()">忘记密码？</div></h5>
                                        </div>
                                        <div class="form-group">
                                            <button class="btn btn-primary btn-block" type="submit">
                                                立即登录
                                            </button>
                                            <h5 style="margin:20px 0 10px 0;">如果您还没有账户，请注册新账户</h5>
                                            <a class="btn btn-danger btn-block" ng-click="registerNew()">
                                                注册新账号
                                            </a>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
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
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set var="ctx" value="http://192.168.9.124/mytest" scope="request"/> <%-- [scope="{page|request|session|application}"] --%>
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=0">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="expires" content="0">
<!-- <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script> -->
<script src="http://cdn.bootcss.com/jquery/2.1.3/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="${ctx}/js/jquery.js"><\/script>');</script>
<!-- 新 Bootstrap 核心 CSS 文件 -->
<%-- <script type="text/javascript" src="${ctx}/js/bootstrap.min.js"></script> --%>
<!-- <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css"> -->
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="${ctx}/stylesheet/base.css?v=201601271600" />
<link rel="stylesheet" href="${ctx}/stylesheet/common.css?v=201601271600" />
<script type="text/javascript" src="${ctx}/js/plugin.js?v=201601271600"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<%-- <link rel="stylesheet" href="${ctx}/css/bootstrap.min.css" > --%>
<link rel="stylesheet" href="${ctx}/fonts/iconfont.css" />
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<!-- <script src="http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min.js"></script> -->
<script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/js/toolutil.js?v=201601271600"></script>
<!-- <script src="http://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script> -->
<style type="text/css">
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1453788322_3369179.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1453788322_3369179.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/font_1453788322_3369179.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/font_1453788322_3369179.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1453788322_3369179.svg#iconfont') format('svg'); /* iOS 4.1- */
}
</style>

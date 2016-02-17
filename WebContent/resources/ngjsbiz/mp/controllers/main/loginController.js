"use strict";

define(['application-configuration', 'accountsService', 'alertsService','jquery','toolsService'], function (app,jquery) {

    app.register.controller('loginController', ['$scope', '$rootScope', '$sce', 'accountsService', 'alertsService', 'toolsService', function ($scope, $rootScope, $sce, accountsService, alertsService,toolsService) {

        //$scope.info = " login ";
    	$rootScope.siteTitle ="欢迎登录";
    	//每一个controller都要加上这么一个判断，验证当前用户是不是登录状态
    	//accountsService.authenicateUser();
    	$rootScope.closeAlert = alertsService.closeAlert;
        $rootScope.alerts = [];
    	$scope.initializeController = function () {
    		//$scope.UserName = "hello";
            //$scope.Password = "world";
            alertsService.RenderSuccessMessage(  $sce.trustAsHtml( "如果您没有账户，请注册新账户" ) );
    	}

    	//$scope.login = function(){
    	//	$rootScope.IsloggedIn = false;
    	//}

       $scope.processForm = function() {
    	  //console.log( $scope.formData );
    	  //var serializeStr = "cloginuser=" + $scope.formData.UserName + "&cpwd=" + $scope.formData.Password ;
    	  var serializeStr = $.param($scope.formData);
    	  if( $scope.formData.loginuser !== "" && $scope.formData.pwd !== "" ){
    		  accountsService.login( serializeStr , $scope.loginCompleted, $scope.loginError);
    	  }else{
    		  toolsService.alertInfo( "请填写登录账号或密码" );
    	  }

       };

	   $rootScope.logout = function(){
		   //console.log($scope.isAuthorize);
		   //console.log($scope.btnCtrl);
		   accountsService.logout( logoutSuccess,logoutError );
	   };



	   var logoutSuccess = function( responce ){
		   toolsService.jumpStaticUrl( "main/login" );
		   //console.log($scope.btnCtrl);
		   //登出的时候把按钮的active都恢复回去
		   //$rootScope.btnCtrl = {};
		   //$rootScope.btnCtrl.hello = 12;
		   //$scope.serBtnCtrl1(1233);
       	   //$rootScope.btnCtrl.isAutoreply = false;
       	   //$rootScope.btnCtrl.isDiymenu = false;

		   for( var p in $scope.btnCtrl ){
			   $scope.btnCtrl[p] = false;
		   }
       	   $rootScope.displayContent = false;
       	   $rootScope.IsloggedIn = false;
       	   $rootScope.showSideBar.isShow = false;
       	   //console.log( $rootScope.IsloggedIn );

		   console.log( "登出成功" , responce );
	   }
	   var logoutError = function( responce ){
		   console.log( responce );
	   }

	   $scope.loginCompleted = function ( response ) {
           if( response.status == 0 ){
			   $rootScope.IsloggedIn = true;
			   $rootScope.displayContent = true;
			   $rootScope.showSideBar.isShow = true;
			   //$rootScope.userName = loginObj.mpUser.cLoginName; 此处要调用新的接口请求用户信息  在 indexcontroller里面和 authentionuser里面
			   toolsService.jumpStaticUrl( "main/authorize" );
           }else if( response.status == 1 ){
        	   toolsService.dialogInfo(  $sce.trustAsHtml( response.message ), function(){
        		   $scope.formData = {};
        		   return $scope.formData;
        	   } );
           }
	   }

       $scope.loginError = function (response) {
    	   toolsService.alertInfo(  $sce.trustAsHtml( response.message ) );
           //alertsService.RenderErrorMessage(response.ReturnMessage);

           //$scope.clearValidationErrors();
           //alertsService.SetValidationErrors($scope, response.ValidationErrors);

//    	   console.log( response );

       }

       $rootScope.testsenddata = function(){
    	   accountsService.testSendData( $scope.testsendSuccess , $scope.testsendError );
       }
       $scope.testsendSuccess = function( response ){
    	   console.log( response );
       }
       $scope.testsendError = function( response ){
    	   console.log( response );
       }
       $scope.forgetPwd = function(){
          toolsService.jumpStaticUrl( "main/forgot" );
       }
       $scope.registerNew = function(){
          toolsService.jumpStaticUrl( "main/register" );
       }
    }]);
});
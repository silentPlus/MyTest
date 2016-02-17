"use strict";

define(["angularAMD","angular-route",'ui-bootstrap', 'blockUI' ],function(angularAMD){
	var app = angular.module( "mainModule",["ngRoute",'blockUI','ui.bootstrap'] );


//	 app.config(function ($httpProvider) {
//		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//        $httpProvider.defaults.withCredentials = true;
//    });


	app.config(function (blockUIConfigProvider) {

        // Change the default overlay message
        blockUIConfigProvider.message("正在为您服务，请稍后");
        // Change the default delay to 100ms before the blocking is visible
        blockUIConfigProvider.delay(1);
        // Disable automatically blocking of the user interface
        blockUIConfigProvider.autoBlock(false);

    });

	app.config(["$routeProvider",function( $routeProvider ){
		$routeProvider

//		.when("/", angularAMD.route({
//
//            templateUrl: function (rp) {  return '../ngjsbiz/mp/views/main/default.html';  },
//            controllerUrl: "../mp/controllers/main/defaultController"
//
//        }))

		.when("/", angularAMD.route({

            templateUrl: function (rp) {  return '../ngjsbiz/mp/views/main/authorize.html' + "?bust=" + (new Date()).getTime();  },
            controllerUrl: "../mp/controllers/main/authorizeController"

        }))

        .when("/:section/:tree", angularAMD.route({

            templateUrl: function (rp) { return '../ngjsbiz/mp/views/' + rp.section + '/' + rp.tree + '.html' + "?bust=" + (new Date()).getTime(); },

            resolve: {

                load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {

                    var path = $location.path();
                    var parsePath = path.split("/");
                    var parentPath = parsePath[1];
                    var controllerName = parsePath[2];

                    var loadController = "../mp/controllers/" + parentPath + "/" + controllerName + "Controller";

                    var deferred = $q.defer();
                    require([loadController], function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                }]
            }

        }))

        .when("/:section/:tree/:info", angularAMD.route({

        	templateUrl: function (rp) { return '../ngjsbiz/mp/views/' + rp.section + '/' + rp.tree + '.html' + "?bust=" + (new Date()).getTime(); },

            resolve: {

                load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {

                    var path = $location.path();
                    var parsePath = path.split("/");
                    var parentPath = parsePath[1];
                    var controllerName = parsePath[2];

                    var loadController = "controllers/" + parentPath + "/" + controllerName + "Controller";

                    var deferred = $q.defer();
                    require([loadController], function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                }]
            }

        }))

        //.otherwise({ redirectTo: '/' });
	}]);

	app.controller( 'indexController',[ '$scope', '$rootScope' , '$http' , '$location' , 'blockUI' ,function( $scope , $rootScope , $http , $location , blockUI ){
		//$scope.IsloggedIn = false;
		$scope.sidebarToggle = "";
		$scope.toggle = function () {
            ($scope.sidebarToggle == "")?$scope.sidebarToggle = "on-canvas":$scope.sidebarToggle = "";
        }
		$scope.open = "";
		$scope.dropdown = function () {
            ($scope.open == "")?$scope.open = "open":$scope.open = "";
        }
		//$scope.$on('$routeChangeStart', function (scope, next, current) {
			//if ( $scope.currentPage !== "main/login" ){
			//	$scope.authenicateUser($location.path(),$scope.authenicateUserComplete, $scope.authenicateUserError);
	        //}
		//});
		 $scope.authenicateUserComplete = function (response) {
        	if( response.status === 0 ){
        		$rootScope.IsloggedIn = true;
        	}
            console.log( "每次路径变化" , response );
            //if (response.IsAuthenicated==false)
            //    window.location = "/index.html";
        }
        $scope.authenicateUserError = function (response) {
        	console.log("ERROR= "+response.IsAuthenicated);
        }
		$scope.AjaxGet = function (route, successFunction, errorFunction) {
            setTimeout(function () {
                $http({ method: 'GET', url: route }).success(function (response, status, headers, config) {
                    successFunction(response, status);
                }).error(function (response) {
                    errorFunction(response);
                });
            }, 1);
        };
		$scope.authenicateUser = function (route, successFunction, errorFunction) {
            $scope.AjaxGet("login/getmpuser.html", successFunction, errorFunction);
        };
		$scope.authenicateUser($location.path(),$scope.authenicateUserComplete, $scope.authenicateUserError);
		//$scope.$on('$routeChangeSuccess', function (scope, next, current) {});

		//$scope.initializeController = function(){	};

        $scope.btnCtrl = { isAuthorize:false,isAutoreply:false,isDiymenu:false };
        $scope.changeChannel = function( targetChannel ){
//        	var path = $location.path();
//            var parsePath = path.split("/");
//
//        	window.location = parsePath[0] + "#" + targetChannel;

        	if( !$rootScope.IsloggedIn ){
        		$scope.jumpStaticUrl( "main/login" );
        		return;
        	}else{
        		$scope.jumpStaticUrl( targetChannel );
        	}
        	for( var p in $scope.btnCtrl ){
 			   $scope.btnCtrl[p] = false;
 		   }

        	switch( targetChannel ){
        		case "main/authorize":
        			$scope.btnCtrl.isAuthorize = true;
        			break;
        		case "main/autoreply":
        			$scope.btnCtrl.isAutoreply = true;
        			break;
        		case "main/diymenu":
        			$scope.btnCtrl.isDiymenu = true;
        			break;
        		case "main/shopqrcode":
        			$scope.btnCtrl.isQrcode = true;
        			break;
        		case "main/apimgmt":
        			$scope.btnCtrl.isApimgmt = true;
        			break;
        		case "main/acinfo":
        			$scope.btnCtrl.isAcinfo = true;
        			break;
        		case "main/pwmod":
        			$scope.btnCtrl.isPwmod = true;
        			break;
        		case "main/templatemessage":
        			$scope.btnCtrl.isTemplatemessage = true;
        			break;
        		case "main/shopqrcodenew":
        			$scope.btnCtrl.isQrcodenew = true;
        	}

        };
        console.log("当前地址", $location.$$path);
        $scope.jumpStaticUrl = function( url ){
        	$scope.currentPage = url;
        	var path = $location.path();
        	var parsePath = path.split("/");
        	//window.location = parsePath[0] + "#" + url;
        	switch (url) {
            case "main/login":
    			$rootScope.siteTitle ="欢迎登录";
    			break;
            case "main/register":
    			$rootScope.siteTitle ="欢迎注册";
    			break;
            case "main/forgot":
    			$rootScope.siteTitle ="忘记密码";
    			break;
            case "main/authorize":
    			$rootScope.siteTitle ="授权管理";
    			break;
    		case "main/autoreply":
    			$rootScope.siteTitle ="自定义回复";
    			break;
    		case "main/diymenu":
    			$rootScope.siteTitle ="自定义菜单";
    			break;
    		case "main/shopqrcode":
    			$rootScope.siteTitle ="门店二维码";
    			break;
    		case "main/apimgmt":
    			$rootScope.siteTitle ="接口管理";
    			break;
    		case "main/acinfo":
    			$rootScope.siteTitle ="账号信息";
    			break;
    		case "main/pwmod":
    			$rootScope.siteTitle ="密码修改";
    			break;
    		case "main/templatemessage":
    			$rootScope.siteTitle ="模板消息";
    			break;
            }
        	$location.path(url);
        }
        console.log ("当前跳转", $scope.jumpStaticUrl)
        $scope.returnOriUrl = function(){
        	var path = $location.path();
        	var parsePath = path.split("/");
        	return parsePath[0];
        }

        $rootScope.showSideBar = { isShow:false};

	} ] );

	angularAMD.bootstrap( app );

	return app;
});
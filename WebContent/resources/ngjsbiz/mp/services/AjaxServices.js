
define(['application-configuration','toolsService'], function (app) {

    app.register.service('ajaxService', ['$http', 'blockUI', 'toolsService', function ($http, blockUI,toolsService) {

        // setting timeout of 1 second to simulate a busy server.

        this.AjaxPost = function (data, route, successFunction, errorFunction) {
            blockUI.start();
            //setTimeout(function () {
                $http.post(route, data).success(function (response, status, headers, config) {
                    blockUI.stop();
                    successFunction(response, status);
                }).error(function (response) {
                    blockUI.stop();                   
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
           // }, 1000);

        }

        this.AjaxPostWithNoAuthenication = function (data, route, successFunction, errorFunction) {
            blockUI.start();
            //setTimeout(function () {
                $http.post(route, data,{
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).success(function (response, status, headers, config) {
                    blockUI.stop();
                    
                    if( response.isLogin === false ){
                    	toolsService.jumpStaticUrl( "main/login" );
                    	
                    	toolsService.rscope.displayContent = false;
                    	toolsService.rscope.IsloggedIn = false;
                    	toolsService.rscope.showSideBar.isShow = false;
                    }
                    
                    successFunction(response, status);
                }).error(function (response) {
                    blockUI.stop();                 
                    errorFunction(response);
                });
            //}, 5000);

        }
    
        
//        this.AjaxPostWithNoAuthenication = function (data, route, successFunction, errorFunction) {
//            blockUI.start();
//            //setTimeout(function () {
//                $http({ method: 'GET', url: route, params: data }).success(function (response, status, headers, config) {
//                    blockUI.stop();
//                    successFunction(response, status);
//                }).error(function (response) {
//                    blockUI.stop();                 
//                    errorFunction(response);
//                });
//            //}, 1000);
//
//        }

        this.AjaxGet = function (route, successFunction, errorFunction) {
            blockUI.start();
            //setTimeout(function () {
                $http({ method: 'GET', url: route }).success(function (response, status, headers, config) {
                    blockUI.stop();
                    
                    if( response.isLogin === false ){
                    	toolsService.jumpStaticUrl( "main/login" );
                    	
                    	toolsService.rscope.displayContent = false;
                    	toolsService.rscope.IsloggedIn = false;
                    	toolsService.rscope.showSideBar.isShow = false;
                    }
                    
                    successFunction(response, status);
                }).error(function (response) {
                    blockUI.stop();
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
           // }, 1000);
        }
        
        this.AjaxGetWithoutAuthentication = function (route, successFunction, errorFunction) {
            blockUI.start();
            //setTimeout(function () {
                $http({ method: 'GET', url: route }).success(function (response, status, headers, config) {
                    blockUI.stop();
                    successFunction(response, status);
                }).error(function (response) {
                    blockUI.stop();
                    errorFunction(response);
                });
           // }, 1000);
        }

        this.AjaxGetWithData = function (data, route, successFunction, errorFunction) {
            blockUI.start();
            //setTimeout(function () {
                $http({ method: 'GET', url: route, params: data }).success(function (response, status, headers, config) {
                    blockUI.stop();
                    successFunction(response, status);
                }).error(function (response) {
                    blockUI.stop();
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            //}, 1000);

        }


        this.AjaxGetWithNoBlock = function (data, route, successFunction, errorFunction) {            
            //setTimeout(function () {
                $http({ method: 'GET', url: route, params: data }).success(function (response, status, headers, config) {                 
                    successFunction(response, status);
                }).error(function (response) {                  ;
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            //}, 0);

        }


    }]);
});



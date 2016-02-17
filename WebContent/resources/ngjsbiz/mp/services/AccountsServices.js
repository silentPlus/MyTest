define(['application-configuration', 'ajaxService','toolsService'], function (app) {

    app.register.service('accountsService', ['$rootScope','ajaxService','toolsService', function ($rootScope,ajaxService,toolsService) {

        //this.registerUser = function (user, successFunction, errorFunction) {
        //    ajaxService.AjaxPostWithNoAuthenication(user, "/api/accounts/RegisterUser", successFunction, errorFunction);
        //};

        this.login = function (user, successFunction, errorFunction) {
            ajaxService.AjaxPostWithNoAuthenication(user, "login/index.html", successFunction, errorFunction);
        };

        this.logout = function(successFun,errorFunction){
        	ajaxService.AjaxGetWithoutAuthentication( "logout/index.html",successFun,errorFunction );
        };

        this.authenicateUser = function( seaRootScope,seaScope,isAuthorizePage ){
        	if( seaRootScope.IsloggedIn === true || seaRootScope.IsloggedIn === undefined ){

            	function validatesuccess(response){
            		var usrObj;
            		if( response.isLogin === false ){
            			toolsService.jumpStaticUrl( "main/login" );
            		}else if( response.isLogin === true ){
            			seaRootScope.displayContent = true;
            			usrObj = toolsService.stringToJson( response.result );
            			console.log( "每次验证用户登录状态返回的用户信息" , usrObj );
            			seaRootScope.userName = usrObj.cLoginUser;
            			seaRootScope.apiname = usrObj.capiname;
            			seaRootScope.cappid = usrObj.cappid;
            			seaRootScope.showSideBar.isShow = true;
            			seaRootScope.shopname = usrObj.cLoginName;
            			if( seaScope ){
            				seaScope.shopname = usrObj.cLoginName;
            			}
            			if( isAuthorizePage ){
            				if( usrObj.cappid === "" ){
            		    	  //toolsService.jumpStaticUrl("main/apimgmt");
            				  seaScope.open();
            		    	}
            			}
            		}

            		seaRootScope.logout = function(){
        			   //console.log($scope.isAuthorize);
        			   //console.log($scope.btnCtrl);
            		   var successFun = function(){
            			   toolsService.jumpStaticUrl("main/login");
            			   seaRootScope.displayContent = false;
            			   seaRootScope.IsloggedIn = false;
            			   seaRootScope.showSideBar.isShow = false;
            		   };
            		   var errorFunction = function(res){
            			   console.log( "登出错误" + res );
            		   }
            		   ajaxService.AjaxGetWithoutAuthentication( "logout/index.html",successFun,errorFunction );
        		   };

            		console.log( "验证用户在用户的service里面" , response );
            		if( usrObj !== undefined ){
            			return usrObj.cLoginName;
            		}else{
            			return "";
            		}
            	}
            	function validateerror(response){
            		console.log( response );
            	}
            	ajaxService.AjaxGetWithoutAuthentication( "login/getmpuser.html",validatesuccess,validateerror );
            }else{
                toolsService.jumpStaticUrl( "main/login" );
            }
        }

        this.testSendData = function( successFun , errorFun ){

        	var data = { data:
				        	{
				        	    data: {
				        	        imsgtype: 1,
				        	        keyword: [
				        	            {
				        	                chkuser: "zhangsan"
				        	            },
				        	            {
				        	                chkuser: "lisi"
				        	            }
				        	        ]
				        	    }
				        	}
        				};

        	ajaxService.AjaxGetWithData( data, 'http://debug.wuuxiang.com:9300/i5xwxplus/mp/savekeywordmessage.html' , successFun , errorFun  );
        }
        //this.getUser = function (successFunction, errorFunction) {
        //    ajaxService.AjaxGet("/api/accounts/GetUser", successFunction, errorFunction);
        //};

        //this.updateUser = function (user, successFunction, errorFunction) {
        //    ajaxService.AjaxPost(user, "/api/accounts/UpdateUser", successFunction, errorFunction);
        //};

    }]);
});
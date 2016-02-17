define(['application-configuration'], function (app) {

    app.register.service('toolsService', ["$location","$modal","$rootScope",function ( $location,$modal,$rootScope ) {

    	this.rscope = $rootScope;

        this.stringToJson = function( stringValue ){
        	var theJsonValue;
			eval("theJsonValue = "+stringValue);
			return theJsonValue;
        }

        this.jumpStaticUrl = function( url ){
        	var path = $location.path();
        	var parsePath = path.split("/");
        	//window.location = parsePath[0] + "#" + url;
        	//window.location = "#" + url;
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
    		case "main/shopqrcodenew":
    			$rootScope.siteTitle ="门店二维码";
    			break;
            }
        	$location.path(url);
        }

        // 判断字符串是否为空
        this.strIsEmpty = function( str ){
        	return str == null || !str || typeof str == undefined || str == '' || str.replace(/(^\s*)|(\s*$)/g, "").length == 0;
        }

        //不能允许有中文
        this.validateInput_noChin = function( inputStr ){
        	 return /[\u4E00-\u9FA5]/g.test(inputStr);
        }
        //不能允许有中文，有中文就会自动删除掉
        this.replaceChiChar = function( value ){
        	value = value.replace(/[\W]/g,'');
        	return value;
        }
        //qq号不允许输入除数字以外的字符
        this.replceExtraNumChar = function( value ){
        	value = value.replace(/[^0-9]/g,'');
        	return value;
        }
        //验证邮箱
        this.checkEmail = function( input ){
        	var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        	return emailReg.test( input );
        }

        //去掉所有空格
        this.validateInput_trimSpace = function( inputStr ){
        	 return inputStr.replace(/\s+/g, "");
        }

        //通用弹出层插件
        app.register.controller( "alertInfoCtrlPlugin", ["$scope","items",'$modalInstance',function( $scope, items ,$modalInstance ){
        	$scope.message = items.info;
        	$scope.hideCancle = items.alert;
        	$scope.ok = function () {
        		if( items.action !== undefined ){
        			items.action(items.params);
        		}
        		$modalInstance.close();//$scope.selected.item
        	};

        	$scope.cancel = function () {
        	    $modalInstance.dismiss('cancel');
        	};
        }] );
        this.alertInfo = function( info,todoSomething,params ){
        	//console.log(index);
        	var modalInstance = $modal.open({
	    	      animation: true,
	    	      templateUrl: '../ngjsbiz/mp/views/plugins/alertInfoPlugin.html',
	    	      controller: 'alertInfoCtrlPlugin',
	    	      resolve: {
	    	        items: function () {
					   	return {
						info : info,
						action : todoSomething,
						params : params,
						alert : true};
	    	        }
	    	      }
    	    });
        };
        this.dialogInfo = function( info,todoSomething,params ){
        	var modalInstance = $modal.open({
        		animation: true,
        		templateUrl: '../ngjsbiz/mp/views/plugins/alertInfoPlugin.html',
        		controller: 'alertInfoCtrlPlugin',
        		resolve: {
        			items: function () {
						return {
						info : info,
						action : todoSomething,
						params : params,
						alert : false};
        			}
        		}
        	});
        };
        //通用预览插件
        app.register.controller( "pictxtPreviewCtrl", ["$scope","items",'$modalInstance',function( $scope, items ,$modalInstance ){
        	$scope.newOnes = items.dataObj;

        	$scope.ok = function () {
        		$modalInstance.close();//$scope.selected.item
        	};

        	$scope.cancel = function () {
        	    $modalInstance.dismiss('cancel');
        	};
        }]);
        this.previewPictxt = function( dataObj ){
        	var modalInstance = $modal.open({
	    	      animation: true,
	    	      templateUrl: '../ngjsbiz/mp/views/plugins/pictxtPreview.html',
	    	      controller: 'pictxtPreviewCtrl',
	    	      resolve: {
	    	        items: function () {

	    	        	return { dataObj:dataObj };

	    	        }
	    	      }
        	});
        }

    }]);
});
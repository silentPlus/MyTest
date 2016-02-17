function getposition(successCallback, errorCallback) {
	if (navigator.geolocation) {
		// 未定义参数时输出默认错误
		if (typeof(onError)==='undefined'){
			locationError = function(error){
				switch (error.code) {
				case error.PERMISSION_DENIED: //PERMISSION_DENIED (数值为1) 表示没有权限使用地理定位API
					alert("用户拒绝提供位置信息！");
					break;
				case error.POSITION_UNAVAILABLE: //POSITION_UNAVAILABLE (数值为2) 表示无法确定设备的位置，例如一个或多个的用于定位采集程序报告了一个内部错误导致了全部过程的失败
					alert("无法获取您的位置信息，请前往手机系统设置定位服务中开启“WLAN和移动网络位置信息”");
					break;
				case error.TIMEOUT:  //TIMEOUT (数值为3) 超时
					alert("获取位置信息超时，请稍后重试！");
					break;
				default:
					alert("获取位置信息失败，错误信息：" + error.message);
		        	break;
				}
			}
		}
		var getOptions = {
				// 指示浏览器获取高精度的位置，默认为false
				enableHighAcuracy: true,
				// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
				timeout: 2000,
				// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
				maximumAge: 20000
		};
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback, getOptions);
		return true;
	} else {
		return false;
	}
}
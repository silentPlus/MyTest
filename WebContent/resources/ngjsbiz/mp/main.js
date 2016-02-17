require.config({

	baseUrl:'../ngjsbiz/mp/',

	paths:{
		'application-configuration':'application-configuration',
		'angular':'http://apps.bdimg.com/libs/angular.js/1.2.16/angular.min',
		'angular-route':'http://apps.bdimg.com/libs/angular.js/1.2.16/angular-route',
		'angularAMD':'http://cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min',
		'blockUI': 'scripts/angular-block-ui.min',
		'ui-bootstrap' : 'scripts/ui-bootstrap-tpls-0.11.0',
		'ajaxService': 'services/AjaxServices',
        'alertsService': 'services/AlertsServices',
        'accountsService': 'services/AccountsServices',
        'toolsService':'services/ToolsServices',
        'jquery':'http://cdn.bootcss.com/jquery/1.9.1/jquery.min'
	},

	shim:{
		'angularAMD':['angular'],
		'angular-route':['angular'],
		'blockUI':['angular'],
		'ui-bootstrap':['angular']
	},

	deps:['application-configuration'],
	waitSeconds: 0,
	urlArgs:"bust=" + (new Date()).getTime()
});
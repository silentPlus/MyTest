/**
 *
 */
var Diancai = function( dishStorageKeyOut,itemlist,jumpurl,changeDishTime ){

	var cw = document.documentElement.clientWidth;
	var ch = document.documentElement.clientHeight;

	//var dishStorageKey = "${bizType}_${mcid}"; //lStorage
	var dishStorageKey = dishStorageKeyOut; //lStorage
	//var _itemlist = ${ItemList};
	var _itemlist = itemlist;
	//console.log(_itemlist);
	var _dishclassCan = $(".dishClassScroller");
	var _bigDishclassCan = $("#dishClassHoriList");
	var _dishCan = $(".smallDishScroller");
	var _dishCanStr = "";
	var _bigDishScroller = $(".bigDishScroller");
	//var _selectedDishInClass = [];
	var _selectDishObj = {};//已点菜品数据
	var _currentSelectedClass = "0";
	var _currentOperateSingleDishObj = {};
	var classIdToName = {};
	var lastClickClassIndex = $.cookie("lastClickClass_" + dishStorageKey) || 0;
	var allDishInOneArr = [];//将所有菜品拼成一个数组  搜索菜品时候会用到
	var bigOrSmall = $.cookie( "bigorsmall" ) || "small";//区分当前是大图还是小图模式  small 小图模式   big 大图模式
	var isSearching = false;
	var doSearchObj = {};//把搜索功能中立即搜索功能放在这个闭包中

	//小图模式的显示菜品列表
	function _generateDishList(index,classID){
		template.helper('fMoney', function (fMoneyVal) {return ToolUtil.rMoney(fMoneyVal,2);});
		var html = template('jsItemTemplate', {"oneClassItems":_itemlist[index].items});
		//console.log(html);
		_dishCan.html(html);
		/* 延迟加载  */
		$(".scrollLoading").scrollLoading({container:$(".smallDishScroller"),callback: function() {}});
		for(var i = 0; i < _selectDishObj[classID].length ; i++ ){
			//进入页面的时候就看看存的数据里面有木有数据，然后存进页面里，就是页面上的那个小红圈圈
			$("#dish"+_selectDishObj[classID][i].itemid).find(".currentSelectedNum").css("display","inline-block").html(_selectDishObj[classID][i].itemcount).prev().css("display","inline-block");
		}
		_addRightcCellEvent();
		_showDishDetail();
	}
	//大图模式的显示菜品列表
	function _bigImgGenerateDishList( index,classID ){
		template.helper('rMoney', function (rMoneyVal) {return ToolUtil.rMoney(rMoneyVal,2);});
		var html = template('bigImgJsItemTemplate', {"oneClassItems":_itemlist[index].items});
		//console.log(html);
		_bigDishScroller.html(html);
		/* 延迟加载 bigCurrentSelectedNum  */
		//$(".scrollLoading").scrollLoading({container:$(".bigImgCenter"),callback: function() {
		//}});
		for(var i = 0; i < _selectDishObj[classID].length ; i++ ){
			//进入页面的时候就看看存的数据里面有木有数据，然后存进页面里，就是页面上的那个小红圈圈
			$("#bigDish"+_selectDishObj[classID][i].itemid).find(".bigCurrentSelectedNum").css("visibility","visible").html(_selectDishObj[classID][i].itemcount).prev().css("visibility","visible");
		}
		_bigImgDishAddEvent();
		_showDishDetail();
	}
	function assembleAddDish(jqobj, operatemethod){
		_currentOperateSingleDishObj = {};
		_currentOperateSingleDishObj.price = ToolUtil.rMoney( jqobj.siblings(".hiddenprice").val() );
		_currentOperateSingleDishObj.itemid = jqobj.siblings(".hiddenitemid").val();
		_currentOperateSingleDishObj.itemname = jqobj.siblings(".hiddenitemname").val();
		_currentOperateSingleDishObj.itemcount = 1;
		_currentOperateSingleDishObj.unitname = jqobj.siblings(".hiddenunitname").val();
		_currentOperateSingleDishObj.taFileName = jqobj.siblings(".hiddenImgSrc").val();
		_currentOperateSingleDishObj.vipPrice = jqobj.siblings(".hiddenMemberPrice").val();
		_currentOperateSingleDishObj.vippriceflg = jqobj.siblings(".hiddenVippriceflg").val();
		_currentOperateSingleDishObj.mljFlg = jqobj.siblings(".hiddenMljFlg").val();
		//_currentOperateSingleDishObj.taFileName = jqobj.parent().siblings(".dishImage").attr("data-url");
		_currentSelectedClass = jqobj.siblings(".hiddenItemClassID").val();
		refreshDataInSingleClass(_currentOperateSingleDishObj, operatemethod);
		// 这个函数需要调用，需要构造，input的位置要对，可以取到对应的值
	}
	//function assembleAddDishInFloatSelectedLayer(jqobj, operatemethod){
	function _addRightcCellEvent(){
		var plusTimeout;
		var plusInterval;
		var minusTimeout;
		var minusInterval;
		var isAboveLongPressPlus;
		var isAboveLongPressMinus;

		// 小兔模式加菜按钮
		var plusBtnFunction = function(target, event){
			//_currentSelectedClass = $(".dishClassScroller>ul>.selected").attr("classid");
			event.stopPropagation();
			$(target).prev().css("display","inline-block").html( Number( $(target).prev().html() ) + 1 );
			$(target).prev().prev().css("display","inline-block");
			$(target).siblings(".bigNum").html(Number( $(target).prev().html() ));
			$(".dishClassScroller .selected .selectedDN").show().html( Number($(".dishClassScroller .selected .selectedDN").html())+1  );//设置当前品类里面所选菜品的数字
			assembleAddDish($(target),"+");
		};
		var successionAdd = function( target,event ){
			$(target).siblings(".bigNum").show();
			plusInterval = setInterval(function() {
				plusBtnFunction(target, event);
			}, 100);
			//return false;
		}
		$(".plusBtn").on("touchstart mousedown", function(ev) {
			ev.preventDefault();
			isAboveLongPressPlus = true;
			var self = this;
			plusTimeout = setTimeout(function() {
				if (isAboveLongPressPlus) {
					successionAdd(self, ev);
				}
			}, 1000);
		}).on("touchend mouseup",function(event){
			plusBtnFunction(this, event);
			clearTimeout(plusTimeout);
			clearInterval(plusInterval);
			isAboveLongPressPlus = false;
			$(this).siblings(".bigNum").hide();
		});

		// 小兔模减菜按钮
		var minusBtnFunction = function( target,event ){
			//_currentSelectedClass = $(".dishClassScroller>ul>.selected").attr("classid");
			event.stopPropagation();
			if( $(target).next().html() === "1" ){
				clearTimeout(minusTimeout);
				clearInterval(minusInterval);
				//return;
				$(target).next().hide().html(Number($(target).next().html()) - 1);
				$(target).hide();
				$(target).siblings(".bigNum").hide();
				//$(this).parent().removeClass("havedata");
				if( $(".dishClassScroller .selected .selectedDN").html() === "1" ){
					$(".dishClassScroller .selected .selectedDN").hide();
				}
				$(".dishClassScroller .selected .selectedDN").html( Number($(".dishClassScroller .selected .selectedDN").html())-1 );//设置当前品类里面所选菜品的数字
				assembleAddDish($(target),"-");
			} else if( Number( $(target).next().html() ) >= 1 ){
				//if( $(".dishClassScroller .selected .selectedDN").html() === "0" ){
				//	$(".dishClassScroller .selected .selectedDN").hide();
				//}
				$(target).next().html( Number( $(target).next().html() )-1 );
				$(target).siblings(".bigNum").html(Number( $(target).next().html() ));
				$(".dishClassScroller .selected .selectedDN").html( Number($(".dishClassScroller .selected .selectedDN").html())-1 );
				assembleAddDish($(target),"-");
			}
			//if( Number( $(target).next().html() ) >= 0 && $(target) !== undefined ){
				//assembleAddDish($(target),"-");
			//}
			//return  $(".dishClassScroller .selected .selectedDN").html() ;
		};
		var successionMinus = function(target, event){
			$(target).siblings(".bigNum").show();
			minusInterval = setInterval(function() {
				minusBtnFunction(target, event);
			}, 100);
			//return false;
		};
		$(".minusBtn").on("touchstart mousedown",function(ev){
			ev.preventDefault();
			isAboveLongPressMinus = true;
			var self = this;
			minusTimeout = setTimeout(function() {
				if (isAboveLongPressMinus) {
					successionMinus(self, ev);
				}
			}, 1000);
			minusBtnFunction(this, event);
		}).on("touchend mouseup",function(event){
			clearTimeout(minusTimeout);
			clearInterval(minusInterval);
			isAboveLongPressMinus = false;
			$(this).siblings(".bigNum").hide();
		});
	}


	//大图模式的点菜加减号点一下算加一道菜
	function _bigImgDishAddEvent(){
		var plusInterval = [];
		var minusInterval = [];

		var plusTimeout;
		var plusInterval;
		var minusTimeout;
		var minusInterval;

		var isAboveLongPressPlus;
		var isAboveLongPressMinus;

		function addDish( target ){
			target.prev().css("visibility","visible").html( Number( target.prev().html() ) + 1 );
			target.prev().prev().css("visibility","visible");
			$(".classDishList>.selected>.bigImgSelectedDN").show().html( Number( $(".classDishList>.selected>.bigImgSelectedDN").html() ) + 1 );
			assembleAddDish(target, "+");
		}
		var plusBtnFunction = function( target,event ){
			event.stopPropagation();
			addDish($(target));
			$(target).siblings(".bigNum").html(Number($(target).prev().html()));
		};
		var successionAdd = function(target, event) {
			$(target).siblings(".bigNum").show();
			plusInterval = setInterval(function() {
				plusBtnFunction(target, event);
			}, 100);
		}
		$(".bigImgPlusBtn").on("touchstart mousedown",function(ev){
			ev.preventDefault();
			isAboveLongPressPlus = true;
			var self = this;
			plusTimeout = setTimeout(function() {
				if (isAboveLongPressPlus) {
					successionAdd(self, ev);
				}
			}, 1000);
		}).on("touchend mouseup",function(event){
			plusBtnFunction(this, event);
			clearTimeout(plusTimeout);
			clearInterval(plusInterval);
			isAboveLongPressPlus = false;
			$(this).siblings(".bigNum").hide();
		});


		var minusBtnFunction = function( target,event ){
			event.stopPropagation();
			if( $(target).next().html() === "1" ){
				clearTimeout(minusTimeout);
				clearInterval(minusInterval);
				$(target).next().css("visibility","hidden").html( Number( $(target).next().html() )-1 );
				$(target).css("visibility","hidden");
				$(target).siblings(".bigNum").hide();
				if( $(".classDishList>.selected>.bigImgSelectedDN").html() === "1" ){
					$(".classDishList>.selected>.bigImgSelectedDN").hide();
				}
				$(".classDishList>.selected>.bigImgSelectedDN").html( Number( $(".classDishList>.selected>.bigImgSelectedDN").html() ) - 1 );
			}else if( Number( $(target).next().html() ) >= 1 ){
				$(target).next().html( Number( $(target).next().html() )-1 );
				$(target).siblings(".bigNum").html(Number( $(target).next().html() ));
				$(".classDishList>.selected>.bigImgSelectedDN").show().html( Number( $(".classDishList>.selected>.bigImgSelectedDN").html() ) - 1 );
			}
			assembleAddDish($(target), "-");
		};
		var successionMinus = function( target,event ){
			$(target).siblings(".bigNum").show();
			minusInterval = setInterval(function() {
				minusBtnFunction(target, event);
			}, 100);
		};
		$(".bigImgMinusBtn").on("touchstart mousedown",function(ev){
			ev.preventDefault();
			isAboveLongPressMinus = true;
			var self = this;
			minusTimeout = setTimeout(function() {
				if (isAboveLongPressMinus) {
					successionMinus(self, ev);
				}
			}, 1000);
			minusBtnFunction(this, event);
		}).on("touchend mouseup",function(event){
			clearTimeout(minusTimeout);
			clearInterval(minusInterval);
			isAboveLongPressMinus = false;
			$(this).siblings(".bigNum").hide();
		});



	}
	function _showDishDetail(){	/*打开显示菜品详情页*/
		$(".dishImage, .dishPic").click(function(){
			var dishDetailData = {};
			var $operateNumBtnGroup = $(this).siblings(".operateNumBtnGroup");
			dishDetailData.dishName = $operateNumBtnGroup.find(".hiddenitemname").val();
			dishDetailData.unitName = $operateNumBtnGroup.find(".hiddenunitname").val();
			dishDetailData.dishPrice = ToolUtil.rMoney(String($operateNumBtnGroup.find(".hiddenprice").val()));
			dishDetailData.vipPrice = ToolUtil.rMoney(String($operateNumBtnGroup.find(".hiddenMemberPrice").val()));
			dishDetailData.dishDesc = $operateNumBtnGroup.find(".hiddenDesp").val();
			dishDetailData.dishImgUrl = $(this).attr("data-url");
			dishDetailData.isHuiYuan = !(!huiyuan_manjianAc.isHuiyuan() || $operateNumBtnGroup.find(".hiddenVippriceflg").val() != 1);
			$(".dishDetailCan").html(template("dishDetailTemplate", dishDetailData)).show();
			$(".icon_right").hide();
		});

		$(".searchBigImg, .searchSmallImg").click(function(){
			var dishDetailData = {};
			var $operateNumBtnGroup = $(this).siblings(".operateNumBtnGroup");
			dishDetailData.dishName = $operateNumBtnGroup.find(".searchDishName").val();
			dishDetailData.unitName = $operateNumBtnGroup.find(".searchUnitname").val();
			dishDetailData.dishPrice = ToolUtil.rMoney(String($operateNumBtnGroup.find(".searchPrice").val()));
			dishDetailData.vipPrice = ToolUtil.rMoney(String($operateNumBtnGroup.find(".hiddenMemberPrice").val()));
			dishDetailData.dishDesc = $operateNumBtnGroup.find(".hiddenDesp").val();
			dishDetailData.dishImgUrl = $(this).attr("data-url");
			dishDetailData.isHuiYuan = !(!huiyuan_manjianAc.isHuiyuan() || $operateNumBtnGroup.find(".hiddenVippriceflg").val() != 1);
			$(".dishDetailCan").html(template("dishDetailTemplate", dishDetailData)).show();
			$(".icon_right").hide();
		});

	}

	function refreshDataInSingleClass(dishobj, operatemethod){
		var isinarr = isDishObjInArray(dishobj, _selectDishObj[_currentSelectedClass]);
		if (operatemethod === "+") {
			if (isinarr === -1) {
				_selectDishObj[_currentSelectedClass].push(dishobj);
			} else {
				_selectDishObj[_currentSelectedClass][isinarr].itemcount += 1;
			}
		} else if (operatemethod === "-") {
			if (_selectDishObj[_currentSelectedClass][isinarr].itemcount === 1) {
				_selectDishObj[_currentSelectedClass].splice(isinarr, 1);
			} else {
				_selectDishObj[_currentSelectedClass][isinarr].itemcount -= 1;
			}
		}
		//console.log( JSON.stringify(_selectDishObj) );
		lStorage.set(dishStorageKey, JSON.stringify(_selectDishObj));
		//计算下总价
		calculateTotalPrice();

	}
	function isDishObjInArray(dishObj, targetArr) {// 判断是不是有菜在存的字符串里面
		//console.log(targetArr.length);
		//console.log(JSON.stringify(dishObj));
		for (var i = 0; i < targetArr.length; i++) {
			if (dishObj.itemid === targetArr[i].itemid) {
				//console.log(i);
				return i;
			}
		}
		return -1;
	}

	function calculateTotalPrice(){//计算菜品总数量和菜品总价
		var totalPrice = 0;
		var totalQuantity = 0;
		var huiyuan_manjianPrice = 0;
		//为了满减再声明两个变量，如果开启单个菜品的满减，菜品的价格就分为连个部分
		var no_manjianTotalPrice = 0;
		var manjianTotalPrice = 0;
		//把会员价，优惠的总价存进来
		var huiyuanTotalReducePrice = 0;

		for( var p in _selectDishObj ){
			//console.log(p);
			if( _selectDishObj[p].length !== 0 ){
				//console.log(_selectDishObj[p]);
				for( var i = 0 ; i<_selectDishObj[p].length ; i++ ){
					totalQuantity += Number( _selectDishObj[p][i].itemcount );
					totalPrice = totalPrice + Number( _selectDishObj[p][i].itemcount ) * Number( _selectDishObj[p][i].price );
					if( huiyuan_manjianAc.isHuiyuan() && !huiyuan_manjianAc.isManjian() ){//判断现在是不是有会员价，有则进行会员价总价计算
						if( _selectDishObj[p][i].vippriceflg === "1" ){
							huiyuan_manjianPrice = huiyuan_manjianPrice + Number( _selectDishObj[p][i].itemcount ) * Number( _selectDishObj[p][i].vipPrice );
							huiyuanTotalReducePrice += ( Number( _selectDishObj[p][i].price ) - Number( _selectDishObj[p][i].vipPrice ) ) * Number( _selectDishObj[p][i].itemcount ) ;
						}else{
							huiyuan_manjianPrice = huiyuan_manjianPrice + Number( _selectDishObj[p][i].itemcount ) * Number( _selectDishObj[p][i].price );
						}
					}
					if( huiyuan_manjianAc.isManjian() ){
						if( huiyuan_manjianAc.isHuiyuan() ){
							if( _selectDishObj[p][i].mljFlg === "1" ){
								if( _selectDishObj[p][i].vippriceflg === "1" ){
									manjianTotalPrice = manjianTotalPrice + Number( _selectDishObj[p][i].itemcount ) * Number( _selectDishObj[p][i].vipPrice );
									huiyuanTotalReducePrice += ( Number( _selectDishObj[p][i].price ) - Number( _selectDishObj[p][i].vipPrice ) ) * Number( _selectDishObj[p][i].itemcount ) ;
								}else{
									manjianTotalPrice = manjianTotalPrice + Number( _selectDishObj[p][i].itemcount ) * Number( _selectDishObj[p][i].price );
								}
							}else{
								if( _selectDishObj[p][i].vippriceflg === "1" ){
									no_manjianTotalPrice = no_manjianTotalPrice + Number( _selectDishObj[p][i].itemcount ) * Number( _selectDishObj[p][i].vipPrice );
									huiyuanTotalReducePrice += ( Number( _selectDishObj[p][i].price ) - Number( _selectDishObj[p][i].vipPrice ) ) * Number( _selectDishObj[p][i].itemcount ) ;
								}else{
									no_manjianTotalPrice = no_manjianTotalPrice + Number( _selectDishObj[p][i].itemcount ) * Number( _selectDishObj[p][i].price );
								}
							}
						}else{
							if( _selectDishObj[p][i].mljFlg === "1" ){
								manjianTotalPrice = manjianTotalPrice + Number( _selectDishObj[p][i].itemcount ) * Number( _selectDishObj[p][i].price );
							}else{
								no_manjianTotalPrice = no_manjianTotalPrice + Number( _selectDishObj[p][i].itemcount ) * Number( _selectDishObj[p][i].price );
							}
						}
					}
				}
			}
		}
		if( huiyuan_manjianAc.isManjian() ){
			if( huiyuan_manjianAc.isHuiyuan() ){
				//huiyuan_manjianPrice = huiyuan_manjianAc.caculateManjian( huiyuan_manjianPrice );
				manjianTotalPrice = huiyuan_manjianAc.caculateManjian( manjianTotalPrice );
				huiyuan_manjianPrice = manjianTotalPrice + no_manjianTotalPrice;
				if( huiyuan_manjianPrice < 0 ){
					huiyuan_manjianPrice = 0;
				}
				huiyuan_manjianAc.setEndPrice( huiyuan_manjianPrice,huiyuanTotalReducePrice );
			}else{
				//totalPrice = huiyuan_manjianAc.caculateManjian( totalPrice );
				manjianTotalPrice = huiyuan_manjianAc.caculateManjian( manjianTotalPrice );
				totalPrice = manjianTotalPrice + no_manjianTotalPrice;
				if( totalPrice < 0 ){
					totalPrice = 0;
				}
				huiyuan_manjianAc.setEndPrice( totalPrice );
			}
		}
		if( huiyuan_manjianPrice < 0 ){
			huiyuan_manjianPrice = 0;
		}
		if( totalPrice < 0 ){
			totalPrice = 0;
		}

		//根据包里返回的方法去判断是不是要更改【总价，这是没有会员价的】还是显示【原价，这是有会员价的】
		if( huiyuan_manjianAc.isHuiyuan() ){
			huiyuan_manjianAc.setEndPrice( huiyuan_manjianPrice,huiyuanTotalReducePrice );
		}

		//$("#dishQuantity").html(totalQuantity);
		$("#originalTotalPrice").html(ToolUtil.fMoney( String(totalPrice), 2));
		if( huiyuan_manjianAc.isHuiyuan() ){//判断现在是不是有会员价，有则进行显示会员价的操作
			$("#originalPricePanel").addClass("grayfont");
			$("#originalPriceName").text("原价");
			$("#originalTotalPrice").html("<del>" + $("#originalTotalPrice").html() + "</del>");
			$("#memberPricePanel").css("display","block");
			$("#memberTotalPrice").html( ToolUtil.rMoney(String(huiyuan_manjianPrice.toFixed(2))) );
		}

		if (totalQuantity == 0){
			$("#dishesOk").addClass("disabled").html("先选菜");
		} else {
			$("#dishesOk").removeClass("disabled").html( "点好了(" + totalQuantity + ")" );
		}
		waisongAction.setTotal( totalPrice );
	}
	function fillFloatCheckSelectedDish(){//填充已选菜品的，然后加减号也可以加减菜
		//填充已点菜品详情的列表
		//console.log( _selectDishObj );
		$("#alreadySelected").empty();
		for( var p in _selectDishObj ){
			if ( _selectDishObj[p].length !== 0 ){
				var pauseClassObj = {};
				//console.log(classIdToName[p]);
				pauseClassObj.className = classIdToName[p].classname;
				pauseClassObj.classId = classIdToName[p].classid;
				pauseClassObj.itemList = _selectDishObj[p];
				//console.log(pauseClassObj);
				template.helper('fMoney', function (fMoneyVal) {return ToolUtil.rMoney( String(fMoneyVal) ,2);});
				var html = template("alreadyOrderDishTpl",pauseClassObj);
				$("#alreadySelected").append(html);
			}
		}
		// 给已选菜品列表上面的加减号加事件，然后还得去更新本地的存的已点菜品，然后还得去更新当前页面的品类的已点菜品数量，还有单独品项上的数量
		$("#alreadySelected .selectedMinus").on("click",function(){
			var pauseNum = Number( $(this).next().html() );
			if( pauseNum > 1 ){
				pauseNum--;
				$(this).next().html( pauseNum );
				//_currentSelectedClass = $(this).siblings(".hiddenItemClassID").val();
				//console.log( _selectDishObj[_currentSelectedClass].length );
				assembleAddDish( $(this),"-" );
			}else{
				var self = this;
				//confirmDlg("您确定要删除这道菜嘛",function(){
					if( _selectDishObj[_currentSelectedClass].length === 1 ){
						$(self).parent().parent().prev(".classNameStyle").remove();
					}
					$(self).parent().parent().remove();
					_currentSelectedClass = $(this).siblings(".hiddenItemClassID").val();
					assembleAddDish( $(self),"-" );
				//});
			}
		});
		$("#alreadySelected .selectedPlus").on("click",function(){
			var pauseNum = Number( $(this).prev().html() );
			pauseNum ++;
			$(this).prev().html( pauseNum );
			//_currentSelectedClass = $(this).siblings(".hiddenItemClassID").val();
			assembleAddDish( $(this),"+" );
		});
	}
	function refreshDishNumInClass(){
		//更新每个小类里面的菜品数量
		$(".dishClassScroller>ul>li").each(function(){
			if( _selectDishObj[$(this).attr("classid")].length !== 0 ){
				var totalnum = 0;
				for(var i=0; i < _selectDishObj[$(this).attr("classid")].length;i++){
					totalnum = totalnum + Number( _selectDishObj[$(this).attr("classid")][i].itemcount );
				}
				$(this).find(".selectedDN").show().html(totalnum);
			}else{
				$(this).find(".selectedDN").hide().html(0);
			}
		});
	}
	function bigImgRefreshDishNumInClass(){
		//大图模式里面更新每个小类的菜品数量
		$(".classDishList>li").each(function(){
			if( _selectDishObj[$(this).attr("classid")].length !== 0 ){
				var totalnum = 0;
				for(var i=0; i < _selectDishObj[$(this).attr("classid")].length;i++){
					totalnum = totalnum + Number( _selectDishObj[$(this).attr("classid")][i].itemcount );
				}
				$(this).find(".bigImgSelectedDN").show().html(totalnum);
			}else{
				$(this).find(".bigImgSelectedDN").hide().html(0);
			}
		});
	}
	function doDishSearch(){
		var searchResult = [];

		$("#searchDish").css("display","block");
		$("#searchResultCan").css("height",ch-$(".commonHeaderBar").outerHeight(true) - $(".orderDishedInfoCan").outerHeight(true) - $(".mt10mb16").outerHeight(true));

		$("#searchVal").keyboardEnter(function(){//回车事件
			doSearchObj.todoSearchRightNow();
		});

		$("#excuteSearchBtn").on("click",function(){
			doSearchObj.todoSearchRightNow();
		});

		$("#cancelSearch").on("click",function(){
			$("#excuteSearchBtn").off("click");
			$(this).off("click");
			$("#searchDish").css("display","none");
			isSearching = false;
			$("#searchVal").val("");
			$("#searchResultCan").empty();
			refreshSelectDish();
		});

		return{ todoSearchRightNow : function (){
			isSearching = true;
			var searchVal = $.trim( $("#searchVal").val() );
			searchResult = [];
			if( searchVal === "" ){
				alertDlg("请您填写搜索条件");
			}else{
				// TODO 循环这个 _itemlist 然后找到匹配的 用indexOf函数，然后这个循环里面套循环 循环 _selectDishObj 这个对象，把数量写上，最后push到searchResult
				var allSelectedDishInOneArr = [];//将所有已选菜品拼成一个数组
				for( var p in _selectDishObj ){
					//_selectDishObj[p].classID = p;
					for( var q=0 ; q<_selectDishObj[p].length ; q++ ){
						_selectDishObj[p][q].classID = p;
					}
					allSelectedDishInOneArr = allSelectedDishInOneArr.concat( _selectDishObj[p] );
				}
				//console.log( allSelectedDishInOneArr );
				for( var j = 0 ; j < allDishInOneArr.length ; j++ ){
					if( allDishInOneArr[j].name.indexOf( searchVal ) !== -1 ){
						//写一个函数取获取已选菜品的数量
						allDishInOneArr[j].itemCount = getAlSelectedDishNum( allDishInOneArr[j].itemID );
						searchResult.push( allDishInOneArr[j] );
					}
				}
				//console.log( allDishInOneArr );
				// console.log( searchResult );
				if( bigOrSmall === "big" ){
					template.helper('fMoney', function (fMoneyVal) {return ToolUtil.rMoney(fMoneyVal,2);});
					var html = template("searchDishResultTplBig",{ searchResultObj : searchResult });
					$("#searchResultCan").html( html );
					$(".bigImgPlusBtnSearch").on("click",function(){
						var num = Number( $(this).prev().html() );
						if( num === 0 ){
							$(this).prev().css("visibility","visible");
							$(this).prev().prev().css("visibility","visible");
						}
						num++;
						$(this).prev().html( num );
						setAlSelectedDishNum( $(this),"+" );
					});
					$(".bigImgMinusBtnSearch").on("click",function(){
						var num = Number( $(this).next().html() );
						if( num === 1 ){
							$(this).css("visibility","hidden");
							$(this).next().css("visibility","hidden");
						}
						num--;
						$(this).next().html( num );
						setAlSelectedDishNum( $(this),"-" );
					});
				}else if( bigOrSmall === "small" ){
					template.helper('fMoney', function (fMoneyVal) {return ToolUtil.rMoney(fMoneyVal,2);});
					var html = template("searchDishResultTpl",{ searchResultObj : searchResult });
					$("#searchResultCan").html( html );
					//给加减号按钮加事件
					$(".searchPlusBtn").on("click",function(){
						var num = Number( $(this).prev().html() );
						if( num === 0 ){
							$(this).prev().css("visibility","visible");
							$(this).prev().prev().css("visibility","visible");
						}
						num++;
						$(this).prev().html( num );
						setAlSelectedDishNum( $(this),"+" );
					});
					$(".searchMinusBtn").on("click",function(){
						var num = Number( $(this).next().html() );
						if( num === 1 ){
							$(this).css("visibility","hidden");
							$(this).next().css("visibility","hidden");
						}
						num--;
						$(this).next().html( num );
						setAlSelectedDishNum( $(this),"-" );
					});
				}
				refreshSelectDish();
				//根据菜品id获取当前菜品已点的数量
				function getAlSelectedDishNum(dishid){
					for( var i = 0 ; i < allSelectedDishInOneArr.length ; i++ ){
						if( allSelectedDishInOneArr[i].itemid === dishid ){
							return allSelectedDishInOneArr[i].itemcount;
						}
					}
					return 0;
				};
				//根据菜品id更改菜品的数量，加一或者减一
				function setAlSelectedDishNum(dishobj,method){
					_currentOperateSingleDishObj = {};
					_currentOperateSingleDishObj.price = ToolUtil.rMoney( dishobj.siblings(".searchPrice").val() );
					_currentOperateSingleDishObj.itemid = dishobj.siblings(".searchDishId").val();
					_currentOperateSingleDishObj.itemname = dishobj.siblings(".searchDishName").val();
					_currentOperateSingleDishObj.itemcount = 1;
					_currentOperateSingleDishObj.unitname = dishobj.siblings(".searchUnitname").val();
					_currentOperateSingleDishObj.taFileName = dishobj.siblings(".searchTaFileName").val();
					_currentOperateSingleDishObj.vipPrice = dishobj.siblings(".hiddenMemberPrice").val();
					_currentOperateSingleDishObj.vippriceflg = dishobj.siblings(".hiddenVippriceflg").val();
					_currentOperateSingleDishObj.mljFlg = dishobj.siblings(".hiddenMljFlg").val();
					_currentSelectedClass = dishobj.siblings(".hiddenItemClassID").val();
					refreshDataInSingleClass(_currentOperateSingleDishObj, method);
				}

			}
		} }//return的对象结束
		//return { dosearchOut : doDishSearch };
	};
	function refreshSelectDish(){//已点菜品变化，刷新已选菜品列表
		if( bigOrSmall === "small" ){
			_generateDishList( $(".dishClassScroller>ul>.selected").attr("order") , $(".dishClassScroller>ul>.selected").attr("classid") );
			refreshDishNumInClass();
		}else{
			_bigImgGenerateDishList( $(".classDishList>.selected").attr("order") , $(".classDishList>.selected").attr("classid") );
			bigImgRefreshDishNumInClass();
		}
	}
	function isClearLStorage(){//得在 _selectDishObj 被初始化后在执行这个函数   1430203302000
		var _timeStampInStorage = lStorage.get( dishStorageKey+"_timeStamp" );

		if( changeDishTime == "" ){
			//不清LStorage
		}else if( Number( _timeStampInStorage ) ){
			if( Number( _timeStampInStorage ) < Number( changeDishTime ) ){
				//清LStorage
				lStorage.remove( dishStorageKey );
				lStorage.set( dishStorageKey+"_timeStamp", changeDishTime );
			}
		}else{//本地没有存 changeDishTime 这个修改菜品是时间戳的，则给他加进去
			lStorage.set( dishStorageKey+"_timeStamp", changeDishTime );
		}
	}
	function smallBigPublic(){
		var topInfoHeight = parseInt($(".topInfo").css("height") || 0);
		/* 操作区域高度 */
		$(".dishlistCan").css("height", ch - 49 - 45 - topInfoHeight);
		/* 小图模式滚动区高度 */
		$(".dishClassScroller").css("height", ch - 49 - 48 - 45 - topInfoHeight);
		$(".smallDishScroller").css( "height", ch - 49 - 45 - topInfoHeight);
		/* 大图模式滚动区高度*/
		$(".bigDishScroller").css("height", ch - 49 - 45 - 45 - topInfoHeight);

		/* 菜品滚动区高度 */
		//$(".smallDishScroller").css("height", ch - 49 - 46);
		$(".dishDetailCan").css("height", ch - 49 - 45).click(function(){
			$(this).hide();
			$(".icon_right").show();
		});

		waisongAction.changeDishes();

		for( var i = 0;i<_itemlist.length;i++ ){//生成菜品类列表
			_selectDishObj[_itemlist[i].itemClassID] = [];//初始化存储已选菜品的对象
			//声明一个包内全局变量，然后品项ID和品项名称形成key，value的对象。
			classIdToName[_itemlist[i].itemClassID] = {classname:_itemlist[i].name,classid:_itemlist[i].itemClassID};
		}
		//将所有菜品数据拼到一个数组中，供搜索菜品使用
		allDishInOneArr = [];
		for( var i = 0 ; i < _itemlist.length ; i++ ){
			allDishInOneArr = allDishInOneArr.concat( _itemlist[i].items );
		}
	}
	function initSmallImg(){//小图页面的初始化
		$("#smallImgLeft").css("display","block");
		$("#smallImgRight").css("display","block");
		$("#bigImgCenter").css("display","none");
		$("#dishClassHoriList").css("display","none");
		$("#bigImgClassSearch").css("display","none");

		$(".horn-bg").show();
		waisongAction.switchBigOrSmall( bigOrSmall );

		//_selectDishObj = JSON.parse( lStorage.get("${mcid}") );
		smallBigPublic();//准备数据

		//传入模板引擎，生成html
		_dishclassCan.html( template('jsClassTemplate', {"allClass":_itemlist}) );
		isClearLStorage();
		if(lStorage.get(dishStorageKey) !== null ){//初始化从本地localstorage里面读取点餐数据，然后把点的那些菜的数量显示在类和品相上
			_selectDishObj = JSON.parse(lStorage.get(dishStorageKey) );
			//更新每个小类里面的菜品数量 小图模式的
			refreshDishNumInClass();
		}

		$(".dishClassScroller>ul>li").on("click",function(){//菜品类列表加点击事件
			//alert($(this).attr("order"));
			_generateDishList( $(this).attr("order"), $(this).attr("classid") );
			_currentSelectedClass = $(this).attr("classid");//赋予当下选的是列表中的第几个类
			$(this).siblings().removeClass("selected");
			$(this).addClass("selected");
			lastClickClassIndex = $(this).attr("order");
			$.cookie( "lastClickClass_" + dishStorageKey , lastClickClassIndex );
		});
		//首次进入的时候，显示第一个菜品类别里面的菜品，然后下面一句里面是让第一个菜品类别显示为选中的样子
		_generateDishList(lastClickClassIndex ,_itemlist[lastClickClassIndex].itemClassID);
		_currentSelectedClass = $(".dishClassScroller>ul>li").eq(lastClickClassIndex).addClass("selected").attr("classid");
		//计算下总价
		calculateTotalPrice();

		//小图菜品搜索按钮
		$(".dishSearchBtn").on("click",function(){
			doSearchObj = doDishSearch();
			//console.log( doSearchObj );
		});
	}
	function initBigImg(){//大图页面的初始化
		$("#smallImgLeft").css("display","none");
		$("#smallImgRight").css("display","none");
		$("#bigImgClassSearch").css("display","block");
		$("#dishClassHoriList").css("display","block");
		$("#bigImgCenter").css("display","block");
		waisongAction.switchBigOrSmall( bigOrSmall );


		smallBigPublic();//准备数据
		isClearLStorage();
		if(lStorage.get(dishStorageKey) !== null ){//初始化从本地localstorage里面读取点餐数据，然后把点的那些菜的数量显示在类和品相上
			_selectDishObj = JSON.parse(lStorage.get(dishStorageKey) );
			//更新每个小类里面的菜品数量 大图模式的
			//refreshDishNumInClassBig();
		}

		//传入模板引擎，生成html，填充菜品类列表
		_bigDishclassCan.html( template('bigJsClassTemplate', {"allClass":_itemlist}) );

		if(lStorage.get(dishStorageKey) !== null ){//初始化从本地localstorage里面读取点餐数据，然后把点的那些菜的数量显示在类和品相上
			_selectDishObj = JSON.parse(lStorage.get(dishStorageKey) );
			//更新每个小类里面的菜品数量 小图模式的
			bigImgRefreshDishNumInClass();
		}

		//生成大图cell
		_bigImgGenerateDishList( lastClickClassIndex ,_itemlist[lastClickClassIndex].itemClassID );
		//默认选中某个类
		_currentSelectedClass = $(".classDishList>li").eq(lastClickClassIndex).addClass("selected").attr("classid");

		//大图模式dishclasslist的实际长度
		var totalWidth = 0;
		$(".classDishList li").each(function(){
		    //totalWidth = totalWidth + calculateHeight( $(this).css("width") ) ;
			totalWidth = totalWidth + $(this).outerWidth() ;
		});
		$(".classDishList").css("width", totalWidth );
		//myScroll.refresh();
		var myScroll = new iScroll('dishClassHoriList', {//用一个好用的滚动条
			useTransition: false,
			hScrollbar:false,
			vScrollbar:false,
			vScroll:false
		});

		//菜品类加事件
		$(".classDishList>li").on("click",function(){
			_bigImgGenerateDishList( $(this).attr("order"), $(this).attr("classid") );
			_currentSelectedClass = $(this).attr("classid");//赋予当下选的是列表中的第几个类
			$(this).siblings().removeClass("selected");
			$(this).addClass("selected");
			lastClickClassIndex = $(this).attr("order");
			$.cookie( "lastClickClass_" + dishStorageKey , lastClickClassIndex );
		});

		//计算下总价
		calculateTotalPrice();

		//大图菜品搜索按钮
		$(".bigImgSearch").on("click",function(){
			doSearchObj = doDishSearch();
		});
	}
	if( _itemlist.length !== 0 ){
		if( $.cookie( "bigorsmall" ) === "small" ){
			//调用小图模式的初始化的函数
			initSmallImg();
			$( ".icon_right" ).html( "&#xe619;" );
		}else if( $.cookie( "bigorsmall" ) === "big" ){
			//调用大图模式的初始化函数
			initBigImg();
			$( ".icon_right" ).html( "&#xe61a;" );
		}else{
			initSmallImg();
			$( ".icon_right" ).html( "&#xe619;" );
		}
	}else{
		$("#bigImgClassSearch").empty();
		$("#smallImgLeft").empty();
	}
	//点菜详情弹出按钮加事件，还有隐藏弹出层
	$(".bigprice").on("click",function(){
		if( $(this).attr("isOpen") === "0" ){
			/*开启*/
			$(this).attr("isOpen", 1);
			$("#dishConfirm").css("display","block");
			$("#dishConfirmMark").css("display","block");
			$("#dishConfirmContent").slideToggle();
			$("#iconRotate").addClass("rotateStyle");
			fillFloatCheckSelectedDish();
		}else if( $(this).attr("isOpen") === "1" ){
			/*关闭*/
			$(this).attr("isOpen", 0);
			$("#dishConfirmContent").slideToggle();
			setTimeout('$("#dishConfirm").css("display","none");$("#dishConfirmMark").css("display","none")',500);
			$("#iconRotate").removeClass("rotateStyle");
			_currentSelectedClass = $(".dishClassScroller>ul>.selected").attr("classid");
			//bigOrSmall  _bigImgGenerateDishList

			// if( bigOrSmall === "small" ){
			// 	_generateDishList( $(".dishClassScroller>ul>.selected").attr("order") , $(".dishClassScroller>ul>.selected").attr("classid") );
			// 	refreshDishNumInClass();
			// }else{
			// 	_bigImgGenerateDishList( $(".classDishList>.selected").attr("order") , $(".classDishList>.selected").attr("classid") );
			// 	bigImgRefreshDishNumInClass()
			// }

			refreshSelectDish();

			//refreshDishNumInClass();
		};
		//fillFloatCheakSelectedDish();
	});
	$("#dishListInformation").on("click",function(){
		$(".bigprice").attr("isOpen", 0);
		$("#dishConfirmContent").slideToggle();
		//$("#dishConfirm").css("display","none");
		//$("#dishConfirmMark").css("display","none");
		setTimeout('$("#dishConfirm").css("display","none");$("#dishConfirmMark").css("display","none")',500);
		$("#iconRotate").removeClass("rotateStyle");
		_currentSelectedClass = $(".dishClassScroller>ul>.selected").attr("classid");

		refreshSelectDish();

	});

	//footer的按钮
	$(".icon_left").on("click", function(){
		if ($(".dishDetailCan").is(":visible")){
			$(".dishDetailCan").hide();
			$(".icon_right").show();
		} else if( $("#searchDish").css("display") === "block" ){
			$("#searchDish").css("display","none");
			$("#excuteSearchBtn").off("click");
			isSearching = false;
			$("#searchVal").val("");
			$("#searchResultCan").empty();
			_currentSelectedClass = $(".dishClassScroller>ul>.selected").attr("classid");

			refreshSelectDish();

		} else {
			//window.location.href='${url_index}';
			window.location.href = jumpurl ;
			//window.history.back();
		}
	});
	$(".icon_right").on("click",function(){
		if( !isSearching ){//&#xe619; &#xe61a;
			$("#excuteSearchBtn").off("click");
			if( bigOrSmall === "small" ){
				bigOrSmall = "big";
				initBigImg();
				$(this).html( "&#xe61a;" );
				$.cookie( "bigorsmall","big" );
			}else{
				bigOrSmall = "small";
				initSmallImg();
				$(this).html( "&#xe619;" );
				$.cookie( "bigorsmall","small" );
			}
		}else{
			//alertDlg("搜索模式不能修改大小图模式");
			//doSearchObj.dosearchOut();
			if( bigOrSmall === "small" ){
				bigOrSmall = "big";
				//initBigImg();
				doSearchObj.todoSearchRightNow();
				$(this).html( "&#xe61a;" );
				$.cookie( "bigorsmall","big" );
			}else{
				bigOrSmall = "small";
				//initSmallImg();
				doSearchObj.todoSearchRightNow();
				$(this).html( "&#xe619;" );
				$.cookie( "bigorsmall","small" );
			}
		}
	});

};
/**
 * 外送功能，在dishes.jsp上要加的
 */
 var Waisong = function( bizType,dePrice,minPrice,freeDeFlg,freeDePrice ){
	var cw = document.documentElement.clientWidth;
	var ch = document.documentElement.clientHeight;
 	var  isAddDepriceBox = false;
 	var dishTotal = 0;

 	return{
 			changeDishes:function(){
 				// console.log( bizType );
 				var topInfoHeight = parseInt($(".topInfo").css("height") || 0);
 				if( bizType === "waisong" ){
	 				/* 小类滚动区高度 */
	 				$(".dishClassScroller").css("height", ch -  49 - 48 - 45 - topInfoHeight);
	 				/* 菜品滚动区高度 */
	 				$(".smallDishScroller").css("height", ch - 49 - 45 - topInfoHeight);
 				}
 			},
 			switchBigOrSmall:function( bigOrSmall ){
 				if( bizType === "waisong" ){
 					$(".topInfo").css("display","block");
 				}
 			},
 			isAboveMinPrice:function(){//根据起送费和点餐的总价格判断是不是可以允许跳转
 				if( bizType === "waisong" ){
 					if ( dishTotal < Number( minPrice ) ){
						$("#dishesOk").addClass("disabled").html("先选菜");
						alertDlg( "您选择的菜品总价没有超过起送费，再选一些菜吧" );
					} else {
						$("#dishesOk").removeClass("disabled").html("点好了");
					}
 				}
 			},
 			setTotal : function( total ){
 				dishTotal = total;
 				if( bizType === "waisong" ){
 					if ( dishTotal < Number( minPrice ) ){
						$("#dishesOk").addClass("disabled").html("先选菜");
					} else {
						$("#dishesOk").removeClass("disabled").html("点好了");
					}
 				}
 			}
 	}

 }
 /**
  * 会员，满减的活动
  * 会员和满减的逻辑包
  */
var huiyuan_manjian = function(memberPriceFlg,fullReduceFlg,fullReduces,biztypeMcid){
	//需要把点菜的数据传到点菜确认页，会员还是满减，得传过去。还有最终的价格也得传过去。如果是满减还有把满减的方案传过去
	//{ type:1,endPrice:180 } 会员价   localstorage 键值  ${bizType}_${mcid}_huiyuan_manian
	//{ type:2,manjianPlan:{ fullPrice:100,reducePrice:10 },endPrice:160 } 满减
	//传优惠方式，最终的价格。满减就传规则。
	//计算满减菜价的地方还有点问题，等于满减额度的时候没减
	var cw = document.documentElement.clientWidth;
	var ch = document.documentElement.clientHeight;
	var huiyuanAc;
	var manjianAc;
	var isAddManjianBox = false;
	var huiyuan_manjian_obj = {};
	var huiyuan_manjian_sign = "hmSign_" + biztypeMcid;

	//初始化，会员价和满减都没有
	template.helper('huiyuan', function ( huiyuanjia ) {return false;});
	template.helper('manjian', function(){return false;});

	var huiyuan = function(){
		//template.helper('huiyuan', function ( huiyuanjia ) {return ToolUtil.rMoney(huiyuanjia,2);});
		template.helper('huiyuan', function ( huiyuanjiaFlg ) {
//			if( huiyuanjiaFlg === "1" ){
//				return true;
//			}else{
//				return false;
//			}
			return true;
		});
		huiyuan_manjian_obj.type = 1;
	}
	var manjian = function(){
		if( fullReduces !== "" ){//外送没有会员价满减，不用考虑外送了。下一步要做的是，得到满减的条件放到条中。然后计算价格。238行
			huiyuan_manjian_obj.type = 2;
			template.helper('manjian', function(){return true;});
			var fullReducesObj = JSON.parse( fullReduces );
			//console.log( fullReducesObj );
			var manjianStr = "";
			var isAboveSmallestLevel = false;

			var sortedFullReducesObj = fullReducesObj.sort( function(a,b){//数组排序
				return Number( a.fullPrice ) - Number( b.fullPrice ) ;
			} );
			//console.log( sortedFullReducesObj );

			//var fullPriceList = [];
			for( var i = 0 ; i < fullReducesObj.length ; i++ ){
				//fullPriceList.push( fullReducesObj[i].description );
				manjianStr += fullReducesObj[i].description;
				if( i === fullReducesObj.length-1 ){
					manjianStr += "。";
				}else{
					manjianStr += "，";
				}
			}

			return {
				caculateManjian : function( total ){
					//var userTop = {reducePrice:0};用户达到的满减额,给一个初始值，如果刚开始点菜吗，没有菜的时候显示零
					var userTop = sortedFullReducesObj[0];
					isAboveSmallestLevel = false;
					for( var i = 0; i < sortedFullReducesObj.length ; i++ ){
						if( Number( total ) >= Number( sortedFullReducesObj[i].fullPrice ) ){
							//userTop = Number( sortedFullReducesObj[i].fullPrice );
							userTop = sortedFullReducesObj[i];
							isAboveSmallestLevel = true;
						}else{
							break;
							//return userTop;
						}
					}
					if( isAboveSmallestLevel ){
						var caculatedTotal = Number( total ) - Number( userTop.reducePrice );
						huiyuan_manjian_obj.isAboveSmallestLevel = true;
					}else{
						var caculatedTotal = Number( total );
						huiyuan_manjian_obj.isAboveSmallestLevel = false;
					}
					huiyuan_manjian_obj.manjianPlan = userTop;
					return caculatedTotal;
					//alert( total );
				}
			}
		}
	}

	if( memberPriceFlg === "1" && fullReduceFlg === "0" ){
		huiyuanAc = huiyuan();
	}else if( memberPriceFlg === "0" && fullReduceFlg === "1" ){
		manjianAc = manjian();
	}else if( memberPriceFlg === "1" && fullReduceFlg === "1" ){
		huiyuanAc = huiyuan();
		manjianAc = manjian();
		huiyuan_manjian_obj.type = 3;//既有会员，又有满减的情况
	}else if( memberPriceFlg === "0" && fullReduceFlg === "0" ){
		template.helper('huiyuan', function ( huiyuanjia ) {return false;});
		huiyuan_manjian_obj.type = 0;
	}

	return {
		isHuiyuan : function(){
			if( memberPriceFlg === "1" ){
				return true;
			}else{
				return false;
			}
		},
		isManjian : function(){
			if( fullReduceFlg === "1" ){
				return true;
			}else{
				return false;
			}
		},
		caculateManjian : function(total){
			if( manjianAc ){
				return manjianAc.caculateManjian(total);
			}else{
				return null;
			}
		},
		setEndPrice : function( endPrice,huiyuanTotalReducePrice ){
			huiyuan_manjian_obj.endPrice = endPrice;
			if( huiyuanTotalReducePrice ){
				huiyuan_manjian_obj.huiyuanTotalReducePrice = huiyuanTotalReducePrice;
			};
		},
		setDataToLocalStorage : function(){
			lStorage.set(huiyuan_manjian_sign, JSON.stringify( huiyuan_manjian_obj ) );
		}
	}

}
//原来的公告不要了，加新的公告。
var scrollNotice = function( ordernotice,waisongremark,bizType ){
	var scrollContent = "";
	if (bizType == "waisong") {
		scrollContent = waisongremark;
	} else if (bizType == "diancai") {
		scrollContent = ordernotice;
	}
	if (scrollContent !== ""){
		//原来的外送的加公告的位置不变，做修改，判断是不是新的功能包加了滚动显示，如果加了则不动，然后填入新的数据。点菜的用新的模块功能，判断外送还是点菜，显示谁的~
		//或者在这里判断是外送啊还是点菜什么的
		//$("<div class=\"horn-bg smallTopInfo \"><div class=\"col-xs-1\"><i class=\"iconfont\">&#xe64c;</i></div><div class=\"col-xs-10 ml10 \" id=\"gundong\">"+ scrollContent + "</div></div>").insertBefore("#smallImgLeft");

		$("body").append("<div class=\"col-xs-12 horn-bg topInfo\"><div class=\"row\"><i class=\"iconfont pull-left ml10 mr10\">&#xe64c;</i><div id=\"gundong\">" + scrollContent + "</div></div>");
		$("#gundong").tomakeitscroll(20);
		$("#dishlistCan").css("top","79px");
		//isAddManjianBox = true;
		$("#gundong").on("click",function(){
			$("body").append("<div class=\"publicInfoMark\"><div class=\"publicInfoTitle\">公告</div><pre class=\"publicInfoContent\">" + scrollContent + "</pre><div class=\"publicInfoClose\"><div class=\"publicInfoCloseBtn\"><div class=\"h\"></div><div class=\"v\"></div></div><div></div>");
			var publicInfoContentHeight = document.documentElement.clientHeight - 200;
			$(".publicInfoContent").css("height", publicInfoContentHeight);

			$(".publicInfoCloseBtn").on("click",function(){
				$(".publicInfoMark").remove();
			});
		});
	} else {
		$("#dishlistCan").css("top","49px");

	}

};

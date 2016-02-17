/* login.htm */
function goLogin() {
	window.moveTo(-9999, -9999);
	var returnValue = window.showModalDialog("Commonpage/login.htm", "",
			"dialogWidth:800px; dialogHeight:500px;status:No; ");

	if (returnValue == "close") {
		window.close();
	} else {
		window.location.replace("Layout/Masterpage.htm");
		window.moveTo(-4, -4);
	}
}

/* commom */
function Confirm() {
	var ReturnValue = confirm("你确定要删除该记录吗？");
	if (ReturnValue == true) {
		alert("OK");
	} else {
		return null;
	}
}

function OpenWin(sURL, sFeatures) {
	window.open(sURL, null, sFeatures, null);
	// window.open("Sample.htm",null,"height=200,width=400,status=yes,toolbar=no,menubar=no,location=no");
	// window.open( [sURL] [, sName] [, sFeatures] [, bReplace])
	// sName{_blank; _media; _parent; _search; _self; _top}
	// sFeatures{channelmode; directories; fullscreen; height; left; location;
	// menubar; resizable; scrollbars; status; titlebar; toolbar; top; width}
}

function ShowWin(sURL, sFeatures) {
	window.showModalDialog(sURL, null, sFeatures);
	// window.showModalDialog("Sample.htm",null,"dialogHeight:591px;dialogWidth:650px;")
	// window.showModalDialog([sURL] [, vArguments] [, sFeatures])
	// sFeatures{dialogHeight; dialogLeft; dialogTop; dialogWidth; center;
	// dialogHide; edge; help; resizable; scroll; status; unadorned}
}

function MM_openBrWindow(theURL, winName, features) { // v2.0
	window.open(theURL, winName, features);
}

/* search */
function changeV(objID) {
	if (document.all("tbody_" + objID).style.display == "block") {

		document.all("img_" + objID).src = "../../App_Themes/Default/ico_have2.gif";
		document.all("tbody_" + objID).style.display = "none";
	} else {
		document.all("img_" + objID).src = "../../App_Themes/Default/ico_nohave2.gif";
		document.all("tbody_" + objID).style.display = "block";
	}
}
function docheck() {

	if (document.all("chk_all").checked == true) {
		for (var i = 1; i < 7; i++) {
			document.all("chk" + i).checked = true;
		}
	} else {
		for (i = 1; i < 7; i++) {
			document.all("chk" + i).checked = false;
		}
	}
}

function moveselect(obj, target, all) {
	if (!all)
		all = 0;
	if (obj != "[object]")
		obj = eval("document.all." + obj);
	target = eval("document.all." + target);
	if (all == 0) {
		while (obj.selectedIndex > -1) {
			mot = obj.options[obj.selectedIndex].text;
			mov = obj.options[obj.selectedIndex].value;
			obj.remove(obj.selectedIndex);
			var newoption = document.createElement("OPTION");
			newoption.text = mot;
			newoption.value = mov;
			target.add(newoption);
		}
	} else {
		for (var i = 0; i < obj.length; i++) {
			mot = obj.options[i].text;
			mov = obj.options[i].value;
			var newoption = document.createElement("OPTION");
			newoption.text = mot;
			newoption.value = mov;
			target.add(newoption);
		}
		obj.options.length = 0;
	}
}
function dakai() {
	document.getElementById('light').style.display = 'block';
	document.getElementById('fade').style.display = 'block';
}
function guanbi() {
	var yuanGong = document.getElementById("yuanGong");
	yuanGong.value = "";// 如果不加这句，则每次选择的结果追加
	var huoQu = document.getElementById("D2");
	for (var k = 0; k < huoQu.length; k++)
		yuanGong.value = yuanGong.value + huoQu.options[k].value + " ";// 这里的"
	// "中间为空格，为字符间的分隔符，你可以改成别的
	document.getElementById('light').style.display = 'none';
	document.getElementById('fade').style.display = 'none';
}
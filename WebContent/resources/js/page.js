//分页专用js

//分页:首页/上一页/下页/末页的方法
function page(url, currentPage) {
	var pageSize = $("#pageSize").val();
	window.location.href = url + "&currentPage=" + currentPage + "&pageSize="
			+ pageSize;
}

// 分页,当每页数量被改变时的方法
function pageSizeChange(url, pageSize) {
	window.location.href = url + "&pageSize=" + pageSize;
}

// 跳转到第N页的方法
function toPage(url) {
	var currentPage = $("#currentPage").val();
	var pageSize = $("#pageSize").val();
	window.location.href = url + "&currentPage=" + currentPage + "&pageSize="
			+ pageSize;
}

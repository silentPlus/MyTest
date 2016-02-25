package com.linkcos.object.utils;

import java.util.List;

public class PageUtil<T> {

	// /**
	// * 分页的大小
	// */
	// private int size;//page*limit
	// /**
	// * 分页的起始页
	// */
	// private int offset;//start
	// /**
	// * 总记录数
	// */
	private long total;
	/**
	 * 分页的数据
	 */
	private List<T> rows;

	// public int getSize() {
	// return size;
	// }
	// public void setSize(int size) {
	// this.size = size;
	// }
	// public int getOffset() {
	// return offset;
	// }
	// public void setOffset(int offset) {
	// this.offset = offset;
	// }
	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}

}
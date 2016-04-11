package com.linkcos.object.vo;

import java.util.List;


public class PageInfo<M> {

	/**
	 * 默认当前页(为第一页)
	 */
	public static final Integer DEFAULT_CURRENT = Integer.valueOf(1);

	/**
	 * 默认每页显示数据条数
	 */
	public static final Integer DEFAULT_PAGE_SIZE = Integer.valueOf(10);

	/**
	 * 当前页
	 */
	private Integer currentPage = Integer.valueOf(1);

	/**
	 * 总记录页数
	 */
	private Integer totalPage;

	/**
	 * 总记录数量
	 */
	private Long totalRecord;

	/**
	 * 每页数据条数
	 */
	private Integer pageSize = DEFAULT_PAGE_SIZE;

	/**
	 * 结果集
	 */
	private List<?> pageInfoResult;

	/**
	 * 返回的url
	 */
	private String url;

	public PageInfo(Integer currentPage, Long totalRecord, int pageSize,
			List<?> result, String url) {
		setTotalRecord(totalRecord);
		setPageSize(Integer.valueOf(pageSize));
		setTotalPage();
		setCurrentPage(currentPage);
		setPageInfoResult(result);
		setUrl(url);
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	/**
	 * 修正了第一页和最后一页查询时的结果
	 * 
	 * @author 微信攻略组 2014-02-10 V1.0
	 * 
	 * @param currentPage
	 */
	public void setCurrentPage(Integer currentPage) {
		if ((currentPage.intValue() == 0) || (currentPage.intValue() < 0)) {
			currentPage = Integer.valueOf(1);
		}
		if ((currentPage.intValue() > this.totalPage.intValue())
				&& (this.totalPage.intValue() != 0)) {
			this.currentPage = this.totalPage;
		} else if (this.totalPage.intValue() == 0) {
			this.currentPage = Integer.valueOf(1);
		} else
			this.currentPage = currentPage;
	}

	public Integer getTotalPage() {
		return totalPage;
	}

	public void setTotalPage() {
		if (this.totalRecord.intValue() % this.pageSize.intValue() == 0) {
			this.totalPage = Integer.valueOf(this.totalRecord.intValue()
					/ this.pageSize.intValue());
		} else {
			this.totalPage = Integer.valueOf(this.totalRecord.intValue()
					/ this.pageSize.intValue() + 1);
		}
	}

	public Long getTotalRecord() {
		return totalRecord;
	}

	public void setTotalRecord(Long totalRecord) {
		this.totalRecord = totalRecord;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		if (pageSize.intValue() == 0) {
			this.pageSize = Integer.valueOf(DEFAULT_PAGE_SIZE);
		} else {
			this.pageSize = pageSize;
		}
	}


	public List<?> getPageInfoResult() {
		return pageInfoResult;
	}

	public void setPageInfoResult(List<?> pageInfoResult) {
		this.pageInfoResult = pageInfoResult;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}

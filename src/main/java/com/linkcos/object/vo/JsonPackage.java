package com.linkcos.object.vo;

import com.alibaba.fastjson.JSONObject;

public class JsonPackage extends JSONObject {

	private static final long serialVersionUID = 4755035452111551675L;

	/**
	 * 构造方法
	 * 
	 * @param status
	 * @param message
	 * @param result
	 * @return
	 */	
	public JsonPackage() {
		this.put("status", 0);
		this.put("message", "成功");
	}
	
	public JsonPackage(Integer status, String message) {
		this.put("status", status);
		this.put("message", message);
	}
	
	public JsonPackage(Integer status, String message, Object result) {
		this.put("status", status);
		this.put("message", message);
		this.put("result", result);
	}

	/**
	 * GET AND SET METHODS
	 */
	public Integer getStatus() {
		return this.getInteger("status");
	}

	public void setStatus(Integer status) {
		this.put("status", status);
	}

	public String getMessage() {
		return this.getString("message");
	}

	public void setMessage(String message) {
		this.put("message", message);
	}

	public Object getResult() {
		return this.get("result");
	}

	public void setResult(Object result) {
		this.put("result", result);
	}

}

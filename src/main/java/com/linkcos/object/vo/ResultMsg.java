package com.linkcos.object.vo;


public class ResultMsg {

	private Results state;			// 状态标示符的枚举类
	private Integer flag;			// 是否成功等具体标志
	private String msg; 			// 相关提示信息
	private Object msgEntity; 		// 回传的具体相关错误实体
	private Exception exception;	// 返回异常类型

	public ResultMsg() {
		//this.state = Results.ERROR;
	}

	/**
	 *
	 * 完全构造方法
	 *
	 * @param flag
	 * @param msg
	 * @param msgEntity
	 * @param state
	 * @param exception
	 */
	public ResultMsg(Integer flag, String msg, Object msgEntity, Results state,
			Exception exception) {
		super();
		this.flag = flag;
		this.msg = msg;
		this.msgEntity = msgEntity;
		this.state = state;
		this.exception = exception;
	}

	public Exception getException() {
		return exception;
	}

	public void setException(Exception exception) {
		this.exception = exception;
	}

	public Results getState() {
		return state;
	}

	public void setState(Results state) {
		this.state = state;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getMsgEntity() {
		return msgEntity;
	}

	public void setMsgEntity(Object msgEntity) {
		this.msgEntity = msgEntity;
	}

    @Override
    public String toString() {
        return "ResultMsg [flag=" + flag + ", msg=" + msg + ", msgEntity=" + msgEntity + ", state="
                + state + ", exception=" + exception + "]";
    }


}

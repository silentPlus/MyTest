package com.linkcos.object.base;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * ClassName: BaseClass <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON(可选). <br/>
 * date: 2015年1月28日 下午7:17:33 <br/>
 *
 * @author 李鑫
 * @version
 * @since JDK 1.7
 */
public class BaseClass {

    protected final Log log = LogFactory.getLog(getClass());
    protected final Logger logger = LoggerFactory . getLogger (getClass());

	 /**
     * 全局获取request
     *
     * @author 微信攻略组 2014-02-12 V1.0
     *
     * @return
     */
	public HttpServletRequest getRequest() {
    	return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

	 /**
     * 全局获取Session
     *
     * @author 微信攻略组 2014-02-12 V1.0
     *
     * @return
     */
    public HttpSession getSession() {
        return getRequest().getSession();
    }

    /* 项目目录 http://127.0.0.1/i5xwxplus 注:结尾不带 / */
    public String getProjectPath() {
        return getFullPath().replace(getRequest().getServletPath(), "");
    }

    /* 项目目录 http://127.0.0.1/i5xwxplus/ 注:结尾带/ */
    public String getProjectDir() {
        return getProjectPath() + "/";
    }

    /* 全目录 http://127.0.0.1/i5xwxplus/a/b/c/d.html */
    public String getFullPath() {
    	return getRequest().getRequestURL().toString();
    }

    /* 带上参数的URL  http://127.0.0.1/i5xwxplus/a/b/c/d.html?a=123&b=456&c=789#redict */
    public String getFullPathWithParam() {
    	String queryString = StringUtils.isBlank(getRequest().getQueryString())?"":"?" + getRequest().getQueryString();
    	return getFullPath() + queryString;
    	/*
    	HttpServletRequest request = getRequest();
        Set<String> set = request.getParameterMap().keySet();
        StringBuilder param = new StringBuilder("?");
        for (String key : set) {
        	param.append(key);
        	param.append("=");
        	param.append(request.getParameter(key));
        	param.append("&");
        }
        return getFullPath() + param.substring(0, param.length() - 1);
        */
    }

    /**
     * goToErrorPage:service返回结果为错误时，可以直接用此方法跳转到错误页面返回错误信息. <br/>
     */
    public ModelAndView goToErrorPage(String errorMsg) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("errorMsg", errorMsg);
        return new ModelAndView("errorpage", map);
    }

    /**
     * getSUserSFace:(生成用户名接口名字符串). <br/>
     */
    protected String getSUserSFace(String sUserValue, String sFaceValue) {
		return "{'sUser':'" + sUserValue + "','sFace':'" + sFaceValue + "'}";
	}

}

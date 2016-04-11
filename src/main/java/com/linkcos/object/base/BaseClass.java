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


public class BaseClass {

    protected final Log log = LogFactory.getLog(getClass());
    protected final Logger logger = LoggerFactory . getLogger (getClass());


	public HttpServletRequest getRequest() {
    	return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }


    public HttpSession getSession() {
        return getRequest().getSession();
    }

    public String getProjectPath() {
        return getFullPath().replace(getRequest().getServletPath(), "");
    }

    public String getProjectDir() {
        return getProjectPath() + "/";
    }

    public String getFullPath() {
    	return getRequest().getRequestURL().toString();
    }

    public String getFullPathWithParam() {
    	String queryString = StringUtils.isBlank(getRequest().getQueryString())?"":"?" + getRequest().getQueryString();
    	return getFullPath() + queryString;
    
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

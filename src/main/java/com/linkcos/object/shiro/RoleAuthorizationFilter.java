package com.linkcos.object.shiro;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Set;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.CollectionUtils;
import org.apache.shiro.util.StringUtils;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;
import org.apache.shiro.web.util.WebUtils;

public class RoleAuthorizationFilter extends AuthorizationFilter{
	
/*	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws IOException {  
		  
        HttpServletRequest httpRequest = (HttpServletRequest) request;  
        HttpServletResponse httpResponse = (HttpServletResponse) response;  
  
        Subject subject = getSubject(request, response);  
  
        if (subject.getPrincipal() == null) {  
            if ("XMLHttpRequest".equalsIgnoreCase(httpRequest
    				.getHeader("X-Requested-With"))) {  
            	httpResponse.setCharacterEncoding("UTF-8");
    			PrintWriter out = response.getWriter();
				out.println("{status:0,message:'您尚未登录或登录时间过长,请重新登录!'}");
    			out.flush();
    			out.close();
            } else {  
                saveRequestAndRedirectToLogin(request, response);  
            }  
        } else {  
            if ("XMLHttpRequest".equalsIgnoreCase(httpRequest
    				.getHeader("X-Requested-With"))) { 
            	httpResponse.setCharacterEncoding("UTF-8");
    			PrintWriter out = response.getWriter();
				out.println("{status:0,message:'您没有足够的权限执行该操作!'}");
    			out.flush();
    			out.close();
            } else {  
                String unauthorizedUrl = getUnauthorizedUrl();  
                if (StringUtils.hasText(unauthorizedUrl)) {  
                    WebUtils.issueRedirect(request, response, unauthorizedUrl);  
                } else {  
                    WebUtils.toHttp(response).sendError(401);  
                }  
            }  
        }  
        return false;  
    }  */

	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue)
			throws Exception {
		Subject subject = getSubject(request, response);  
        String[] rolesArray = (String[]) mappedValue;  
  
        if (rolesArray == null || rolesArray.length == 0) {  
            // no roles specified, so nothing to check - allow access.  
            return true;  
        }  
  
        Set<String> roles = CollectionUtils.asSet(rolesArray);  
        for (String role : roles) {  
            if (subject.hasRole(role)) {  
                return true;  
            }  
        }  
        return false;  
	}

}

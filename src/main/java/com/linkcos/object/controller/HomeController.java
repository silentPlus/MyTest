package com.linkcos.object.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;  
import org.apache.shiro.authc.AuthenticationException;  
import org.apache.shiro.authc.UsernamePasswordToken;  
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.linkcos.object.base.BaseClass;
import com.linkcos.object.entity.User;
import com.linkcos.object.vo.JsonPackage;  
  
@RestController
@RequestMapping("/home")
public class HomeController extends BaseClass{
	
	@RequestMapping(value="/index.html")  
    public ModelAndView loginForm(){  
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/login");
        return mav;  
    }  
      
    @RequestMapping(value="/login.html")  
    public JsonPackage login(HttpServletRequest request, HttpServletResponse response, User user){  

    	JsonPackage jsonPackage = new JsonPackage();
    	try {  
            if(user == null || StringUtils.isBlank(user.getUsername()) || StringUtils.isBlank(user.getPassword())){  
            	jsonPackage.setMessage("登录信息不能为空");
            	jsonPackage.setStatus(1);
            	return jsonPackage;
            }  
            //使用权限工具进行用户登录，登录成功后跳到shiro配置的successUrl中，与下面的return没什么关系！  
            SecurityUtils.getSubject().login(new UsernamePasswordToken(user.getUsername(), user.getPassword()));  
            String url = getProjectPath() + "/aaa/bbb.html";
            jsonPackage.setResult(url);
            return jsonPackage;
        } catch (AuthenticationException e) {  
        	jsonPackage.setMessage("用户名错误");
        	jsonPackage.setStatus(1);
        	return jsonPackage;
        }  
    }  
      
    @RequestMapping(value="/logout.html")    
    public ModelAndView logout(RedirectAttributes redirectAttributes ){ 
    	ModelAndView mav = new ModelAndView();
        //使用权限管理工具进行用户的退出，跳出登录，给出提示信息  
        SecurityUtils.getSubject().logout();    
        mav.setViewName("redirect:index.html");
    	return mav;   
    }   
      
    @RequestMapping("/403")  
    public String unauthorizedRole(){  
        return "/403";  
    }  
}

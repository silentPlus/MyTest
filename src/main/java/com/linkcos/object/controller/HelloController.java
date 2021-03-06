package com.linkcos.object.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.linkcos.object.base.BaseClass;
import com.linkcos.object.constants.ConfigConstants;
import com.linkcos.object.service.HelloService;

@Controller
@RequestMapping("/aaa")
public class HelloController extends BaseClass{
	
	@Autowired
	private HelloService helloService;
	
	@RequestMapping(value = "/bbb.html")
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response)  throws Exception {
		System.out.println("123");
		String msg = helloService.sayHello();
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/index");
		mav.addObject("msg", msg);
		mav.addObject("txt", ConfigConstants.TEST_TXT);
		logger.debug("message");
        return mav;
    }
}

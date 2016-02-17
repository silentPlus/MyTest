package com.linkcos.object.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/competition")
public class HelloController {
	
	@RequestMapping(value = "/index.html", method = RequestMethod.GET)
    public ModelAndView index(RedirectAttributes attr) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/mp_index");
        return mav;
    }
}

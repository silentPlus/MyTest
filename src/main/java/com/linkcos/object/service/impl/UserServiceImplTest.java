package com.linkcos.object.service.impl;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.linkcos.object.entity.User;
import com.linkcos.object.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:spring-conf/spring-applicationContext.xml","classpath*:spring-shiro/spring-shiro.xml"})
public class UserServiceImplTest {
	@Autowired
	private UserService userService;
	@Autowired
	private ShiroFilterFactoryBean shiroFilter;
	
	@Test
    public void test() {
		User user = userService.findByName("tom");
		System.out.println(user.getRoleList());
		System.out.println(shiroFilter.getSuccessUrl());
		System.out.println(user.getRolesName());
	}
}

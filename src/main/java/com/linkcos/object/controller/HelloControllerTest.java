package com.linkcos.object.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.linkcos.object.service.HelloService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:spring-common.xml"})
public class HelloControllerTest {
	@Autowired
	private HelloService helloService;
	
	@Test
    public void test() {
		System.out.println(helloService.sayHello());
	}
}

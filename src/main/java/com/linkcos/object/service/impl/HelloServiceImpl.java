package com.linkcos.object.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.linkcos.object.dao.JdbcBaseDao;
import com.linkcos.object.entity.User;
import com.linkcos.object.service.HelloService;

@Service("helloService")
public class HelloServiceImpl implements HelloService {
	
	@Autowired
	private JdbcBaseDao<User> userDao;

	@Override
	public String sayHello() {
		String sql = "select * from user where userid = ?";
		User user = userDao.getJavaBean(sql, User.class, 1);
		return user.getUsername();
	}

}

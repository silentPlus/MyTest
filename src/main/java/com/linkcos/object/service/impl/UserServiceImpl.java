package com.linkcos.object.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.linkcos.object.dao.BaseDao;
import com.linkcos.object.dao.JdbcBaseDao;
import com.linkcos.object.dao.impl.BaseDaoImpl;
import com.linkcos.object.dto.UserDto;
import com.linkcos.object.entity.User;
import com.linkcos.object.service.UserService;
import com.linkcos.object.utils.PageUtil;

@Transactional("tso")
@Service("userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	private BaseDao<User, Integer> baseDao;
	
	@Override
	public User findByName(String username) {
		Map<String, Object> params = new HashMap<>();
		params.put("name", username);
		return baseDao.getByHql("from User u where u.username = :name", params);
	}

	@Override
	public List<User> findAllUsers() {
		return baseDao.find("from User u");
	}

}

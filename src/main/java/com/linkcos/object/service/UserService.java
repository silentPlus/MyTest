package com.linkcos.object.service;

import java.util.List;

import com.linkcos.object.dto.UserDto;
import com.linkcos.object.entity.User;
import com.linkcos.object.utils.PageUtil;

public interface UserService {
	public User findByName(String username);
	
	public List<User> findAllUsers();
}

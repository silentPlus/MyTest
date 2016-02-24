package com.linkcos.object.service;

import com.linkcos.object.entity.User;

public interface UserService {
	public User findByName(String username);
}

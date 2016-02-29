package com.linkcos.object.shiro;

import java.util.HashMap;
import java.util.Map;

public class SimpleFilterChainDefinitionsService extends AbstractFilterChainDefinitionsService {

	@Override
	public Map<String, String> initOtherPermission() {
		// extend to load other permission  
		return new HashMap<String, String>();  
	}

}

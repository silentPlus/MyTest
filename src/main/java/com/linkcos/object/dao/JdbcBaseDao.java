package com.linkcos.object.dao;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

import com.linkcos.object.vo.PageInfo;

public interface JdbcBaseDao<T> {

	/* 获取当前使用的jdbc */
	public JdbcTemplate getJdbc();

	/* :方式Map传参 ,修改操作 */
	public int updateByMap(String namedSql, Map<String, Object> mapParams);

	/* :方式javaBean传参 ,修改操作 */
	public int updateByBean(String namedSql, Object javaBean);

	/* :方式javaBean传参 ,修改操作 ,并且回传主键�?*/
	public Number updateByBeanForkey(String namedSql, Object javaBean, 	String keyName);

		/* :方式Map传参 ,修改操作 ,并且回传主键�?*/
	public Number updateByMapForkey(String namedSql, Map<String, Object> mapParams, String keyName);

	/* :方式javaBean传参 ,修改操作 ,并且回传多主键�? */
	public Map<String, Object> updateByBeanForkeys(String namedSql, Object javaBean, String[] keyNames);

	/* :方式Map传参 ,修改操作 ,并且回传多主键�? */
	public Map<String, Object> updateByMapForkeys(String namedSql, Map<String, Object> mapParams, String[] keyNames);

	/* ?方式传参 ,修改操作 */
	public int commonUpdate(String sql, Object... paramValue);

	/* :方式javaBean传参 ,根据泛型获取数据 */
	public T getJavaBeanByBean(String sql, Class<T> returnType, Object javaBean);

	/* ?方式传参 ,根据泛型获取数据 */
	public T getJavaBean(String sql, Class<T> returnType, Object... paramValue);

	/* :方式Map传参 ,根据泛型获取数据 */
	public T getJavaBeanByMap(String sql, Class<T> returnType, Map<String, Object> mapParams);

	/* 无传�?,根据泛型获取数据列表 */
	public List<T> getList(String sql, Class<T> returnType);

	/* 无传�?,根据泛型获取数据列表 */
	public List<T> getListByBean(String sql, Class<T> returnType, Object javaBean);

	/* ?方式Object传参 ,根据泛型获取数据列表 */
	public List<T> getList(String sql, Class<T> returnType, Object... paramValue);

	/* ?方式Map传参 ,根据泛型获取数据列表 */
	public List<T> getListByMap(String sql, Class<T> returnType, Map<String, Object> mapParams);

	public Map<String, Object> getMapByBean(String sql, Object javaBean);

	public Map<String, Object> getMap(String sql, Object... paramValue);

	public Map<String, Object> getMapByMap(String sql, Map<String, Object> mapParams);

	public List<Map<String, Object>> getListMap(String sql, Object... paramValue);

	/* ?方式Object传参 ,计算总记录数 */
	public long getCount(String countSQL, Object... paramValue);
	
	/* ?方式Object传参 ,javaBean分页 */
	public PageInfo<T> getPageModel(PageInfo<T> model, StringBuffer querySQL, StringBuffer countSQL, Class<T> returnType, Object... paramValue);

	/* ?方式Object传参 ,Map专用分页 */
	public PageInfo<Map<String, Object>> getPageModel(PageInfo<Map<String, Object>> model, StringBuffer querySQL, StringBuffer countSQL, Object... paramValue);

}

package com.linkcos.object.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 数据库基�?��作接�?
 * 
 * @author 微信攻略�?2014-01-20
 * 
 * @version 1.0
 */
public interface BaseDao<T,K extends Serializable> {

	/**
	 * 保存�?��对象
	 * 
	 * @param entity
	 */
	public void save(T entity);

	/**
	 * 删除�?��对象
	 * 
	 * @param entity
	 */
	public void delete(T entity);

	/**
	 * 更新�?��对象
	 * 
	 * @param entity
	 */
	public void update(T entity);

	/**
	 * 合并�?��对象
	 * 
	 * @param entity
	 */
	public void merge(T entity);

	/**
	 * 添加或更新对�?
	 * 
	 * @param entity
	 */
	public void saveOrUpdate(T entity);

	/**
	 * 加载�?��对象
	 * 
	 * @param c
	 * @param id
	 * @return
	 */
	public T load(Class<T> c, String id);

	/**
	 * 获取�?��对象
	 * 
	 * @param c
	 * @param id
	 * @return
	 */
	//public T get(Class<T> c, String id);
	
	/**
	 * 获取�?��对象
	 * 
	 * @param c
	 * @param id
	 * @return
	 */
	public T get(Class<T> c, K id);
	

	/**
	 * 获取�?��对象
	 * 
	 * @param hql
	 * @return
	 */
	public T getByHql(String hql);

	/**
	 * 获取�?��对象
	 * 
	 * @param hql
	 * @param params
	 * @return
	 */
	public T getByHql(String hql, Map<String, Object> params);

	/**
	 * 根据HQL语句查询结果�?
	 * 
	 * @param hql
	 * @return
	 */
	public List<T> find(String hql);

	/**
	 * 查询对象集合
	 * 
	 * @param hql
	 * @param params
	 * @return
	 */
	public List<T> find(String hql, Map<String, Object> params);

	/**
	 * 查询对象集合
	 * 
	 * @param hql
	 * @param page
	 * @param rows
	 * @param params
	 * @return
	 */
	public List<T> find(String hql, int page, int rows,
			Map<String, Object> params);

	/**
	 * Select count(*) from
	 * 
	 * @param hql
	 * @return
	 */
	public Long count(String hql);

	/**
	 * Select count(*) from
	 * 
	 * @param hql
	 * @param params
	 * @return
	 */
	public Long count(String hql, Map<String, Object> params);

	/**
	 * 执行HQL语句
	 * 
	 * @param hql
	 * @return
	 */
	public Integer executeHql(String hql);

	/**
	 * 执行HQL语句
	 * 
	 * @param hql
	 * @param params
	 * @return
	 */
	public Integer executeHql(String hql, Map<String, Object> params)
			throws Exception;
}

package com.linkcos.object.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;


public interface BaseDao<T,K extends Serializable> {

	public void save(T entity);


	public void delete(T entity);

	public void update(T entity);


	public void merge(T entity);


	public void saveOrUpdate(T entity);


	public T load(Class<T> c, String id);
	

	public T get(Class<T> c, K id);
	
	public T getByHql(String hql);

	public T getByHql(String hql, Map<String, Object> params);


	public List<T> find(String hql);


	public List<T> find(String hql, Map<String, Object> params);


	public List<T> find(String hql, int page, int rows,
			Map<String, Object> params);


	public Long count(String hql);

	
	public Long count(String hql, Map<String, Object> params);


	public Integer executeHql(String hql);


	public Integer executeHql(String hql, Map<String, Object> params)
			throws Exception;
}

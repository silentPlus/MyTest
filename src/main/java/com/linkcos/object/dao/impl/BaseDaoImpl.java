package com.linkcos.object.dao.impl;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.linkcos.object.dao.BaseDao;


/**
 * 数据库基础操作实现类
 * 
 * @author 
 * 
 * @version 1.0
 * 
 * @param <T>
 */
@Repository("BaseDao")
public class BaseDaoImpl<T,K extends Serializable> implements BaseDao<T, K> {

	// 依赖注入,加载 SessionFactory
	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * 获取当前Session对象
	 * 
	 * @return
	 */
	private Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	/**
	 * 保存对象
	 */
	@Override
	public void save(T entity) {
		this.getCurrentSession().save(entity);
	}

	/**
	 * 删除对象
	 */
	@Override
	public void delete(T entity) {
		this.getCurrentSession().delete(entity);
	}

	/**
	 * 更新
	 */
	@Override
	public void update(T entity) {
		this.getCurrentSession().update(entity);
	}

	/**
	 * 合并
	 */
	@Override
	public void merge(T entity) {
		this.getCurrentSession().merge(entity);
	}

	/**
	 * 保存或更�?
	 */
	@Override
	public void saveOrUpdate(T entity) {
		this.getCurrentSession().saveOrUpdate(entity);
	}

	/**
	 * 根据ID加载对象
	 */
	@SuppressWarnings("unchecked")
	@Override
	public T load(Class<T> c, String id) {
		return (T) this.getCurrentSession().load(c, id);
	}

	/**
	 * 根据ID获取对象
	 */
	@SuppressWarnings("unchecked")
	@Override
	public T get(Class<T> c, K id) {
		return (T) this.getCurrentSession().get(c, id);
	}
	
	
	
	/**
	 * 根据HQL语句获取对象
	 */
	@Override
	public T getByHql(String hql) {
		return this.getByHql(hql, null);
	}

	/**
	 * 根据HQL语句和参数获取对�?
	 */
	@Override
	public T getByHql(String hql, Map<String, Object> params) {
		// 查询出来的结果集
		List<T> list = this.find(hql, params);
		// 如果结果非空
		if (list != null && list.size() > 0) {
			// 返回第一个对�?
			return list.get(0);
		}
		return null;
	}

	/**
	 * 根据HQL查询结果�?
	 * 
	 * @param hql
	 * @return
	 */
	public List<T> find(String hql) {
		return find(hql, null);
	}

	/**
	 * 查询对象集合
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<T> find(String hql, Map<String, Object> params) {
		// 创建Query
		Query query = this.getCurrentSession().createQuery(hql);

		// 如果参数非空
		if (params != null && params.size() > 0) {
			// 设置参数
			this.setParameters(query, params);
		}
		// 返回查询结果
		return query.list();
	}

	/**
	 * 分页的结果集
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<T> find(String hql, int page, int rows,
			Map<String, Object> params) {

		// 创建Query
		Query query = this.getCurrentSession().createQuery(hql);

		// 如果参数非空
		if (params != null && params.size() > 0) {
			// 设置参数
			this.setParameters(query, params);
		}

		// 查询结果并返�?
		return query.setFirstResult((page - 1) * rows).setMaxResults(rows)
				.list();
	}

	/**
	 * 无参数的 Select count(*) from
	 */
	@Override
	public Long count(String hql) {
		// 通过另一个方法实现^_^
		return this.count(hql, null);
	}

	/**
	 * 带参数的 Select count(*) from
	 */
	@Override
	public Long count(String hql, Map<String, Object> params) {

		// 给传递过来的hql添加前缀内容
		hql = "select count(*) " + hql;

		// 创建Query
		Query query = this.getCurrentSession().createQuery(hql);

		// 如果参数非空
		if (params != null && params.size() > 0) {
			// 设置参数
			this.setParameters(query, params);
		}

		// 返回查询结果
		return (Long) query.uniqueResult();
	}

	/**
	 * 执行HQL
	 */
	@Override
	public Integer executeHql(String hql) {
		// 通过另一个方法实现^_^
		return this.executeHql(hql, null);
	}

	/**
	 * 执行HQL
	 */
	@Override
	public Integer executeHql(String hql, Map<String, Object> params) {

		// 创建Query
		Query query = this.getCurrentSession().createQuery(hql);

		// 如果参数不为null
		if (params != null && params.size() > 0) {
			// 设置参数
			this.setParameters(query, params);
		}

		// 执行HQL
		return query.executeUpdate();
	}

	/**
	 * 给Query赋�?的方�?
	 * 
	 * @param query
	 *            Hibernate Query对象
	 * @param params
	 *            Map集合参数
	 */
	private void setParameters(Query query, Map<String, Object> params) {

		// 获取�?��Key
		Set<String> keys = params.keySet();

		// 循环取�?,赋�?
		for (String key : keys) {

			// 获取到参数中的对�?
			Object obj = params.get(key);

			// 判断参数类型
			if (obj instanceof Collection<?>) {
				// 是集�?
				query.setParameterList(key, (Collection<?>) obj);
			} else if (obj instanceof Object[]) {
				// 是数�?
				query.setParameterList(key, (Object[]) obj);
			} else {
				// 普�?对象
				query.setParameter(key, obj);
			}
		}
	}

}

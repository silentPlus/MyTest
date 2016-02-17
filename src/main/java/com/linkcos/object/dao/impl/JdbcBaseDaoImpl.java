package com.linkcos.object.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SingleColumnRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcDaoSupport;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.linkcos.object.dao.JdbcBaseDao;
import com.linkcos.object.vo.PageInfo;

@Repository("jdbcBaseDao")
public  class JdbcBaseDaoImpl<T> extends NamedParameterJdbcDaoSupport implements JdbcBaseDao<T> {

    public final static String PAGE_SQL_PREFIX = "select * from(select m.*,rownum num from (";
    public final static String PAGE_SQL_END = ") m where rownum<=%1$s) where num>%2$s";

	private boolean isJavaClass(Class<?> clz) {
	    return clz != null && clz.getClassLoader() == null;
	}

    /**
     * 适用于更新数据库,insert,update, delete
     *
     * @param namedSql
     *            :命名参数的SQL语句，而且参数的命名必须和JavaBean中的属性名对应
     * @param javaBean
     *            :JavaBean对象
     * @return
     */
    /* 获取当前使用的jdbc*/
    @Override
	public JdbcTemplate getJdbc() {
    	return this.getJdbcTemplate();
	}

    /* :方式Map传参 ,修改操作 */
    @Override
    public int updateByMap(String namedSql, Map<String, Object> mapParams) {
        return this.getNamedParameterJdbcTemplate().update(namedSql,mapParams);
    }

    /* :方式javaBean传参 ,修改操作 */
    @Override
    public int updateByBean(String namedSql, Object javaBean) {
        SqlParameterSource paramSource = new BeanPropertySqlParameterSource(javaBean);
        return this.getNamedParameterJdbcTemplate().update(namedSql,paramSource);
    }

    /* :方式javaBean传参 ,修改操作 ,并且回传主键值*/
    @Override
    public Number updateByBeanForkey(String namedSql, Object javaBean, String keyName) {
        SqlParameterSource paramSource = new BeanPropertySqlParameterSource(javaBean);
        KeyHolder keyHolder = new GeneratedKeyHolder();
		this.getNamedParameterJdbcTemplate().update(namedSql, paramSource, keyHolder, new String[] { keyName });
        return keyHolder.getKey();
    }

    /* :方式Map传参 ,修改操作 ,并且回传主键值*/
    @Override
    public Number updateByMapForkey(String namedSql, Map<String, Object> mapParams, String keyName){
		SqlParameterSource ps = new MapSqlParameterSource(mapParams);
		KeyHolder keyHolder = new GeneratedKeyHolder();
    	this.getNamedParameterJdbcTemplate().update(namedSql, ps, keyHolder, new String[]{keyName});
    	return keyHolder.getKey();
    }

    /* :方式javaBean传参 ,修改操作 ,并且回传多主键值*/
    @Override
    public Map<String, Object> updateByBeanForkeys(String namedSql, Object javaBean, String[] keyNames) {
        SqlParameterSource paramSource = new BeanPropertySqlParameterSource(javaBean);
        KeyHolder keyHolder = new GeneratedKeyHolder();
        this.getNamedParameterJdbcTemplate().update(namedSql, paramSource, keyHolder, keyNames);
        return keyHolder.getKeys();
    }

    /* :方式Map传参 ,修改操作 ,并且回传多主键值*/
    @Override
    public Map<String, Object> updateByMapForkeys(String namedSql, Map<String, Object> mapParams, String[] keyNames){
    	SqlParameterSource ps=new MapSqlParameterSource(mapParams);
    	KeyHolder keyHolder = new GeneratedKeyHolder();
    	this.getNamedParameterJdbcTemplate().update(namedSql,ps,keyHolder,keyNames);
    	return keyHolder.getKeys();
    }

    /* ?方式传参 ,修改操作 */
    @Override
    public int commonUpdate(String sql, Object... paramValue) {
        return this.getJdbcTemplate().update(sql, paramValue);
    }

    /* ?方式传参 ,根据泛型获取数据 */
    @Override
    public T getJavaBean(String sql, Class<T> returnType, Object... paramValue) {
    	RowMapper<T> rowMapper = isJavaClass(returnType)?new SingleColumnRowMapper<T>(returnType):new BeanPropertyRowMapper<T>(returnType);
		try {
			return this.getJdbcTemplate().queryForObject(sql, rowMapper, paramValue);
		} catch (Exception e) {
			return null;
		}
    }

    /* :方式javaBean传参 ,根据泛型获取数据 */
    @Override
    public T getJavaBeanByBean(String sql, Class<T> returnType, Object javaBean) {
    	RowMapper<T> rowMapper = isJavaClass(returnType)?new SingleColumnRowMapper<T>(returnType):new BeanPropertyRowMapper<T>(returnType);
		SqlParameterSource paramSource = new BeanPropertySqlParameterSource(javaBean);
		try {
			return this.getNamedParameterJdbcTemplate().queryForObject(sql, paramSource, rowMapper);
		} catch (Exception e) {
			return null;
		}
    }
    /* :方式Map传参 ,根据泛型获取数据 */
    @Override
    public T getJavaBeanByMap(String sql, Class<T> returnType, Map<String, Object> mapParams) {
    	RowMapper<T> rowMapper = isJavaClass(returnType)?new SingleColumnRowMapper<T>(returnType):new BeanPropertyRowMapper<T>(returnType);
    	try{
    		return this.getNamedParameterJdbcTemplate().queryForObject(sql, mapParams, rowMapper);
    	} catch(Exception e){
    		return null;
    	}
    }

    /* 无传参 ,根据泛型获取数据列表 */
    @Override
    public List<T> getList(String sql, Class<T> returnType) {
    	RowMapper<T> rowMapper = isJavaClass(returnType)?new SingleColumnRowMapper<T>(returnType):new BeanPropertyRowMapper<T>(returnType);
    	return this.getJdbcTemplate().query(sql, rowMapper);
    }

    @Override
	public List<T> getListByBean(String sql, Class<T> returnType, Object javaBean) {
    	RowMapper<T> rowMapper = isJavaClass(returnType)?new SingleColumnRowMapper<T>(returnType):new BeanPropertyRowMapper<T>(returnType);
		SqlParameterSource paramSource = new BeanPropertySqlParameterSource(javaBean);
    	return this.getNamedParameterJdbcTemplate().query(sql, paramSource, rowMapper);
	}

    /* ?方式Object传参 ,根据泛型获取数据列表 */
    @Override
    public List<T> getList(String sql, Class<T> returnType, Object... paramValue) {
    	RowMapper<T> rowMapper = isJavaClass(returnType)?new SingleColumnRowMapper<T>(returnType):new BeanPropertyRowMapper<T>(returnType);
        return this.getJdbcTemplate().query(sql, rowMapper, paramValue);
    }

	@Override
	public List<T> getListByMap(String sql, Class<T> returnType, Map<String, Object> mapParams) {
		RowMapper<T> rowMapper = isJavaClass(returnType)?new SingleColumnRowMapper<T>(returnType):new BeanPropertyRowMapper<T>(returnType);
		return this.getNamedParameterJdbcTemplate().query(sql, mapParams, rowMapper);
	}

	@Override
	public Map<String, Object> getMapByBean(String sql, Object javaBean) {
		SqlParameterSource paramSource = new BeanPropertySqlParameterSource(javaBean);
		try {
			return this.getNamedParameterJdbcTemplate().queryForMap(sql, paramSource);
		} catch (DataAccessException e) {
			return null;
		}
	}

	@Override
	public Map<String, Object> getMap(String sql, Object... paramValue) {
		try {
			return this.getJdbcTemplate().queryForMap(sql, paramValue);
		} catch (DataAccessException e) {
			return null;
		}
	}

	@Override
	public Map<String, Object> getMapByMap(String sql, Map<String, Object> mapParams) {
		try {
			return this.getNamedParameterJdbcTemplate().queryForMap(sql, mapParams);
		} catch (DataAccessException e) {
			return null;
		}
	}

    @Override
    public List<Map<String, Object>> getListMap(String sql, Object...paramValue) {
    	return this.getJdbcTemplate().queryForList(sql, paramValue);
    }

    /**
     * 计算总记录数
     *
     * @param countSQL
     *            计算总记录数的count语句
     * @param paramValue
     *            语句中对应的参数值
     * @return 总记录数
     */
    @Override
    public long getCount(String countSQL, Object... paramValue) {
    	long count=this.getJdbcTemplate().queryForObject(countSQL, Long.class, paramValue);
    	return count;
    }


    /* ?方式Object传参 ,javaBean分页*/
	@Override
	public PageInfo<T> getPageModel(PageInfo<T> model,StringBuffer querySQL, StringBuffer countSQL, Class<T> returnType,Object... paramValue) {

        // 计算总记录数
        long allCount = this.getCount(countSQL.toString(), paramValue);
        // 获取分页记录集
        // 1。构造完整的分页语句
        int rowNumEnd=model.getCurrentPage()* model.getPageSize();
        int rowNumBegin=(model.getCurrentPage()-1)* model.getPageSize();
        querySQL.insert(0, PAGE_SQL_PREFIX);
        querySQL.append(String.format(PAGE_SQL_END, rowNumEnd,rowNumBegin));

        // 2.连数据库查询
        List<T> result = this.getList(querySQL.toString(), returnType, paramValue);

        // 3.重置分页数据
        model.setTotalRecord(allCount);
        model.setTotalPage();
        model.setPageInfoResult(result);

        return model;
    }

	/* ?方式Object传参 ,Map专用分页*/
	@Override
	public PageInfo<Map<String, Object>> getPageModel(PageInfo<Map<String, Object>> model, StringBuffer querySQL,StringBuffer countSQL, Object... paramValue) {
		// TODO Auto-generated method stub
		 // 计算总记录数
        long allCount = this.getCount(countSQL.toString(), paramValue);
        // 获取分页记录集
        // 1。构造完整的分页语句
        int rowNumEnd=model.getCurrentPage()* model.getPageSize();
        int rowNumBegin=(model.getCurrentPage()-1)* model.getPageSize();
        querySQL.insert(0, PAGE_SQL_PREFIX);
        querySQL.append(String.format(PAGE_SQL_END, rowNumEnd,rowNumBegin));

        // 2.连数据库查询
        List<Map<String, Object>> result = this.getListMap(querySQL.toString(), paramValue);

        // 3.重置分页数据
        model.setTotalRecord(allCount);
        model.setTotalPage();
        model.setPageInfoResult(result);
        return model;
	}

}
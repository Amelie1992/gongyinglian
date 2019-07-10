package com.wzlue.chain.declare.service;

import com.wzlue.chain.declare.entity.DeclareDemandEntity;

import java.util.List;
import java.util.Map;

/**
 * 报关求购表
 * 
 * @author 
 * @email 
 * @date 2018-08-20 19:44:08
 */
public interface DeclareDemandService {
	
	DeclareDemandEntity queryObject(Integer id);
	
	List<DeclareDemandEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(DeclareDemandEntity declareDemand);
	
	void update(DeclareDemandEntity declareDemand);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}

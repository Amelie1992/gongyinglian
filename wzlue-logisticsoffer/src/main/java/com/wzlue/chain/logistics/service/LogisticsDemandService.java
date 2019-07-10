package com.wzlue.chain.logistics.service;

import com.wzlue.chain.logistics.entity.LogisticsDemandEntity;

import java.util.List;
import java.util.Map;

/**
 * 物流求购
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-21 16:17:43
 */
public interface LogisticsDemandService {
	
	LogisticsDemandEntity queryObject(Long id);
	
	List<LogisticsDemandEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(LogisticsDemandEntity logisticsDemand);
	
	void update(LogisticsDemandEntity logisticsDemand);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}

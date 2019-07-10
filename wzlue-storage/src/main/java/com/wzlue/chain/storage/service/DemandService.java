package com.wzlue.chain.storage.service;

import com.wzlue.chain.storage.entity.DemandEntity;

import java.util.List;
import java.util.Map;

/**
 * 仓储求购表
 * 
 * @author 
 * @email 
 * @date 2018-08-27 14:15:37
 */
public interface DemandService {
	
	DemandEntity queryObject(Long id);
	
	List<DemandEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(DemandEntity demand);
	
	void update(DemandEntity demand);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}

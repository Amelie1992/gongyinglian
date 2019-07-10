package com.wzlue.chain.agent.service;


import com.wzlue.chain.agent.entity.AgentDemandGoodsCategoryEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理(求购)分类信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-10 17:54:11
 */
public interface AgentDemandGoodsCategoryService {
	
	AgentDemandGoodsCategoryEntity queryObject(Long id);
	
	List<AgentDemandGoodsCategoryEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AgentDemandGoodsCategoryEntity agentDemandGoodsCategory);
	
	void update(AgentDemandGoodsCategoryEntity agentDemandGoodsCategory);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}

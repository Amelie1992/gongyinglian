package com.wzlue.chain.agent.service;


import com.wzlue.chain.agent.entity.AgentDemandBusinessEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理(求购)项目信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-10 17:54:11
 */
public interface AgentDemandBusinessService {
	
	AgentDemandBusinessEntity queryObject(Long id);
	
	List<AgentDemandBusinessEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AgentDemandBusinessEntity agentDemandBusiness);
	
	void update(AgentDemandBusinessEntity agentDemandBusiness);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}

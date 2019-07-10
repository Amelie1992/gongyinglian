package com.wzlue.chain.agent.service;


import com.wzlue.chain.agent.entity.AgentDemandEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理(求购)信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-10 17:54:11
 */
public interface AgentDemandService {
	
	AgentDemandEntity queryObject(Long id);
	
	List<AgentDemandEntity> queryList(Map<String, Object> map);

	int queryTotal(Map<String, Object> map);

	List<AgentDemandEntity> pageList(Map<String, Object> map);

	int pageCount(Map<String, Object> map);

	void updateDel(Long id,Long userId);

	void save(AgentDemandEntity agentDemand);
	
	void update(AgentDemandEntity agentDemand);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

	AgentDemandEntity queryDetail(Long id);
}

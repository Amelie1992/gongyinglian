package com.wzlue.chain.agent.service;


import com.wzlue.chain.agent.entity.AgentOrderBusinessEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理(订单)服务信息表
 * 
 * @author 
 * @email 
 * @date 2018-08-30 15:40:41
 */
public interface AgentOrderBusinessService {
	
	AgentOrderBusinessEntity queryObject(Long id);
	
	List<AgentOrderBusinessEntity> queryList(Map<String, Object> map);

	int queryTotal(Map<String, Object> map);

	void save(AgentOrderBusinessEntity agentOrderBusiness);
	
	void update(AgentOrderBusinessEntity agentOrderBusiness);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}

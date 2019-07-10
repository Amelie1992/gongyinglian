package com.wzlue.chain.agent.service;

import com.wzlue.chain.agent.entity.AgentOfferBusinessEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理报盘业务信息表(业务接口层)
 *
 * @author Zeyee
 * @date 2018-08-22
 */
public interface AgentOfferBusinessService {

	AgentOfferBusinessEntity queryObject(Integer id);
	
	List<AgentOfferBusinessEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AgentOfferBusinessEntity agentOfferBusiness);
	
	void update(AgentOfferBusinessEntity agentOfferBusiness);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

}

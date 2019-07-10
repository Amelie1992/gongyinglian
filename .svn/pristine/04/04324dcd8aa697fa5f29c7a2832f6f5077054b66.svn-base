package com.wzlue.chain.agent.service;

import com.wzlue.chain.agent.entity.AgentOrderOfferEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理订单 -> 报盘信息备份表
 * 
 * @author 
 * @email 
 * @date 2018-09-14 13:53:22
 */
public interface AgentOrderOfferService {
	
	AgentOrderOfferEntity queryObject(Integer id);
	
	List<AgentOrderOfferEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AgentOrderOfferEntity agentOrderOffer);
	
	void update(AgentOrderOfferEntity agentOrderOffer);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}

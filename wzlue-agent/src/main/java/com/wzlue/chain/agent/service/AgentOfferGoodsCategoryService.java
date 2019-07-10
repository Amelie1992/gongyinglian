package com.wzlue.chain.agent.service;


import com.wzlue.chain.agent.entity.AgentOfferGoodsCategoryEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理报盘商品分类信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-01 17:50:03
 */
public interface AgentOfferGoodsCategoryService {
	
	AgentOfferGoodsCategoryEntity queryObject(Long id);
	
	List<AgentOfferGoodsCategoryEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AgentOfferGoodsCategoryEntity agentOfferGoodsCategory);
	
	void update(AgentOfferGoodsCategoryEntity agentOfferGoodsCategory);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}

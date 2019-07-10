package com.wzlue.chain.agent.service;

import com.wzlue.chain.agent.entity.AgentOfferEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理报盘信息表(业务接口层)
 *
 * @author Zeyee
 * @date 2018-08-22
 */
public interface AgentOfferService {
	
	AgentOfferEntity queryObject(Integer id);
	
	List<AgentOfferEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AgentOfferEntity agentOffer);
	
	void update(AgentOfferEntity agentOffer);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

	List<AgentOfferEntity> pageList(Map<String, Object> map);

	Integer pageCount(Map<String, Object> map);

	AgentOfferEntity queryInfo(Long id);

	void updateDel(Long id, Long userId);
    //上架
	void shelf(Long id);
   //下架
	void obtained(Long id);

	List<AgentOfferEntity> getListByCompanyId(Long id);

    void shelfOrobtained(List<AgentOfferEntity> agentOfferEntities);

    void obtainedAll(List<AgentOfferEntity> agentOfferEntities);

	void shelfAll(List<AgentOfferEntity> agentOfferEntities);
}

package com.wzlue.chain.marketing.service;

import com.wzlue.chain.marketing.entity.MarketTenderEntity;

import java.util.List;
import java.util.Map;

/**
 * 招标表
 * 
 * @author 
 * @email 
 * @date 2018-10-24 15:19:33
 */
public interface MarketTenderService {
	
	MarketTenderEntity queryObject(Long id);
	
	List<MarketTenderEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(MarketTenderEntity marketTender);
	
	void update(MarketTenderEntity marketTender);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    void updateStatus(Map<String, Object> map);

	void updateStatus1(Map<String, Object> map);
}

package com.wzlue.chain.marketing.service;

import com.wzlue.chain.marketing.entity.MarketTenderRecordEntity;

import java.util.List;
import java.util.Map;

/**
 * 竞标记录表
 * 
 * @author 
 * @email 
 * @date 2018-10-24 15:57:53
 */
public interface MarketTenderRecordService {
	
	MarketTenderRecordEntity queryObject(Long id);
	
	List<MarketTenderRecordEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(MarketTenderRecordEntity marketTenderRecord);
	
	void update(MarketTenderRecordEntity marketTenderRecord);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

	//查询参与竞标人数
	int queryTotalById(Integer marketTenderId);
}

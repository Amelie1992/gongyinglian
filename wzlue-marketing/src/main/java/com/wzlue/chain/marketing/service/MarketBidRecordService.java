package com.wzlue.chain.marketing.service;

import com.wzlue.chain.marketing.entity.MarketBidRecordEntity;

import java.util.List;
import java.util.Map;

/**
 * 拍卖出价记录表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-26 13:48:09
 */
public interface MarketBidRecordService {
	
	MarketBidRecordEntity queryObject(Long id);
	
	List<MarketBidRecordEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(MarketBidRecordEntity marketBidRecord);
	
	void update(MarketBidRecordEntity marketBidRecord);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    int queryTotals(Long auctionId);
}

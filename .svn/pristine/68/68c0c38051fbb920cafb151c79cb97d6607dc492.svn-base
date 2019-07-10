package com.wzlue.chain.marketing.service;

import com.wzlue.chain.marketing.entity.MarketAuctionCommodityEntity;

import java.util.List;
import java.util.Map;

/**
 * 拍卖商品表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-26 14:05:34
 */
public interface MarketAuctionCommodityService {
	
	MarketAuctionCommodityEntity queryObject(Long id);
	
	List<MarketAuctionCommodityEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(MarketAuctionCommodityEntity marketAuctionCommodity);
	
	void update(MarketAuctionCommodityEntity marketAuctionCommodity);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}

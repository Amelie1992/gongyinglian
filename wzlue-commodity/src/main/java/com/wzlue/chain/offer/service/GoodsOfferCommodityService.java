package com.wzlue.chain.offer.service;

import com.wzlue.chain.offer.entity.GoodsOfferCommodityEntity;

import java.util.List;
import java.util.Map;

/**
 * 货物商品表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 14:30:02
 */
public interface GoodsOfferCommodityService {
	
	GoodsOfferCommodityEntity queryObject(Long id);
	
	List<GoodsOfferCommodityEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(GoodsOfferCommodityEntity goodsOfferCommodity);
	
	void update(GoodsOfferCommodityEntity goodsOfferCommodity);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}

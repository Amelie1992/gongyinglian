package com.wzlue.chain.offer.service;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.offer.entity.GoodsOfferEntity;

import java.util.List;
import java.util.Map;

/**
 * 货物报盘
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 14:30:02
 */
public interface GoodsOfferService {
	
	GoodsOfferEntity queryObject(Long id);
	
	List<GoodsOfferEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(GoodsOfferEntity goodsOffer);
	
	void update(GoodsOfferEntity goodsOffer);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    void updateStatue(Map<String, Object> ids);

	List<GoodsOfferEntity> queryRecommendList(Map<String, Object> map);

	GoodsOfferEntity queryOfferByNumber(String parseLong);

    List<Map<String, Object>> getHistoryPriceTrend(Map<String, Object> params);

	List<String> getOfferId(Map<String, Object> params);
}

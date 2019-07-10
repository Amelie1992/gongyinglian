package com.wzlue.chain.logistics.service;

import com.wzlue.chain.logistics.entity.LogisticsOrderOfferEntity;

import java.util.List;
import java.util.Map;

/**
 * 商品库物流报盘备份
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-31 15:13:24
 */
public interface LogisticsOrderOfferService {
	
	LogisticsOrderOfferEntity queryObject(Long id);
	
	List<LogisticsOrderOfferEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(LogisticsOrderOfferEntity logisticsOrderOffer);
	
	void update(LogisticsOrderOfferEntity logisticsOrderOffer);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

	LogisticsOrderOfferEntity queryByOrderId(Long id);
}

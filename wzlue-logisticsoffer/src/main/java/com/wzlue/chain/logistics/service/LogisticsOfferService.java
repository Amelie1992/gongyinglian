package com.wzlue.chain.logistics.service;

import com.wzlue.chain.logistics.entity.LogisticsOfferEntity;

import java.util.List;
import java.util.Map;

/**
 * 商品库物流报盘
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 10:19:13
 */
public interface LogisticsOfferService {
	
	LogisticsOfferEntity queryObject(Long id);
	
	List<LogisticsOfferEntity> queryList(Map<String, Object> map);

	//检查物流编码是否重复
	LogisticsOfferEntity checkCode(LogisticsOfferEntity logisticsOfferEntity);
	int queryTotal(Map<String, Object> map);
	
	void save(LogisticsOfferEntity logisticsOffer);
	
	void update(LogisticsOfferEntity logisticsOffer);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    void updateStatus(Map<String, Object> ids);

    List<LogisticsOfferEntity> queryList1(Map<String, Object> params);

	void updateStatus1(Map<String, Object> map);

    void updateByOrderId2(Long id);
}

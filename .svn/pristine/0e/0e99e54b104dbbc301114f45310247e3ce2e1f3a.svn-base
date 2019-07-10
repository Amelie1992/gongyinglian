package com.wzlue.chain.storage.service;

import com.wzlue.chain.storage.entity.OrderOfferEntity;

import java.util.List;
import java.util.Map;

/**
 * 仓储报盘备份
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
public interface OrderOfferService {
	
	OrderOfferEntity queryObject(Long id);
	
	List<OrderOfferEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(OrderOfferEntity orderOffer);
	
	void update(OrderOfferEntity orderOffer);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    OrderOfferEntity queryByOrderId(Long id);

    List<Map<String,Object>> getStorageList(Map<String, Object> map);
}

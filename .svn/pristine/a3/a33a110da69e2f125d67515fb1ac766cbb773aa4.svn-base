package com.wzlue.chain.storage.service;

import com.wzlue.chain.storage.entity.OrderCommodityEntity;
import com.wzlue.chain.storage.entity.StorageOutCommodityEntity;

import java.util.List;
import java.util.Map;

/**
 * 订单货物商品表
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
public interface OrderCommodityService {
	
	OrderCommodityEntity queryObject(Long id);
	
	List<OrderCommodityEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(OrderCommodityEntity orderCommodity);
	
	void update(OrderCommodityEntity orderCommodity);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    List<StorageOutCommodityEntity> queryCommoditys(Map<String, Object> map);
}

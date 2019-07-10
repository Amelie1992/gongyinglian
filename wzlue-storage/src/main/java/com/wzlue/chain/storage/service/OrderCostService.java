package com.wzlue.chain.storage.service;

import com.wzlue.chain.storage.entity.OrderCostEntity;

import java.util.List;
import java.util.Map;

/**
 * 仓储订单其他费用
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
public interface OrderCostService {
	
	OrderCostEntity queryObject(Long id);
	
	List<OrderCostEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(OrderCostEntity orderCost);
	
	void update(OrderCostEntity orderCost);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    OrderCostEntity queryByOrderId(Long id);

    OrderCostEntity queryObjectByOrderId(Long id);

	OrderCostEntity queryObjectByOutId(Long outId);
}

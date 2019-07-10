package com.wzlue.chain.logistics.service;

import com.wzlue.chain.logistics.entity.LogisticsOrderShipEntity;

import java.util.List;
import java.util.Map;

/**
 * 物流订单发货表
 * 
 * @author 
 * @email 
 * @date 2018-11-27 10:20:15
 */
public interface LogisticsOrderShipService {
	
	LogisticsOrderShipEntity queryObject(Long id);
	
	List<LogisticsOrderShipEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(LogisticsOrderShipEntity logisticsOrderShip);
	
	void update(LogisticsOrderShipEntity logisticsOrderShip);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}

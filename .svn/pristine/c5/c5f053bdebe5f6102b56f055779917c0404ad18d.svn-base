package com.wzlue.chain.logistics.service;

import com.wzlue.chain.logistics.entity.LogisticsOrderCommodityEntity;

import java.util.List;
import java.util.Map;

/**
 * 物流订单商品表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-06 16:42:34
 */
public interface LogisticsOrderCommodityService {
	
	LogisticsOrderCommodityEntity queryObject(Long id);
	
	List<LogisticsOrderCommodityEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(LogisticsOrderCommodityEntity logisticsOrderCommodity);
	
	void update(LogisticsOrderCommodityEntity logisticsOrderCommodity);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

	Map<String,Object> getListByOrderNumber(String orderNumber, Long userId);
}

package com.wzlue.chain.ship.service;

import com.wzlue.chain.ship.entity.GoodsOrderShipEntity;

import java.util.List;
import java.util.Map;

/**
 * 订单发货明细表(国内)
 * 
 * @author 
 * @email 
 * @date 2018-09-25 13:58:00
 */
public interface GoodsOrderShipService {
	
	GoodsOrderShipEntity queryObject(Integer id);
	
	List<GoodsOrderShipEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(GoodsOrderShipEntity goodsOrderShip);
	
	void update(GoodsOrderShipEntity goodsOrderShip);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}

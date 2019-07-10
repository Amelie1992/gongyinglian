package com.wzlue.chain.order.service;

import com.wzlue.chain.order.entity.GoodsOrderCinfoEntity;

import java.util.List;
import java.util.Map;

/**
 * 收货人信息
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 19:47:29
 */
public interface GoodsOrderCinfoService {
	
	GoodsOrderCinfoEntity queryObject(Long id);
	
	List<GoodsOrderCinfoEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(GoodsOrderCinfoEntity goodsOrderCinfo);
	
	void update(GoodsOrderCinfoEntity goodsOrderCinfo);
	
	void delete(Long id);

	void deleteByOrderId(String orderId);

	void deleteBatch(Long[] ids);
}

package com.wzlue.chain.order.service;

import com.wzlue.chain.order.entity.GoodsOrderDetailEntity;

import java.util.List;
import java.util.Map;

/**
 * 订单商品列表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 19:47:29
 */
public interface GoodsOrderDetailService {
	
	GoodsOrderDetailEntity queryObject(Long id);
	
	List<GoodsOrderDetailEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(GoodsOrderDetailEntity goodsOrderDetail);
	
	void update(GoodsOrderDetailEntity goodsOrderDetail);
	
	void delete(Long id);

	void deleteByOrderId(String orderId);
	
	void deleteBatch(Long[] ids);

    void saveBatch(List<GoodsOrderDetailEntity> details);
}

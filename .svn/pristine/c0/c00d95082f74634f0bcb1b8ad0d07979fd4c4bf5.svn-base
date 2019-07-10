package com.wzlue.chain.order.service;

import com.wzlue.chain.order.entity.GoodsOrderCommodityEntity;

import java.util.List;
import java.util.Map;

/**
 * 货物商品表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-09-10 10:59:51
 */
public interface GoodsOrderCommodityService {
	
	GoodsOrderCommodityEntity queryObject(Long id);
	
	List<GoodsOrderCommodityEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(GoodsOrderCommodityEntity goodsOrderCommodity);
	
	void update(GoodsOrderCommodityEntity goodsOrderCommodity);
	
	void delete(Long id);

	void deleteByOrderId(String orderId);

	void deleteBatch(Long[] ids);

	void saveBatch(List<GoodsOrderCommodityEntity> commoditys);
}

package com.wzlue.chain.pre.service;

import com.wzlue.chain.pre.entity.GoodsOrderPreEntity;

import java.util.List;
import java.util.Map;

/**
 * 订单审核明细表
 * 
 * @author 
 * @email 
 * @date 2018-09-20 10:59:57
 */
public interface GoodsOrderPreService {
	
	GoodsOrderPreEntity queryObject(Integer id);
	
	List<GoodsOrderPreEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(GoodsOrderPreEntity goodsOrderPre);
	
	void update(GoodsOrderPreEntity goodsOrderPre);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

    GoodsOrderPreEntity getByOrderId(String orderId);
}

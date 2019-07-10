package com.wzlue.chain.afterSale.service;

import com.wzlue.chain.afterSale.entity.AfterSaleEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 售后服务
 * 
 * @author 
 * @email 
 * @date 2018-08-31 13:38:09
 */
public interface AfterSaleService {
	
	AfterSaleEntity queryObject(String id);
	
	List<AfterSaleEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AfterSaleEntity afterSale);
	
	void update(AfterSaleEntity afterSale);

	void delete(String id);
	
	void deleteBatch(String[] ids);

    void handle(AfterSaleEntity afterSale);

	int getAfter(String id);

    AfterSaleEntity queryByOrderId(String orderId);
}

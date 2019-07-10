package com.wzlue.chain.promotion.service;

import com.wzlue.chain.promotion.entity.PromotionEntity;

import java.util.List;
import java.util.Map;

/**
 * 促销表
 * 
 * @author 
 * @email 
 * @date 2018-08-27 16:01:49
 */
public interface PromotionService {
	
	PromotionEntity queryObject(Integer id);
	
	List<PromotionEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(PromotionEntity promotion);
	
	void update(PromotionEntity promotion);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

    void onSale(Map<String,Object> map);

	void noSale(Map<String,Object> map);
}

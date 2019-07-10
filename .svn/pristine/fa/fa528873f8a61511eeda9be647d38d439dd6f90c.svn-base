package com.wzlue.chain.offer.service;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.offer.entity.GoodsBuyingEntity;

import java.util.List;
import java.util.Map;

/**
 * 货物求购
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-23 10:01:30
 */
public interface GoodsBuyingService {
	
	GoodsBuyingEntity queryObject(Long id);
	
	List<GoodsBuyingEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(GoodsBuyingEntity goodsBuying);
	
	void update(GoodsBuyingEntity goodsBuying);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    void updateUnsold(Map<String, Object> params);

	List<GoodsBuyingEntity> getBuyingOffer(Map<String, Object> map);

	List<GoodsBuyingEntity> queryBuyingList(Map<String, Object> map);
}

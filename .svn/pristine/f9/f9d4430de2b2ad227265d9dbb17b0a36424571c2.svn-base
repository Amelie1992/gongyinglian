package com.wzlue.chain.storage.service;

import com.wzlue.chain.storage.entity.OfferEntity;

import java.util.List;
import java.util.Map;

/**
 * 仓储报盘
 * 
 * @author 
 * @email 
 * @date 2018-08-27 14:15:36
 */
public interface OfferService {
	
	OfferEntity queryObject(Long id);
	
	List<OfferEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(OfferEntity offer);

	void updateList(List<OfferEntity> offers);
	
	void update(OfferEntity offer);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    OfferEntity checkCode(OfferEntity offer);

	void updateByOrderId2(Long id);


}

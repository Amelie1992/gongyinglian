package com.wzlue.chain.declare.service;

import com.wzlue.chain.declare.entity.DeclareOrderOfferEntity;

import java.util.List;
import java.util.Map;

/**
 * 报关报盘备份
 * 
 * @author 
 * @email 
 * @date 2018-09-04 17:09:08
 */
public interface DeclareOrderOfferService {
	
	DeclareOrderOfferEntity queryObject(Integer id);
	
	List<DeclareOrderOfferEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(DeclareOrderOfferEntity declareOrderOffer);
	
	void update(DeclareOrderOfferEntity declareOrderOffer);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}

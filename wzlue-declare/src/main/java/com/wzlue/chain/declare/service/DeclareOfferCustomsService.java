package com.wzlue.chain.declare.service;

import com.wzlue.chain.declare.entity.DeclareOfferCustomsEntity;

import java.util.List;
import java.util.Map;

/**
 * 报关报盘海关
 * 
 * @author ÎºË¼Æë
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 16:12:27
 */
public interface DeclareOfferCustomsService {
	
	DeclareOfferCustomsEntity queryObject(Integer id);
	
	List<DeclareOfferCustomsEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(DeclareOfferCustomsEntity declareOfferCustoms);
	
	void update(DeclareOfferCustomsEntity declareOfferCustoms);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}

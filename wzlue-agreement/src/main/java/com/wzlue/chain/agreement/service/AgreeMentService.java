package com.wzlue.chain.agreement.service;

import com.wzlue.chain.agreement.entity.AgreeMentEntity;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author 
 * @email 
 * @date 2018-11-05 17:34:33
 */
public interface AgreeMentService {
	
	AgreeMentEntity queryObject(Integer xieyiId);
	
	List<AgreeMentEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AgreeMentEntity agreeMent);
	
	void update(AgreeMentEntity agreeMent);
	
	void delete(Integer xieyiId);
	
	void deleteBatch(Integer[] xieyiIds);

	AgreeMentEntity queryObjectByType(String xieyiType);
}

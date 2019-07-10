package com.wzlue.chain.logistics.service;

import com.wzlue.chain.logistics.entity.LogisticsOfferAddressEntity;

import java.util.List;
import java.util.Map;

/**
 * 物流报盘运输线路表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 14:12:25
 */
public interface LogisticsOfferAddressService {
	
	LogisticsOfferAddressEntity queryObject(Long id);
	
	List<LogisticsOfferAddressEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(LogisticsOfferAddressEntity logisticsOfferAddress);
	
	void update(LogisticsOfferAddressEntity logisticsOfferAddress);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    void saveList(List<LogisticsOfferAddressEntity> logisticsOfferAddressEntityList);

	void deleteBatchs(long logisticsId);

	List<LogisticsOfferAddressEntity> queryByLogisticsId(Integer logisticsId);

	List<String> queryLists();

	List<String> queryListInters(String province);

	List<String> queryListsEnd();

	List<String> queryListIntersEnd(String provinceEnd);
}

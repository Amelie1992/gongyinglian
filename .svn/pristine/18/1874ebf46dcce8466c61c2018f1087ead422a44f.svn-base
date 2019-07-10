package com.wzlue.chain.storage.service;

import com.wzlue.chain.storage.entity.StoragePayEntity;

import java.util.List;
import java.util.Map;

/**
 * 仓储日费用记录表
 * 
 * @author 
 * @email 
 * @date 2018-09-19 19:09:47
 */
public interface StoragePayService {
	
	StoragePayEntity queryObject(Long id);
	
	List<StoragePayEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(StoragePayEntity storagePay);
	
	void update(StoragePayEntity storagePay);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

	List<StoragePayEntity> queryListToSave();

	void saveList(List<StoragePayEntity> list);
}

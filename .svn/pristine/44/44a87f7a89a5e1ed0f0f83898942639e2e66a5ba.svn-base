package com.wzlue.chain.storage.service;

import com.wzlue.chain.storage.entity.StorageOutEntity;

import java.util.List;
import java.util.Map;

/**
 * 仓储出库
 * 
 * @author 
 * @email 
 * @date 2018-09-15 11:17:18
 */
public interface StorageOutService {
	
	StorageOutEntity queryObject(Long id);
	
	List<StorageOutEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(StorageOutEntity storageOut);
	
	void update(StorageOutEntity storageOut);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    void updateOutOrCommodity(StorageOutEntity storageOut);
}

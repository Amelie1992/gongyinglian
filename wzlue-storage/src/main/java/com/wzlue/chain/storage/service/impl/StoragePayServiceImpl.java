package com.wzlue.chain.storage.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.storage.dao.StoragePayDao;
import com.wzlue.chain.storage.entity.StoragePayEntity;
import com.wzlue.chain.storage.service.StoragePayService;



@Service("storagePayService")
public class StoragePayServiceImpl implements StoragePayService {
	@Autowired
	private StoragePayDao storagePayDao;
	
	@Override
	public StoragePayEntity queryObject(Long id){
		return storagePayDao.queryObject(id);
	}
	
	@Override
	public List<StoragePayEntity> queryList(Map<String, Object> map){
		return storagePayDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return storagePayDao.queryTotal(map);
	}
	
	@Override
	public void save(StoragePayEntity storagePay){
		storagePayDao.save(storagePay);
	}
	
	@Override
	public void update(StoragePayEntity storagePay){
		storagePayDao.update(storagePay);
	}
	
	@Override
	public void delete(Long id){
		storagePayDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		storagePayDao.deleteBatch(ids);
	}

	@Override
	public List<StoragePayEntity> queryListToSave() {
		return storagePayDao.queryListToSave();
	}

	@Override
	public void saveList(List<StoragePayEntity> list) {
		storagePayDao.saveList(list);
	}
}

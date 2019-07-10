package com.wzlue.chain.logistics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.logistics.dao.LogisticsOfferAddressDao;
import com.wzlue.chain.logistics.entity.LogisticsOfferAddressEntity;
import com.wzlue.chain.logistics.service.LogisticsOfferAddressService;



@Service("logisticsOfferAddressService")
public class LogisticsOfferAddressServiceImpl implements LogisticsOfferAddressService {
	@Autowired
	private LogisticsOfferAddressDao logisticsOfferAddressDao;
	
	@Override
	public LogisticsOfferAddressEntity queryObject(Long id){
		return logisticsOfferAddressDao.queryObject(id);
	}
	
	@Override
	public List<LogisticsOfferAddressEntity> queryList(Map<String, Object> map){
		return logisticsOfferAddressDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return logisticsOfferAddressDao.queryTotal(map);
	}
	
	@Override
	public void save(LogisticsOfferAddressEntity logisticsOfferAddress){
		logisticsOfferAddressDao.save(logisticsOfferAddress);
	}
	
	@Override
	public void update(LogisticsOfferAddressEntity logisticsOfferAddress){
		logisticsOfferAddressDao.update(logisticsOfferAddress);
	}
	
	@Override
	public void delete(Long id){
		logisticsOfferAddressDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		logisticsOfferAddressDao.deleteBatch(ids);
	}

	@Override
	public void saveList(List<LogisticsOfferAddressEntity> logisticsOfferAddressEntityList) {
		logisticsOfferAddressDao.saveList(logisticsOfferAddressEntityList);
	}

	@Override
	public void deleteBatchs(long logisticsId) {
		logisticsOfferAddressDao.deleteBatchs(logisticsId);
	}

	@Override
	public List<LogisticsOfferAddressEntity> queryByLogisticsId(Integer logisticsId) {
		return logisticsOfferAddressDao.queryByLogisticsId(logisticsId);
	}

	@Override
	public List<String> queryLists() {
		return logisticsOfferAddressDao.queryLists();
	}

	@Override
	public List<String> queryListInters(String province) {
		return logisticsOfferAddressDao.queryListInters(province);
	}

	@Override
	public List<String> queryListsEnd() {
		return logisticsOfferAddressDao.queryListsEnd();
	}

	@Override
	public List<String> queryListIntersEnd(String provinceEnd) {
		return logisticsOfferAddressDao.queryListIntersEnd(provinceEnd);
	}
}

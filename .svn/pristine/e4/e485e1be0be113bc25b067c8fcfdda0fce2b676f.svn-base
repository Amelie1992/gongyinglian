package com.wzlue.chain.logistics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.logistics.dao.LogisticsOrderOfferDao;
import com.wzlue.chain.logistics.entity.LogisticsOrderOfferEntity;
import com.wzlue.chain.logistics.service.LogisticsOrderOfferService;



@Service("logisticsOrderOfferService")
public class LogisticsOrderOfferServiceImpl implements LogisticsOrderOfferService {
	@Autowired
	private LogisticsOrderOfferDao logisticsOrderOfferDao;
	
	@Override
	public LogisticsOrderOfferEntity queryObject(Long id){
		return logisticsOrderOfferDao.queryObject(id);
	}
	
	@Override
	public List<LogisticsOrderOfferEntity> queryList(Map<String, Object> map){
		return logisticsOrderOfferDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return logisticsOrderOfferDao.queryTotal(map);
	}
	
	@Override
	public void save(LogisticsOrderOfferEntity logisticsOrderOffer){
		logisticsOrderOfferDao.save(logisticsOrderOffer);
	}
	
	@Override
	public void update(LogisticsOrderOfferEntity logisticsOrderOffer){
		logisticsOrderOfferDao.update(logisticsOrderOffer);
	}
	
	@Override
	public void delete(Long id){
		logisticsOrderOfferDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		logisticsOrderOfferDao.deleteBatch(ids);
	}

	@Override
	public LogisticsOrderOfferEntity queryByOrderId(Long id) {
		return logisticsOrderOfferDao.queryByOrderId(id);
	}

}

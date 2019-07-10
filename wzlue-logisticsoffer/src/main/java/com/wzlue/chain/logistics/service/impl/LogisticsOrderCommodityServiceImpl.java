package com.wzlue.chain.logistics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.logistics.dao.LogisticsOrderCommodityDao;
import com.wzlue.chain.logistics.entity.LogisticsOrderCommodityEntity;
import com.wzlue.chain.logistics.service.LogisticsOrderCommodityService;



@Service("logisticsOrderCommodityService")
public class LogisticsOrderCommodityServiceImpl implements LogisticsOrderCommodityService {
	@Autowired
	private LogisticsOrderCommodityDao logisticsOrderCommodityDao;
	
	@Override
	public LogisticsOrderCommodityEntity queryObject(Long id){
		return logisticsOrderCommodityDao.queryObject(id);
	}
	
	@Override
	public List<LogisticsOrderCommodityEntity> queryList(Map<String, Object> map){
		return logisticsOrderCommodityDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return logisticsOrderCommodityDao.queryTotal(map);
	}
	
	@Override
	public void save(LogisticsOrderCommodityEntity logisticsOrderCommodity){
		logisticsOrderCommodityDao.save(logisticsOrderCommodity);
	}
	
	@Override
	public void update(LogisticsOrderCommodityEntity logisticsOrderCommodity){
		logisticsOrderCommodityDao.update(logisticsOrderCommodity);
	}
	
	@Override
	public void delete(Long id){
		logisticsOrderCommodityDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		logisticsOrderCommodityDao.deleteBatch(ids);
	}

	@Override
	public Map<String, Object> getListByOrderNumber(String orderNumber, Long userId) {
		return logisticsOrderCommodityDao.getListByOrderNumber(orderNumber,userId);
	}

}

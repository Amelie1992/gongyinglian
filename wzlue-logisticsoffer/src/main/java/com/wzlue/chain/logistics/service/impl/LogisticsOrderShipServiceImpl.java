package com.wzlue.chain.logistics.service.impl;

import com.wzlue.chain.logistics.dao.LogisticsOrderDao;
import com.wzlue.chain.logistics.entity.LogisticsOrderEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.logistics.dao.LogisticsOrderShipDao;
import com.wzlue.chain.logistics.entity.LogisticsOrderShipEntity;
import com.wzlue.chain.logistics.service.LogisticsOrderShipService;



@Service("logisticsOrderShipService")
public class LogisticsOrderShipServiceImpl implements LogisticsOrderShipService {
	@Autowired
	private LogisticsOrderShipDao logisticsOrderShipDao;
	@Autowired
	private LogisticsOrderDao logisticsOrderDao;
	@Override
	public LogisticsOrderShipEntity queryObject(Long id){
		return logisticsOrderShipDao.queryObject(id);
	}
	
	@Override
	public List<LogisticsOrderShipEntity> queryList(Map<String, Object> map){
		return logisticsOrderShipDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return logisticsOrderShipDao.queryTotal(map);
	}
	
	@Override
	public void save(LogisticsOrderShipEntity logisticsOrderShip){
		LogisticsOrderEntity logisticsOrder = new LogisticsOrderEntity();
		logisticsOrder = logisticsOrderDao.queryObject(logisticsOrderShip.getOrderId());
		logisticsOrder.setOrderStatus(5);//卖家订单已发货，买家待收货
		logisticsOrderShip.setOrderId(logisticsOrder.getOrderNumber());
		logisticsOrderDao.update(logisticsOrder);
		logisticsOrderShipDao.save(logisticsOrderShip);
	}
	
	@Override
	public void update(LogisticsOrderShipEntity logisticsOrderShip){
		logisticsOrderShipDao.update(logisticsOrderShip);
	}
	
	@Override
	public void delete(Long id){
		logisticsOrderShipDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		logisticsOrderShipDao.deleteBatch(ids);
	}
	
}

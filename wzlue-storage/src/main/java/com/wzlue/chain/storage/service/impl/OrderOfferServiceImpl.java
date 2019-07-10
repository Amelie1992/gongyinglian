package com.wzlue.chain.storage.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.storage.dao.OrderOfferDao;
import com.wzlue.chain.storage.entity.OrderOfferEntity;
import com.wzlue.chain.storage.service.OrderOfferService;



@Service("orderOfferService")
public class OrderOfferServiceImpl implements OrderOfferService {
	@Autowired
	private OrderOfferDao orderOfferDao;
	
	@Override
	public OrderOfferEntity queryObject(Long id){
		return orderOfferDao.queryObject(id);
	}
	
	@Override
	public List<OrderOfferEntity> queryList(Map<String, Object> map){
		return orderOfferDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return orderOfferDao.queryTotal(map);
	}
	
	@Override
	public void save(OrderOfferEntity orderOffer){
		orderOfferDao.save(orderOffer);
	}
	
	@Override
	public void update(OrderOfferEntity orderOffer){
		orderOfferDao.update(orderOffer);
	}
	
	@Override
	public void delete(Long id){
		orderOfferDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		orderOfferDao.deleteBatch(ids);
	}

	@Override
	public OrderOfferEntity queryByOrderId(Long id) {
		return orderOfferDao.queryByOrderId(id);
	}

	@Override
	public List<Map<String, Object>> getStorageList(Map<String, Object> map) {
		return orderOfferDao.getStorageList(map);
	}
}

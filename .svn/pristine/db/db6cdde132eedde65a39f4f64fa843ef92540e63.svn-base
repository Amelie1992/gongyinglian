package com.wzlue.chain.storage.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.storage.dao.OrderCostDao;
import com.wzlue.chain.storage.entity.OrderCostEntity;
import com.wzlue.chain.storage.service.OrderCostService;



@Service("orderCostService")
public class OrderCostServiceImpl implements OrderCostService {
	@Autowired
	private OrderCostDao orderCostDao;

	@Override
	public OrderCostEntity queryObject(Long id){
		return orderCostDao.queryObject(id);
	}

	@Override
	public List<OrderCostEntity> queryList(Map<String, Object> map){
		return orderCostDao.queryList(map);
	}

	@Override
	public int queryTotal(Map<String, Object> map){
		return orderCostDao.queryTotal(map);
	}

	@Override
	public void save(OrderCostEntity orderCost){
		orderCostDao.save(orderCost);
	}
	
	@Override
	public void update(OrderCostEntity orderCost){
		orderCostDao.update(orderCost);
	}
	
	@Override
	public void delete(Long id){
		orderCostDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		orderCostDao.deleteBatch(ids);
	}

	@Override
	public OrderCostEntity queryByOrderId(Long id) {
		return orderCostDao.queryByOrderId(id);
	}

	@Override
	public OrderCostEntity queryObjectByOrderId(Long id) {
		return orderCostDao.queryObjectByOrderId(id);
	}

	@Override
	public OrderCostEntity queryObjectByOutId(Long outId) {
		return orderCostDao.queryObjectByOutId(outId);
	}
}

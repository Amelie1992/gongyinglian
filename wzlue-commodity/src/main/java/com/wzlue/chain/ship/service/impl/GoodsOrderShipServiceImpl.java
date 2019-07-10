package com.wzlue.chain.ship.service.impl;

import com.wzlue.chain.order.dao.GoodsOrderDao;
import com.wzlue.chain.order.entity.GoodsOrderEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.ship.dao.GoodsOrderShipDao;
import com.wzlue.chain.ship.entity.GoodsOrderShipEntity;
import com.wzlue.chain.ship.service.GoodsOrderShipService;



@Service("goodsOrderShipService")
public class GoodsOrderShipServiceImpl implements GoodsOrderShipService {
	@Autowired
	private GoodsOrderShipDao goodsOrderShipDao;
    @Autowired
	private GoodsOrderDao goodsOrderDao;
	
	@Override
	public GoodsOrderShipEntity queryObject(Integer id){
		return goodsOrderShipDao.queryObject(id);
	}
	
	@Override
	public List<GoodsOrderShipEntity> queryList(Map<String, Object> map){
		return goodsOrderShipDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return goodsOrderShipDao.queryTotal(map);
	}
	
	@Override
	public void save(GoodsOrderShipEntity goodsOrderShip){
        GoodsOrderEntity goodsOrderEntity=new GoodsOrderEntity();
        goodsOrderEntity.setOrderNumber(goodsOrderShip.getOrderId());
        goodsOrderEntity.setShipTime(new Date());
        goodsOrderEntity.setOrderStatus("pr");
        goodsOrderEntity.setStatusOwner(0);
        goodsOrderDao.update(goodsOrderEntity);
		goodsOrderShipDao.save(goodsOrderShip);
	}
	
	@Override
	public void update(GoodsOrderShipEntity goodsOrderShip){
		goodsOrderShipDao.update(goodsOrderShip);
	}
	
	@Override
	public void delete(Integer id){
		goodsOrderShipDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		goodsOrderShipDao.deleteBatch(ids);
	}
	
}

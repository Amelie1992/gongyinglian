package com.wzlue.chain.order.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.order.dao.GoodsOrderCinfoDao;
import com.wzlue.chain.order.entity.GoodsOrderCinfoEntity;
import com.wzlue.chain.order.service.GoodsOrderCinfoService;



@Service("goodsOrderCinfoService")
public class GoodsOrderCinfoServiceImpl implements GoodsOrderCinfoService {
	@Autowired
	private GoodsOrderCinfoDao goodsOrderCinfoDao;
	
	@Override
	public GoodsOrderCinfoEntity queryObject(Long id){
		return goodsOrderCinfoDao.queryObject(id);
	}
	
	@Override
	public List<GoodsOrderCinfoEntity> queryList(Map<String, Object> map){
		return goodsOrderCinfoDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return goodsOrderCinfoDao.queryTotal(map);
	}
	
	@Override
	public void save(GoodsOrderCinfoEntity goodsOrderCinfo){
		goodsOrderCinfoDao.save(goodsOrderCinfo);
	}
	
	@Override
	public void update(GoodsOrderCinfoEntity goodsOrderCinfo){
		goodsOrderCinfoDao.update(goodsOrderCinfo);
	}
	
	@Override
	public void delete(Long id){
		goodsOrderCinfoDao.delete(id);
	}

    @Override
    public void deleteByOrderId(String orderId) {
        goodsOrderCinfoDao.deleteByOrderId(orderId);
    }

    @Override
	public void deleteBatch(Long[] ids){
		goodsOrderCinfoDao.deleteBatch(ids);
	}
	
}

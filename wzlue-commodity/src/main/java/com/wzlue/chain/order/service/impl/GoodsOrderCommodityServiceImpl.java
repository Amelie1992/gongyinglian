package com.wzlue.chain.order.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.order.dao.GoodsOrderCommodityDao;
import com.wzlue.chain.order.entity.GoodsOrderCommodityEntity;
import com.wzlue.chain.order.service.GoodsOrderCommodityService;



/**
 * @author Administrator
 */
@Service("goodsOrderCommodityService")
public class GoodsOrderCommodityServiceImpl implements GoodsOrderCommodityService {
	@Autowired
	private GoodsOrderCommodityDao goodsOrderCommodityDao;
	
	@Override
	public GoodsOrderCommodityEntity queryObject(Long id){
		return goodsOrderCommodityDao.queryObject(id);
	}
	
	@Override
	public List<GoodsOrderCommodityEntity> queryList(Map<String, Object> map){
		return goodsOrderCommodityDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return goodsOrderCommodityDao.queryTotal(map);
	}
	
	@Override
	public void save(GoodsOrderCommodityEntity goodsOrderCommodity){
		goodsOrderCommodityDao.save(goodsOrderCommodity);
	}
	
	@Override
	public void update(GoodsOrderCommodityEntity goodsOrderCommodity){
		goodsOrderCommodityDao.update(goodsOrderCommodity);
	}
	
	@Override
	public void delete(Long id){
		goodsOrderCommodityDao.delete(id);
	}

    @Override
    public void deleteByOrderId(String orderId) {
        goodsOrderCommodityDao.deleteByOrderId(orderId);
    }

    @Override
	public void deleteBatch(Long[] ids){
		goodsOrderCommodityDao.deleteBatch(ids);
	}

    @Override
    public void saveBatch(List<GoodsOrderCommodityEntity> commoditys) {
        goodsOrderCommodityDao.saveBatch(commoditys);
    }

}

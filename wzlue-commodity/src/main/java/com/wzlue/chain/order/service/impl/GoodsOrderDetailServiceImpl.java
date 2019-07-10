package com.wzlue.chain.order.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.order.dao.GoodsOrderDetailDao;
import com.wzlue.chain.order.entity.GoodsOrderDetailEntity;
import com.wzlue.chain.order.service.GoodsOrderDetailService;



/**
 * @author Administrator
 */
@Service("goodsOrderDetailService")
public class GoodsOrderDetailServiceImpl implements GoodsOrderDetailService {
	@Autowired
	private GoodsOrderDetailDao goodsOrderDetailDao;
	
	@Override
	public GoodsOrderDetailEntity queryObject(Long id){
		return goodsOrderDetailDao.queryObject(id);
	}
	
	@Override
	public List<GoodsOrderDetailEntity> queryList(Map<String, Object> map){
		return goodsOrderDetailDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return goodsOrderDetailDao.queryTotal(map);
	}
	
	@Override
	public void save(GoodsOrderDetailEntity goodsOrderDetail){
		goodsOrderDetailDao.save(goodsOrderDetail);
	}
	
	@Override
	public void update(GoodsOrderDetailEntity goodsOrderDetail){
		goodsOrderDetailDao.update(goodsOrderDetail);
	}
	
	@Override
	public void delete(Long id){
		goodsOrderDetailDao.delete(id);
	}

    @Override
    public void deleteByOrderId(String orderId) {
        goodsOrderDetailDao.deleteByOrderId(orderId);
    }

    @Override
	public void deleteBatch(Long[] ids){
		goodsOrderDetailDao.deleteBatch(ids);
	}

    @Override
    public void saveBatch(List<GoodsOrderDetailEntity> details) {
        goodsOrderDetailDao.saveBatch(details);
    }

}

package com.wzlue.chain.afterSale.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.afterSale.dao.AfterSaleGoodsDao;
import com.wzlue.chain.afterSale.entity.AfterSaleGoodsEntity;
import com.wzlue.chain.afterSale.service.AfterSaleGoodsService;



@Service("afterSaleGoodsService")
public class AfterSaleGoodsServiceImpl implements AfterSaleGoodsService {
	@Autowired
	private AfterSaleGoodsDao afterSaleGoodsDao;
	
	@Override
	public AfterSaleGoodsEntity queryObject(Integer id){
		return afterSaleGoodsDao.queryObject(id);
	}
	
	@Override
	public List<AfterSaleGoodsEntity> queryList(Map<String, Object> map){
		return afterSaleGoodsDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return afterSaleGoodsDao.queryTotal(map);
	}
	
	@Override
	public void save(AfterSaleGoodsEntity afterSaleGoods){
		afterSaleGoodsDao.save(afterSaleGoods);
	}
	
	@Override
	public void update(AfterSaleGoodsEntity afterSaleGoods){
		afterSaleGoodsDao.update(afterSaleGoods);
	}
	
	@Override
	public void delete(Integer id){
		afterSaleGoodsDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		afterSaleGoodsDao.deleteBatch(ids);
	}
	
}

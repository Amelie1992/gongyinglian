package com.wzlue.chain.offer.service.impl;

import com.wzlue.chain.offer.dao.GoodsOfferCommodityDao;
import com.wzlue.chain.offer.entity.GoodsOfferCommodityEntity;
import com.wzlue.chain.offer.service.GoodsOfferCommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service("goodsOfferCommodityService")
public class GoodsOfferCommodityServiceImpl implements GoodsOfferCommodityService {
	@Autowired
	private GoodsOfferCommodityDao goodsOfferCommodityDao;
	
	@Override
	public GoodsOfferCommodityEntity queryObject(Long id){
		return goodsOfferCommodityDao.queryObject(id);
	}
	
	@Override
	public List<GoodsOfferCommodityEntity> queryList(Map<String, Object> map){
		return goodsOfferCommodityDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return goodsOfferCommodityDao.queryTotal(map);
	}
	
	@Override
	public void save(GoodsOfferCommodityEntity goodsOfferCommodity){
		goodsOfferCommodityDao.save(goodsOfferCommodity);
	}
	
	@Override
	public void update(GoodsOfferCommodityEntity goodsOfferCommodity){
		goodsOfferCommodityDao.update(goodsOfferCommodity);
	}
	
	@Override
	public void delete(Long id){
		goodsOfferCommodityDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		goodsOfferCommodityDao.deleteBatch(ids);
	}
	
}

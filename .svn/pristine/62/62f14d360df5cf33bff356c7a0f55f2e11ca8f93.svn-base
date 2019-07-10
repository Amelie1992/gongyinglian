package com.wzlue.chain.marketing.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.marketing.dao.MarketAuctionCommodityDao;
import com.wzlue.chain.marketing.entity.MarketAuctionCommodityEntity;
import com.wzlue.chain.marketing.service.MarketAuctionCommodityService;



@Service("marketAuctionCommodityService")
public class MarketAuctionCommodityServiceImpl implements MarketAuctionCommodityService {
	@Autowired
	private MarketAuctionCommodityDao marketAuctionCommodityDao;
	
	@Override
	public MarketAuctionCommodityEntity queryObject(Long id){
		return marketAuctionCommodityDao.queryObject(id);
	}
	
	@Override
	public List<MarketAuctionCommodityEntity> queryList(Map<String, Object> map){
		return marketAuctionCommodityDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return marketAuctionCommodityDao.queryTotal(map);
	}
	
	@Override
	public void save(MarketAuctionCommodityEntity marketAuctionCommodity){
		marketAuctionCommodityDao.save(marketAuctionCommodity);
	}
	
	@Override
	public void update(MarketAuctionCommodityEntity marketAuctionCommodity){
		marketAuctionCommodityDao.update(marketAuctionCommodity);
	}
	
	@Override
	public void delete(Long id){
		marketAuctionCommodityDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		marketAuctionCommodityDao.deleteBatch(ids);
	}
	
}

package com.wzlue.chain.marketing.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.marketing.dao.MarketTenderAnnexDao;
import com.wzlue.chain.marketing.entity.MarketTenderAnnexEntity;
import com.wzlue.chain.marketing.service.MarketTenderAnnexService;



@Service("marketTenderAnnexService")
public class MarketTenderAnnexServiceImpl implements MarketTenderAnnexService {
	@Autowired
	private MarketTenderAnnexDao marketTenderAnnexDao;
	
	@Override
	public MarketTenderAnnexEntity queryObject(Long id){
		return marketTenderAnnexDao.queryObject(id);
	}
	
	@Override
	public List<MarketTenderAnnexEntity> queryList(Map<String, Object> map){
		return marketTenderAnnexDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return marketTenderAnnexDao.queryTotal(map);
	}
	
	@Override
	public void save(MarketTenderAnnexEntity marketTenderAnnex){
		marketTenderAnnexDao.save(marketTenderAnnex);
	}
	
	@Override
	public void update(MarketTenderAnnexEntity marketTenderAnnex){
		marketTenderAnnexDao.update(marketTenderAnnex);
	}
	
	@Override
	public void delete(Long id){
		marketTenderAnnexDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		marketTenderAnnexDao.deleteBatch(ids);
	}
	
}

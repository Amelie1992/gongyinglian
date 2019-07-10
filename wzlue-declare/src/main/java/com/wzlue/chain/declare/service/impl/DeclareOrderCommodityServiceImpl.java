package com.wzlue.chain.declare.service.impl;

import com.wzlue.chain.declare.dao.DeclareOrderCommodityDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


import com.wzlue.chain.declare.entity.DeclareOrderCommodityEntity;
import com.wzlue.chain.declare.service.DeclareOrderCommodityService;



@Service("declareOrderCommodityService")
public class DeclareOrderCommodityServiceImpl implements DeclareOrderCommodityService {
	@Autowired
	private DeclareOrderCommodityDao declareOrderCommodityDao;
	
	@Override
	public DeclareOrderCommodityEntity queryObject(Long id){
		return declareOrderCommodityDao.queryObject(id);
	}
	
	@Override
	public List<DeclareOrderCommodityEntity> queryList(Map<String, Object> map){
		return declareOrderCommodityDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return declareOrderCommodityDao.queryTotal(map);
	}
	
	@Override
	public void save(DeclareOrderCommodityEntity declareOrderCommodity){
		declareOrderCommodityDao.save(declareOrderCommodity);
	}
	
	@Override
	public void update(DeclareOrderCommodityEntity declareOrderCommodity){
		declareOrderCommodityDao.update(declareOrderCommodity);
	}
	
	@Override
	public void delete(Long id){
		declareOrderCommodityDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		declareOrderCommodityDao.deleteBatch(ids);
	}
	
}

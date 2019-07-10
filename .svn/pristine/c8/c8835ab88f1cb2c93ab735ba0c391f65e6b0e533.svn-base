package com.wzlue.chain.declare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.declare.dao.DeclareOfferCustomsDao;
import com.wzlue.chain.declare.entity.DeclareOfferCustomsEntity;
import com.wzlue.chain.declare.service.DeclareOfferCustomsService;



@Service("declareOfferCustomsService")
public class DeclareOfferCustomsServiceImpl implements DeclareOfferCustomsService {
	@Autowired
	private DeclareOfferCustomsDao declareOfferCustomsDao;
	
	@Override
	public DeclareOfferCustomsEntity queryObject(Integer id){
		return declareOfferCustomsDao.queryObject(id);
	}
	
	@Override
	public List<DeclareOfferCustomsEntity> queryList(Map<String, Object> map){
		return declareOfferCustomsDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return declareOfferCustomsDao.queryTotal(map);
	}
	
	@Override
	public void save(DeclareOfferCustomsEntity declareOfferCustoms){
		declareOfferCustomsDao.save(declareOfferCustoms);
	}
	
	@Override
	public void update(DeclareOfferCustomsEntity declareOfferCustoms){
		declareOfferCustomsDao.update(declareOfferCustoms);
	}
	
	@Override
	public void delete(Integer id){
		declareOfferCustomsDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		declareOfferCustomsDao.deleteBatch(ids);
	}
	
}

package com.wzlue.chain.declare.service.impl;

import com.wzlue.chain.declare.dao.DeclareOrderOfferDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


import com.wzlue.chain.declare.entity.DeclareOrderOfferEntity;
import com.wzlue.chain.declare.service.DeclareOrderOfferService;



@Service("declareOrderOfferService")
public class DeclareOrderOfferServiceImpl implements DeclareOrderOfferService {
	@Autowired
	private DeclareOrderOfferDao declareOrderOfferDao;
	
	@Override
	public DeclareOrderOfferEntity queryObject(Integer id){
		return declareOrderOfferDao.queryObject(id);
	}
	
	@Override
	public List<DeclareOrderOfferEntity> queryList(Map<String, Object> map){
		return declareOrderOfferDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return declareOrderOfferDao.queryTotal(map);
	}
	
	@Override
	public void save(DeclareOrderOfferEntity declareOrderOffer){
		declareOrderOfferDao.save(declareOrderOffer);
	}
	
	@Override
	public void update(DeclareOrderOfferEntity declareOrderOffer){
		declareOrderOfferDao.update(declareOrderOffer);
	}
	
	@Override
	public void delete(Integer id){
		declareOrderOfferDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		declareOrderOfferDao.deleteBatch(ids);
	}
	
}

package com.wzlue.chain.declare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.declare.dao.DeclareDemandDao;
import com.wzlue.chain.declare.entity.DeclareDemandEntity;
import com.wzlue.chain.declare.service.DeclareDemandService;



@Service("declareDemandService")
public class DeclareDemandServiceImpl implements DeclareDemandService {
	@Autowired
	private DeclareDemandDao declareDemandDao;
	
	@Override
	public DeclareDemandEntity queryObject(Integer id){
		return declareDemandDao.queryObject(id);
	}
	
	@Override
	public List<DeclareDemandEntity> queryList(Map<String, Object> map){
		return declareDemandDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return declareDemandDao.queryTotal(map);
	}
	
	@Override
	public void save(DeclareDemandEntity declareDemand){
		declareDemandDao.save(declareDemand);
	}
	
	@Override
	public void update(DeclareDemandEntity declareDemand){
		declareDemandDao.update(declareDemand);
	}
	
	@Override
	public void delete(Integer id){
		declareDemandDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		declareDemandDao.deleteBatch(ids);
	}
	
}

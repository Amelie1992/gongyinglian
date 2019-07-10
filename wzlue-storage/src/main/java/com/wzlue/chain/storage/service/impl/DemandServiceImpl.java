package com.wzlue.chain.storage.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.storage.dao.DemandDao;
import com.wzlue.chain.storage.entity.DemandEntity;
import com.wzlue.chain.storage.service.DemandService;



@Service("demandService")
public class DemandServiceImpl implements DemandService {
	@Autowired
	private DemandDao demandDao;
	
	@Override
	public DemandEntity queryObject(Long id){
		return demandDao.queryObject(id);
	}
	
	@Override
	public List<DemandEntity> queryList(Map<String, Object> map){
		return demandDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return demandDao.queryTotal(map);
	}
	
	@Override
	public void save(DemandEntity demand){
		demandDao.save(demand);
	}
	
	@Override
	public void update(DemandEntity demand){
		demandDao.update(demand);
	}
	
	@Override
	public void delete(Long id){
		demandDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		demandDao.deleteBatch(ids);
	}
	
}

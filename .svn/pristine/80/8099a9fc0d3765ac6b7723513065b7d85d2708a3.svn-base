package com.wzlue.chain.logistics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.logistics.dao.LogisticsDemandDao;
import com.wzlue.chain.logistics.entity.LogisticsDemandEntity;
import com.wzlue.chain.logistics.service.LogisticsDemandService;



@Service("logisticsDemandService")
public class LogisticsDemandServiceImpl implements LogisticsDemandService {
	@Autowired
	private LogisticsDemandDao logisticsDemandDao;
	
	@Override
	public LogisticsDemandEntity queryObject(Long id){
		return logisticsDemandDao.queryObject(id);
	}
	
	@Override
	public List<LogisticsDemandEntity> queryList(Map<String, Object> map){
		return logisticsDemandDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return logisticsDemandDao.queryTotal(map);
	}
	
	@Override
	public void save(LogisticsDemandEntity logisticsDemand){
		logisticsDemandDao.save(logisticsDemand);
	}
	
	@Override
	public void update(LogisticsDemandEntity logisticsDemand){
		logisticsDemandDao.update(logisticsDemand);
	}
	
	@Override
	public void delete(Long id){
		logisticsDemandDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		logisticsDemandDao.deleteBatch(ids);
	}
	
}

package com.wzlue.chain.agent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.agent.dao.AgentOfferBusinessDao;
import com.wzlue.chain.agent.entity.AgentOfferBusinessEntity;
import com.wzlue.chain.agent.service.AgentOfferBusinessService;

/**
* 代理报盘业务信息表(业务接口实现)
* */
@Service("agentOfferBusinessService")
public class AgentOfferBusinessServiceImpl implements AgentOfferBusinessService {
	@Autowired
	private AgentOfferBusinessDao agentOfferBusinessDao;
	
	@Override
	public AgentOfferBusinessEntity queryObject(Integer id){
		return agentOfferBusinessDao.queryObject(id);
	}
	
	@Override
	public List<AgentOfferBusinessEntity> queryList(Map<String, Object> map){
		return agentOfferBusinessDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return agentOfferBusinessDao.queryTotal(map);
	}
	
	@Override
	public void save(AgentOfferBusinessEntity agentOfferBusiness){
		agentOfferBusinessDao.save(agentOfferBusiness);
	}
	
	@Override
	public void update(AgentOfferBusinessEntity agentOfferBusiness){
		agentOfferBusinessDao.update(agentOfferBusiness);
	}
	
	@Override
	public void delete(Integer id){
		agentOfferBusinessDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		agentOfferBusinessDao.deleteBatch(ids);
	}
	
}

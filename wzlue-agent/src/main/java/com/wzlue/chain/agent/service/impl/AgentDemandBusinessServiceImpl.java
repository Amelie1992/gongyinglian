package com.wzlue.chain.agent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.agent.dao.AgentDemandBusinessDao;
import com.wzlue.chain.agent.entity.AgentDemandBusinessEntity;
import com.wzlue.chain.agent.service.AgentDemandBusinessService;



@Service("agentDemandBusinessService")
public class AgentDemandBusinessServiceImpl implements AgentDemandBusinessService {
	@Autowired
	private AgentDemandBusinessDao agentDemandBusinessDao;
	
	@Override
	public AgentDemandBusinessEntity queryObject(Long id){
		return agentDemandBusinessDao.queryObject(id);
	}
	
	@Override
	public List<AgentDemandBusinessEntity> queryList(Map<String, Object> map){
		return agentDemandBusinessDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return agentDemandBusinessDao.queryTotal(map);
	}
	
	@Override
	public void save(AgentDemandBusinessEntity agentDemandBusiness){
		agentDemandBusinessDao.save(agentDemandBusiness);
	}
	
	@Override
	public void update(AgentDemandBusinessEntity agentDemandBusiness){
		agentDemandBusinessDao.update(agentDemandBusiness);
	}
	
	@Override
	public void delete(Long id){
		agentDemandBusinessDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		agentDemandBusinessDao.deleteBatch(ids);
	}
	
}

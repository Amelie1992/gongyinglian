package com.wzlue.chain.agent.service.impl;

import com.wzlue.chain.agent.dao.AgentOrderBusinessDao;
import com.wzlue.chain.agent.entity.AgentOrderBusinessEntity;
import com.wzlue.chain.agent.service.AgentOrderBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;





@Service("agentOrderBusinessService")
public class AgentOrderBusinessServiceImpl implements AgentOrderBusinessService {
	@Autowired
	private AgentOrderBusinessDao agentOrderBusinessDao;
	
	@Override
	public AgentOrderBusinessEntity queryObject(Long id){
		return agentOrderBusinessDao.queryObject(id);
	}
	
	@Override
	public List<AgentOrderBusinessEntity> queryList(Map<String, Object> map){
		return agentOrderBusinessDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return agentOrderBusinessDao.queryTotal(map);
	}
	
	@Override
	public void save(AgentOrderBusinessEntity agentOrderBusiness){
		agentOrderBusinessDao.save(agentOrderBusiness);
	}
	
	@Override
	public void update(AgentOrderBusinessEntity agentOrderBusiness){
		agentOrderBusinessDao.update(agentOrderBusiness);
	}
	
	@Override
	public void delete(Long id){
		agentOrderBusinessDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		agentOrderBusinessDao.deleteBatch(ids);
	}
	
}

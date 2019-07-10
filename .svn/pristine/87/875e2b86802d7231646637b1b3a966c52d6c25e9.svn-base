package com.wzlue.chain.agent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.agent.dao.AgentOrderOfferDao;
import com.wzlue.chain.agent.entity.AgentOrderOfferEntity;
import com.wzlue.chain.agent.service.AgentOrderOfferService;



@Service("agentOrderOfferService")
public class AgentOrderOfferServiceImpl implements AgentOrderOfferService {
	@Autowired
	private AgentOrderOfferDao agentOrderOfferDao;
	
	@Override
	public AgentOrderOfferEntity queryObject(Integer id){
		return agentOrderOfferDao.queryObject(id);
	}
	
	@Override
	public List<AgentOrderOfferEntity> queryList(Map<String, Object> map){
		return agentOrderOfferDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return agentOrderOfferDao.queryTotal(map);
	}
	
	@Override
	public void save(AgentOrderOfferEntity agentOrderOffer){
		agentOrderOfferDao.save(agentOrderOffer);
	}
	
	@Override
	public void update(AgentOrderOfferEntity agentOrderOffer){
		agentOrderOfferDao.update(agentOrderOffer);
	}
	
	@Override
	public void delete(Integer id){
		agentOrderOfferDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		agentOrderOfferDao.deleteBatch(ids);
	}
	
}

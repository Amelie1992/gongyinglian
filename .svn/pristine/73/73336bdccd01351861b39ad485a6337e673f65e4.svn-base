package com.wzlue.chain.agent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.agent.dao.AgentDemandGoodsCategoryDao;
import com.wzlue.chain.agent.entity.AgentDemandGoodsCategoryEntity;
import com.wzlue.chain.agent.service.AgentDemandGoodsCategoryService;



@Service("agentDemandGoodsCategoryService")
public class AgentDemandGoodsCategoryServiceImpl implements AgentDemandGoodsCategoryService {
	@Autowired
	private AgentDemandGoodsCategoryDao agentDemandGoodsCategoryDao;
	
	@Override
	public AgentDemandGoodsCategoryEntity queryObject(Long id){
		return agentDemandGoodsCategoryDao.queryObject(id);
	}
	
	@Override
	public List<AgentDemandGoodsCategoryEntity> queryList(Map<String, Object> map){
		return agentDemandGoodsCategoryDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return agentDemandGoodsCategoryDao.queryTotal(map);
	}
	
	@Override
	public void save(AgentDemandGoodsCategoryEntity agentDemandGoodsCategory){
		agentDemandGoodsCategoryDao.save(agentDemandGoodsCategory);
	}
	
	@Override
	public void update(AgentDemandGoodsCategoryEntity agentDemandGoodsCategory){
		agentDemandGoodsCategoryDao.update(agentDemandGoodsCategory);
	}
	
	@Override
	public void delete(Long id){
		agentDemandGoodsCategoryDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		agentDemandGoodsCategoryDao.deleteBatch(ids);
	}
	
}

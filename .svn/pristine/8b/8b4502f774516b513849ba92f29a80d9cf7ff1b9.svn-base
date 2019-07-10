package com.wzlue.chain.agent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.agent.dao.AgentOfferGoodsCategoryDao;
import com.wzlue.chain.agent.entity.AgentOfferGoodsCategoryEntity;
import com.wzlue.chain.agent.service.AgentOfferGoodsCategoryService;



@Service("agentOfferGoodsCategoryService")
public class AgentOfferGoodsCategoryServiceImpl implements AgentOfferGoodsCategoryService {
	@Autowired
	private AgentOfferGoodsCategoryDao agentOfferGoodsCategoryDao;
	
	@Override
	public AgentOfferGoodsCategoryEntity queryObject(Long id){
		return agentOfferGoodsCategoryDao.queryObject(id);
	}
	
	@Override
	public List<AgentOfferGoodsCategoryEntity> queryList(Map<String, Object> map){
		return agentOfferGoodsCategoryDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return agentOfferGoodsCategoryDao.queryTotal(map);
	}
	
	@Override
	public void save(AgentOfferGoodsCategoryEntity agentOfferGoodsCategory){
		agentOfferGoodsCategoryDao.save(agentOfferGoodsCategory);
	}
	
	@Override
	public void update(AgentOfferGoodsCategoryEntity agentOfferGoodsCategory){
		agentOfferGoodsCategoryDao.update(agentOfferGoodsCategory);
	}
	
	@Override
	public void delete(Long id){
		agentOfferGoodsCategoryDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		agentOfferGoodsCategoryDao.deleteBatch(ids);
	}
	
}

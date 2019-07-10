package com.wzlue.chain.agent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.agent.dao.AgentOrderGoodsDao;
import com.wzlue.chain.agent.entity.AgentOrderGoodsEntity;
import com.wzlue.chain.agent.service.AgentOrderGoodsService;



@Service("agentOrderGoodsService")
public class AgentOrderGoodsServiceImpl implements AgentOrderGoodsService {
    @Autowired
    private AgentOrderGoodsDao agentOrderGoodsDao;

    @Override
    public AgentOrderGoodsEntity queryObject(Long id){
        return agentOrderGoodsDao.queryObject(id);
    }

    @Override
    public List<AgentOrderGoodsEntity> queryList(Map<String, Object> map){
        return agentOrderGoodsDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map){
        return agentOrderGoodsDao.queryTotal(map);
    }

    @Override
    public void save(AgentOrderGoodsEntity agentOrderGoods){
        agentOrderGoodsDao.save(agentOrderGoods);
    }

    @Override
    public void update(AgentOrderGoodsEntity agentOrderGoods){
        agentOrderGoodsDao.update(agentOrderGoods);
    }

    @Override
    public void delete(Long id){
        agentOrderGoodsDao.delete(id);
    }

    @Override
    public void deleteBatch(Long[] ids){
        agentOrderGoodsDao.deleteBatch(ids);
    }

}

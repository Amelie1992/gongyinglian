package com.wzlue.chain.agent.service;

import com.wzlue.chain.agent.entity.AgentOrderGoodsEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理(订单)货物信息表
 *
 * @author
 * @email
 * @date 2018-08-31 15:52:17
 */
public interface AgentOrderGoodsService {

    AgentOrderGoodsEntity queryObject(Long id);

    List<AgentOrderGoodsEntity> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    void save(AgentOrderGoodsEntity agentOrderGoods);

    void update(AgentOrderGoodsEntity agentOrderGoods);

    void delete(Long id);

    void deleteBatch(Long[] ids);
}

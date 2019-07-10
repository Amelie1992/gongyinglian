package com.wzlue.chain.agent.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.agent.entity.AgentOrderGoodsEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 代理(订单)货物信息表
 *
 * @author
 * @email
 * @date 2018-08-31 15:52:17
 */
@Mapper
public interface AgentOrderGoodsDao extends BaseDao<AgentOrderGoodsEntity> {

    List<AgentOrderGoodsEntity> pageList(Map<String, Object> map);

    int pageCount(Map<String,Object> map);

    List<AgentOrderGoodsEntity> listByOrderNumber(@Param("orderNumber") String orderNumber,@Param("userId")Long userId);

    void deleteByOrderNumber(@Param("orderNumber") String orderNumber);
}



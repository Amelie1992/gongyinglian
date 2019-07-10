package com.wzlue.chain.agent.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.agent.entity.AgentOrderBusinessEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 代理(订单)服务信息表
 * 
 * @author 
 * @email 
 * @date 2018-08-30 15:40:41
 */
@Mapper
public interface AgentOrderBusinessDao extends BaseDao<AgentOrderBusinessEntity> {

    List<AgentOrderBusinessEntity> pageList(Map<String, Object> map);

    int pageCount(Map<String,Object> map);

    void deleteByOrderNumber(@Param("orderNumber") String orderNumber);
}

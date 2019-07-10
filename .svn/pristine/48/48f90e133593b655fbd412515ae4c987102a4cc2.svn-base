package com.wzlue.chain.agent.dao;

import com.wzlue.chain.agent.entity.AgentOrderOfferEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 代理订单 -> 报盘信息备份表
 * 
 * @author 
 * @email 
 * @date 2018-09-14 13:53:22
 */
@Mapper
public interface AgentOrderOfferDao extends BaseDao<AgentOrderOfferEntity> {
	void deleteByOrderNumber(@Param("orderNumber") String orderNumber);
}

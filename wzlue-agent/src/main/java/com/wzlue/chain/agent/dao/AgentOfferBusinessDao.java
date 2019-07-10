package com.wzlue.chain.agent.dao;

import com.wzlue.chain.agent.entity.AgentOfferBusinessEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 
 * 
 * @author 
 * @email 
 * @date 2018-08-22 10:22:51
 */
@Mapper
public interface AgentOfferBusinessDao extends BaseDao<AgentOfferBusinessEntity> {
    void deleteByOfferId(@Param("id") Long id);
}

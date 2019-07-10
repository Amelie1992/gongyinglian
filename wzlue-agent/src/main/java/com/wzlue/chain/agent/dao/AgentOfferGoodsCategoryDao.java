package com.wzlue.chain.agent.dao;

import com.wzlue.chain.agent.entity.AgentOfferGoodsCategoryEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 代理报盘商品分类信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-01 17:50:03
 */
@Mapper
public interface AgentOfferGoodsCategoryDao extends BaseDao<AgentOfferGoodsCategoryEntity> {
	void deleteByOfferId(@Param("id") Long id);
}

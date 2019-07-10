package com.wzlue.chain.marketing.dao;

import com.wzlue.chain.marketing.entity.MarketTenderEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

/**
 * 招标表
 * 
 * @author 
 * @email 
 * @date 2018-10-24 15:19:33
 */
@Mapper
public interface MarketTenderDao extends BaseDao<MarketTenderEntity> {

    void updateStatus(Map<String, Object> map);
}

package com.wzlue.chain.declare.dao;


import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.declare.entity.DeclareOrderCommodityEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 报关订单商品表
 * 
 * @author 
 * @email 
 * @date 2018-08-20 17:24:10
 */
@Mapper
public interface DeclareOrderCommodityDao extends BaseDao<DeclareOrderCommodityEntity> {
    List<DeclareOrderCommodityEntity> getListById(Integer orderId);

    void deleteByOrder(@Param("id") Long id);
}
